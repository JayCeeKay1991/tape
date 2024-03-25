import { Document, Types } from "mongoose";
import mongoose from ".";
import NotificationModel from "./notifications";
import { ChannelType } from "./channel";
import ChannelModel from "./channel";
type MixTapeDocument = Document<unknown, {}, MixTapeType> & MixTapeType;

export type MixTapeType = {
  name: string;
  url: string;
  duration: number;
  channel: ChannelType;
  creator: Types.ObjectId;
};

// Defining data structure
const MixTape = new mongoose.Schema<MixTapeType>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number, required: true },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Updating the channel and user models whenever a mixtape has been posted
async function updateChannelAndUser(doc: MixTapeDocument) {
  const channelDoc = await ChannelModel.findById(doc.channel);
  if (!channelDoc) {
    throw new Error("Channel not found");
  }
  // Push the mixtape to the channel's mixTapes array
  await mongoose
    .model("Channel")
    .updateOne({ _id: doc.channel }, { $push: { mixTapes: doc._id } });

  // Create a notification for the new mixtape
  const newNotification = await NotificationModel.create({
    message: `A new mixtape "${doc.name}" was added.`,
    change: channelDoc.name,
    unNotifiiedUsers: channelDoc.members,
    date: new Date(),
  });
  const updatedChannel = await ChannelModel.findByIdAndUpdate(
    channelDoc._id,
    { $push: { notifications: newNotification._id } },
    { new: true }
  ).populate("notifications");
}

MixTape.post("save", updateChannelAndUser);

const MixTapeModel = mongoose.model("MixTape", MixTape);

export default MixTapeModel;
