import express from "express";
import {
    getHeroBadges,
    createHeroBadge,
    updateHeroBadge,
    deleteHeroBadge,
} from "../controllers/heroSettingController.js";

const router = express.Router();

router.get("/", getHeroBadges);
router.post("/", createHeroBadge);
router.put("/:id", updateHeroBadge);
router.delete("/:id", deleteHeroBadge);

export default router;
