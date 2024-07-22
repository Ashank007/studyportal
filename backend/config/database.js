import mongoose from "mongoose";

const connectDb =  () => {
    try {
         mongoose.connect(process.env.MONGODB_URI, {
            dbName: "studymaterial",
            serverSelectionTimeoutMS: 10000,
        }).then(() => {
            console.log("DataBase Connected");
        })    
    } catch (error) {
        console.error(error);
    }

}
export default connectDb;