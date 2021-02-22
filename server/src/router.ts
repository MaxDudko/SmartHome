import { Router } from 'express'
import HomeController from './controllers/homeController'
import SmartAppController from './controllers/smartAppController'
import UserController from './controllers/userController'
import authMiddleware from './middlewares/auth'

const router = Router()

const userController = new UserController()
router.post('/register', userController.createUser)
router.post('/login', userController.authenticateUser)
router.post('/profile', authMiddleware, userController.checkToken)

const homeController = new HomeController()
router.post('/find-home', authMiddleware, homeController.findHomeList)
router.post('/select-home', authMiddleware, homeController.selectHome)
router.post('/create-home', authMiddleware, homeController.createHome)
router.post('/join-home', authMiddleware, homeController.addResident)

const smartAppController = new SmartAppController()
router.post('/smart-api/get-devices', authMiddleware, smartAppController.getDevices)
router.post('/smart-api/update-state', authMiddleware, smartAppController.updateState)
router.post('/smart-api/lock-toggle', authMiddleware, smartAppController.lockToggle)

const SSE = require('express-sse')
export const sse = new SSE()
router.get('/stream', sse.init)

export default router
