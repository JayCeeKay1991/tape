import { Request, Response } from "express";
import MixTapeModel, { MixTapeType } from "../../models/mixTape";
// import { createNotification } from "../notification/notification";
import ChannelModel from "../../models/channel";
import NotificationModel from "../../models/notifications";
import { NotificationType } from "../../models/notifications";
import { ChannelType } from "../../models/channel";
import { Types } from "mongoose";

export const createMixTape = async (req: Request, res: Response) => {
  try {
    const channel = await ChannelModel.findById(req.body.channel);
    ///////////////////////////////////////////
    if (channel) {
      await createNotification(channel, req.body.channel, req.body.creator);
    }
    ///////////////////////////////////////////
    const newMixTape = new MixTapeModel<MixTapeType>(req.body);
    const savedMixTape = await newMixTape.save();
    res.status(201).json(savedMixTape);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create mixtape." });
  }
};

export async function createNotification(
  channel: ChannelType,
  channelId: string,
  creator: Types.ObjectId
): Promise<string> {
  try {
    // Construct the notification data
    const notificationData: NotificationType = {
      message: `New mixtape uploaded in ${channel.name}`,
      ownerChannel: channel.owner,
      unNotifiedUsers: channel.members
        ? channel.members.filter(
            (memberId) => memberId._id.toString() !== creator.toString()
          )
        : [],
      date: new Date(Date.now()),
    };

    // Create a new notification instance
    const newNotification = new NotificationModel<NotificationType>(
      notificationData
    );

    // Save the notification
    const savedNotification = await newNotification.save();

    // Verify if the notification was saved successfully
    if (!savedNotification) {
      throw new Error("Notification was not created.");
    }

    // Update affected users
    const updatedChannel = await ChannelModel.updateOne(
      { _id: channelId },
      { $push: { notifications: savedNotification } }
    );

    // Return some success message or the updated channel data
    return "Notification created and channel updated successfully.";
  } catch (error) {
    console.error(error);
    throw new Error("Could not create notification.");
  }
}
