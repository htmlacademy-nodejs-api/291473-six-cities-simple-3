import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
// import { OfferType } from '../../types/offer-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

// const MIN_PRICE = 500;
// const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;
const NUM_AFTER_DIGIT_RATING = 1;

const ROOMS_NUMBER = [1, 8];
// const GUESTS_NUMBER = [1, 10];

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const detailImages = getRandomItems<string>(this.mockData.detailImages).join(';');
    const premium = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT_RATING);
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(ROOMS_NUMBER[0], ROOMS_NUMBER[1]);

    // +rating,
    // housingType,
    // roomsNumber: Number.parseInt(roomsNumber, 10),
    //  guestsNuber: Number.parseInt(guestsNuber, 10),
    //  rentPrice: Number.parseInt(rentPrice, 10),
    //  amenities: amenities.split(';'),
    //  user: { name, email, avatarPath, password, type },
    //  commentsCount: Number.parseInt(commentsCount, 10),
    //  coordinates: {
    //    latitude: coordinates.split(';')[0],
    //    longitude: coordinates.split(';')[1]
    //  }


    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);


    // titles: string[];
    // descriptions: string[];
    // cities: string[];
    // previewImages: string[];
    // detailImages: string[];
    // users: string[];
    // emails: string[];
    // avatars: string[];

    // const categories = getRandomItems<string>(this.mockData.categories).join(';');
    // const title = getRandomItem<string>(this.mockData.titles);
    // const description = getRandomItem<string>(this.mockData.descriptions);
    // const photo = getRandomItem<string>(this.mockData.offerImages);
    // const type = getRandomItem([OfferType.Buy, OfferType.Sell]);
    // const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    // const author = getRandomItem<string>(this.mockData.users);
    // const email = getRandomItem<string>(this.mockData.emails);
    // const avatar = getRandomItem<string>(this.mockData.avatars);
    // const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    // const [firstname, lastname] = author.split(' ');

    return [
      title, description, createdDate, city, previewImage, detailImages, premium, rating, housingType, roomsNumber
      // , , , , user, email, avatar, createdDate,
      // description, createdDate,
      // photo, type, price, categories,
      // firstname, lastname, email, avatar,
    ].join('\t');
  }
}
