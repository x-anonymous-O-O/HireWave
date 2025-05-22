import express from "express";
import { getCurrentUser, login, logout, register, updateProfile } from "../controlers/user.controler.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { multiUpload } from "../middlewares/multer.js";


const router = express.Router()

router.route("/register").post(multiUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/me", isAuthenticate,getCurrentUser);
router.route("/profile/update").post( isAuthenticate,multiUpload, updateProfile);

export default router;