import express from 'express'
import * as userController from '../controllers/user.controller'
import { newUserValidator } from '../validators/user.validator.js'

const router = express.Router()

router.post('', newUserValidator, userController.newUser)

router.post('/login', userController.userLogin )

export default router