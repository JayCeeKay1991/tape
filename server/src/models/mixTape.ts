import { Document, Types } from 'mongoose';
import mongoose from '.';

type MixTapeDocument = Document<unknown, {}, MixTapeType> & MixTapeType;

export type MixTapeType = {
  name: string;
  url: string;
  duration: number;
  channel: Types.ObjectId;
  creator: Types.ObjectId;
};

// defining data structure
const MixTape = new mongoose.Schema<MixTapeType>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number, required: true },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// updating the channel and user models whenever a mixtape has been post
async function updateChannelAndUser(doc: MixTapeDocument) {
  const channelUpdate = await mongoose
    .model('Channel')
    .updateOne({ _id: doc.channel }, { $push: { mixTapes: doc } });

  const userUpdate = await mongoose
    .model('User')
    .updateOne({ _id: doc.creator }, { $push: { mixTapes: doc } });
}

MixTape.post('save', updateChannelAndUser);

const MixTapeModel = mongoose.model('MixTape', MixTape);

export default MixTapeModel;
