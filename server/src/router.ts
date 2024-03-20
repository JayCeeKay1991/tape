import express from "express";
import { login, createUser, editUser, getAllUsers } from "./controllers/user/user";
import { createChannel, addUserToChannel, getChannel, addComment } from "./controllers/channel/channel";
import { createMixTape } from "./controllers/mixTape/mixTape";
const router = express.Router();


router.get("/users", getAllUsers);
router.post("/users/login", login);
router.post("/users", createUser);
router.put("/users/:id", editUser);


router.get('/channels/:channelId', getChannel)
router.post("/channels", createChannel);
router.post("/channels/:channelId/:userId", addUserToChannel)
router.post("/channels/:channelId/", addComment);

router.post("/mixtapes", createMixTape);


export default router;
