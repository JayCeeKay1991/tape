import { Request, Response } from "express";
import ChannelModel from "../../models/channel";

export const createChannel = async (req: Request, res: Response) => {
  try {
    const {name, picture, owner } = req.body
    const newChannel = new ChannelModel({
      name: name,
      picture: picture,
      owner: owner
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