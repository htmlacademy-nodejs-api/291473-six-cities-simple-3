import { User } from './user.type.js';

export type Comment = {
  description: string;
  postDate: Date;
  ratingCount: number;
  overallRating: number;
  averageRating: number;
  user: User;
}
