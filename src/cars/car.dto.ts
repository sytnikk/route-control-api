import { IsNotEmpty, IsString, IsNumber, Validate } from 'class-validator';
import { IsDateConstraint } from '../validators';

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
    @Validate(IsDateConstraint)
    purchaseDate: string;

    @IsNotEmpty()
    mileage: number;

    @IsNotEmpty()
    @IsNumber()
    carStatusId: number;
}
