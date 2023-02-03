import { IsEmail, IsEnum, IsString, Length, MaxLength, Validate } from 'class-validator';
import { ValidateImgFormat } from '../../../common/middlewares/validate-img.middleware.js';
import { userType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name!: string;

  @MaxLength(256, { message: 'Too short for field «image»' })
  @IsString({ message: '$property must be a valid string' })
  @Validate(ValidateImgFormat)
  public avatarPath!: string;

  @IsEnum(userType, { message: '$property should be a value from userTypeEnum' })
  public type!: string;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password!: string;
}
