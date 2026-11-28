import { Router } from "express";
import {
    listPropertyShorts,
    getPropertyShortById,
    createPropertyShort,
    updatePropertyShort,
    deletePropertyShort
} from "../controllers/propertyShortController.js";

const router = Router();

router.get("/", listPropertyShorts);
router.get("/:id", getPropertyShortById);
router.post("/", createPropertyShort);
router.put("/:id", updatePropertyShort);
router.patch("/:id", updatePropertyShort);
router.delete("/:id", deletePropertyShort);

export default router;
