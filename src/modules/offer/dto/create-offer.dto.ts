import { Coordinates } from '../../../types/coordinates.type.js';
import { housingType } from '../../../types/housing-type.enum.js';
import { City } from '../../../types/city.enum.js';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { Amenities } from '../../../types/amenities.enum.js';

export default class CreateOfferDto {
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsEnum(City, { message: '$property should be a value from CityEnum' })
  public city!: string;

  @MaxLength(256, { message: 'Too short for field «image»' })
  public previewImagePath!: string;

  @IsArray({ message: 'Field detailImagePath must be an array' })
  @ArrayMinSize(6, { message: '$property must contain exactly $constraint1 items' })
  @ArrayMaxSize(6, { message: '$property must contain exactly $constraint1 items' })
  @IsString({ message: '$property must be a string', each: true })
  public detailImagePath!: string[];

  @IsBoolean({ message: '$property must be a boolean' })
  public premium!: boolean;

  @IsInt({ message: '$property must be an integer' })
  public ratingCount!: number;

  @IsInt({ message: '$property must be an integer' })
  public overallRating!: number;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'Only 1 digit precision to the right of decimal point is allowed' })
  @Min(1, { message: '$property must be a numerical value no less than $constraint1' })
  @Max(5, { message: '$property must be a numerical value no more than $constraint1' })
  public averageRating!: number;

  @IsEnum(housingType, { message: '$property should be a value from housingTypeEnum' })
  public housingType!: housingType;

  @IsInt({ message: '$property must be an integer' })
  @Min(1, { message: '$property must be an integer value no less than $constraint1' })
  @Max(8, { message: '$property must be an integer value no more than $constraint1' })
  public roomsNumber!: number;

  @IsInt({ message: '$property must be an integer' })
  @Min(1, { message: '$property must be an integer value no less than $constraint1' })
  @Max(10, { message: '$property must be an integer value no more than $constraint1' })
  public guestsNuber!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public rentPrice!: number;

  @IsArray({ message: '$property must be an array' })
  @IsEnum(Amenities, { message: '$property should be a value from AmenitiesEnum', each: true })
  public amenities!: string[];

  @IsInt({ message: '$property must be an integer' })
  public commentsCount!: number;

  public coordinates!: Coordinates;

  @IsMongoId({ message: '$property field must contain a valid id' })
  public userId!: string;
}


// import { Coordinates } from '../../../types/coordinates.type.js';
// import { housingType } from '../../../types/housing-type.enum.js';
// import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

// export default class CreateOfferDto {
//   public title!: string;
//   public description!: string;
//   public postDate!: Date;
//   public city!: string;
//   public previewImagePath!: string;
//   public detailImagePath!: string[];
//   public premium!: boolean;
//   public ratingCount!: number;
//   public overallRating!: number;
//   public averageRating!: number;
//   public housingType!: housingType;
//   public roomsNumber!: number;
//   public guestsNuber!: number;
//   public rentPrice!: number;
//   public amenities!: string[];
//   public commentsCount!: number;
//   public coordinates!: Coordinates;
//   public userId!: string;
// }
