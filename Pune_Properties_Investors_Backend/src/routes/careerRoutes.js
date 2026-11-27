import { Router } from "express";
import {
    listJobs,
    createJob,
    updateJob,
    deleteJob,
    listApplications,
    createApplication
} from "../controllers/careerController.js";
import { CareerModel } from "../models/CareerModel.js";
import { renderSuccess } from "../views/responseView.js";

const router = Router();

router.get("/jobs", listJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.patch("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

router.get("/applications", listApplications);
router.post("/applications", createApplication);
router.patch("/applications/:id", async (req, res, next) => {
    try {
        const updated = await CareerModel.updateApplication(req.params.id, req.body);
        return renderSuccess(res, updated, "Application updated successfully");
    } catch (err) {
        next(err);
    }
});
router.put("/applications/:id", async (req, res, next) => {
    try {
        const updated = await CareerModel.updateApplication(req.params.id, req.body);
        return renderSuccess(res, updated, "Application updated successfully");
    } catch (err) {
        next(err);
    }
});

export default router;
