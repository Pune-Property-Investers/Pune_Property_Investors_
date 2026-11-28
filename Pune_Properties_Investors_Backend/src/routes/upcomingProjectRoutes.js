import { Router } from "express";
import {
    listUpcomingProjects,
    getFeaturedUpcomingProject,
    getUpcomingProjectById,
    createUpcomingProject,
    updateUpcomingProject,
    deleteUpcomingProject,
} from "../controllers/upcomingProjectController.js";

const router = Router();

router.get("/", listUpcomingProjects);
router.get("/featured", getFeaturedUpcomingProject);
router.get("/:id", getUpcomingProjectById);
router.post("/", createUpcomingProject);
router.patch("/:id", updateUpcomingProject);
router.put("/:id", updateUpcomingProject);
router.delete("/:id", deleteUpcomingProject);

export default router;
