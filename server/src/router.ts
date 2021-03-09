import { Router } from 'express'
import HomeController from './controllers/homeController'
import SmartAppController from './controllers/smartAppController'
import UserController from './controllers/userController'
import auth from './middlewares/auth'

const router = Router()

const userController = new UserController()
router.post('/register', auth.optional, userController.createUser)
router.post('/login', auth.optional, userController.authenticateUser)
router.post('/profile', auth.required, userController.checkToken) // GET
router.post('/password/reset', auth.optional, userController.resetPassword)
router.get('/password/reset', auth.optional, userController.checkPasswordToken)
router.post('/password/refresh', auth.optional, userController.refreshPassword)

const homeController = new HomeController()
router.post('/find-home', auth.required, homeController.findHomeList) // GET /home-list
router.post('/select-home', auth.required, homeController.selectHome) // GET /home/:id
router.post('/create-home', auth.required, homeController.createHome) // POST /home
router.post('/join-home', auth.required, homeController.addResident) // POST || PUT ? /home/:id

const smartAppController = new SmartAppController()
router.get('/smart-api/auth-token', smartAppController.accessToken)
router.post('/smart-api/auth-token', smartAppController.saveToken)
router.post('/smart-api/get-devices', auth.required, smartAppController.getDevices) // GET /devices
router.post('/smart-api/update-state', smartAppController.updateState) // PUT /devices/:id
router.post('/smart-api/lock-toggle', auth.required, smartAppController.lockToggle) // ?

const SSE = require('express-sse')
export const sse = new SSE()
router.get('/stream', sse.init)

export default router
