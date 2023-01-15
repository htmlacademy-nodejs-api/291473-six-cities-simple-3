import { User } from '../../types/user.type.js';

export class UserEntity implements User {
  public email!: string;
  public name!: string;
  public avatarPath!: string;
  public type!: string;
}