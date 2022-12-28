import { User } from './user.type.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
    title: string,
    description: string;
    postDate: Date;
    city: string;
    previewImagePath: string;
    detailImagePath: string[];
    premium: boolean;
    rating: string;
    housingType: string;
    roomsNumber: number;
    guestsNuber: number;
    rentPrice: number;
    amenities: string[];
    user: User;
    commentsCount: number;
    coordinates: Coordinates;
}
