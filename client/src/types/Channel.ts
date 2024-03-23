import { User } from './User';
import { MixTape } from './Mixtape';
import { CommentsType } from './Comments';

export type ChannelType = {
  _id: string;
  name: string;
  picture: string;
  owner: User;
  members: User[];
  mixTapes: MixTape[];
  comments: CommentsType[];
};