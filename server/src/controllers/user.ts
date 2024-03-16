import { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
//Get Users
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await UserModel.find();
//     res.status(200);
//     res.send(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json('Error while getting users.');
//   }
// };

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userInDb = await UserModel.findOne({ email: email });
    if (userInDb)
      return res
        .status(409)
        .send({ error: '409', message: 'User already exists' });
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.send({ error, message: 'Could not create user' });
  }
};

export default { createUser };
