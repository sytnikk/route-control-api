import { Module } from '@nestjs/common';

import { RoutesModule } from './routes/routes.module';
import { CarsModule } from './cars/cars.module';
import { CarStatusesModule } from './car-statuses/car-statuses.module';
import { TransportTypesModule } from './transport-types/transport-types.module';
import { RouteStatusesModule } from './route-statuses/route-statuses.module';

@Module({
  imports: [RoutesModule, CarsModule, CarStatusesModule, TransportTypesModule, RouteStatusesModule],
})
export class AppModule {}
