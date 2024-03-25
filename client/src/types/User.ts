import { ChannelType } from "./Channel";
import { MixTape } from "./MixtapeTemp";

export type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  channels: ChannelType[];
  mixTapes: MixTape[];
};
