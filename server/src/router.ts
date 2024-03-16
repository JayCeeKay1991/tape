import express from 'express';
import controllerUser from './controllers/user';

const router = express.Router();

router.post('/users', controllerUser.createUser);

export default router;
