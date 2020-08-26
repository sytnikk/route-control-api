import { Module } from '@nestjs/common';

import { RoutesModule } from './routes/routes.module';
import { CarsModule } from './cars/cars.module';
import { CarsStatusesModule } from './cars-statuses/cars-statuses.module';
import { TransportTypesModule } from './transport-types/transport-types.module';
import { RoutesStatusesModule } from './routes-statuses/routes-statuses.module';

@Module({
  imports: [RoutesModule, CarsModule, CarsStatusesModule, TransportTypesModule, RoutesStatusesModule],
})
export class AppModule {}
