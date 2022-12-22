import { readFileSync } from 'fs';
// import { City } from '../../types/city.type.js';
// import { HousingType } from '../../types/housing-type.enum.js';
// import { AmenitiesType } from '../../types/amenities-type.enum.js';
// import { User } from '../../types/user.type.js';
// import { OfferCoordinates } from '../../types/offer-coordinates.type.js';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
    private rawData = '';

    constructor(public filename: string) { }

    public read(): void {
        this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
    }

    public toArray(): Offer[] {
        if (!this.rawData) {
            return [];
        }

        return this.rawData
            .split('\n')
            .filter((row) => row.trim() !== '')
            .map((line) => line.split('\t'))
            .map(([name, description, postDate, city, previewImagePath, detailImagePath, offerPremium, rating, HousingType, roomsNumber, guestsNuber, rentPrice, amenities, user, commentsCount, coordinates]) => ({
                name,
                description,
                postDate: new Date(postDate),
                city: city,
                previewImagePath,
                detailImagePath,
                offerPremium,

                // city,
                // previewImagePath,
                // detailImagePath,
                // title,
                // description,
                // postDate: new Date(createdDate),
                // image,
                // type: OfferType[type as 'Buy' | 'Sell'],
                // categories: categories.split(';')
                //     .map((name) => ({ name })),
                // price: Number.parseInt(price, 10),
                // user: { email, firstname, lastname, avatarPath },
            }));
    }
}

// name: string,
// description: string;
// postDate: Date;
// city: City;
// previewImagePath: string;
// detailImagePath: string;
// offerPremium: OfferPremium;
// rating: number;
// HousingType: HousingType;
// roomsNumber: number;
// guestsNuber: number;
// rentPrice: number;
// amenities: AmenitiesType[];
// user: User;
// commentsCount: number;
// coordinates: OfferCoordinates;

