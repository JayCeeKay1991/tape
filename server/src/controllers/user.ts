import { Request, Response } from 'express';
import UserModel from '../models/user';

//Get Users
export const getUsers = async (req: Request, res: Response) => {
  try {
      const users = await UserModel.find();
      res.status(200)
      res.send(users);
  } catch (error) {
      console.error(error);
      res.status(500).json('Error while getting users.');
  }
};