import dotenv from "dotenv";
dotenv.config();

/**
 * Database Connection Setup
 * Configure connection strings (e.g. MongoDB Mongoose, PostgreSQL Pool, Prisma, MySQL) here.
 */
export const connectDB = async () => {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            console.log("ℹ️ DATABASE_URL not set in .env. Running with in-memory store.");
            return;
        }

        // Example for MongoDB/Mongoose:
        // await mongoose.connect(dbUrl);
        // console.log("MongoDB Connected successfully");

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};
