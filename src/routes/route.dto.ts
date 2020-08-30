import { IsNotEmpty, IsDateString, IsString, IsNumber, IsOptional } from 'class-validator';

export class RouteDto {
    @IsNotEmpty()
    @IsString()
    cityStart: string;

    @IsNotEmpty()
    @IsString()
    cityEnd: string;

    @IsNotEmpty()
    @IsNumber()
    distanceBetweenCities: number;

    @IsNotEmpty()
    @IsDateString()
    sendingDate: string;

    @IsNotEmpty()
    @IsNumber()
    transportTypeId: number;

    @IsNumber()
    carId: number;

    @IsNotEmpty()
    @IsNumber()
    routeStatusId: number;

    @IsNotEmpty()
    @IsDateString()
    deliveryDate: string;
}