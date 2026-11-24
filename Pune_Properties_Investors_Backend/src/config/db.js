import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

let pool = null;
let isConnected = false;

/**
 * Initializes MySQL Connection Pool
 * Supports both DATABASE_URL (connection URI) and discrete environment variables.
 */
export const connectDB = async () => {
    try {
        const {
            DATABASE_URL,
            MYSQL_HOST = "localhost",
            MYSQL_USER = "root",
            MYSQL_PASSWORD = "",
            MYSQL_DATABASE = "ppi_real_estate",
            MYSQL_PORT = 3306,
            MYSQL_SSL = "false"
        } = process.env;

        // Configuration object
        const config = DATABASE_URL
            ? { uri: DATABASE_URL }
            : {
                  host: MYSQL_HOST,
                  user: MYSQL_USER,
                  password: MYSQL_PASSWORD,
                  database: MYSQL_DATABASE,
                  port: Number(MYSQL_PORT),
                  ssl: MYSQL_SSL === "true" ? { rejectUnauthorized: true } : undefined,
                  waitForConnections: true,
                  connectionLimit: 10,
                  queueLimit: 0
              };

        // If no credentials or connection string provided in production, warn
        if (!DATABASE_URL && !process.env.MYSQL_DATABASE && !process.env.MYSQL_HOST) {
            console.log("ℹ️ MySQL credentials not configured in .env. Running with in-memory adapter fallback.");
            return null;
        }

        pool = mysql.createPool(config);

        // Test connection
        const connection = await pool.getConnection();
        console.log("✅ MySQL Database connected successfully!");
        connection.release();
        isConnected = true;

        // Auto-run schema migrations
        await initializeSchema();

        return pool;
    } catch (error) {
        console.warn(`⚠️ MySQL Connection attempt warning: ${error.message}`);
        console.log("ℹ️ Backend will continue running in memory-safe fallback mode.");
        isConnected = false;
        return null;
    }
};

/**
 * Executes a parameterized SQL query safely
 */
export const query = async (sql, params = []) => {
    if (!pool || !isConnected) {
        return null;
    }
    const [results] = await pool.execute(sql, params);
    return results;
};

export const isDBConnected = () => isConnected;

/**
 * Auto-creates tables if they do not exist
 */
async function initializeSchema() {
    if (!pool) return;

    try {
        // 1. Admins Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(191) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'SUPER_ADMIN',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 2. Properties Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS properties (
                id VARCHAR(64) PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                title VARCHAR(255) NOT NULL,
                developer VARCHAR(150),
                location VARCHAR(200),
                locality VARCHAR(100),
                city VARCHAR(100) DEFAULT 'Pune',
                property_category VARCHAR(50) DEFAULT 'residential',
                property_type VARCHAR(50) DEFAULT 'Apartment',
                purpose VARCHAR(20) DEFAULT 'buy',
                price VARCHAR(100),
                numeric_price BIGINT DEFAULT 0,
                bhk JSON,
                area VARCHAR(100),
                status VARCHAR(50) DEFAULT 'Under Construction',
                possession VARCHAR(50),
                is_new_launch BOOLEAN DEFAULT FALSE,
                is_featured BOOLEAN DEFAULT FALSE,
                is_trending BOOLEAN DEFAULT FALSE,
                verified BOOLEAN DEFAULT TRUE,
                badge VARCHAR(100),
                image TEXT,
                images JSON,
                video_url TEXT,
                description TEXT,
                amenities JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_locality (locality),
                INDEX idx_category (property_category),
                INDEX idx_purpose (purpose)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 3. Enquiries / Leads Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS enquiries (
                id VARCHAR(64) PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                phone VARCHAR(30) NOT NULL,
                email VARCHAR(191),
                property_id VARCHAR(64),
                property_title VARCHAR(255),
                locality VARCHAR(150),
                budget VARCHAR(100),
                message TEXT,
                type VARCHAR(50) DEFAULT 'contact',
                date VARCHAR(50),
                time VARCHAR(50),
                status VARCHAR(50) DEFAULT 'New',
                follow_up_date DATE,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_status (status),
                INDEX idx_created (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Upgrade legacy enum type column to VARCHAR(50) if necessary
        try {
            await pool.execute(`ALTER TABLE enquiries MODIFY COLUMN type VARCHAR(50) DEFAULT 'contact';`);
        } catch (_) {}

        // 4. Floor Plans Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS floor_plans (
                id VARCHAR(64) PRIMARY KEY,
                property_id VARCHAR(64),
                property_title VARCHAR(255),
                plan_name VARCHAR(150) NOT NULL,
                bhk VARCHAR(50) NOT NULL,
                bhk_category VARCHAR(50),
                config VARCHAR(100),
                carpet_area INT,
                super_area INT,
                balcony_area INT,
                facing VARCHAR(100),
                price VARCHAR(100),
                price_label VARCHAR(50) DEFAULT 'Starting from',
                description TEXT,
                rooms JSON,
                tag VARCHAR(100),
                image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_fp_property (property_id),
                INDEX idx_fp_bhk (bhk)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 5. Floor Plan Enquiries Table (WhatsApp & Website inquiries)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS floor_plan_enquiries (
                id VARCHAR(64) PRIMARY KEY,
                property_id VARCHAR(64),
                property_title VARCHAR(255),
                plan_id VARCHAR(64),
                plan_name VARCHAR(150),
                bhk VARCHAR(50),
                carpet_area VARCHAR(50),
                price VARCHAR(100),
                client_name VARCHAR(150) NOT NULL,
                client_phone VARCHAR(30) NOT NULL,
                client_email VARCHAR(191),
                message TEXT,
                channel VARCHAR(50) DEFAULT 'WhatsApp',
                status VARCHAR(50) DEFAULT 'New',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_fpe_phone (client_phone),
                INDEX idx_fpe_property (property_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 6. Settings Table (Website, Global SEO, Page-by-Page SEO, Profile)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS settings (
                section_key VARCHAR(64) PRIMARY KEY,
                section_data JSON NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 7. Projects Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR(64) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(191) NOT NULL UNIQUE,
                developer VARCHAR(150),
                location VARCHAR(200),
                locality VARCHAR(100),
                price VARCHAR(100),
                status VARCHAR(50) DEFAULT 'Under Construction',
                publication_status VARCHAR(50) DEFAULT 'Published',
                configurations VARCHAR(100),
                possession_date VARCHAR(50),
                featured BOOLEAN DEFAULT FALSE,
                image TEXT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 8. Locations Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS locations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(100) NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                tagline VARCHAR(200),
                avg_price_per_sqft INT DEFAULT 0,
                price_growth_rate VARCHAR(50),
                landmarks JSON,
                image TEXT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 9. Developers Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS developers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                domain VARCHAR(100),
                logo_url TEXT,
                website TEXT,
                phone VARCHAR(50),
                email VARCHAR(191),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 10. Articles Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS articles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(50) DEFAULT 'blog',
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(191) NOT NULL UNIQUE,
                category VARCHAR(100),
                author VARCHAR(100),
                date VARCHAR(50),
                read_time VARCHAR(50),
                status VARCHAR(50) DEFAULT 'Published',
                image TEXT,
                excerpt TEXT,
                content LONGTEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 11. Careers Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS jobs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100),
                location VARCHAR(100),
                experience VARCHAR(100),
                type VARCHAR(50) DEFAULT 'Full Time',
                status VARCHAR(50) DEFAULT 'Open',
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        console.log("🛡️ MySQL Tables initialized successfully (admins, properties, enquiries, floor_plans, floor_plan_enquiries, settings, projects, locations, developers, articles, jobs).");
    } catch (err) {
        console.error("Schema initialization error:", err.message);
    }
}
