import { apiRequest, withMockFallback } from "./api.js";
import { testimonials } from "../data/testimonials.js";

let memoryTestimonials = [...testimonials];

export const testimonialService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/testimonials${query ? `?${query}` : ""}`),
            () => [...memoryTestimonials]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/testimonials/${id}`),
            () => memoryTestimonials.find((t) => String(t.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/testimonials", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryTestimonials.length + 1;
                const created = { ...payload, id: nextId };
                memoryTestimonials = [...memoryTestimonials, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/testimonials/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryTestimonials = memoryTestimonials.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload };
                        return updated;
                    }
                    return item;
                });
                return updated;
            }
        );
    },

    async delete(id) {
        return withMockFallback(
            () =>
                apiRequest(`/testimonials/${id}`, {
                    method: "DELETE",
                }),
            () => {
                const before = memoryTestimonials.length;
                memoryTestimonials = memoryTestimonials.filter((item) => String(item.id) !== String(id));
                return memoryTestimonials.length < before;
            }
        );
    },
};
