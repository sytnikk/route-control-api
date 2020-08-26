import { Module } from '@nestjs/common';

import { CarStatusesController } from './car-statuses.controller';
import { CarStatusesService } from './car-statuses.service';

@Module({
    controllers: [CarStatusesController],
    providers: [CarStatusesService],
})
export class CarStatusesModule {}
