import express from "express"
const router = express.Router();

import {body} from 'express-validator';
import { registerUser,loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("first name should be of 3 and more characters"),
    body('password').isLength({min:6}).withMessage("Password must be of 6 and more characters")
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Envalid password")
],loginUser);

router.get('/profile',authUser,getUserProfile)
router.get('/logout', authUser,logoutUser);
export {router}