import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Validate,
    IsNumberString
} from 'class-validator';

import {IsDateConstraint, IsGreaterThanConstraint, IsLowerThanConstraint} from '../validators';

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
    @IsNumber()
    revenue: number;

    @IsNotEmpty()
    @Validate(IsLowerThanConstraint, ['deliveryDate'])
    @Validate(IsDateConstraint)
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
    @Validate(IsGreaterThanConstraint, ['sendingDate'])
    @Validate(IsDateConstraint)
    deliveryDate: string;
}
