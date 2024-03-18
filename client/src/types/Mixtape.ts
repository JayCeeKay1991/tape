import { User } from './User';
import { Channel } from './Channel';

export type MixTape = {
  _id: string;
  name: string;
  url: string;
  channels: Channel[];
  creator: User;
};