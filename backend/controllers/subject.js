import Subject from "../models/subject.js";
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Sem from "../models/sem.js"
import Unit from "../models/unit.js";
import Material from "../models/material.js"
const createsubject = async (req, res) => {
    try {
        const { semname, name } = req.body;
        if (!semname || !name) {
            return res.status(400).json(new ApiResponse(false, "Semname and Subject Name are Required"));
        }
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects");
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Doesnt Exists"));
        }
        let subjectnames;
        for (let i = 0; i < sem.subjects.length; i++) {
            subjectnames = sem.subjects[i].name;
            if (subjectnames === name) {
                return res.status(400).json(new ApiResponse(false, "Subject Already Exists"));
            }
        }
        const newsubject = await Subject.create({
            name: name
        })
        const newsubjectid = newsubject._id.toString();
        sem.subjects.push(newsubjectid);
        await sem.save();
        res.status(200).json(new ApiResponse(true, "Subject Created Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deletesubject = async (req, res) => {
    try {
        const { semname, name } = req.body;
        if (!semname || !name) {
            return res.status(404).json(new ApiResponse(false, "Semname and Subject are required"))
        }
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects")
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "No Sem with that name"))
        }
        let subjectname,newsubjectid;
        for (let i = 0; i < sem.subjects.length; i++) {
            subjectname = sem.subjects[i].name;
            if (subjectname === name) {
                newsubjectid = sem.subjects[i]._id;
                break
            }
        }
        const subject = await Subject.findOne({
            _id: newsubjectid
        }).populate("units")
        if (!subject) {
            return res.status(400).json(new ApiResponse(false, "No Subject with that name"))
        }
        for(let i=0;i<subject.units.length;i++){
            const unitid = subject.units[i]._id.toString();
            const unit = await Unit.findById(unitid).populate("materials");
            for(let i=0;i<unit.materials.length;i++){
                const materialid = unit.materials[i]._id.toString();
                await Material.deleteOne({
                    _id:materialid
                })
            }
            await Unit.deleteOne({
                _id:unitid
            })
        }
        const subjectid = subject._id.toString();
        for (let i = 0; i < sem.subjects.length; i++) {
            const semsubjectid = sem.subjects[i]._id.toString();
            if (subjectid === semsubjectid) {
                sem.subjects.splice(i, 1);
                await sem.save();
            }
        }
        await Subject.deleteOne(subject);
        res.status(200).json(new ApiResponse(true, "Subject Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getallsubjects = async (req, res) => {
    try {
        const { semname } = req.body;
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects")
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Not Found"));
        }
        const subjects = [];
        for (let i = 0; i < sem.subjects.length; i++) {
            const { _id: _id, name: name } = sem.subjects[i]
            const data = { _id, name }
            subjects.push(data);
        }
        res.status(200).json(new ApiResponse(true, subjects));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { createsubject, deletesubject, getallsubjects };
