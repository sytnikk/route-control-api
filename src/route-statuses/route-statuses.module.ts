import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteStatus } from './route-status.entity';
import { RouteStatusesController } from './route-statuses.controller';
import { RouteStatusesService } from './route-statuses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteStatus]),
  ],
  controllers: [RouteStatusesController],
  providers: [RouteStatusesService]
})
export class RouteStatusesModule {}
