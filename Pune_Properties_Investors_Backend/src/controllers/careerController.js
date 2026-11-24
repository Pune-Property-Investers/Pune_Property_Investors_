import { CareerModel } from "../models/CareerModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listJobs = async (req, res, next) => {
    try {
        const jobs = await CareerModel.listJobs();
        return renderSuccess(res, jobs, "Jobs retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createJob = async (req, res, next) => {
    try {
        const created = await CareerModel.createJob(req.body);
        return renderSuccess(res, created, "Job created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateJob = async (req, res, next) => {
    try {
        const updated = await CareerModel.updateJob(req.params.id, req.body);
        return renderSuccess(res, updated, "Job updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteJob = async (req, res, next) => {
    try {
        await CareerModel.deleteJob(req.params.id);
        return renderSuccess(res, null, "Job deleted successfully");
    } catch (err) {
        next(err);
    }
};

export const listApplications = async (req, res, next) => {
    try {
        const apps = await CareerModel.listApplications();
        return renderSuccess(res, apps, "Applications retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createApplication = async (req, res, next) => {
    try {
        const created = await CareerModel.createApplication(req.body);
        return renderSuccess(res, created, "Application submitted successfully", 201);
    } catch (err) {
        next(err);
    }
};
