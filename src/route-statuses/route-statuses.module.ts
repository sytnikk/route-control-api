import { Module } from '@nestjs/common';

import { RouteStatusesController } from './route-statuses.controller';
import { RoutesStatusesService } from './route-statuses.service';

@Module({
  controllers: [RouteStatusesController],
  providers: [RoutesStatusesService]
})
export class RouteStatusesModule {}
