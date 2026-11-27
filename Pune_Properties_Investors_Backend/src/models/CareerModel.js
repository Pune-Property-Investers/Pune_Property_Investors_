import { query, isDBConnected } from "../config/db.js";

let memoryJobs = [
    {
        id: 1,
        title: "Senior Real Estate Investment Advisor",
        category: "Sales & Advisory",
        location: "Kharadi, Pune",
        experience: "3-6 years",
        type: "Full Time",
        status: "Open",
        description: "Guide high-net-worth clients and homebuyers in making informed property purchases across Pune's prime luxury corridors."
    },
    {
        id: 2,
        title: "Digital Marketing & Performance Lead",
        category: "Marketing",
        location: "Kharadi, Pune",
        experience: "2-4 years",
        type: "Full Time",
        status: "Open",
        description: "Drive lead generation across Meta, Google Search, and YouTube for primary developer launches."
    }
];

let memoryApplications = [];

export const CareerModel = {
    async listJobs() {
        return [...memoryJobs];
    },

    async createJob(payload) {
        const nextId = memoryJobs.reduce((m, j) => Math.max(m, Number(j.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, createdAt: new Date().toISOString() };
        memoryJobs.unshift(created);
        return created;
    },

    async updateJob(id, payload) {
        const idx = memoryJobs.findIndex(j => String(j.id) === String(id));
        if (idx !== -1) {
            memoryJobs[idx] = { ...memoryJobs[idx], ...payload, updatedAt: new Date().toISOString() };
        }
        return memoryJobs[idx] || null;
    },

    async deleteJob(id) {
        memoryJobs = memoryJobs.filter(j => String(j.id) !== String(id));
        return true;
    },

    async listApplications() {
        return [...memoryApplications];
    },

    async createApplication(payload) {
        const nextId = memoryApplications.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, createdAt: new Date().toISOString() };
        memoryApplications.unshift(created);
        return created;
    }
};
