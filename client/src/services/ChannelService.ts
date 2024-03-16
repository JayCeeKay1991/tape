import { apiClient } from "./ApiClient";
import { Channel } from "../types/Channel";

// Get channels for the logged in user GET
export const getChannels = async (userId:string) => {
  return await apiClient<Channel[]>(`channels/${userId}`, 'GET');
}
