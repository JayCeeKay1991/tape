import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type userType = InferSchemaType<typeof User>;

// defining data structure
const User = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: String,
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: false,
    },
  ],
  mixTapes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MixTape",
    },
  ],
});

const UserModel = mongoose.model("User", User);

export default UserModel;
