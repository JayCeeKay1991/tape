import { InferSchemaType, Schema, model } from "mongoose";

export type userType = InferSchemaType<typeof User>;

// defining data structure
const User = new Schema({
  userName: String,
  email: String,
  password: String,
  profilePic: String,
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: false,
    },
  ],
  mixTapes: [
    {
      type: Schema.Types.ObjectId,
      ref: "mixTapes",
    },
  ],
});

const UserModel = model("users", User);

export default UserModel;
