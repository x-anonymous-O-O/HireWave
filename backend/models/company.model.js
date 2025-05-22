import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String, //URL to company Logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true} )

export const Company = mongoose.model("Company", companySchema)