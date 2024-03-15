import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type groupType = InferSchemaType<typeof Group>;

// defining data structure
const Group = new mongoose.Schema({
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

const GroupModel = mongoose.model("groups", Group);

export default GroupModel;
