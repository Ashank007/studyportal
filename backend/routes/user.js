import express from "express"
import { registeruser, loginuser, logoutuser, adminlogin, getallusers } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isauthenticated.js";
const userrouter = express.Router();

userrouter.post("/register", registeruser)
userrouter.post("/login", loginuser)
userrouter.get("/logout", isAuthenticated, logoutuser);
userrouter.post("/admin", adminlogin);
userrouter.get("/admin/getall", getallusers);
export default userrouter

