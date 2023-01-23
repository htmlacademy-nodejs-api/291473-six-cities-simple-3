import crypto from 'crypto';

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
    coordinates] = tokens;
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
    }
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
