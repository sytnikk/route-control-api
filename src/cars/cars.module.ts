import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

import { RoutesModule } from '../routes/routes.module';
import { TransportTypesModule } from '../transport-types/transport-types.module';
import { CarStatusesModule } from '../car-statuses/car-statuses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    CarStatusesModule,
    TransportTypesModule,
    forwardRef(() => RoutesModule),
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService, TypeOrmModule]
})
export class CarsModule {}
