import { Router } from "express";
import propertyRoutes from "./propertyRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import authRoutes from "./authRoutes.js";
import floorPlanRoutes from "./floorPlanRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import projectRoutes from "./projectRoutes.js";
import locationRoutes from "./locationRoutes.js";
import developerRoutes from "./developerRoutes.js";
import articleRoutes from "./articleRoutes.js";
import careerRoutes from "./careerRoutes.js";
import contentRoutes from "./contentRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
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
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/projects", projectRoutes);
apiRouter.use("/locations", locationRoutes);
apiRouter.use("/developers", developerRoutes);
apiRouter.use("/articles", articleRoutes);
apiRouter.use("/careers", careerRoutes);
apiRouter.use("/content", contentRoutes);
apiRouter.use("/uploads", uploadRoutes);

export default apiRouter;
