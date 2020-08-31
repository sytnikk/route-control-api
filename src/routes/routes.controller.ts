import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { Route } from './route.entity';
import { RouteDto } from './route.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
    constructor(private routeService: RoutesService){}

    @Get()
    index(): Promise<Route[]> {
        return this.routeService.findAll();
    }

    @Post()
    create(@Body() routeDto: RouteDto): Promise<Route> {
        return this.routeService.create(new Route(routeDto));
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id,
        @Body() routeDto: RouteDto
    ): Promise<Route> {
        return this.routeService.update(id, new Route(routeDto));
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id): Promise<Route> {
        return this.routeService.delete(id);
    }
}
