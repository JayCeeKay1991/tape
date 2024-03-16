import { Channel } from "./Channel";
import { Mixtape } from "./Mixtape";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilepic: string;
  channels: Channel[];
  mixtapes: Mixtape[];
};