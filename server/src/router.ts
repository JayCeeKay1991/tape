import express from "express";
import { login, createUser } from "./controllers/user/user";
const router = express.Router();

router.post("/users/login", login);
router.post("/users", createUser);

export default router;
