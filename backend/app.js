import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/database.js";
import userrouter from "./routes/user.js";
import semrouter from "./routes/sem.js";
import subjectrouter from "./routes/subject.js";
import unitrouter from "./routes/unit.js";
import materialrouter from "./routes/material.js";
dotenv.config();
const app = express();
connectDb();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTENT_URL,
    methods:["GET","POST","DELETE"],
    credentials: true
}))
app.get("/",(req,res)=>{
    res.send("<h1>Backend Server is Running</h1>")
})
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/user", userrouter);
app.use("/api/v1/sem", semrouter);
app.use("/api/v1/subject", subjectrouter);
app.use("/api/v1/unit", unitrouter);
app.use("/api/v1/material", materialrouter);

export default app;