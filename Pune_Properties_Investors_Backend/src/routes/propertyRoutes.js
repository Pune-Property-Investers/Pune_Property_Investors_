import { Router } from "express";
import {
    getAllProperties,
    getPropertyBySlug,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyController.js";

const router = Router();

router.get("/", getAllProperties);
router.get("/:slug", getPropertyBySlug);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
