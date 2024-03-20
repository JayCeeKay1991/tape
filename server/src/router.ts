import express from "express";
import { login, createUser, editUser, getAllUsers, getChannel } from "./controllers/user/user";
import { createChannel, addUserToChannel } from "./controllers/channel/channel";
import { createMixTape } from "./controllers/mixTape/mixTape";
const router = express.Router();


router.get("/users", getAllUsers);
router.post("/users/login", login);
router.post("/users", createUser);
router.put("/users/:id", editUser);


router.get('/channels/:channeId', getChannel)
router.post("/channels", createChannel);
router.post("/channels/:channelId/:userId", addUserToChannel)

router.post("/mixtapes", createMixTape);


export default router;
