import { Request, Response } from "express";
import ChannelModel from "../../models/channel";
import UserModel from "../../models/user";
import CommentsModel from "../../models/comments";

export const getChannel = async (req: Request, res: Response) => {
  console.log('TRYING TO GET CHANNEL')
  const channelId = req.params.channelId;
  try {
    const channel = await ChannelModel.findById(channelId).populate({
      path: "members",
      model: "User"
    })
    .populate({
      path: "mixTapes",
      model: "MixTape"
    })
    if (!channel) {
      res.status(400).json('No channel with that id!')
    }
    res.status(200).json(channel)
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json(`Error retrieving channel`);
  }
}

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
    const channelId = req.params.channelId;
    const userId = req.params.userId;

    const newMember = await UserModel.findById(userId);

    if (!userId) {
      res.status(400).json('UserId required')
    }

    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      res.status(400).json('Channel not found')
    }

    else {
      if (channel.members.includes(newMember!._id)) {
        res.status(400).json('User is already a member of this channel')
      }

      // user not already a member, add and save
      channel.members.push(newMember!._id);
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


export const addComment = async (req: Request, res: Response) => {
  try {
    const channelId = req.params.channelId;
    const { owner, message, date } = req.body;

    const newComment = await CommentsModel.create({ owner, message, date });

    const updatedChannel = await ChannelModel.findByIdAndUpdate(
      channelId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");

    if (!updatedChannel) {
      return res.status(400).json("Channel not found");
    }

    res.status(201).json(updatedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json(`Error adding comment`);
  }
};
