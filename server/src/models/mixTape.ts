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
      ref: "channels",
    },
  ],
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const MixTapeModel = mongoose.model("mixTapes", MixTape);

export default MixTapeModel;
