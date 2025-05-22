import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(200).json({
                message: "Job is required",
                success: false
            })
        }

        const alreadyApplied = await Application.findOne({job:jobId, applicant: userId})
        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplycations = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplycations._id)
         await job.save();
        return res.status(200).json({
            message: "Job applied Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; // assuming you're using auth middleware

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name", // just the name for now
        },
      })
      .sort({ createdAt: -1 }); // most recent first

    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


export const getapplicant = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
              path: 'applicant',
              select: 'fullname email phoneNumber',
              populate: {
                path: 'profile',
                select: 'bio skills resume'
              }
            }
          });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const applicationId = req.params.id;
  
      if (!status) {
        return res.status(400).json({
          message: "Status is required",
          success: false,
        });
      }
  
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).json({
          message: "Application not found",
          success: false,
        });
      }
  
      application.status = status.toLowerCase();
      await application.save();
  
      return res.status(200).json({
        message: "Application status updated successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error updating application status:", error);
      return res.status(500).json({
        message: "Server error while updating status",
        success: false,
      });
    }
  };
  