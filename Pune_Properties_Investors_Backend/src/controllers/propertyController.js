import { PropertyService } from "../services/propertyService.js";
import { validatePropertyDTO, validatePropertyFilterDTO } from "../dtos/PropertyDTO.js";
import { renderSuccess } from "../views/responseView.js";

/**
 * Property Controller
 * Lean HTTP Controller: delegating to DTOs for validation and Services for business logic.
 */

export const getAllProperties = async (req, res, next) => {
    try {
        const filterDTO = validatePropertyFilterDTO(req.query);
        const properties = await PropertyService.getProperties(filterDTO);

        return renderSuccess(res, properties, "Properties retrieved successfully", 200, {
            count: properties.length,
            filters: filterDTO
        });
    } catch (error) {
        next(error);
    }
};

export const getPropertyBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const property = await PropertyService.getPropertyBySlugOrId(slug);
        return renderSuccess(res, property, "Property details retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const propertyDTO = validatePropertyDTO(req.body, false);
        const newProperty = await PropertyService.createProperty(propertyDTO);
        return renderSuccess(res, newProperty, "Property created successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const updateProperty = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateDTO = validatePropertyDTO(req.body, true);
        const updated = await PropertyService.updateProperty(id, updateDTO);
        return renderSuccess(res, updated, "Property updated successfully");
    } catch (error) {
        next(error);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {
        const { id } = req.params;
        await PropertyService.deleteProperty(id);
        return renderSuccess(res, null, "Property deleted successfully");
    } catch (error) {
        next(error);
    }
};
