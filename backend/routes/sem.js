import express from "express";
import { createsem, deletesem, admingetallsem, getallsem } from "../controllers/sem.js";
import isauthenticated from "../middlewares/isauthenticated.js"
const semrouter = express.Router();

semrouter.post("/create", createsem);
semrouter.delete("/delete", deletesem);
semrouter.get("/admingetall", admingetallsem);
semrouter.get("/getall",getallsem);
export default semrouter;