import { Router } from "express";
import {
    listJobs,
    createJob,
    updateJob,
    deleteJob,
    listApplications,
    createApplication
} from "../controllers/careerController.js";

const router = Router();

router.get("/jobs", listJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.patch("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

router.get("/applications", listApplications);
router.post("/applications", createApplication);

export default router;
