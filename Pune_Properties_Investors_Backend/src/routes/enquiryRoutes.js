import { Router } from "express";
import {
    getAllEnquiries,
    createEnquiry,
    updateEnquiryStatus
} from "../controllers/enquiryController.js";
import { createRateLimiter, securityConfig } from "../config/security.js";

const router = Router();

// Anti-spam limiter: Max 10 submissions per 15 minutes per IP
const enquirySubmitLimiter = createRateLimiter(
    securityConfig.rateLimit.maxEnquiryRequests,
    securityConfig.rateLimit.windowMs
);

router.get("/", getAllEnquiries);
router.post("/", enquirySubmitLimiter, createEnquiry);
router.patch("/:id/status", updateEnquiryStatus);

export default router;
