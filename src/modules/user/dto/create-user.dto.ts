import { IsEmail, IsEnum, IsString, Length, MaxLength } from 'class-validator';
import { userType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name!: string;

  @MaxLength(256, { message: 'Too short for field «image»' })
  // Нужно проверка формата файла (по ТЗ файл может быть в формате jpg или png); >>>>>>>>>>>>>>> Добавить валидатор
  public avatarPath!: string;

  @IsEnum(userType, { message: '$property should be a value from userTypeEnum' })
  public type!: userType;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password!: string;
}
