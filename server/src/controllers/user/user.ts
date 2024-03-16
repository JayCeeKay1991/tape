import { Request, Response } from "express";
import UserModel from "../../models/user";
import bcrypt from "bcrypt";

//create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userInDb = await UserModel.findOne({ email: email });
    if (userInDb)
      return res
        .status(409)
        .send({ error: "409", message: "User already exists" });
    if (password === "") console.log(Error());
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(400);
    res.send({ error, message: "Could not create user" });
  }
};

//Get User
export const getUserByEmailPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send("Bad request: Please provide email and password");
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send("No user found");
    }
    const validatedPass = bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(401);
    res.send({ error: "401", message: "Username or password is incorrect" });
  }
};
