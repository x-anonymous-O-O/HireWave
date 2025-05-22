import multer from "multer";

const storage = multer.memoryStorage(); // Using memory for Cloudinary uploads

// File filter for registration (only profilePhoto)
const registerFileFilter = (req, file, cb) => {
  if (file.fieldname === "profilePhoto") {
    // Allow images for the 'profilePhoto' field
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for profile photo"), false);
    }
  } else {
    cb(new Error(`Invalid field name: ${file.fieldname}`), false);
  }
};

// File filter for profile updates and company updates
const updateProfileFileFilter = (req, file, cb) => {
  if (file.fieldname === "file") {
    // Check the route to determine file type validation
    if (req.originalUrl.includes("/company/update")) {
      // Allow images for company logo (updateCompany route)
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed for company logo"), false);
      }
    } else {
      // Allow PDFs for resume (updateProfile route)
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed for resume"), false);
      }
    }
  } else if (file.fieldname === "profilePhoto") {
    // Allow images for the 'profilePhoto' field (updateProfile route)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for profile photo"), false);
    }
  } else {
    cb(new Error(`Invalid field name: ${file.fieldname}`), false);
  }
};

// Multer configuration for registration
export const registerUpload = multer({
  storage,
  fileFilter: registerFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).single("profilePhoto"); // Only handle profilePhoto

// Multer configuration for profile updates and company updates
export const multiUpload = multer({
  storage,
  fileFilter: updateProfileFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).fields([
  { name: "file", maxCount: 1 }, // Resume (PDF) or company logo (image)
  { name: "profilePhoto", maxCount: 1 }, // Profile image
]);
