import { Router } from "express";
import {
    listDevelopers,
    getDeveloperById,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
} from "../controllers/developerController.js";

const router = Router();

router.get("/", listDevelopers);
router.get("/:id", getDeveloperById);
router.post("/", createDeveloper);
router.put("/:id", updateDeveloper);
router.patch("/:id", updateDeveloper);
router.delete("/:id", deleteDeveloper);

export default router;
