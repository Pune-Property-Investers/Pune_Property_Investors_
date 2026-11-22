import { Router } from "express";
import { submitFloorPlanEnquiry, getFloorPlanEnquiries } from "../controllers/floorPlanController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";
import { createRateLimiter } from "../config/security.js";

const router = Router();

const enquiryLimiter = createRateLimiter(20, 15 * 60 * 1000);

// Public submission endpoint
router.post("/enquire", enquiryLimiter, submitFloorPlanEnquiry);

// Protected admin retrieval
router.get("/enquiries", verifyToken, requireAdmin, getFloorPlanEnquiries);

export default router;
