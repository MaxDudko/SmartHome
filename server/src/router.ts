import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

const user = new UserController();
router.post('/register', user.register);

export default router;
