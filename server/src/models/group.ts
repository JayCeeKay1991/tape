import { InferSchemaType, Schema, model } from "mongoose";

export type groupType = InferSchemaType<typeof Group>;

// defining data structure
const Group = new Schema({
  name: String,
  picture: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  mixTapes: [
    {
      type: Schema.Types.ObjectId,
      ref: "mixTapes",
    },
  ],
});

const GroupModel = model("groups", Group);

export default GroupModel;
