import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type notificationType = InferSchemaType<typeof Notifications>;

// defining data structure
const Notifications = new mongoose.Schema({
  message: { type: String, required: true },
  channelName: { type: String, required: true },
  unNotifiiedUsers: { type: [String], required: true },
  date: { type: Date, required: true },
});

const NotificationModel = mongoose.model("Notifications", Notifications);

export default NotificationModel;
