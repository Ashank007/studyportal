import mongoose from "mongoose";

const subjectSechma = new mongoose.Schema({
    units: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "units"
    }],
    name: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Subject = mongoose.model("Subjects", subjectSechma);

export default Subject;