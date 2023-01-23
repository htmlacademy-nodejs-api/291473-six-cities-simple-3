import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, generateRandomItem, getRandomItem, getRandomItems, getRandomOverallRating } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { CITIES_COORDINATES } from '../../types/city.enum.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const RATING_COUNT = [1, 10];
const NUM_AFTER_DIGIT_RATING_COUNT = 0;
const RATING_NUMBER = [1, 5];
const NUM_AFTER_DIGIT_RATING = 1;
const PREMIUM_TYPE = ['true', 'false'];
const ROOMS_NUMBER = [1, 8];
const GUESTS_NUMBER = [1, 10];
const RENT_PRICE_NUMBER = [100, 100000];
const PASSWORD_CHARACTERS = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
const PASSWORD_LENGTH = [6, 12];
const USER_TYPE = ['Regular', 'Pro'];
const COMMENTS_NUMBER = [0, 20];

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImagePath = getRandomItem<string>(this.mockData.previewImagePaths);
    const detailImagePath = getRandomItems<string>(this.mockData.detailImagePaths).join(';');
    const premium = getRandomItem<string>(PREMIUM_TYPE);
    const ratingCount = generateRandomValue(RATING_COUNT[0], RATING_COUNT[1], NUM_AFTER_DIGIT_RATING_COUNT);
    const overallRating = getRandomOverallRating(ratingCount, RATING_NUMBER[0], RATING_NUMBER[1], NUM_AFTER_DIGIT_RATING);
    const averageRating = overallRating / ratingCount;
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(ROOMS_NUMBER[0], ROOMS_NUMBER[1]);
    const guestsNuber = generateRandomValue(GUESTS_NUMBER[0], GUESTS_NUMBER[1]);
    const rentPrice = generateRandomValue(RENT_PRICE_NUMBER[0], RENT_PRICE_NUMBER[1]);
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatarPaths);
    const password = generateRandomItem(PASSWORD_LENGTH[0], PASSWORD_LENGTH[1], PASSWORD_CHARACTERS);
    const type = getRandomItem<string>(USER_TYPE);
    const commentsCount = generateRandomValue(COMMENTS_NUMBER[0], COMMENTS_NUMBER[1]);
    const coordinates = `${CITIES_COORDINATES[city].latitude};${CITIES_COORDINATES[city].longitude}`;

    return [
      title,
      description,
      createdDate,
      city,
      previewImagePath,
      detailImagePath,
      premium,
      ratingCount,
      overallRating,
      averageRating,
      housingType,
      roomsNumber,
      guestsNuber,
      rentPrice,
      amenities,
      name,
      email,
      avatarPath,
      password,
      type,
      commentsCount,
      coordinates
    ].join('\t');
  }
}
