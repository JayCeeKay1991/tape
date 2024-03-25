import NotificationModel from "../../models/notifications";
import { NotificationType } from "../../models/notifications";
import { Request, Response } from "express";
import ChannelModel, { ChannelType } from "../../models/channel";

export async function createNotification(req: Request, res: Response) {
  try {
    let savedNotification; // Declare savedNotification at a higher scope

    if (req.body) {
      const newNotification = new NotificationModel<NotificationType>(req.body);
      savedNotification = await newNotification.save(); // Assign the saved value to the higher scoped variable
    }

    if (!savedNotification) {
      return res.status(400).json({ error: "Notification was not created." });
    }

    // update affected users
    const updatedChannel = await ChannelModel.updateOne(
      { _id: savedNotification.ownerChannel },
      { $push: { notifications: savedNotification } }
    );

    res.status(201).json(updatedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create channel." });
  }
}
