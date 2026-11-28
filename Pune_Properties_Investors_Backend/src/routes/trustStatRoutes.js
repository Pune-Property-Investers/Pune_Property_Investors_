import { Router } from "express";
import {
    listTrustStats,
    getTrustStatById,
    createTrustStat,
    updateTrustStat,
    deleteTrustStat,
} from "../controllers/trustStatController.js";

const router = Router();

router.get("/", listTrustStats);
router.get("/:id", getTrustStatById);
router.post("/", createTrustStat);
router.put("/:id", updateTrustStat);
router.patch("/:id", updateTrustStat);
router.delete("/:id", deleteTrustStat);

export default router;
