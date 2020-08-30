import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RouteStatus } from './route-status.entity';

@Injectable()
export class RouteStatusesService {
    constructor(
        @InjectRepository(RouteStatus)
        private routeStatusRepository: Repository<RouteStatus>
    ) {}

    async findAll(): Promise<RouteStatus[]> {
        return this.routeStatusRepository.find();
    }

    async findById(id: number): Promise<RouteStatus> {
        const routeStatus = await this.routeStatusRepository.findOne(id);
        if (!routeStatus) {
            throw new BadRequestException('Route status not found');
        }
        return routeStatus;
    }
}
