import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type mixTapeType = InferSchemaType<typeof MixTape>;

// defining data structure
const MixTape = new mongoose.Schema({
  name: String,
  url: String,
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const MixTapeModel = mongoose.model("MixTape", MixTape);

export default MixTapeModel;
