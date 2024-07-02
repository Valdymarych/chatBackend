import Router from 'express'
import { User } from '../../models/User.js'
import config from '../../config/config.js';

import {check} from 'express-validator'
import authMiddleware from '../../middlewares/authMiddleware.js'
import userController from './userController.js'
const STATUSES = config.httpStatuses
const userRouter = new Router()
 
userRouter.post('/registration',
    [
        check('email','incorrect email').isEmail(),
        check('password','incorrect password').isLength({min:3,max:12}),
        check('name','incorrect name').isLength({min:3,max:12}),
    ], 
    userController.errorHandler(userController.createUser)
)

userRouter.post('/login',
    [
        check('email','incorrect email').isEmail(),
        check('password','incorrect password').isLength({min:3,max:12})
    ], 
    userController.errorHandler(userController.login))

userRouter.get('/auth',authMiddleware, userController.errorHandler(userController.auth))

export default userRouter