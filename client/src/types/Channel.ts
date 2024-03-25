import { User } from './User';
import { MixTape } from './MixtapeTemp';
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