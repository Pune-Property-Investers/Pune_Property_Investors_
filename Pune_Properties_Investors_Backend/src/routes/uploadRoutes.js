import { Router } from "express";
import { listMedia, handleUpload, deleteMedia } from "../controllers/uploadController.js";

const router = Router();

router.get("/", listMedia);
router.post("/", handleUpload);
router.post("/external", handleUpload);
router.delete("/:id", deleteMedia);

export default router;
