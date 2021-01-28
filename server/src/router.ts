import { Router } from 'express';
import auth from "./middlewares/auth";
import UserController from './controllers/userController';
import HomeController from './controllers/homeController';
import SmartAppController from "./controllers/smartAppController";

const router = Router();

const userController = new UserController();
router.post('/register', auth.optional, userController.createUser);
router.post('/login', auth.optional, userController.authenticateUser);
router.post('/profile', auth.optional, userController.checkToken);

const homeController = new HomeController();
router.post('/find-home', homeController.findHomeList);
router.post('/select-home', homeController.selectHome)
router.post('/create-home', homeController.createHome);
router.post('/join-home', homeController.addResident);

const smartAppController = new SmartAppController();
router.post('/smart/update-state', smartAppController.updateState);

export default router;
