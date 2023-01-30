import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public postDate!: string;

  @Expose()
  public ratingCount!: number;

  @Expose()
  public overallRating!: number;

  @Expose()
  public averageRating!: number;

  // @Expose()
  // public offerId!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
