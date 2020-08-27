import { Controller, Get, Header } from '@nestjs/common';

import { CarStatus } from './car-status.entity';
import { CarStatusesService } from './car-statuses.service';

@Controller('car-statuses')
export class CarStatusesController {
    constructor(private carStatusesService: CarStatusesService) {}

    @Get()
    @Header('Cache-Control', 'none')
    index(): Promise<CarStatus[]> {
        return this.carStatusesService.findAll();
    }
}
