import { Router } from "express";
import { getContactSettings, updateContactSettings } from "../controllers/contactSettingController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Public: GET contact settings
router.get("/", getContactSettings);

// Protected: Update contact settings (Admin only)
router.put("/", verifyToken, requireAdmin, updateContactSettings);

export default router;
