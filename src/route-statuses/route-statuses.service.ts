import { Injectable } from '@nestjs/common';
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
}
