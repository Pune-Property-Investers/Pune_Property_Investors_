import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Also fallback to root .env if present
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
