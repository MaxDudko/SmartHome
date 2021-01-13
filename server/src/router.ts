import { Router } from 'express';
import AuthController from './controllers/authController';
import auth from "./middlewares/auth";

const router = Router();

const authController = new AuthController();
router.post('/register', auth.optional, authController.register);
router.post('/login', auth.optional, authController.login);
router.post('/changePassword', auth.optional, authController.changePassword);
router.post('/profile', auth.optional, authController.profile);

export default router;
