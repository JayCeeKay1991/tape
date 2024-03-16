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
      ref: "channels",
      required: false,
    },
  ],
  mixTapes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixTapes",
    },
  ],
});

const UserModel = mongoose.model("users", User);

export default UserModel;
