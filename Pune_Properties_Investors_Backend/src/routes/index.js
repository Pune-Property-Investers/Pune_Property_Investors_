import { Router } from "express";
import propertyRoutes from "./propertyRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import { renderSuccess } from "../views/responseView.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
    return renderSuccess(res, {
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "PPI Backend API"
    }, "API is live and healthy");
});

// Resource routes
apiRouter.use("/properties", propertyRoutes);
apiRouter.use("/enquiries", enquiryRoutes);

export default apiRouter;
