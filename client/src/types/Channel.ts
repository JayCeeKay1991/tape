import { User } from './User';
import { MixTape } from './Mixtape';

export type ChannelType = {
  _id: string;
  name: string;
  picture: string;
  owner: User;
  members: User[];
  mixTapes: MixTape[];
};