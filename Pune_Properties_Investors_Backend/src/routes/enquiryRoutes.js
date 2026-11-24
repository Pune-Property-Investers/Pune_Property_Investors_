import { Router } from "express";
import {
    getAllEnquiries,
    getEnquiryById,
    createEnquiry,
    updateEnquiry,
    updateEnquiryStatus,
    deleteEnquiry
} from "../controllers/enquiryController.js";
import { createRateLimiter, securityConfig } from "../config/security.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Anti-spam limiter: Max 10 submissions per 15 minutes per IP
const enquirySubmitLimiter = createRateLimiter(
    securityConfig.rateLimit.maxEnquiryRequests,
    securityConfig.rateLimit.windowMs
);

// Public Lead/Enquiry Submission Endpoint
router.post("/", enquirySubmitLimiter, createEnquiry);

// Protected Admin Lead Management Endpoints (Requires valid JWT + Admin Role)
router.get("/", verifyToken, requireAdmin, getAllEnquiries);
router.get("/:id", verifyToken, requireAdmin, getEnquiryById);
router.patch("/:id", verifyToken, requireAdmin, updateEnquiry);
router.put("/:id", verifyToken, requireAdmin, updateEnquiry);
router.patch("/:id/status", verifyToken, requireAdmin, updateEnquiryStatus);
router.delete("/:id", verifyToken, requireAdmin, deleteEnquiry);

export default router;
