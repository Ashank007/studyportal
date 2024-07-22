import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please Login First"
            })
        }
        let decoded = jwt.verify(token, process.env.JTW_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export default isAuthenticated;