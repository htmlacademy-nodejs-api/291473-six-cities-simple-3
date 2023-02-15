import { User } from './user.type.js';
import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing-type.enum.js';

export type Offer = {
  title: string,
  description: string;
  postDate: Date;
  city: string;
  previewImagePath: string;
  detailImagePath: string[];
  premium: boolean;
  ratingCount: number;
  overallRating: number;
  averageRating: number;
  housingType: HousingType;
  roomsNumber: number;
  guestsNuber: number;
  rentPrice: number;
  amenities: string[];
  commentsCount: number;
  coordinates: Coordinates;
  user: User;
}
