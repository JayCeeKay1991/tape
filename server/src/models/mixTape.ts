import { InferSchemaType, Schema, model } from "mongoose";

export type mixTapeType = InferSchemaType<typeof MixTape>;

// defining data structure
const MixTape = new Schema({
  name: String,
  url: String,
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
  ],
  creator: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const MixTapeModel = model("mixTapes", MixTape);

export default MixTapeModel;
