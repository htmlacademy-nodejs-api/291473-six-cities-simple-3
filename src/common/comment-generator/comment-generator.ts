import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomOverallRating } from '../../utils/random.js';
import { CommentGeneratorInterface } from './comment-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const RATING_COUNT = [1, 10];
const NUM_AFTER_DIGIT_RATING_COUNT = 0;
const RATING_NUMBER = [1, 5];
const NUM_AFTER_DIGIT_RATING = 1;
const COMMENT_USER_ID = [1, 10];

export default class CommentGenerator implements CommentGeneratorInterface {
  constructor(private readonly mockData: MockData) { }

  public generate(): string {
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const ratingCount = generateRandomValue(RATING_COUNT[0], RATING_COUNT[1], NUM_AFTER_DIGIT_RATING_COUNT);
    const overallRating = getRandomOverallRating(ratingCount, RATING_NUMBER[0], RATING_NUMBER[1], NUM_AFTER_DIGIT_RATING);
    const averageRating = overallRating / ratingCount;

    // Сгенерировать пользователей;
    // Найти созданных пользователей, взять из них ID - использовать эти ID  в предложениях и комментариях.
    const commentUserId = generateRandomValue(COMMENT_USER_ID[0], COMMENT_USER_ID[1]);
    return [
      description,
      createdDate,
      ratingCount,
      overallRating,
      averageRating,
      commentUserId
    ].join('\t');
  }
}
