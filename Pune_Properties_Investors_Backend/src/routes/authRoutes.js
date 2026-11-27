import { Router } from "express";
import { login, getMe, changePassword } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createRateLimiter } from "../config/security.js";

const router = Router();

// Dedicated Rate Limiting on Login to prevent brute-force attacks (3 attempts per 15 mins)
const loginRateLimiter = createRateLimiter(3, 15 * 60 * 1000);

router.post("/login", loginRateLimiter, login);
router.post("/logout", (req, res) => res.status(200).json({ success: true, message: "Logged out successfully" }));
router.get("/me", verifyToken, getMe);
router.post("/change-password", verifyToken, changePassword);

export default router;

