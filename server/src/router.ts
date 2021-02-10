import { Router } from 'express'
import HomeController from './controllers/homeController'
import SmartAppController from './controllers/smartAppController'
import UserController from './controllers/userController'
import auth from './middlewares/auth'

const router = Router()

const userController = new UserController()
router.post('/register', auth.optional, userController.createUser)
router.post('/login', auth.optional, userController.authenticateUser)
router.post('/profile', auth.optional, userController.checkToken)

const homeController = new HomeController()
router.post('/find-home', homeController.findHomeList)
router.post('/select-home', homeController.selectHome)
router.post('/create-home', homeController.createHome)
router.post('/join-home', homeController.addResident)

const smartAppController = new SmartAppController()
router.post('/smart-api/get-devices', smartAppController.getDevices)
router.post('/smart-api/update-state', smartAppController.updateState)
router.post('/smart-api/lock-toggle', smartAppController.lockToggle)

const SSE = require('express-sse')
export const sse = new SSE()
router.get('/stream', sse.init)

export default router
