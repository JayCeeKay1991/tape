import { User } from './User';
import { Mixtape } from './Mixtape';

export type Channel = {
  _id: string;
  name: string;
  picture: string;
  owner: User;
  members: User[];
  mixtapes: Mixtape[];
};