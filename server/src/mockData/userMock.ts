export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilepic: string;
  channels: string[];
  mixtapes: string[];
};
const user1: User = {
  _id: '123456',
  username: 'alex',
  email: 'abc@yahoo.com',
  password: '111111',
  profilepic: ' ',
  channels: [],
  mixtapes: [],
};

const user2: User = {
  _id: '234567',
  username: 'alexa',
  email: 'abcd@yahoo.com',
  password: '222222',
  profilepic: ' ',
  channels: [],
  mixtapes: [],
};

const userData = [user1, user2];
