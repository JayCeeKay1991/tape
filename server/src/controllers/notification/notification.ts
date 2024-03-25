import NotificationModel from "../../models/notifications";
import { NotificationType } from "../../models/notifications";
import { Request, Response } from "express";
import ChannelModel, { ChannelType } from "../../models/channel";
import user from "../user/user";

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

export async function updateNotification(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { unNotifiedUsers, _id } = req.body;
    if (!unNotifiedUsers) {
      return res.status(400).json({
        error: "400",
        message: "Bad request: unNotifiedUsers is required.",
      });
    }

    if (unNotifiedUsers.length === 1) {
      deleteNotification(_id);
      return res.status(200).json({
        message: "Successfully deleted notification.",
      });
    } else if (unNotifiedUsers.length > 1) {
      const UpdatedUnNotifiedUsersArray = unNotifiedUsers.filter(
        (user: string) => {
          return user !== req.params.id;
        }
      );
      const updatedNotification = await NotificationModel.findOneAndUpdate(
        { _id: userId },
        { $set: { unNotifiedUsers: UpdatedUnNotifiedUsersArray } },
        { new: true }
      );
      res.status(201).json(updatedNotification);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An unexpected error occurred while editing the user. Please try again later.",
    });
  }
}

async function deleteNotification(notificationId: string) {
  try {
    const deletedNotification = await NotificationModel.findOneAndDelete({
      _id: notificationId,
    });
    return deletedNotification;
  } catch (error) {
    console.error(error);
    return error;
  }
}
