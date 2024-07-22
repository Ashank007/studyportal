import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Material from "../models/material.js"
import Unit from "../models/unit.js";
import Sem from "../models/sem.js"
import Subject from "../models/subject.js"
const creatematerial = async (req, res) => {
    try {
        const { semname,subjectname,unitname, title, url, type } = req.body;
        if (!subjectname||!unitname || !title || !url || !type || !semname) {
            return res.status(400).json(new ApiResponse(false, "Sem Name,Subject Name,Unit Name,Title,Url,Type are required"));
        }
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects");
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Not Found"));
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
            _id:subjectid
        }).populate("units")
        if (!subject) {
            return res.status(400).json(new ApiResponse(false, "Subject Dont Exists"));
        }
        let subjectunitname,unitid;
        for(let i=0;i<subject.units.length;i++){
            subjectunitname = subject.units[i].title;
            if(subjectunitname===unitname){
                unitid = subject.units[i]._id.toString();
                break
            }
        }
        const unit = await Unit.findById(unitid);
        if(!unit){
            return res.status(400).json(new ApiResponse(false, "Unit Dont Exists"));
        }
        const material = await Material.create({
            title:title,
            url:url,
            materialtype:type
        })
        const materialid = material._id.toString();
        unit.materials.push(materialid);
        await unit.save();
        res.status(201).json(new ApiResponse(true, "Material Created Succesfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deletematerial = async (req, res) => {
    try {
        const { semname, subjectname, unitname, title } = req.body;
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects")
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Not Found"));
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
            _id:subjectid
        }).populate("units")
        if (!subject) {
            return res.status(400).json(new ApiResponse(false, "Subject Dont Exists"));
        }
        let subjectunitname,unitid;
        for(let i=0;i<subject.units.length;i++){
            subjectunitname = subject.units[i].title;
            if(subjectunitname===unitname){
                unitid = subject.units[i]._id.toString();
                break
            }
        }
        const unit = await Unit.findById(unitid).populate("materials");
        if(!unit){
            return res.status(400).json(new ApiResponse(false, "Unit Dont Exists"));
        }
        for(let i=0;i<unit.materials.length;i++){
            if(unit.materials[i].title===title){
                await Material.deleteOne({
                    _id:unit.materials[i]._id
                })
                unit.materials.splice(i,1);
                await unit.save();
                break
            }
        }
        res.status(200).json(new ApiResponse(true, "Material Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getallmaterial = async (req, res) => {
    try {
        const { unitname } = req.body;
        const unit = await Unit.findOne({
            title: unitname
        }).populate("materials");
        const materials = [];
        for (let i = 0; i < unit.materials.length; i++) {
            materials.push(unit.materials[i]);
        }
        res.status(200).json(new ApiResponse(true, materials));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }

}
export { creatematerial, deletematerial, getallmaterial }