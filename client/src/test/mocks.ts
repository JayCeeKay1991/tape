import { ChannelType } from "@/types/Channel";
import { CommentsType } from "@/types/Comments";

export const user = {
  "_id": "65f85f039c9f9d627bb8287e",
  'userName': 'Test Testsson',
  "email": "test@test.com",
  "password": "1234",
  'profilePic': 'https://res.cloudinary.com/dkvrbsh2c/image/upload/v1710769946/mpitridv38kfllnrmrqe.png',
  "mixTapes": [],
  "channels": []
}


export const channels = [{
  "_id": "65e4b2b45b642b1a0624c2e3",
  "name": "test channel",
  "picture": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "owner": user,
  "members": [],
  "mixTapes": [],
  "comments": []
}]


export const mockChannel: ChannelType = {
  _id: 'channelId123',
  name: 'Sample Channel',
  picture: 'sample.jpg',
  owner: user,
  members: [],
  mixTapes: [],
  comments: [],
};


export const mockComment: CommentsType = {
  owner: user,
  message: 'mock comment',
  date: new Date(),
}