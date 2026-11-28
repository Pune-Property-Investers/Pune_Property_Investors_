import { apiRequest, withMockFallback } from "./api.js";

const fallbackSteps = [
    { id: 1, stepNumber: 1, title: "Select Property", description: "Explore verified luxury properties and new launches that match your lifestyle and investment goals.", iconName: "MapPin" },
    { id: 2, stepNumber: 2, title: "Submit Your Enquiry", description: "Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.", iconName: "FileText" },
    { id: 3, stepNumber: 3, title: "Meet Our Expert", description: "Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.", iconName: "Users" },
    { id: 4, stepNumber: 4, title: "Visit Property", description: "Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.", iconName: "Building2" },
    { id: 5, stepNumber: 5, title: "Buy Property", description: "Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.", iconName: "KeyRound" },
    { id: 6, stepNumber: 6, title: "Loan Assistance", description: "Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.", iconName: "Landmark" },
    { id: 7, stepNumber: 7, title: "Customer Support", description: "Ongoing documentation, legal verification, agreement registration, and lifetime handover support.", iconName: "Headset" }
];

let memorySteps = [...fallbackSteps];

export const workflowService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/workflow-steps${query ? `?${query}` : ""}`),
            () => [...memorySteps]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/workflow-steps/${id}`),
            () => memorySteps.find((s) => String(s.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/workflow-steps", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memorySteps.length + 1;
                const created = { ...payload, id: nextId };
                memorySteps = [...memorySteps, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/workflow-steps/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memorySteps = memorySteps.map((item) => {
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
            () => apiRequest(`/workflow-steps/${id}`, { method: "DELETE" }),
            () => {
                memorySteps = memorySteps.filter((item) => String(item.id) !== String(id));
                return true;
            }
        );
    },
};
