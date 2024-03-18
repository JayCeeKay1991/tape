import { Request, Response } from "express";
import MixTapeModel from "../../models/mixTape";
import ChannelModel from "../../models/channel";


export const createMixTape = async (req: Request, res: Response) => {
  try {
    console.log('💚', req.body);
    const {name, url, channels, creator, parentChannel } = req.body;
    const creatorId = creator._id.toString();
    const parentChannelId = parentChannel._id.toString();
    const newMixTape = new MixTapeModel({
      name: name,
      url: url,
      creator: creatorId,
      channels: channels || []
    });
    const savedMixTape = await newMixTape.save();

    // update the channel
    const channel = await ChannelModel.findOneAndUpdate(
      {_id: parentChannelId},
      {$push: {mixTapes: savedMixTape._id}},
      {new: true}
    ).orFail(new Error('Channel not found in db'));;

    res.send(savedMixTape);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Could not create mixtape." });
  }
}