import helmet from "helmet";
import cors from "cors";

/**
 * Security Configuration
 * Configures CORS, Helmet HTTP headers, and API Rate Limiting.
 */

export const securityConfig = {
    cors: {
        origin: (origin, callback) => {
            const allowedOrigins = [
                process.env.FRONTEND_URL || "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:3001"
            ];
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("CORS policy violation: Access denied"), false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
    },

    helmet: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.ytimg.com"],
                frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com", "https://play.gumlet.io"],
                connectSrc: ["'self'"]
            }
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    },

    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes window
        maxRequestsPerWindow: 100, // Max 100 requests per IP per window
        maxEnquiryRequests: 10    // Max 10 enquiry submissions per 15 minutes per IP
    }
};

/**
 * In-memory sliding window rate limiter
 * Each limiter instance maintains its own isolated hit map.
 */
export const createRateLimiter = (maxHits = 100, windowMs = 15 * 60 * 1000) => {
    const ipHitMap = new Map();

    return (req, res, next) => {
        const clientIp = req.ip || req.connection?.remoteAddress || "unknown_ip";

        // In local development or on loopback/localhost, bypass rate limiting
        const isLocalhost =
            clientIp === "127.0.0.1" ||
            clientIp === "::1" ||
            clientIp.includes("127.0.0.1") ||
            clientIp === "::ffff:127.0.0.1" ||
            process.env.NODE_ENV !== "production";

        if (isLocalhost) {
            return next();
        }

        const now = Date.now();

        if (!ipHitMap.has(clientIp)) {
            ipHitMap.set(clientIp, []);
        }

        const timestamps = ipHitMap.get(clientIp);
        // Remove timestamps outside current window
        const validTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
        validTimestamps.push(now);
        ipHitMap.set(clientIp, validTimestamps);

        if (validTimestamps.length > maxHits) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later.",
                retryAfterSeconds: Math.ceil(windowMs / 1000)
            });
        }

        next();
    };
};

/**
 * Applies security middlewares to Express app
 */
export const applySecurity = (app) => {
    // 1. Helmet HTTP Security Headers
    app.use(helmet(securityConfig.helmet));

    // 2. CORS Security
    app.use(cors(securityConfig.cors));

    // 3. Global API Rate Limiter
    app.use("/api", createRateLimiter(securityConfig.rateLimit.maxRequestsPerWindow));

    // 4. Hide implementation details
    app.disable("x-powered-by");
};
