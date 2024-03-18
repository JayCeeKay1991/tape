import { Request, Response } from "express";
import ChannelModel from "../../models/channel";
import UserModel from "../../models/user";


export const createChannel = async (req: Request, res: Response) => {
  try {
    const {name, picture, owner, members, mixTapes } = req.body;
    const ownerId = owner._id.toString();
    const newChannel = new ChannelModel({
      name: name,
      picture: picture || '',
      owner: ownerId || '',
      members: members || [],
      mixTapes: mixTapes || [],
    });
    const savedChannel = await newChannel.save();

    // update the user
    const user = await UserModel.findOneAndUpdate(
      {_id: ownerId},
      {$push: {channels: savedChannel._id}},
      {new: true}
    ).orFail(new Error('User not found in db'));;

    res.send(savedChannel);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Could not create channel." });
  }
}