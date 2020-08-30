import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Route } from './route.entity';
import { CarStatusEnum } from '../car-statuses/car-status.enum';
import { RouteStatusEnum } from '../route-statuses/route-status.enum';
import { CarsService } from '../cars/cars.service';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { RouteStatusesService } from '../route-statuses/route-statuses.service';
import { CarStatusesService } from '../car-statuses/car-statuses.service';


@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private routeRepository: Repository<Route>,
        private transportTypesService: TransportTypesService,
        private routeStatusesService: RouteStatusesService,
        @Inject(forwardRef(() => CarsService))
        private carsService: CarsService,
        private carStatusesService: CarStatusesService,
    ) {}

    private async addRelations(route: Route): Promise<Route> {
        const transportType = await this.transportTypesService.findById(route.transportTypeId);
        const routeStatus = await  this.routeStatusesService.findById(route.routeStatusId);
        route.transportType = transportType;
        route.routeStatus = routeStatus;
        if (route.carId) {
            route.car = await this.carsService.findById(route.carId);
        }
        return route;
    }

    private async checkCarAvailability(route: Route): Promise<void> {
        const newRouteSendingDate = new Date(route.sendingDate);
        const newRouteDeliveryDate = new Date(route.deliveryDate);
        const carRoutes = await this.routeRepository.find({
            where: { carId: route.carId }
        });
        carRoutes.forEach((registeredCarRoute) => {
            const registeredRouteSendingDate = new Date(registeredCarRoute.sendingDate);
            const registeredRouteDeliveryDate = new Date(registeredCarRoute.deliveryDate);
            if (
                !((
                    newRouteSendingDate < registeredRouteSendingDate
                    &&
                    newRouteDeliveryDate < registeredRouteSendingDate
                ) || (
                    newRouteSendingDate > registeredRouteDeliveryDate
                    &&
                    newRouteDeliveryDate > registeredRouteDeliveryDate
                )) && registeredCarRoute.id !== route.id
            ) {
                throw new BadRequestException('Car don`t available in this days');
            }
        });
    }

    private areDeliveryDatesTheSame(newRoute: Route, oldRoute: Route): boolean {
        return (
            new Date(oldRoute.deliveryDate).getTime() === new Date(newRoute.deliveryDate).getTime()
            ||
            new Date(oldRoute.sendingDate).getTime() === new Date(newRoute.sendingDate).getTime()
        );
    }

    private async setCarStatusIfNowBetweenDeliveryDates(route: Route, status: number): Promise<void> {
        const from = new Date(route.sendingDate);
        const to = new Date(route.deliveryDate);
        const now = new Date();
        if (now > from && now < to) {
            route.car.carStatusId = status;
            route.car.carStatus = await this.carStatusesService.findById(status);
        }
    }

    async findAll(params?): Promise<Route[]> {
        return this.routeRepository.find({
            where: params,
            relations: ['transportType', 'car', 'routeStatus']
        });
    }

    async findRouteById(id: number): Promise<Route> {
        const route = await this.routeRepository.findOne(id, {
            relations: ['car']
        });
        if (!route) {
            throw new BadRequestException('Route not found');
        }
        return route;
    }

    async create(route: Route): Promise<Route> {
        await this.addRelations(route);
        await this.checkCarAvailability(route);
        await this.setCarStatusIfNowBetweenDeliveryDates(route, CarStatusEnum.BUSY);
        return this.routeRepository.save(route);
    }

    async update(id: number, newRoute: Route): Promise<Route> {
        newRoute.id = id;
        const oldRoute = await this.findRouteById(id);
        await this.addRelations(newRoute);
        if (!this.areDeliveryDatesTheSame(newRoute, oldRoute)) {
            await this.checkCarAvailability(newRoute);
        }
        await this.setCarStatusIfNowBetweenDeliveryDates(
            newRoute,
            newRoute.routeStatusId === RouteStatusEnum.COMPLETED ? CarStatusEnum.FREE : CarStatusEnum.BUSY
        );
        await getManager().transaction(async (transactionalEntityManager) => {
            if (oldRoute.carId !== newRoute.carId) {
                await this.setCarStatusIfNowBetweenDeliveryDates(oldRoute, CarStatusEnum.FREE);
                await transactionalEntityManager.save(oldRoute.car);
            }
            await transactionalEntityManager.save(newRoute);
        });
        return newRoute;
    }

    async delete(id: number): Promise<void> {
        const route = await this.findRouteById(id);
        await this.setCarStatusIfNowBetweenDeliveryDates(route, CarStatusEnum.FREE);
        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.remove(route);
            await transactionalEntityManager.save(route.car);
        });
    }
}
