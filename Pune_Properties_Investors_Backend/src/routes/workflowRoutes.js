import { Router } from "express";
import {
    listWorkflowSteps,
    getWorkflowStepById,
    createWorkflowStep,
    updateWorkflowStep,
    deleteWorkflowStep,
} from "../controllers/workflowController.js";

const router = Router();

router.get("/", listWorkflowSteps);
router.get("/:id", getWorkflowStepById);
router.post("/", createWorkflowStep);
router.put("/:id", updateWorkflowStep);
router.patch("/:id", updateWorkflowStep);
router.delete("/:id", deleteWorkflowStep);

export default router;
