import { readFileSync } from 'fs';
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
            .map(([title, description, postDate, city, previewImagePath, detailImagePath, premium, rating, HousingType, roomsNumber, guestsNuber, rentPrice, amenities, name, email, avatarPath, password, type, commentsCount, coordinates]) => ({

                //   ,    commentsCount, coordinates,

                title,
                description,
                postDate: new Date(postDate),
                city,
                previewImagePath,
                detailImagePath: detailImagePath.split(';'),
                premium: premium === 'true',
                rating,
                HousingType,
                roomsNumber: Number(roomsNumber),
                guestsNuber: Number(guestsNuber),
                rentPrice: Number(rentPrice),
                amenities: amenities.split(';'),
                user: { name, email, avatarPath, password, type },
                commentsCount: Number(commentsCount),
                coordinates: {
                    latitude: coordinates.split(';')[0],
                    longitude: coordinates.split(';')[1]
                },

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
