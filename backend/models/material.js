import mongoose from "mongoose";

const materialSechma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    materialtype: {
        type: String,
        enum: ["Docs", "Pdf", "Ppt"]
    },
}, { versionKey: false });

const Material = mongoose.model("materials", materialSechma);

export default Material;