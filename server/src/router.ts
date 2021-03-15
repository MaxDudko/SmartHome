import { Router } from 'express'
import { validate } from 'express-validation'
import HomeController from './controllers/homeController'
import SmartAppController from './controllers/smartAppController'
import UserController from './controllers/userController'
import auth from './middlewares/auth'
import {
  accessTokenSchema,
  checkPasswordTokenSchema,
  createHomeSchema,
  findHomeSchema,
  getDevicesSchema,
  joinHomeSchema,
  lockToggleSchema,
  loginSchema,
  profileSchema,
  refreshPasswordSchema,
  registerSchema,
  resetPasswordSchema,
  selectHomeSchema,
  updateStateSchema,
} from './middlewares/validationSchemas'

const router = Router()

const userController = new UserController()
router.post('/register', auth.optional, validate(registerSchema), userController.createUser)
router.post('/login', auth.optional, validate(loginSchema), userController.authenticateUser)
router.get('/profile', auth.required, userController.checkToken)
router.post(
  '/password/reset',
  auth.optional,
  validate(resetPasswordSchema),
  userController.resetPassword
)
router.get(
  '/password/reset',
  auth.optional,
  validate(checkPasswordTokenSchema),
  userController.checkPasswordToken
)
router.post(
  '/password/refresh',
  auth.optional,
  validate(refreshPasswordSchema),
  userController.refreshPassword
)

const homeController = new HomeController()
router.get('/home-list', auth.required, homeController.findHomeList)
router.get('/home', auth.required, validate(selectHomeSchema), homeController.selectHome)
router.post('/create-home', auth.required, validate(createHomeSchema), homeController.createHome)
router.post('/join-home', auth.required, validate(joinHomeSchema), homeController.addResident)

const smartAppController = new SmartAppController()
router.get('/smart-api/auth-token', validate(accessTokenSchema), smartAppController.accessToken)
router.post('/smart-api/auth-token', smartAppController.saveToken)
router.get(
  '/smart-api/devices',
  validate(getDevicesSchema),
  auth.required,
  smartAppController.getDevices
)
router.post('/smart-api/update-state', validate(updateStateSchema), smartAppController.updateState)
router.post(
  '/smart-api/lock-toggle',
  validate(lockToggleSchema),
  auth.required,
  smartAppController.lockToggle
)

const SSE = require('express-sse')
export const sse = new SSE()
router.get('/stream', sse.init)

export default router
