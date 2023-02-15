import { Coordinates } from '../../../types/coordinates.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { Amenities } from '../../../types/amenities.enum.js';
import { ValidateCityCoords } from '../../../common/middlewares/validate-coords.middleware.js';
import { ValidateConstants } from '../../../utils/validate.constants.js';

export default class UpdateOfferDto {
  @MinLength(ValidateConstants.MinLengthTitle, { message: 'Minimum title length must be 10' })
  @MaxLength(ValidateConstants.MaxLengthTitle, { message: 'Maximum title length must be 100' })
  public title?: string;

  @MinLength(ValidateConstants.MinOfferDescriptionLength, { message: 'Minimum description length must be 20' })
  @MaxLength(ValidateConstants.MaxOfferDescriptionLength, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate?: Date;

  @IsEnum(City, { message: '$property should be a value from CityEnum' })
  public city?: string;

  @MaxLength(ValidateConstants.MaxLengthImage, { message: 'Too short for field «image»' })
  public previewImagePath?: string;

  @IsArray({ message: 'Field detailImagePath must be an array' })
  @ArrayMinSize(ValidateConstants.MinCountDetailImages, { message: '$property must contain exactly $constraint1 items' })
  @ArrayMaxSize(ValidateConstants.MaxCountDetailImages, { message: '$property must contain exactly $constraint1 items' })
  @IsString({ message: '$property must be a string', each: true })
  public detailImagePath?: string[];

  @IsBoolean({ message: '$property must be a boolean' })
  public premium?: boolean;

  @IsInt({ message: '$property must be an integer' })
  public ratingCount?: number;

  @IsInt({ message: '$property must be an integer' })
  public overallRating?: number;

  @IsNumber({ maxDecimalPlaces: ValidateConstants.MaxDecimalPlaces }, { message: 'Only 1 digit precision to the right of decimal point is allowed' })
  @Min(ValidateConstants.MinAverageRating, { message: '$property must be a numerical value no less than $constraint1' })
  @Max(ValidateConstants.MaxAverageRating, { message: '$property must be a numerical value no more than $constraint1' })
  public averageRating?: number;

  @IsEnum(HousingType, { message: '$property should be a value from HousingTypeEnum' })
  public housingType?: HousingType;

  @IsInt({ message: '$property must be an integer' })
  @Min(ValidateConstants.MinRoomsNumber, { message: '$property must be an integer value no less than $constraint1' })
  @Max(ValidateConstants.MaxRoomsNumber, { message: '$property must be an integer value no more than $constraint1' })
  public roomsNumber?: number;

  @IsInt({ message: '$property must be an integer' })
  @Min(ValidateConstants.MinGuestsNumber, { message: '$property must be an integer value no less than $constraint1' })
  @Max(ValidateConstants.MaxGuestsNumber, { message: '$property must be an integer value no more than $constraint1' })
  public guestsNuber?: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(ValidateConstants.MinRentPrice, { message: 'Minimum price is 100' })
  @Max(ValidateConstants.MaxRentPrice, { message: 'Maximum price is 100000' })
  public rentPrice?: number;

  @IsArray({ message: '$property must be an array' })
  @IsEnum(Amenities, { message: '$property should be a value from AmenitiesEnum', each: true })
  public amenities?: string[];

  @IsInt({ message: '$property must be an integer' })
  public commentsCount?: number;

  @Validate(ValidateCityCoords)
  public coordinates?: Coordinates;
}
