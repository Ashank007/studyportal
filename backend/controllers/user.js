import User from "../models/user.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json(new ApiResponse(false, "Name,Email and Password are Requried"));
        }
        const suffix = "@mietjammu.in"
        if (!email.endsWith(suffix)) {
            return res.status(400).json(new ApiResponse(false, "Please Enter College Email Id"));
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(404).json(new ApiResponse(false, "User Already Exists"));
        }
        const hasedpassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({
            name: name,
            email: email,
            password: hasedpassword
        })
        res.status(201).json(new ApiResponse(true, "User Register Successfully\nNow Please Login"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json(new ApiResponse(false, "Email and Password are Required"));
        }
        const suffix = "@mietjammu.in"
        if (!email.endsWith(suffix)) {
            return res.status(400).json(new ApiResponse(false, "Please Enter College Email Id"));
        }
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(404).json(new ApiResponse(false, "User Dont Exists"));
        }
        const userpassword = user.password;
        const iscorrect = await bcrypt.compare(password, userpassword);
        if (!iscorrect) {
            return res.status(400).json(new ApiResponse(false, "Wrong Password Entered"));
        }
        const token = jwt.sign({ _id:user._id,name:user.name,materials:user.materials }, process.env.JTW_SECRET, {
            expiresIn: "48h",
        })
        res.cookie("token", token, {
            maxAge: 48 * 60 * 60 * 1000, 
            secure: true,
            sameSite: 'None'
        });
        res.status(200).json({
            success:true,
            message:"User Login Successfully",
            token:token
        });
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const logoutuser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json(new ApiResponse(false, "Invalid Token"));
        }
        res.cookie("token", "");
        res.status(200).json(new ApiResponse(true, "User Logout Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const adminlogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json(new ApiResponse(false, "Token Required"));
        }
        if (token !== process.env.LOGIN_TOKEN) {
            return res.status(400).json(new ApiResponse(false, "Invalid Token You are not Admin"));
        }
        res.status(200).json(new ApiResponse(true, "Admin Login Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getallusers = async (req, res) => {
    try {
        const users = await User.find().select("name");
        res.status(200).json(new ApiResponse(true,users));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { registeruser, loginuser, logoutuser, adminlogin, getallusers };
