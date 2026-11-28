import express from "express";
import {
    getHeroSettings,
    updateHeroSettings,
    getHeroBadges,
    createHeroBadge,
    updateHeroBadge,
    deleteHeroBadge,
} from "../controllers/heroSettingController.js";

const router = express.Router();

router.get("/", getHeroSettings);
router.put("/", updateHeroSettings);

router.get("/badges", getHeroBadges);
router.post("/badges", createHeroBadge);
router.put("/badges/:id", updateHeroBadge);
router.delete("/badges/:id", deleteHeroBadge);

export default router;
