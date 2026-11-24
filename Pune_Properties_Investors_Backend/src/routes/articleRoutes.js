import { Router } from "express";
import {
    listArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} from "../controllers/articleController.js";

const router = Router();

router.get("/", listArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
