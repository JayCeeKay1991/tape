import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "./index";

export type userType = InferSchemaType<typeof Item>;

// defining data structure
const User = new Schema({
  userName: String,
  email: String,
  password: String,
  profilePic: File, // to check this
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
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

const UserModel = model("items", User);

export default UserModel;

//65ef050866b63835a2cc903d
