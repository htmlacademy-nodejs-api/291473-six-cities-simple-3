import { Coordinates } from '../../../types/coordinates.type.js';
import { housingType } from '../../../types/housing-type.enum.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: string;
  public previewImagePath?: string;
  public detailImagePath?: string[];
  public premium?: boolean;
  public ratingCount?: number;
  public overallRating?: number;
  public averageRating?: number;
  public housingType?: housingType;
  public roomsNumber?: number;
  public guestsNuber?: number;
  public rentPrice?: number;
  public amenities?: string[];
  public commentsCount?: number;
  public coordinates?: Coordinates;
}
