import { Expose } from 'class-transformer';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

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

  @Expose()
  public userId!: string;
}
