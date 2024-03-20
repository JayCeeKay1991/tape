import { User } from './User';

export type CommentsType = {
  owner: User;
  message: string;
  date: Date;
};