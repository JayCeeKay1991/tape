import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type channelType = InferSchemaType<typeof Comments>;

// defining data structure
const Comments = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: { type: String, required: true },
  date: { type: Date, required: true },
});

const CommentsModel = mongoose.model("Comments", Comments);

export default CommentsModel;
