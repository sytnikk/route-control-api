import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { Route } from './route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

import { CarsModule } from '../cars/cars.module';
import { CarStatusesModule } from '../car-statuses/car-statuses.module';
import { RouteStatusesModule } from '../route-statuses/route-statuses.module';
import { TransportTypesModule } from '../transport-types/transport-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),
    RouteStatusesModule,
    CarStatusesModule,
    TransportTypesModule,
    forwardRef(() => CarsModule),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService, TypeOrmModule]
})
export class RoutesModule {}
