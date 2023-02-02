import { IsDateString, IsInt, IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsInt({ message: '$property must be an integer' })
  public ratingCount!: number;

  @IsInt({ message: '$property must be an integer' })
  public overallRating!: number;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'Only 1 digit precision to the right of decimal point is allowed' })
  @Min(1, { message: '$property must be a numerical value no less than $constraint1' })
  @Max(5, { message: '$property must be a numerical value no more than $constraint1' })
  public averageRating!: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}
