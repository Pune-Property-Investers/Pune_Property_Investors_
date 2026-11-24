import { Router } from "express";
import { listMedia, handleUpload } from "../controllers/uploadController.js";

const router = Router();

router.get("/", listMedia);
router.post("/", handleUpload);

export default router;
