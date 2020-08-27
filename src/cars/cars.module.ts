import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

import { TransportTypesModule } from '../transport-types/transport-types.module';
import { CarStatusesModule } from '../car-statuses/car-statuses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    CarStatusesModule,
    TransportTypesModule,
  ],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
