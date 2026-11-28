import { Router } from "express";
import {
    getAdvertisementPopupSettings,
    updateAdvertisementPopupSettings,
} from "../controllers/advertisementPopupController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Public: GET popup settings
router.get("/", getAdvertisementPopupSettings);

// Protected: Update popup settings (Admin only)
router.put("/", verifyToken, requireAdmin, updateAdvertisementPopupSettings);

export default router;
