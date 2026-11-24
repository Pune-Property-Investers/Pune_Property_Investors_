import { ProjectModel } from "../models/ProjectModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listProjects = async (req, res, next) => {
    try {
        const projects = await ProjectModel.list(req.query);
        return renderSuccess(res, projects, "Projects retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const project = await ProjectModel.getById(req.params.id);
        if (!project) return renderError(res, "Project not found", 404);
        return renderSuccess(res, project, "Project retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createProject = async (req, res, next) => {
    try {
        const created = await ProjectModel.create(req.body);
        return renderSuccess(res, created, "Project created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const updated = await ProjectModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Project updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        await ProjectModel.delete(req.params.id);
        return renderSuccess(res, null, "Project deleted successfully");
    } catch (err) {
        next(err);
    }
};
