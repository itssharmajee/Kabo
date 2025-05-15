import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { BlackListToken } from "../models/blackListToken.js";

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { fullName, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(200).json({
        token,
        user,
    });
};


export const loginUser = async (req, res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch =await user.comparePassword(password);
    
    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie('userToken',token);
    res.status(200).json({token,user});
}

export const getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
};
export const logoutUser = async(req,res,next)=>{
    res.clearCookie('userToken');
    const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];
    await BlackListToken.create({token});
    res.status(200).json({message:"Logout user successfull"});
};
