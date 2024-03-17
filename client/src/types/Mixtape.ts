import { User } from './User';
import { Channel } from './Channel';

export type Mixtape = {
  _id: string;
  name: string;
  url: string;
  channels: Channel[];
  creator: User;
};