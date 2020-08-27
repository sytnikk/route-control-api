import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutesModule } from './routes/routes.module';
import { CarsModule } from './cars/cars.module';
import { CarStatusesModule } from './car-statuses/car-statuses.module';
import { TransportTypesModule } from './transport-types/transport-types.module';
import { RouteStatusesModule } from './route-statuses/route-statuses.module';

@Module({
  imports: [
      RoutesModule,
      CarsModule,
      CarStatusesModule,
      TransportTypesModule,
      RouteStatusesModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'route-control',
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      }),
  ],
})
export class AppModule {}
