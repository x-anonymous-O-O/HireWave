import express from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { applyJob, getapplicant, getAppliedJobs, updateStatus } from "../controlers/application.controler.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticate, applyJob);
router.route("/get").get(isAuthenticate, getAppliedJobs);
router.route("/:id/getApplicant").get(isAuthenticate, getapplicant);
router.route("/status/:id/update").patch(isAuthenticate, updateStatus);

export default router;