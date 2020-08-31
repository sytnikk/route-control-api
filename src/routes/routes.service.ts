import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository, getManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Route } from './route.entity';
import { CarStatusEnum } from '../car-statuses/car-status.enum';
import { RouteStatusEnum } from '../route-statuses/route-status.enum';
import { CarsService } from '../cars/cars.service';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { RouteStatusesService } from '../route-statuses/route-statuses.service';
import { CarStatusesService } from '../car-statuses/car-statuses.service';
import {Car} from "../cars/car.entity";


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

    private areDeliveryDatesTheSame(newRoute: Route, oldRoute: Route): boolean {
        return (
            new Date(oldRoute.deliveryDate).setHours(0, 0, 0, 0)
            ===
            new Date(newRoute.deliveryDate).setHours(0, 0, 0, 0)
            ||
            new Date(oldRoute.sendingDate).setHours(0, 0, 0, 0)
            ===
            new Date(newRoute.sendingDate).setHours(0, 0, 0, 0)
        );
    }

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

    private async setCarStatus(route: Route): Promise<void> {
        const from = new Date(route.sendingDate).setHours(0, 0, 0, 0);
        const to = new Date(route.deliveryDate).setHours(0, 0, 0, 0);
        const now = new Date().setHours(0, 0, 0, 0);
        const isNowDateBetweenDeliveryDates = now >= from && now <= to;
        const isNowDateAfterDeliveryDates = now > to;
        if ((route.routeStatusId === RouteStatusEnum.INPROCESS || route.routeStatusId === RouteStatusEnum.PREPARING) && isNowDateBetweenDeliveryDates) {
            route.car.carStatusId = CarStatusEnum.BUSY;
        } else if (route.routeStatusId === RouteStatusEnum.COMPLETED && (isNowDateAfterDeliveryDates || isNowDateBetweenDeliveryDates)) {
            route.car.carStatusId = CarStatusEnum.FREE;
        }
        route.car.carStatus = await this.carStatusesService.findById(route.car.carStatusId);
    }

    private async checkCarAvailability(route: Route): Promise<void> {
        const routes = await this.routeRepository.find({
            where: {
                carId: route.carId,
                deliveryDate: MoreThanOrEqual(route.deliveryDate),
                sendingDate: LessThanOrEqual(route.sendingDate)
            }
        });
        if (routes.length > 0) {
            throw new BadRequestException('Car don`t available in this days');
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
        await this.setCarStatus(route);
        return this.routeRepository.save(route);
    }

    async update(id: number, newRoute: Route): Promise<Route> {
        newRoute.id = id;
        const oldRoute = await this.findRouteById(id);
        await this.addRelations(newRoute);
        if (!this.areDeliveryDatesTheSame(newRoute, oldRoute)) {
            await this.checkCarAvailability(newRoute);
        }
        await getManager().transaction(async (transactionalEntityManager) => {
            if (oldRoute.carId !== newRoute.carId) {
                await this.setCarStatus(oldRoute);
                await transactionalEntityManager.save(oldRoute.car);
            }
            await this.setCarStatus(newRoute);
            await transactionalEntityManager.save(newRoute.car);
            await transactionalEntityManager.save(newRoute);
        });
        return newRoute;
    }

    async delete(id: number): Promise<Route> {
        const route = await this.findRouteById(id);
        await this.setCarStatus(route);
        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.remove(route);
            await transactionalEntityManager.save(route.car);
        });
        return route;
    }
}
