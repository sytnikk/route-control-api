import { Body, Controller, Delete, Get, Put, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { Car } from './car.entity';
import { CarDto } from './car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {}

    @Get()
    index(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Post()
    create(@Body() carDto: CarDto): Promise<Car> {
        return this.carsService.create(new Car(carDto));
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id,
        @Body() carDto: CarDto
    ): Promise<Car> {
        return this.carsService.update(id, new Car(carDto));
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id,
        @Res() res: Response
    ): Promise<void> {
        await this.carsService.delete(id);
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
