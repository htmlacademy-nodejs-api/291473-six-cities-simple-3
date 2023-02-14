import { IsString, Length, MaxLength, Validate } from 'class-validator';
import { ValidateImgFormat } from '../../../common/middlewares/validate-img.middleware';
import { ValidateConstants } from '../../../utils/validate.constants.js';

export default class UpdateUserDto {
  @MaxLength(ValidateConstants.maxLengthImage, { message: 'Too short for field «image»' })
  @Validate(ValidateImgFormat)
  public avatarPath?: string;

  @IsString({ message: 'firstname is required' })
  @Length(ValidateConstants.minNameLength, ValidateConstants.maxNameLength, { message: 'Min length is 1, max is 15' })
  public name?: string;
}
