import { Coordinates } from '../../types/coordinates.type.js';
import { CITIES_COORDINATES } from '../../types/city.enum.js';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'ValideteCityCoords' })
export class ValideteCityCoords implements ValidatorConstraintInterface {
  validate(coords: Coordinates, args: ValidationArguments) {

    const enumCoords = CITIES_COORDINATES[(args.object as never)['city']];
    return JSON.stringify(coords) === JSON.stringify(enumCoords);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Is invalid Coords for ${(args.object as never)['city']}`;
  }
}
