import Sem from "../models/sem.js";
import Unit from "../models/unit.js";
import Subject from "../models/subject.js"
import Material from "../models/material.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
const createsem = async (req, res) => {
    try {
        const { semname } = req.body;
        const sem = await Sem.findOne({
            semname: semname
        })
        if (sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Already Exists"));
        }
        const newsem = await Sem.create({
            semname: semname
        })
        res.status(201).json(new ApiResponse(true, "Sem Created Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deletesem = async (req, res) => {
    try {
        const { semname } = req.body;
        if (!semname) {
            return res.status(400).json(new ApiResponse(false, "semname is Required"));
        }
        const sem = await Sem.findOne({
            semname: semname
        }).populate("subjects")
        if (!sem) {
            return res.status(400).json(new ApiResponse(false, "Sem Not Found"));
        }
        for (let i = 0; i < sem.subjects.length; i++) {
            const subject = await Subject.findById(sem.subjects[i]._id.toString()).populate("units");
            for(let i=0;i<subject.units.length;i++){
                const units = await Unit.findById(subject.units[i]._id.toString()).populate("materials");
                for(let i=0;i<units.materials.length;i++){
                    const materials = await Material.findById(units.materials[i]._id.toString());
                    await Material.deleteOne({
                        _id:materials._id.toString()
                    })
                }
                await Unit.deleteOne({
                    _id:units._id.toString()
                })
            }
            await Subject.deleteOne({ _id: subject._id.toString() });
        }
        await Sem.deleteOne(sem);
        res.status(200).json(new ApiResponse(true, "Sem Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const admingetallsem = async (req, res) => {
    try {
        const allsems = await Sem.find().populate("subjects").populate(
            {
                path: "subjects",
                populate: {
                    path: "units",
                    populate: {
                        path: "materials"
                    }
                }
            });
        res.status(200).json(new ApiResponse(true, allsems));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }

}
const getallsem = async (req, res) => {
    try {
        const allsems = await Sem.find().select("semname");
        res.status(200).json(new ApiResponse(true, allsems));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }

}
export { createsem, deletesem, admingetallsem, getallsem };