import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CarStatus } from './car-status.entity';

@Injectable()
export class CarStatusesService {
    constructor(
        @InjectRepository(CarStatus)
        private carStatusRepository: Repository<CarStatus>
    ) {}

    async findAll(): Promise<CarStatus[]> {
        return this.carStatusRepository.find();
    }

    async findById(id: number): Promise<CarStatus> {
        const carStatus = await this.carStatusRepository.findOne(id);
        if (!carStatus) {
            throw new BadRequestException('Car status not found');
        }
        return carStatus;
    }
}
