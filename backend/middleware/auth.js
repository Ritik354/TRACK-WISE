import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
    //grab token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", success:false });
    }
    const token = authHeader.split(" ")[1];

    //to verify token
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(payload.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success:false });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", success:false });
    }
}