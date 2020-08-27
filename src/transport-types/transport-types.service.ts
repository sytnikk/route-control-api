import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransportType } from './transport-type.entity';

@Injectable()
export class TransportTypesService {
    constructor(
        @InjectRepository(TransportType)
        private transportTypeRepository: Repository<TransportType>
    ) {}

    async findAll(): Promise<TransportType[]> {
        return this.transportTypeRepository.find();
    }
}
