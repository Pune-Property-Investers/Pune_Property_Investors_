import { Router } from "express";
import {
    getHomepage,
    saveHomepageDraft,
    publishHomepage,
    getFestivalPopup,
    updateFestivalPopup,
    getShorts,
    updateShorts,
    getTestimonials,
    updateTestimonials,
    getAdvertisements,
    updateAdvertisements
} from "../controllers/contentController.js";

const router = Router();

router.get("/homepage", getHomepage);
router.put("/homepage/draft", saveHomepageDraft);
router.post("/homepage/publish", publishHomepage);

router.get("/festival-popup", getFestivalPopup);
router.put("/festival-popup", updateFestivalPopup);

router.get("/shorts", getShorts);
router.put("/shorts", updateShorts);

router.get("/testimonials", getTestimonials);
router.put("/testimonials", updateTestimonials);

router.get("/advertisements", getAdvertisements);
router.put("/advertisements", updateAdvertisements);

export default router;
