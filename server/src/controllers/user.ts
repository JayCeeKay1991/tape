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
        .json({ error: '409', message: 'User already exists' });
    if (password === '') console.error(Error());
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
    res.json({ error, message: 'Could not create user' });
  }
};

// getting the logged in user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .send('Bad request: Please provide email and password');
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send('No user found');
    }

    const validatedPass = bcrypt.compare(password, user.password!);

    if (!validatedPass) console.error(Error());
    res.status(200);
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json({ error: '401', message: 'Username or password is incorrect' });
  }
};

export default { createUser, login };
