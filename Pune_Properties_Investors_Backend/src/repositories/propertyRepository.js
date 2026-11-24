import { PropertyModel } from "../models/PropertyModel.js";

/**
 * Property Repository (Data Access Layer)
 * Isolates data storage and query execution from the business logic layer.
 * Any future transition (e.g. Mongoose, Prisma, TypeORM, Knex) is implemented here.
 */

export const PropertyRepository = {
    async findAll() {
        return await PropertyModel.findAll();
    },

    async findById(id) {
        return await PropertyModel.findBySlugOrId(id);
    },

    async findBySlug(slug) {
        return await PropertyModel.findBySlugOrId(slug);
    },

    async findByIdOrSlug(identifier) {
        return await PropertyModel.findBySlugOrId(identifier);
    },

    async create(propertyData) {
        return await PropertyModel.create(propertyData);
    },

    async update(id, updateData) {
        return await PropertyModel.update(id, updateData);
    },

    async delete(id) {
        return await PropertyModel.delete(id);
    }
};
