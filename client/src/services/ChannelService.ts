import { apiClient } from "./ApiClient";
import { Channel } from "../types/Channel";

// Get channels for the logged in user GET
export const getChannelsByUser = async (userId:string) => {
  return await apiClient<Channel[]>(`channels/${userId}`, 'GET');
}

// Create new channel
export const createChannel = async (body:Omit<Channel, '_id'>) => {
  return await apiClient<Channel[]>('channels', 'POST', body);
}
