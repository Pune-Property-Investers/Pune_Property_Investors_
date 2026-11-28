import { Router } from "express";
import {
    listNewLaunches,
    getNewLaunchById,
    createNewLaunch,
    updateNewLaunch,
    deleteNewLaunch
} from "../controllers/newLaunchProjectController.js";

const router = Router();

router.get("/", listNewLaunches);
router.get("/:id", getNewLaunchById);
router.post("/", createNewLaunch);
router.put("/:id", updateNewLaunch);
router.patch("/:id", updateNewLaunch);
router.delete("/:id", deleteNewLaunch);

export default router;
