import crypto from 'crypto';
import { Comment } from '../types/comment.type.js';
import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
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
    coordinates,
    commentDescription,
    commentCreatedDate,
    commentRatingCount,
    commentOverallRating,
    commentAverageRating] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    previewImagePath,
    detailImagePath: detailImagePath.split(';'),
    premium: premium === 'true',
    ratingCount: Number(ratingCount),
    overallRating: Number(overallRating),
    averageRating: Number(averageRating),
    housingType,
    roomsNumber: Number(roomsNumber),
    guestsNuber: Number(guestsNuber),
    rentPrice: Number(rentPrice),
    amenities: amenities.split(';'),
    user: {
      name,
      email,
      avatarPath,
      password,
      type
    },
    commentsCount: Number(commentsCount),
    coordinates: {
      latitude: coordinates.split(';')[0],
      longitude: coordinates.split(';')[1]
    },
    commentDescription,
    commentCreatedDate: new Date(commentCreatedDate),
    commentRatingCount: Number(commentRatingCount),
    commentOverallRating: Number(commentOverallRating),
    commentAverageRating: Number(commentAverageRating),
  } as Offer;
};

export const createComment = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    description,
    postDate,
    ratingCount,
    overallRating,
    averageRating,] = tokens;
  return {
    description,
    postDate: new Date(postDate),
    ratingCount: Number(ratingCount),
    overallRating: Number(overallRating),
    averageRating: Number(averageRating),
  } as Comment;
};

// export const createComment = () => {
//   const FIRST_WEEK_DAY = 1;
//   const LAST_WEEK_DAY = 7;
//   const RATING_COUNT = [1, 10];
//   const NUM_AFTER_DIGIT_RATING_COUNT = 0;
//   const RATING_NUMBER = [1, 5];
//   const NUM_AFTER_DIGIT_RATING = 1;
//   // constructor(private readonly mockData: MockData) { }

//   const commentDescription = 'test test test test test test test test test';
//   const commentCreatedDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
//   const commentRatingCount = generateRandomValue(RATING_COUNT[0], RATING_COUNT[1], NUM_AFTER_DIGIT_RATING_COUNT);
//   const commentOverallRating = getRandomOverallRating(commentRatingCount, RATING_NUMBER[0], RATING_NUMBER[1], NUM_AFTER_DIGIT_RATING);
//   const commentAverageRating = commentOverallRating / commentRatingCount;

//   return {
//     'commentDescription': commentDescription,
//     'commentCreatedDate': new Date(commentCreatedDate),
//     'commentRatingCount': commentRatingCount,
//     'commentAverageRating': commentAverageRating,
//   };
// };

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const getNewRating = (overallRating: number, ratingCount: number, newRating: number) => {
  const newOverallRating = overallRating + newRating;
  const newRatingCount = ratingCount + 1;
  const newAverageRating = newOverallRating / newRatingCount;
  return {
    'newOverallRating': newOverallRating,
    'newAverageRating': newAverageRating,
    'newRatingCount': newRatingCount,
  };
};
