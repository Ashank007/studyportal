import mongoose from "mongoose";
const userSechma = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true, versionKey: false });

const User = mongoose.model("User", userSechma);

export default User;