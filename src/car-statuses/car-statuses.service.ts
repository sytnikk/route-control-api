import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
