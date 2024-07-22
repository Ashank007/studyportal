import mongoose from "mongoose";

const unitSechma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "materials"
    }]
}, { versionKey: false })

const Unit = mongoose.model("units", unitSechma);

export default Unit;