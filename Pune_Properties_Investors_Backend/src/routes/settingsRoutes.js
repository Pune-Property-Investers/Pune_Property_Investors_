import { Router } from "express";
import {
    getSettings,
    getSection,
    updateSection,
    updatePageSeo
} from "../controllers/settingsController.js";

const router = Router();

// Publicly read settings for website & seo metadata
router.get("/", getSettings);
router.get("/:section", getSection);

// Update settings sections (website, seo, pagesSeo, profile)
router.patch("/:section", updateSection);
router.put("/:section", updateSection);
router.post("/:section", updateSection);

// Update individual page SEO metadata
router.put("/pages-seo/:pageKey", updatePageSeo);
router.post("/pages-seo/:pageKey", updatePageSeo);

export default router;
