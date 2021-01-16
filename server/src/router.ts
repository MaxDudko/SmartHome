import { Router } from 'express';
import UserController from './controllers/user';
import HomeController from './controllers/home';
import auth from "./middlewares/auth";

const router = Router();

const userController = new UserController();
router.post('/register', auth.optional, userController.register);
router.post('/login', auth.optional, userController.login);
router.post('/change-password', auth.optional, userController.changePassword);
router.post('/profile', auth.optional, userController.profile);

const homeController = new HomeController();
router.post('/get-home', homeController.get);
router.post('/create-home', homeController.create);
router.post('/add-user', homeController.add);

export default router;
