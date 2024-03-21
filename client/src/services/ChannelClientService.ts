import { apiClient } from "./ApiClient";
import { ChannelType } from "../types/Channel";
import { CommentsType } from "../types/Comments";


// Get channel by id GET
export const getChannel = async (channelId: string) => {
  return await apiClient<ChannelType>(`channels/${channelId}`);
}

// Get channels for the logged in user GET
export const getChannelsByUser = async (userId: string) => {
  return await apiClient<ChannelType[]>(`channels/${userId}`);
}

// Create new channel
export const createChannel = async (body: Omit<ChannelType, '_id'>) => {
  return await apiClient<ChannelType>('channels', 'POST', body);
}

// Edit channel
export const editChannel = async (channelId: string, body: ChannelType) => {
  return await apiClient<ChannelType>(`channels/${channelId}`, 'PUT', body);
}

// Add user to channel
export const addUserToChannel = async (channelId: string, userId: string) => {
  return await apiClient<ChannelType>(`channels/${channelId}/${userId}`,'POST')
}

// Add message to channel
export const addComment = async (channelId: string, body: CommentsType) => {
  console.log(body)
  return await apiClient<ChannelType>(`channels/${channelId}`, 'POST', body);
};