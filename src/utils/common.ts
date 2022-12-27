import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, city, previewImage, detailImages, user, email, avatar, createdDate] = tokens;
  return {
    title,
    description,
    city,
    previewImage,
    detailImages,
    user: { user, email, avatar },
    postDate: new Date(createdDate),
  } as unknown as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
