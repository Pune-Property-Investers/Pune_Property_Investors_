import { TestimonialModel } from "../models/TestimonialModel.js";

export const getTestimonials = async (req, res) => {
    try {
        const filters = {
            isActive: req.query.isActive !== undefined ? req.query.isActive === "true" || req.query.isActive === "1" : undefined,
            all: req.query.all === "true" || req.query.all === "1",
        };
        const items = await TestimonialModel.list(filters);
        res.status(200).json({
            success: true,
            count: items.length,
            message: "Testimonials retrieved successfully",
            data: items,
        });
    } catch (err) {
        console.error("getTestimonials error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonials",
            error: err.message,
        });
    }
};

export const getTestimonialById = async (req, res) => {
    try {
        const item = await TestimonialModel.getById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }
        res.status(200).json({
            success: true,
            data: item,
        });
    } catch (err) {
        console.error("getTestimonialById error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonial",
            error: err.message,
        });
    }
};

export const createTestimonial = async (req, res) => {
    try {
        const created = await TestimonialModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            data: created,
        });
    } catch (err) {
        console.error("createTestimonial error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create testimonial",
            error: err.message,
        });
    }
};

export const updateTestimonial = async (req, res) => {
    try {
        const updated = await TestimonialModel.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Testimonial updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("updateTestimonial error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update testimonial",
            error: err.message,
        });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const success = await TestimonialModel.delete(req.params.id);
        if (!success) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully",
        });
    } catch (err) {
        console.error("deleteTestimonial error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete testimonial",
            error: err.message,
        });
    }
};
