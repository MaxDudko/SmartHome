import { Router } from 'express'
import HomeController from './controllers/homeController'
import SmartAppController from './controllers/smartAppController'
import UserController from './controllers/userController'
import auth from './middlewares/auth'

const router = Router()

const userController = new UserController()
router.post('/register', auth.optional, userController.createUser)
router.post('/login', auth.optional, userController.authenticateUser)
router.post('/profile', auth.required, userController.checkToken)

const homeController = new HomeController()
router.post('/find-home', auth.required, homeController.findHomeList)
router.post('/select-home', auth.required, homeController.selectHome)
router.post('/create-home', auth.required, homeController.createHome)
router.post('/join-home', auth.required, homeController.addResident)

const smartAppController = new SmartAppController()
router.post('/smart-api/get-devices', auth.required, smartAppController.getDevices)
router.post('/smart-api/update-state', auth.required, smartAppController.updateState)
router.post('/smart-api/lock-toggle', auth.required, smartAppController.lockToggle)

const SSE = require('express-sse')
export const sse = new SSE()
router.get('/stream', sse.init)

export default router
