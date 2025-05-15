import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { BlackListToken } from "../models/blackListToken.js";
import Caption from "../models/caption.model.js";
export const authUser = async (req, res, next) => {
    // Extract token from cookies (userToken) or from the Authorization header (Bearer token)
    const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const isBlackListed = await BlackListToken.findOne({token});
    if(isBlackListed){
        return res.status(401).json({ message: "Unauthorized Access" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
};

export const authCaption = async (req, res, next) => {
    // Extract token from cookies (userToken) or from the Authorization header (Bearer token)
    const token = req.cookies.captionToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const isBlackListed = await BlackListToken.findOne({token});
    if(isBlackListed){
        return res.status(401).json({ message: "Unauthorized Access" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const caption = await Caption.findById(decoded._id);
        req.caption = caption;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
};
