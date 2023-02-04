import crypto from 'crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { Offer } from '../types/offer.type.js';
import * as jose from 'jose';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';

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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algoritm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
