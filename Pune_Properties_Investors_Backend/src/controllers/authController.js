import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { query, isDBConnected } from "../config/db.js";
import { JWT_SECRET } from "../middlewares/authMiddleware.js";
import { renderSuccess, renderError } from "../views/responseView.js";

// In-memory fallback admin for development/preview when DB is offline
const FALLBACK_ADMIN = {
    id: 1,
    name: "PPI Senior Administrator",
    email: "admin@punepropertyinvestor.com",
    // Default password: Admin@PPI2026!
    password_hash: bcrypt.hashSync("Admin@PPI2026!", 10),
    role: "SUPER_ADMIN"
};

/**
 * POST /api/auth/login
 * Validates credentials, checks MySQL/Fallback admin, returns JWT
 */
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return renderError(res, "Email and password are required", 400);
        }

        email = validator.normalizeEmail(email.trim()) || email.trim();

        let adminUser = null;

        if (isDBConnected()) {
            const results = await query(
                "SELECT id, name, email, password_hash, role FROM admins WHERE email = ? LIMIT 1",
                [email]
            );

            if (results && results.length > 0) {
                adminUser = results[0];
            }
        }

        // Fallback admin check if DB is offline or table is empty
        if (!adminUser && email.toLowerCase() === FALLBACK_ADMIN.email.toLowerCase()) {
            adminUser = FALLBACK_ADMIN;
        }

        if (!adminUser) {
            return renderError(res, "Invalid email or password", 401);
        }

        // Compare password securely using bcrypt
        const isMatch = await bcrypt.compare(password, adminUser.password_hash);
        if (!isMatch) {
            return renderError(res, "Invalid email or password", 401);
        }

        // Issue JWT token (expires in 24 hours)
        const token = jwt.sign(
            {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        return renderSuccess(
            res,
            {
                token,
                user: {
                    id: adminUser.id,
                    name: adminUser.name,
                    email: adminUser.email,
                    role: adminUser.role
                }
            },
            "Authentication successful"
        );
    } catch (error) {
        console.error("Login controller error:", error);
        return renderError(res, "Internal authentication failure", 500);
    }
};

/**
 * GET /api/auth/me
 * Retrieves current admin profile
 */
export const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return renderError(res, "Not authenticated", 401);
        }
        return renderSuccess(res, req.user, "Admin profile retrieved");
    } catch (error) {
        return renderError(res, error.message, 500);
    }
};

/**
 * POST /api/auth/change-password
 * Changes admin password securely
 */
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = req.user.id;

        if (!currentPassword || !newPassword || newPassword.length < 8) {
            return renderError(res, "New password must be at least 8 characters", 400);
        }

        if (isDBConnected()) {
            const results = await query(
                "SELECT password_hash FROM admins WHERE id = ? LIMIT 1",
                [adminId]
            );

            if (!results || results.length === 0) {
                return renderError(res, "Admin account not found", 404);
            }

            const isMatch = await bcrypt.compare(currentPassword, results[0].password_hash);
            if (!isMatch) {
                return renderError(res, "Current password does not match", 400);
            }

            const newHash = await bcrypt.hash(newPassword, 12);
            await query("UPDATE admins SET password_hash = ? WHERE id = ?", [newHash, adminId]);

            return renderSuccess(res, { success: true }, "Password changed successfully");
        } else {
            // Memory mode update
            const isMatch = await bcrypt.compare(currentPassword, FALLBACK_ADMIN.password_hash);
            if (!isMatch) {
                return renderError(res, "Current password does not match", 400);
            }
            FALLBACK_ADMIN.password_hash = await bcrypt.hash(newPassword, 12);
            return renderSuccess(res, { success: true }, "Password changed in session");
        }
    } catch (error) {
        return renderError(res, error.message, 500);
    }
};
