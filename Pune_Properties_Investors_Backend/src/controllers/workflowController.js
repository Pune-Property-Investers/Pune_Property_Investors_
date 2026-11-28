import { WorkflowModel } from "../models/WorkflowModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listWorkflowSteps = async (req, res, next) => {
    try {
        const steps = await WorkflowModel.list(req.query);
        return renderSuccess(res, steps, "Workflow steps retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getWorkflowStepById = async (req, res, next) => {
    try {
        const step = await WorkflowModel.getById(req.params.id);
        if (!step) return renderError(res, "Workflow step not found", 404);
        return renderSuccess(res, step, "Workflow step retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createWorkflowStep = async (req, res, next) => {
    try {
        const created = await WorkflowModel.create(req.body);
        return renderSuccess(res, created, "Workflow step created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateWorkflowStep = async (req, res, next) => {
    try {
        const updated = await WorkflowModel.update(req.params.id, req.body);
        if (!updated) return renderError(res, "Workflow step not found", 404);
        return renderSuccess(res, updated, "Workflow step updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteWorkflowStep = async (req, res, next) => {
    try {
        await WorkflowModel.delete(req.params.id);
        return renderSuccess(res, null, "Workflow step deleted successfully");
    } catch (err) {
        next(err);
    }
};
