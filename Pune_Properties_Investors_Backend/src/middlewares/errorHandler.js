import { renderError } from "../views/responseView.js";

/**
 * Centralized error-handling middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error("❌ Server Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return renderError(
        res,
        message,
        statusCode,
        process.env.NODE_ENV === "development" ? { stack: err.stack } : null
    );
};
