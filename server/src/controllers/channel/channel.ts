import { Request, Response } from "express";
import ChannelModel from "../../models/channel";

export const createChannel = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {name, picture, owner, members, mixTapes } = req.body
    const newChannel = new ChannelModel({
      name: name,
      picture: picture || '',
      owner: owner || '',
      members: members || [],
      mixTapes: mixTapes || [],
    });
    newChannel.save();
    res.send(newChannel);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Could not create channel." });
  }
}