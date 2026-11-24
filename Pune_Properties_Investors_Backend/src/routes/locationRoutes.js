import { Router } from "express";
import {
    listLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from "../controllers/locationController.js";

const router = Router();

router.get("/", listLocations);
router.get("/:id", getLocationById);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.patch("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
