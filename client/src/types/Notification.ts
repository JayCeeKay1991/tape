import { ChannelType } from "./Channel";
import { User } from "./User";


export type NotificationType = {
  _id: string;
  ownerChannel: ChannelType;
  message: string;
  unNotifiedUsers: User[];
  change: string;
  date: Date;
};


export interface displayNotification {
  channelName: string,
  notifications: NotificationType[]
}

