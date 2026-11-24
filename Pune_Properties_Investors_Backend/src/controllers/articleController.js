import { ArticleModel } from "../models/ArticleModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listArticles = async (req, res, next) => {
    try {
        const { type } = req.query;
        const articles = await ArticleModel.list(type);
        return renderSuccess(res, articles, "Articles retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.getById(req.params.id);
        if (!article) return renderError(res, "Article not found", 404);
        return renderSuccess(res, article, "Article retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createArticle = async (req, res, next) => {
    try {
        const created = await ArticleModel.create(req.body);
        return renderSuccess(res, created, "Article created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateArticle = async (req, res, next) => {
    try {
        const updated = await ArticleModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Article updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteArticle = async (req, res, next) => {
    try {
        await ArticleModel.delete(req.params.id);
        return renderSuccess(res, null, "Article deleted successfully");
    } catch (err) {
        next(err);
    }
};
