import mongoose from "mongoose";

const  connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connect Successfully");
    } catch (error) {
        console.log("Error: ",error); 
    }
}

export default connectMongoDB