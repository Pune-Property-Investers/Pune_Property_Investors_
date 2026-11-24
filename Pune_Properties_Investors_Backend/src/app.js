import express from "express";
import { applySecurity } from "./config/security.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { renderError } from "./views/responseView.js";

const app = express();

// 1. Apply Security Architecture (Helmet, CORS, Global Rate Limiting, X-Powered-By removal)
applySecurity(app);

// 2. Body Parsers with size limits to prevent payload flooding
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 3. Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 4. Root Welcome Endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Pune Property Investors API",
        version: "1.0.0",
        docs: "/api/health"
    });
});

// 5. API Routes
app.use("/api", apiRoutes);

// 6. 404 Handler
app.use((req, res) => {
    return renderError(res, `Route ${req.originalUrl} not found`, 404);
});

// 7. Central Error Handler
app.use(errorHandler);

export default app;
