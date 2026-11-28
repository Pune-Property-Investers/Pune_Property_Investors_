import { Router } from "express";
import {
    listTrustHighlights,
    getTrustHighlightById,
    createTrustHighlight,
    updateTrustHighlight,
    deleteTrustHighlight,
} from "../controllers/trustHighlightController.js";

const router = Router();

router.get("/", listTrustHighlights);
router.get("/:id", getTrustHighlightById);
router.post("/", createTrustHighlight);
router.put("/:id", updateTrustHighlight);
router.patch("/:id", updateTrustHighlight);
router.delete("/:id", deleteTrustHighlight);

export default router;
