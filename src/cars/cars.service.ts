import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { RoutesService } from '../routes/routes.service';
import { CarStatusesService } from '../car-statuses/car-statuses.service';
import { TransportTypesService } from '../transport-types/transport-types.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
        private carStatusesService: CarStatusesService,
        private transportTypesService: TransportTypesService,
        @Inject(forwardRef(() => RoutesService))
        private routesService: RoutesService,
    ) {}

    private async addRelations(car: Car): Promise<void> {
        const carStatus = await this.carStatusesService.findById(car.carStatusId);
        const transportType = await this.transportTypesService.findById(car.transportTypeId);
        car.carStatus = carStatus;
        car.transportType = transportType;
    }

    async findAll(params?): Promise<Car[]> {
        return this.carRepository.find({
            where: params,
            relations: ['carStatus', 'transportType']
        });
    }

    async findById(id: number): Promise<Car> {
        const car = await this.carRepository.findOne(id, {
            relations: ['carStatus', 'transportType']
        });
        if (!car) {
            throw new BadRequestException('Car not found');
        }
        return car;
    }

    async create(car: Car): Promise<Car> {
        await this.addRelations(car);
        return this.carRepository.save(car);
    }

    async update(id: number, newCar: Car): Promise<Car> {
        const car = await this.findById(id);
        await this.addRelations(newCar);
        const updatedCar = { ...car, ...newCar };
        return await this.carRepository.save(updatedCar);
    }

    async delete(id: number): Promise<void> {
        const car = await this.findById(id);
        if (car.routes.length > 0) {
            throw new BadRequestException('Car cannot be deleted while it relate with routes');
        }
        await this.carRepository.delete(id);
    }
}
