import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Unit from "../models/unit.js"
import Subject from "../models/subject.js";
import Sem from "../models/sem.js"
import Material from "../models/material.js"
const createunit = async (req, res) => {
    try {
        const {semname,subjectname,title } = req.body;
        if (!title ||!semname||!subjectname) {
            return res.status(400).json(new ApiResponse(false, "Semanme,Subjectname and Title are Required"));
        }
        const sem = await Sem.findOne({
            semname:semname
        }).populate("subjects");
        if(!sem){
            return res.status(404).json(new ApiResponse(false,"Sem Doesn't Exists"));
        }
        let semsubjectname,subjectid;
        for(let i=0;i<sem.subjects.length;i++){
            semsubjectname = sem.subjects[i].name;
            if(semsubjectname===subjectname){
                subjectid = sem.subjects[i]._id.toString();
                break
            }
        }
        const subject = await Subject.findOne({
            _id: subjectid
        })
        if (!subject) {
            return res.status(400).json(new ApiResponse(false, "Subject Dont Exists"));
        }
        const unit = await Unit.create({
            title:title
        })
        const unitid = unit._id.toString();
        subject.units.push(unitid);
        await subject.save();
        res.status(201).json(new ApiResponse(true, "Unit Created Succesfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deleteunit = async (req, res) => {
    try {
        const { semname, subjectname, title } = req.body;
        if (!title || !subjectname || !semname) {
            return res.status(400).json(new ApiResponse(false, "Sem Name,Title and SubjectName is Required"));
        }
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects");
        if(!sem){
            return res.status(404).json(new ApiResponse(false,"Sem Doesn't Exists"));
        }
        let semsubjectname,subjectid;
        for(let i=0;i<sem.subjects.length;i++){
            semsubjectname = sem.subjects[i].name;
            if(semsubjectname===subjectname){
                subjectid = sem.subjects[i]._id.toString();
                break
            }
        }
        const subject = await Subject.findOne({
            _id: subjectid
        }).populate("units")
        if (!subject) {
            return res.status(400).json(new ApiResponse(false, "Subject Dont Exists"));
        }
        let subjectunitname,unitid;
        for(let i=0;i<subject.units.length;i++){
            subjectunitname = subject.units[i].title;
            if(subjectunitname===title){
                unitid = subject.units[i]._id.toString();
                break
            }
        }
        const unit = await Unit.findById(unitid).populate("materials");
        if(!unit){
            return res.status(400).json(new ApiResponse(false, "Unit Dont Exists"));
        }
        // DELETING MATERIAL
        for(let i=0;i<unit.materials.length;i++){
            const materialid = unit.materials[i]._id.toString();
            await Material.deleteOne({
                _id:materialid
            })
        }
        // DELETING UNIT 
        for(let i=0;i<subject.units.length;i++){
            if(subject.units[i].title===title){
                await Unit.deleteOne({
                    _id:subject.units[i]._id
                })
                subject.units.splice(i,1);
                await subject.save();
                break
            }
        }
        res.status(200).json(new ApiResponse(true, "Unit Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getallunits = async (req, res) => {
    try {
        const { name } = req.body;
        const subject = await Subject.findOne({
            name: name
        }).populate("units")
        const units = [];
        for (let i = 0; i < subject.units.length; i++) {
            units.push(subject.units[i]);
        }
        if (!subject) {
            return res.status(404).json(new ApiResponse(false, "Subject Not Found"));
        }
        res.status(200).json(new ApiResponse(true, units));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }

}
export { createunit, deleteunit, getallunits };