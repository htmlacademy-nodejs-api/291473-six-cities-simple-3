import { Coordinates } from '../../../types/coordinates.type.js';
import { housingType } from '../../../types/housing-type.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: string;
  public previewImagePath!: string;
  public detailImagePath!: string[];
  public premium!: boolean;
  public rating!: number;
  public housingType!: housingType;
  public roomsNumber!: number;
  public guestsNuber!: number;
  public rentPrice!: number;
  public amenities!: string[];
  public commentsCount!: number;
  public coordinates!: Coordinates;
  public userId!: string;
}