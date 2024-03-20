import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type channelType = InferSchemaType<typeof Channel>;

// defining data structure
const Channel = new mongoose.Schema({
  name: { type: String, required: true },
  picture: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  mixTapes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MixTape",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const ChannelModel = mongoose.model("Channel", Channel);

export default ChannelModel;
