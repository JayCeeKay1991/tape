import { User } from './User';
import { ChannelType } from './Channel';

export type MixTape = {
  _id: string;
  name: string;
  url: string;
  channel: ChannelType;
  creator: User;
};
