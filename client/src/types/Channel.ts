import { User } from './User';
import { MixTape } from './MixTape';

export type Channel = {
  _id: string;
  name: string;
  picture: string;
  owner: User;
  members: User[];
  mixTapes: MixTape[];
};