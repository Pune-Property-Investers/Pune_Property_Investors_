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
    updateAdvertisements,
    getPublicContent,
    publishSection,
    retrieveSection,
    revertHomepage
} from "../controllers/contentController.js";

const router = Router();

router.get("/public", getPublicContent);
router.get("/homepage", getHomepage);
router.put("/homepage/draft", saveHomepageDraft);
router.post("/homepage/publish", publishHomepage);
router.post("/homepage/revert", revertHomepage);

router.post("/sections/:sectionKey/publish", publishSection);
router.post("/sections/:sectionKey/retrieve", retrieveSection);

router.get("/festival-popup", getFestivalPopup);
router.put("/festival-popup", updateFestivalPopup);

router.get("/shorts", getShorts);
router.put("/shorts", updateShorts);
router.put("/shorts/bulk", updateShorts);

router.get("/testimonials", getTestimonials);
router.put("/testimonials", updateTestimonials);
router.put("/testimonials/bulk", updateTestimonials);

router.get("/advertisements", getAdvertisements);
router.put("/advertisements", updateAdvertisements);
router.put("/advertisements/bulk", updateAdvertisements);

export default router;
