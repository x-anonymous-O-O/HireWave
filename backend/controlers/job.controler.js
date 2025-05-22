import { Job } from "../models/job.model.js"
import mongoose from "mongoose"

// For Admin
export const postJob = async (req, res) => {
    try {
        const {title, description, requirement, salary, location, jobType, position, companyId, experience} = req.body
        const userId = req.id
        if (!title || !description || !requirement || !salary || !location || !jobType || !position  || !experience || !companyId) {
            return res.status(400).json({
                message: "Somthing is missing",
                success: false
            })
        }
        const job = await Job.create({
            title, 
            description, 
            requirement: requirement,
            salary, 
            location, 
            jobType, 
            position, 
            company: companyId,
            created_by: userId,
            experience
        });

        return res.status(200).json({
            message: "New Job Created Successfully",
            job,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({Error:"Internal Server Error"})
        
    }
}


// For Student
export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";   //GET /jobs/jobs?keyword=designer
        const query = {      //return the document if any field matches.
            $or:[
                {title:{$regex: keyword, $options: "i"}},
                {description:{$regex: keyword, $options: "i"}},
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company"
        }).populate({
            path:"applications"
        })
        .sort({createdAt: -1})
        // console.log(mongoose.modelNames());   [ 'User', 'Company', 'Job' ]

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs Not Found",
                seccess: false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// For student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs Not Found",
                seccess: false
            })
        }
        return res.status(200).json({
            job,
            seccess:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({created_by: adminId})
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs Not Found",
                seccess: false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const removeJob=async (req,res)=>{
    try{
        const id=req.params.id;

        const response=await Job.findByIdAndDelete(id);

        if(!response) return res.status(400).json({error:"Job does not exist"});

        console.log("Job deleted successfully");
        return res.status(200).json({
            Message:"Job removed",
            success:true
        })
    }catch(error){
        console.log(`Error:${error}`);
        res.status(500).json({Message:"Internal Server error"});
    }
}