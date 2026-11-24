import { apiRequest, withMockFallback } from "./api";
import { leadService } from "./lead.service";

export const floorPlanService = {
    async submitEnquiry(payload) {
        return withMockFallback(
            () =>
                apiRequest("/floor-plans/enquire", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () =>
                leadService.create({
                    type: "floor_plan",
                    name: payload.name,
                    phone: payload.phone,
                    email: payload.email || "",
                    propertyTitle: payload.propertyTitle,
                    locality: payload.locality || "Pune",
                    budget: payload.price,
                    notes: `Floor Plan: ${payload.planName} (${payload.bhk}, ${payload.carpetArea}) via WhatsApp`,
                    message: payload.message || `Requested floor plan for ${payload.planName}`
                })
        );
    }
};
