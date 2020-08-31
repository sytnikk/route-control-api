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
        type: process.env.DATA_BASE_TYPE as 'mysql'|'postgres',
        host: process.env.DATA_BASE_HOST,
        port: Number(process.env.DATA_BASE_PORT),
        username: process.env.DATA_BASE_USERNAME,
        password: process.env.DATA_BASE_PASSWORD,
        database: process.env.DATA_BASE,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      }),
  ],
})
export class AppModule {}
