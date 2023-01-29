import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
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

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message,
});