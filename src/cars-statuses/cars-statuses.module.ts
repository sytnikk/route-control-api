import { Module } from '@nestjs/common';
import {CarsStatusesController} from "./cars-statuses.controller";
import { CarsStatusesService } from './cars-statuses.service';

@Module({
    controllers: [CarsStatusesController],
    providers: [CarsStatusesService],
})
export class CarsStatusesModule {}
