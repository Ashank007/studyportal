import express from "express";
import { creatematerial, deletematerial, getallmaterial } from "../controllers/material.js";
import isauthenticated from "../middlewares/isauthenticated.js"
const materialrouter = express.Router();

materialrouter.post("/create", creatematerial);
materialrouter.delete("/delete", deletematerial);
materialrouter.post("/getall",getallmaterial);
export default materialrouter;