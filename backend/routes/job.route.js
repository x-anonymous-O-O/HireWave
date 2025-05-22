import express from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { getAdminJobs, getAllJob, getJobById, postJob, removeJob } from "../controlers/job.controler.js";


const router = express.Router();

router.route("/post").post(isAuthenticate, postJob);
router.route("/get").get(getAllJob);
router.route("/get/:id").get( isAuthenticate ,getJobById);
router.route("/delete/:id").delete(isAuthenticate, removeJob);
router.route("/getAdminJobs").get(isAuthenticate, getAdminJobs);

export default router;