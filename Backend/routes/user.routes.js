import express from "express"
const router = express.Router();

import {body} from 'express-validator';
import { registerUser } from "../controllers/user.controller.js";

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("first name should be of 3 and more characters"),
    body('password').isLength({min:6}).withMessage("Password must be of 6 and more characters")
],registerUser)

export {router}