import { Coordinates } from '../../../types/coordinates.type.js';
import { housingType } from '../../../types/housing-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateOfferDto {
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  public city!: string;
  public previewImagePath!: string;
  public detailImagePath!: string[];
  public premium!: boolean;
  public ratingCount!: number;
  public overallRating!: number;
  public averageRating!: number;
  public housingType!: housingType;
  public roomsNumber!: number;
  public guestsNuber!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public rentPrice!: number;

  public amenities!: string[];
  public commentsCount!: number;
  public coordinates!: Coordinates;
  public userId!: string;
}
