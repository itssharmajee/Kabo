import express from 'express';
import { body } from 'express-validator';
import { getCaptionProfile, loginCaption, logoutCaption, registerCaption } from '../controllers/caption.controller.js';
import { authCaption } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body('fullName.firstName').isLength({min:3}).withMessage("firstName must be at least 3 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be at 3 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at 3 characters long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle choosen"),
],registerCaption)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long")
],loginCaption)

router.get('/profile',authCaption,getCaptionProfile)
router.get('/logout', authCaption,logoutCaption);



export default router;