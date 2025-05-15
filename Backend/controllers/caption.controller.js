import { validationResult } from "express-validator";
import Caption from "../models/caption.model.js";
import { createCaption } from "../services/caption.service.js";
import { BlackListToken } from "../models/blackListToken.js";

export const registerCaption = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptionAlreadyExists = await Caption.findOne({ email });
    if (isCaptionAlreadyExists) {
        return res.status(400).json({ message: "Caption already Exists" });
    }

    const hashedPassword = await Caption.hashPassword(password);

    const caption = await createCaption({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = caption.generateAuthToken();
    res.status(201).json({ token, caption });
};

export const loginCaption = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    const caption = await Caption.findOne({ email }).select("+password");

    if (!caption) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await caption.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = caption.generateAuthToken();
    res.cookie("captionToken", token);
    res.status(200).json({ token, caption });
};

export const getCaptionProfile = async(req,res,next)=>{
    res.status(200).json(req.caption);
}

export const logoutCaption = async(req,res,next)=>{
    const token = req.cookies.captionToken || req.headers.authorization?.split(' ')[1];
    await BlackListToken.create({token});
    res.clearCookie('captionToken');
    res.status(200).json({message:"Logout user successfull"});
};