import {BadRequestException, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { CarStatusesService } from '../car-statuses/car-statuses.service';
import { TransportTypesService } from '../transport-types/transport-types.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
        private carStatusesService: CarStatusesService,
        private transportTypesService: TransportTypesService,
    ) {}

    private async addRelations(car: Car): Promise<void> {
        const carStatus = await this.carStatusesService.findById(car.carStatusId);
        const transportType = await this.transportTypesService.findById(car.transportTypeId);
        car.carStatus = carStatus;
        car.transportType = transportType;
    }

    async findAll(): Promise<Car[]> {
        return this.carRepository.find({ relations: ['carStatus', 'transportType'] });
    }

    async findCarById(id: number): Promise<Car> {
        const car = await this.carRepository.findOne(id);
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
        const car = await this.findCarById(id);
        await this.addRelations(newCar);
        const updatedCar = { ...car, ...newCar };
        await this.carRepository.save(updatedCar);
        return updatedCar;
    }

    async delete(id: number): Promise<void> {
        await this.findCarById(id);
        await this.carRepository.delete(id);
    }
}
