import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImagePath!: string;

  @Expose()
  public detailImagePath!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public averageRating!: number;

  @Expose()
  public housingType!: string;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public guestsNuber!: number;

  @Expose()
  public rentPrice!: number;

  @Expose()
  public amenities!: string[];

  @Expose()
  public commentsCount!: number;

  @Expose()
  public coordinates!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
