import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import validators from '../../../validators/index.mjs'
import * as userControllers from '../controllers/user.controllers.mjs'

// user routes reference
const userRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

// register the user
userRouter.post(
  '/register',
  validators.user.register,
  validators.isRequestValidated,
  userControllers.register
)

// login the user
userRouter.post(
  '/login',
  validators.user.login,
  validators.isRequestValidated,
  userControllers.login
)
// get user profile information
userRouter.get('/profile', isAuthenticated, userControllers.profile)

export default userRouter
