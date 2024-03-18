import express from 'express';
import { login, createUser } from './controllers/user/user';
import { createChannel } from './controllers/channel/channel';
const router = express.Router();

router.post('/users/login', login);
router.post('/users', createUser);
router.post('/channels', createChannel);

export default router;
