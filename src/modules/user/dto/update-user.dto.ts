import { IsString, Length, MaxLength, Validate } from 'class-validator';
import { ValidateImgFormat } from '../../../common/middlewares/validate-img.middleware';

export default class UpdateUserDto {
  @MaxLength(256, { message: 'Too short for field «image»' })
  @Validate(ValidateImgFormat)
  public avatarPath?: string;

  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name?: string;
}
