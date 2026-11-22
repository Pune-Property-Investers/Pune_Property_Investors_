import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "ppi_secure_jwt_secret_key_2026_super_safe";

/**
 * Middleware: Verify Bearer JWT Token
 * Protects administrative routes from unauthorized access.
 */
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access Denied: Missing Authorization header"
            });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Access Denied: Malformed token format (Bearer <token> required)"
            });
        }

        const token = parts[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Access Denied: Invalid or expired token",
            error: error.message
        });
    }
};

/**
 * Middleware: Verify Admin Privileges
 */
export const requireAdmin = (req, res, next) => {
    if (!req.user || (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN")) {
        return res.status(403).json({
            success: false,
            message: "Forbidden: Administrative privileges required"
        });
    }
    next();
};
