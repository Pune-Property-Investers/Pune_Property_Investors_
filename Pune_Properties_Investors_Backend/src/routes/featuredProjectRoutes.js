import { Router } from "express";
import {
    listFeaturedProjects,
    getFeaturedProjectById,
    createFeaturedProject,
    updateFeaturedProject,
    deleteFeaturedProject
} from "../controllers/featuredProjectController.js";

const router = Router();

router.get("/", listFeaturedProjects);
router.get("/:id", getFeaturedProjectById);
router.post("/", createFeaturedProject);
router.put("/:id", updateFeaturedProject);
router.patch("/:id", updateFeaturedProject);
router.delete("/:id", deleteFeaturedProject);

export default router;
