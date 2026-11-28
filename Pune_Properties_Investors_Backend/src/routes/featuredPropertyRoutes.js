import { Router } from "express";
import {
    listFeaturedProperties,
    getFeaturedPropertyById,
    createFeaturedProperty,
    updateFeaturedProperty,
    deleteFeaturedProperty
} from "../controllers/featuredPropertyController.js";

const router = Router();

// Public & admin routes
router.get("/", listFeaturedProperties);
router.get("/:id", getFeaturedPropertyById);
router.post("/", createFeaturedProperty);
router.put("/:id", updateFeaturedProperty);
router.patch("/:id", updateFeaturedProperty);
router.delete("/:id", deleteFeaturedProperty);

export default router;
