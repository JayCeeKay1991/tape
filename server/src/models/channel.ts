import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type channelType = InferSchemaType<typeof Channel>;

// defining data structure
const Channel = new mongoose.Schema({
  name: String,
  picture: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  mixTapes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixTapes",
    },
  ],
});

const ChannelModel = mongoose.model("channels", Channel);

export default ChannelModel;
