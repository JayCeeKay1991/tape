import { Channel } from "./Channel";
import { Mixtape } from "./Mixtape";

export type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  channels: Channel[];
  mixtapes: Mixtape[];
};