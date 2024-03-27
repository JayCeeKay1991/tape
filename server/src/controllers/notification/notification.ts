import NotificationModel from "../../models/notifications";
import { Request, Response } from "express";

export async function updateNotification(req: Request, res: Response) {
  try {
    const userId = req.params.userId; // Changed from req.params.id
    const { unNotifiedUsers, _id: notificationId } = req.body;
    if (!unNotifiedUsers) {
      return res.status(400).json({
        error: "400",
        message: "Bad request: unNotifiedUsers is required.",
      });
    }

    if (unNotifiedUsers.length === 1) {
      deleteNotification(notificationId);
      return res.status(200).json({
        message: "Successfully deleted notification.",
      });
    } else if (unNotifiedUsers.length > 1) {
      const UpdatedUnNotifiedUsersArray = unNotifiedUsers.filter(
        (user: string) => user.toString() !== userId
      );
      const updatedNotification = await NotificationModel.findOneAndUpdate(
        { _id: notificationId }, // Ensure this is the correct ID for the notification
        { $set: { unNotifiedUsers: UpdatedUnNotifiedUsersArray } },
        { new: true }
      );
      res.status(201).json(updatedNotification);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An unexpected error occurred while editing the notification. Please try again later.",
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
