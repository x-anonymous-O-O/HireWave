import express from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controlers/company.controler.js";
import { multiUpload } from "../middlewares/multer.js";

const router = express.Router()

router.route("/register").post(isAuthenticate, registerCompany)
router.route("/get").get(isAuthenticate, getCompany)
router.route("/get/:id").get(isAuthenticate, getCompanyById)
router.route("/update/:id").put( isAuthenticate, multiUpload ,updateCompany)

export default router