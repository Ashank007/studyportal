import mongoose from "mongoose";

const semSchema = new mongoose.Schema({
    semname: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjects"
    }],
}, { versionKey: false })

const Sem = mongoose.model("Sem", semSchema);

export default Sem;