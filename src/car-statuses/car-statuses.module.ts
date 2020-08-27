import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarStatus } from './car-status.entity';
import { CarStatusesController } from './car-statuses.controller';
import { CarStatusesService } from './car-statuses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CarStatus]),
    ],
    controllers: [CarStatusesController],
    providers: [CarStatusesService],
    exports: [CarStatusesService, TypeOrmModule]
})
export class CarStatusesModule {}
