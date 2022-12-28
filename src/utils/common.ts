import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, createdDate, city, previewImage, detailImages, premium, rating, housingType, roomsNumber] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    previewImage,
    detailImages,
    premium,
    rating,
    housingType,
    roomsNumber
  } as unknown as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
