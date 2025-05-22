import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
  try {
    const { email, fullname, password, phoneNumber, role } = req.body;

    // Validate required fields
    if (!email || !fullname || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Validate role
    if (!["student", "recruiter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    // Check if user already exists with the same email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Handle profile photo upload (optional)
    let profilePhotoUrl = "";
    const profileFile = req.files?.profilePhoto?.[0];
    if (profileFile) {
      // const profileFile = req.file;
      console.log("Profile Photo File Details:", {
        originalname: profileFile.originalname,
        mimetype: profileFile.mimetype,
        size: profileFile.size / 1024 / 1024, // Size in MB
      });

      const photoUri = getDataUri(profileFile);
      const photoCloud = await cloudinary.uploader.upload(photoUri.content, {
        resource_type: "image",
        folder: "profile_photos",
      });

      profilePhotoUrl = photoCloud.secure_url;
    }

    // Create user
    await User.create({
      fullname,
      email,
      password: hashPassword,
      phoneNumber,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: "",
        resumeOriginalname: "",
        company: null,
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Register Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: error.message || "Failed to register",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //check all data missing or not
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Sumthing is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email }); // check user already exist or not
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    const isPasswordmatch = await bcrypt.compare(password, user.password);
    if (!isPasswordmatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "User dosn't exist with this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    }); // create token
    console.log(token);

    user = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSize: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      message: "Logout Successfull",
      success: true,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Fetch current user failed:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const resumeFile = req.files?.file?.[0];
    const profileFile = req.files?.profilePhoto?.[0];

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Log file details for debugging
    if (resumeFile) {
      console.log("Resume File Details:", {
        originalname: resumeFile.originalname,
        mimetype: resumeFile.mimetype,
        size: resumeFile.size / 1024 / 1024, // Size in MB
      });
    }
    if (profileFile) {
      console.log("Profile Photo File Details:", {
        originalname: profileFile.originalname,
        mimetype: profileFile.mimetype,
        size: profileFile.size / 1024 / 1024, // Size in MB
      });
    }

    // Upload resume (PDF)
    if (resumeFile) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw", // For PDFs
            folder: "resumes",
            use_filename: true,
            unique_filename: false,
            filename_override: resumeFile.originalname,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary PDF upload error:", {
                message: error.message,
                http_code: error.http_code,
                details: error,
              });
              reject(error);
            } else {
              console.log("Resume Cloudinary Response:", {
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
              resolve(result);
            }
          }
        );
        stream.end(resumeFile.buffer);
      });

      user.profile.resume = uploadResult.secure_url;
      user.profile.resumeOriginalname = resumeFile.originalname;
    }

    // Upload profile photo (image)
    if (profileFile) {
      const photoUri = getDataUri(profileFile);
      const photoCloud = await cloudinary.uploader.upload(photoUri.content, {
        resource_type: "image", // Explicitly set for images
        folder: "profile_photos",
      });
      console.log("Profile Photo Cloudinary Response:", {
        secure_url: photoCloud.secure_url,
        public_id: photoCloud.public_id,
      });
      user.profile.profilePhoto = photoCloud.secure_url;
    }

    // Handle other fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
