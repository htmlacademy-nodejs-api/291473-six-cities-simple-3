import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
// import { OfferType } from '../../types/offer-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

// const MIN_PRICE = 500;
// const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const detailImages = getRandomItems<string>(this.mockData.detailImages).join(';');
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);

    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();


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
      title, description, city, previewImage, detailImages, user, email, avatar, createdDate,
      // description, createdDate,
      // photo, type, price, categories,
      // firstname, lastname, email, avatar,
    ].join('\t');
  }
}
