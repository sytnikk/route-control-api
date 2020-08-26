import { Module } from '@nestjs/common';
import { RoutesStatusesController } from './routes-statuses.controller';
import { RoutesStatusesService } from './routes-statuses.service';

@Module({
  controllers: [RoutesStatusesController],
  providers: [RoutesStatusesService]
})
export class RoutesStatusesModule {}
