import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [RoutesModule, CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
