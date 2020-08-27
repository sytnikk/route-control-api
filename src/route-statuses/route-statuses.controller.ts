import { Controller, Get } from '@nestjs/common';

import { RouteStatus } from './route-status.entity';
import { RouteStatusesService } from './route-statuses.service';

@Controller('route-statuses')
export class RouteStatusesController {
    constructor(private routeStatusesService: RouteStatusesService) {}

    @Get()
    index(): Promise<RouteStatus[]> {
        return this.routeStatusesService.findAll();
    }
}
