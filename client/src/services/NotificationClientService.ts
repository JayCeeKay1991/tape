import { apiClient } from "./ApiClient";
import { NotificationType } from "@/types/Notification";

export const deleteNotification = async (
  body: NotificationType,
  userId: string
) => {
  try {
    return await apiClient<NotificationType>(
      `notifications/${userId}`,
      "PUT",
      body
    );
  } catch (error) {
    console.error(error);
  }
};
