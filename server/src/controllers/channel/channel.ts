import { Request, Response } from "express";
import ChannelModel from "../../models/channel";
import UserModel from "../../models/user";
import { ServerStreamFileResponseOptionsWithError } from "http2";


export const createChannel = async (req: Request, res: Response) => {
  try {
    const { name, picture, owner, members, mixTapes } = req.body;
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
      { _id: ownerId },
      { $push: { channels: savedChannel._id } },
      { new: true }
    ).orFail(new Error('User not found in db'));;

    res.send(savedChannel);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Could not create channel." });
  }
}

export const addUserToChannel = async (req: Request, res: Response) => {
  try {
    const channelId = req.params.channelId
    const userId = req.body.userId;

    if (!userId) {
      res.status(400).json('UserId required')
    }

    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      res.status(400).json('Channel not found')
    }

    else {
      if (channel.members.includes(userId)) {
        res.status(400).json('User is already a member of this channel')
      }

      // user not already a member, add and save
      channel.members.push(userId);
      await channel.save();
      const updatedChannel = await ChannelModel.findById(channelId).populate('members');
      res.status(201).json(updatedChannel);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json(`Error adding user to channel`);
  }
}