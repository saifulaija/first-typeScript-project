import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { authValidations } from './auth.validation'
import { authControllers } from './auth.controller'
const router = express.Router()


router.post('/login', validateRequest(authValidations.loginValidationSchema),authControllers.loginUser )


export const  AuthRouters=router


