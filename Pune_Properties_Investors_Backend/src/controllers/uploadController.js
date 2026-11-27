import { renderSuccess, renderError } from "../views/responseView.js";

let mediaStore = [
    { id: 1, name: "Luxury Villa Banner", url: "/images/luxury-villa-bg.jpg", type: "image", size: "1.2 MB", createdAt: new Date().toISOString() },
    { id: 2, name: "Godrej Rivergreens Elevation", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80", type: "image", size: "850 KB", createdAt: new Date().toISOString() }
];

export const listMedia = async (req, res, next) => {
    try {
        const { type } = req.query;
        const results = type && type !== "all" 
            ? mediaStore.filter(m => m.type === type) 
            : mediaStore;
        return renderSuccess(res, results, "Media retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const handleUpload = async (req, res, next) => {
    try {
        // If file or base64 received
        const nextId = mediaStore.reduce((m, item) => Math.max(m, Number(item.id) || 0), 0) + 1;
        const filename = req.body?.name || `upload-${Date.now()}`;
        const url = req.body?.url || req.body?.dataUrl || "/images/luxury-villa-bg.jpg";

        const newMedia = {
            id: nextId,
            name: filename,
            url,
            type: req.body?.type || "image",
            size: req.body?.size || "500 KB",
            createdAt: new Date().toISOString()
        };

        mediaStore.unshift(newMedia);
        return renderSuccess(res, newMedia, "File uploaded successfully", 201);
    } catch (err) {
        next(err);
    }
};
