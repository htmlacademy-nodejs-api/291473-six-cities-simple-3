import { User } from './user.type.js';

export type Comment = {
  description: string;
  postDate: Date;
  rating: number;
  user: User;
}
