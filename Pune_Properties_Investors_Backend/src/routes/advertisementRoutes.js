import { Router } from "express";
import {
    listAdvertisements,
    getAdvertisementById,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
} from "../controllers/advertisementController.js";

const router = Router();

router.get("/", listAdvertisements);
router.get("/:id", getAdvertisementById);
router.post("/", createAdvertisement);
router.put("/:id", updateAdvertisement);
router.patch("/:id", updateAdvertisement);
router.delete("/:id", deleteAdvertisement);

export default router;
