import { Router } from "express";
import {
    listProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
