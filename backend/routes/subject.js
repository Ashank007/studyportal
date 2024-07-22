import express from "express"
import { createsubject, deletesubject, getallsubjects } from "../controllers/subject.js"
import isauthenticated from "../middlewares/isauthenticated.js"
const subjectrouter = express.Router();

subjectrouter.post("/create", createsubject);
subjectrouter.delete("/delete", deletesubject);
subjectrouter.post("/allsubjects",getallsubjects)
export default subjectrouter;