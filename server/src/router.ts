import express from "express";
import {
  login,
  createUser,
  editUser,
  getAllUsers,
  getUserById,
} from "./controllers/user/user";
import {
  createChannel,
  addUserToChannel,
  getChannel,
  addComment,
  deleteChannel,
  getChannelsByUser,
} from "./controllers/channel/channel";
import { createMixTape } from "./controllers/mixTape/mixTape";
import { createNotification } from "./controllers/notification/notification";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/users/:userId", getUserById);

router.post("/users/login", login);
router.post("/users", createUser);
router.put("/users/:id", editUser);

router.get("/channels/:channelId", getChannel);
router.post("/channels", createChannel);
router.post("/channels/:channelId/:userId", addUserToChannel);
router.post("/channels/:channelId/", addComment);
router.delete("/channels/:channelId/", deleteChannel);

router.get("/dash/:userId", getChannelsByUser);

router.post("/mixtape", createMixTape);

router.post("/notifications", createNotification);

export default router;
