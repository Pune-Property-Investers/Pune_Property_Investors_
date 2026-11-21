import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    // Connect to database
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 PPI Backend Server running on port ${PORT}`);
        console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
    });
};

startServer();
