import { Router } from "express";
import propertyRoutes from "./propertyRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import authRoutes from "./authRoutes.js";
import floorPlanRoutes from "./floorPlanRoutes.js";
import { renderSuccess } from "../views/responseView.js";
import { isDBConnected } from "../config/db.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
    return renderSuccess(
        res,
        {
            status: "OK",
            timestamp: new Date().toISOString(),
            service: "Pune Property Investors Secured Backend API",
            database: isDBConnected() ? "MySQL Connected" : "In-Memory Safe Fallback Mode",
            security: "Protected with JWT, Helmet, CORS & Rate-Limiting"
        },
        "API is healthy and secure"
    );
});

// Resource routes
apiRouter.use("/auth", authRoutes);
apiRouter.use("/properties", propertyRoutes);
apiRouter.use("/enquiries", enquiryRoutes);
apiRouter.use("/leads", enquiryRoutes); // Alias for frontend leadService compatibility
apiRouter.use("/floor-plans", floorPlanRoutes);

export default apiRouter;
