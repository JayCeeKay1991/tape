import { Request, Response } from "express";
import UserModel from "../../models/user";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: "400",
        message: "Please provide email and password",
      });
    }

    // Check if the user already exists
    const userInDb = await UserModel.findOne({ email: email });
    if (userInDb)
      return res
        .status(409)
        .json({ error: "409", message: "User already exists" });

    // Check if password is empty
    if (!password) {
      return res
        .status(400)
        .json({ error: "400", message: "Password is required" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });

    // Save the new user to the database
    const user = await newUser.save();
    // send the result
    res.status(201).json(user);
  } catch (error) {
    // Handle any errors
    // console.error('Error creating user:', error);
    res.status(500).json("Error creating user");
  }
};

// getting the logged in user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: "400",
        message: "Please provide email and password",
      });
    }
    // Find user by email
    const user = await UserModel.findOne({ email: email })
    .populate({
      path: 'channels',
      populate: {
        path: 'mixTapes',
        model: 'MixTape'
      }
    }).exec();

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "404",
        message: "User not found.",
      });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password!);

    // If password is invalid, return unauthorized status
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "401", message: "Username or password is incorrect" });
    }
    // if everything correct, send the user
    res.status(200).json(user);
  } catch (error) {
    // console.error('Error logging in user:', error);
    res.status(500).json("Error logging in user");
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userName, email, password, profilePic, channels, mixTapes } =
      req.body;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      req.body.password = hash;
    }
    if (!email || !password || !userName) {
      return res.status(400).json({
        error: "400",
        message: "Please provide email and password",
      });
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          userName: userName,
          email: email,
          password: password,
          profilePic: profilePic,
          channels: channels,
          mixTapes: mixTapes,
        },
      },
      { new: true }
    );
    res.status(201).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while editing the user. Please try again later.",
    });
  }
};

export default { createUser, login, editUser };
