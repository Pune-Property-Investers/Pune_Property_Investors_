import { Router } from "express";
import {
    getAllProperties,
    getPropertyBySlug,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Public Property Endpoints
router.get("/", getAllProperties);
router.get("/:slug", getPropertyBySlug);

// Protected Admin Property Management Endpoints (Requires valid JWT + Admin Role)
router.post("/", verifyToken, requireAdmin, createProperty);
router.put("/:id", verifyToken, requireAdmin, updateProperty);
router.delete("/:id", verifyToken, requireAdmin, deleteProperty);

export default router;
