import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const userID=req.id;
    console.log(userID)
    console.log(companyName);

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: new RegExp(`^${companyName}$`, "i") });

    if (company) {
      return res.status(400).json({
        message: "You can not add same company",
        success: false,
      });
    }

    let singleCompany=await Company.findOne({userId:userID});

    if(singleCompany) {
      return res.status(409).json({
        message:"You cannot add more than one company",
        success:false
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company register Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const company = await Company.findOne({ userId });

    if (!company) {
      return res.status(404).json({
        message: "No Company Found",
        success: false,
      });
    }

    return res.status(200).json({
      company,  // Now it's just a single company object, not an array
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById(companyId);
    console.log("getCompanyById: ", company);

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.files.file?.[0]; 

    // Initialize update data
    const updateData = { name, description, website, location };

    // Handle logo upload (optional)
    if (file) {
      console.log("Company Logo File Details:", {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size / 1024 / 1024, // Size in MB
      });

      const photoUri = getDataUri(file);
      const photoCloud = await cloudinary.uploader.upload(photoUri.content, {
        resource_type: "image",
        folder: "company_logos", // Store in a specific folder
      });

      updateData.logo = photoCloud.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Updated Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({
      message: error.message || "Failed to update company",
      success: false,
    });
  }
};