import { IsNotEmpty, IsDateString, IsString, IsNumber } from 'class-validator';

export class CarDto {
    @IsNotEmpty()
    @IsString()
    licensePlate: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    transportTypeId: number;

    @IsNotEmpty()
    @IsDateString()
    purchaseDate: string;

    @IsNotEmpty()
    @IsNumber()
    mileage: number;

    @IsNotEmpty()
    @IsNumber()
    carStatusId: number;
}