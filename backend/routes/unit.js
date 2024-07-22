import express from "express"
import { createunit, deleteunit, getallunits } from "../controllers/unit.js";
import isauthenticated from "../middlewares/isauthenticated.js"
const unitrouter = express.Router();

unitrouter.post("/create", createunit)
unitrouter.delete("/delete", deleteunit);
unitrouter.post("/getall", getallunits);
export default unitrouter