import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';

import UserModel, { UserType } from '../models/user';

// Define custom session interface
interface CustomSession extends Session {
  uid?: string;
}

// Extend the Request interface with the custom session type
export interface CustomRequest extends Request {
  session: CustomSession ;
  user?: UserType;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error('No user id');
    const user = await UserModel.findOne({ _id: uid });
    if (!user) throw new Error('No user found');
    req.user = user;
    next();
  } catch (error) {
    return res.send(error).status(500);
  }
};

export default authMiddleware;
