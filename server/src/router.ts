import express from "express";
import { login, createUser, editUser } from "./controllers/user/user";
import { createChannel } from "./controllers/channel/channel";
import { createMixTape } from "./controllers/mixTape/mixTape";
const router = express.Router();

router.post("/users/login", login);
router.post("/users", createUser);
router.put("/users/:id", editUser);

router.post("/channels", createChannel);
router.post("/mixtapes", createMixTape);
export default router;
