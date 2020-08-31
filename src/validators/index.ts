import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: "IsLowerThan", async: false })
export class IsLowerThanConstraint implements ValidatorConstraintInterface {

    validate(propertyValue: string, args: ValidationArguments) {
        return propertyValue <= args.object[args.constraints[0]];
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be lower than ${args.constraints[0]}`;
    }
}

@ValidatorConstraint({ name: "IsGreaterThan", async: false })
export class IsGreaterThanConstraint implements ValidatorConstraintInterface {

    validate(propertyValue: string, args: ValidationArguments) {
        return propertyValue >= args.object[args.constraints[0]];
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be lower than ${args.constraints[0]}`;
    }
}

@ValidatorConstraint({ name: "IsGreaterThan", async: false })
export class IsDateConstraint implements ValidatorConstraintInterface {

    validate(propertyValue: string, args: ValidationArguments) {
        return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(propertyValue);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} should be in YYYY-MM-DD format`;
    }
}
