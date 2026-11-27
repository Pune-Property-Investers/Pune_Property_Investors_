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
import { isDBConnected, query } from "../config/db.js";

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
apiRouter.use("/news", articleRoutes);
apiRouter.use("/careers", careerRoutes);
apiRouter.use("/content", contentRoutes);
apiRouter.use("/uploads", uploadRoutes);

apiRouter.get("/dashboard/overview", async (req, res, next) => {
    try {
        if (!isDBConnected()) {
            return renderSuccess(res, { totalProperties: 0, totalProjects: 0, totalLeads: 0, totalArticles: 0, totalJobs: 0 }, "Database disconnected");
        }
        const [props, projs, leads, arts, jobs] = await Promise.all([
            query("SELECT COUNT(*) as c FROM properties"),
            query("SELECT COUNT(*) as c FROM projects"),
            query("SELECT COUNT(*) as c FROM enquiries"),
            query("SELECT COUNT(*) as c FROM articles"),
            query("SELECT COUNT(*) as c FROM jobs")
        ]);
        return renderSuccess(res, {
            totalProperties: props?.[0]?.c || 0,
            totalProjects: projs?.[0]?.c || 0,
            totalLeads: leads?.[0]?.c || 0,
            totalArticles: arts?.[0]?.c || 0,
            totalJobs: jobs?.[0]?.c || 0
        }, "Dashboard overview retrieved successfully");
    } catch (err) {
        next(err);
    }
});

export default apiRouter;
