import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type NotificationType = InferSchemaType<typeof Notifications>;

// defining data structure
const Notifications = new mongoose.Schema({
  ownerChannel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Channel",
  },
  message: { type: String, required: true },
  change: { type: String, required: true },
  unNotifiiedUsers: { type: [String], required: true },
  date: { type: Date, required: true },
});

const NotificationModel = mongoose.model("Notifications", Notifications);

export default NotificationModel;
