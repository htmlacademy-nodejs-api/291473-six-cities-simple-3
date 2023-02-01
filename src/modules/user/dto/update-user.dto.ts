import { IsString, Length, MaxLength } from 'class-validator';

export default class UpdateUserDto {
  @MaxLength(256, { message: 'Too short for field «image»' })
  public avatarPath?: string;

  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name?: string;
}
