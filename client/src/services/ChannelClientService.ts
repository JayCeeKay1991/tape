import { apiClient } from "./ApiClient";
import { Channel } from "../types/Channel";

// Get channels for the logged in user GET
export const getChannelsByUser = async (userId:string) => {
  return await apiClient<Channel[]>(`channels/${userId}`, 'GET');
}

// Create new channel
export const createChannel = async (body:Omit<Channel, '_id'>) => {
  return await apiClient<Channel>('channels', 'POST', body);
}

// Edit channel
export const editChannel = async ( channelId: string, body:Channel ) => {
  return await apiClient<Channel>(`channels/${channelId}`, 'PUT', body);
}

// Add user to channel
export const addUserToChannel = async (channelId: string, body ) => {
  return await apiClient<Channel>(`channels/addUser/${channelId}, 'POST`, body)
}
