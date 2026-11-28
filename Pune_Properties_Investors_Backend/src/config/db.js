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

        // 12. Featured Projects Table (Container 1: Explore Our Featured Projects)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS featured_projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                developer VARCHAR(150) NOT NULL,
                logo_url VARCHAR(255),
                domain VARCHAR(150),
                logo_brand VARCHAR(100),
                logo_sub VARCHAR(100),
                location VARCHAR(200) NOT NULL,
                price VARCHAR(100) NOT NULL,
                numeric_price BIGINT DEFAULT 0,
                property_type VARCHAR(60) DEFAULT 'Residential',
                configuration VARCHAR(150),
                subtitle VARCHAR(255),
                area VARCHAR(100),
                status VARCHAR(60) DEFAULT 'Under Construction',
                possession VARCHAR(60) DEFAULT 'Under Construction',
                rera_id VARCHAR(100) DEFAULT 'RERA Approved',
                image_url TEXT NOT NULL,
                badge VARCHAR(100) DEFAULT 'Featured',
                description TEXT,
                amenities JSON,
                display_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_fp_slug (slug),
                INDEX idx_fp_developer (developer),
                INDEX idx_fp_price (numeric_price),
                INDEX idx_fp_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 8 featured projects if table is empty
        const [fpCountResult] = await pool.execute("SELECT COUNT(*) as count FROM featured_projects");
        if (fpCountResult && fpCountResult[0]?.count === 0) {
            const seedSql = `
                INSERT INTO featured_projects (
                    id, slug, name, developer, logo_url, domain, logo_brand, logo_sub,
                    location, price, numeric_price, property_type, configuration, subtitle,
                    area, status, possession, rera_id, image_url, badge, description,
                    amenities, display_order, is_active
                ) VALUES 
                (1, 'paras-emperor', 'Paras Emperor', 'Paras Buildtech', '/images/logos/paras-emperor.png', 'parasbuildtech.com', 'PARAS', 'THE ICON TOWER', 'Bawadia Kalan, Bhopal', '₹ 2.37 - 5.5 Cr', 23700000, 'Residential', '4,5 BHK Apartment', '4,5 BHK Apartment, Bawadia Kalan, Bhopal', '2,450 - 4,800 sq.ft.', 'Ready to Move', 'Ready', 'RERA Approved', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 'Featured', 'Palatial sky mansions featuring double-height club lounges, wrap-around sundecks, and Olympic-length infinity pool with concierge assistance.', '["Olympic Infinity Pool", "Private Balcony Decks", "Clubhouse", "Concierge"]', 1, TRUE),
                (2, 'godrej-ivara', 'Godrej Ivara', 'Godrej Properties', '/images/logos/godrej.png', 'godrejproperties.com', 'Godrej', 'PROPERTIES', 'Hinjewadi Phase 1, Pune', '₹ 1.28 - 2.80 Cr', 12800000, 'Residential', '2, 3 BHK Botanical Suites', '2, 3 BHK Botanical Suites, Hinjewadi', '850 - 1,850 sq.ft.', 'Under Construction', 'Under Construction', 'P52100051240', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 'Featured', 'Botanical luxury suites amidst landscaped forest gardens, private decks, and club lifestyle in Hinjewadi IT corridor.', '["Botanical Garden", "Infinity Pool", "Sky Lounge", "Clubhouse"]', 2, TRUE),
                (3, 'kolte-patil-life-republic', 'Kolte-Patil Life Republic', 'Kolte-Patil', '/images/logos/kolte-patil.jpg', 'koltepatil.com', 'Kolte-Patil', 'DEVELOPERS', 'Hinjewadi - Marunji, Pune', '₹ 98 Lacs - 1.85 Cr', 9800000, 'Residential', '2, 3 BHK High-Street Condos', '2, 3 BHK High-Street Condos, Hinjewadi', '850 - 1,280 sq.ft.', 'Ready to Move', 'Ready', 'P52100028456', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 'Featured', '400-acre self-sustaining township with Olympic sports arena, urban lakes, high-street shopping, and green promenades.', '["Sports Arena", "Urban Lake Walk", "High-Street Retail", "Clubhouse"]', 3, TRUE),
                (4, 'vtp-blue-waters', 'VTP Blue Waters', 'VTP Realty', '/images/logos/vtp.png', 'vtprealty.in', 'VTP', 'REALTY', 'Mahalunge, Baner Next, Pune', '₹ 85.00 Lacs - 1.95 Cr', 8500000, 'Residential', '2, 3 & 4 BHK Riverwalk Apts', '2, 3 & 4 BHK Riverwalk Apts, Mahalunge', '780 - 1,300 sq.ft.', 'Under Construction', 'Under Construction', 'P52100028456', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', 'Featured', 'Contemporary riverfront residences offering lifestyle facilities and instant connectivity to Hinjewadi & Baner.', '["Riverwalk Promenade", "Infinity Pool", "Gymnasium", "Multipurpose Hall"]', 4, TRUE),
                (5, 'sobha-nesara', 'Sobha Nesara', 'Sobha Limited', '/images/logos/sobha.png', 'sobha.com', 'SOBHA', 'LIMITED', 'Kothrud, Pune', '₹ 1.65 - 3.20 Cr', 16500000, 'Residential', '3 & 4 BHK Luxury Suites', '3 & 4 BHK Luxury Suites, Kothrud', '1,450 - 2,350 sq.ft.', 'Ready to Move', 'Ready', 'P52100020145', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85', 'Featured', 'German-engineered luxury high-rises commanding views of NDA green reserve with Italian marble finish.', '["German Engineering", "Indoor Badminton", "Infinity Pool", "Spa Lounge"]', 5, TRUE),
                (6, 'shapoorji-joyville', 'Shapoorji Joyville', 'Shapoorji Pallonji', '/images/logos/shapoorji.svg', 'shapoorjirealestate.com', 'SHAPOORJI', 'PALLONJI', 'Hadapsar Annexe, Pune', '₹ 72 Lacs - 1.45 Cr', 7200000, 'Residential', '2 & 3 BHK Smart Homes', '2 & 3 BHK Smart Homes, Hadapsar', '750 - 1,180 sq.ft.', 'Under Construction', 'Under Construction', 'P52100024888', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'Featured', '150-year legacy of engineering excellence. Smart automated homes next to SP Infocity and Magarpatta.', '["35,000 Sq.Ft Clubhouse", "Biometric Security", "Swimming Pool", "Kids Play Area"]', 6, TRUE),
                (7, 'lodha-belmondo', 'Lodha Belmondo', 'Lodha Group', '/images/logos/lodha.png', 'lodhagroup.com', 'LODHA', 'LUXURY', 'Gahunje, Pune Expressway', '₹ 1.45 Cr - 4.50 Cr', 14500000, 'Residential', '3, 4 & 5 BHK Golf Villas', '3, 4 & 5 BHK Golf Villas, Gahunje', '950 - 2,800 sq.ft.', 'Ready to Move', 'Ready', 'P52100000450', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', 'Featured', '100-acre riverside luxury reserve surrounding a 9-hole Greg Norman golf course and 50,000 sq.ft clubhouse.', '["9-Hole Golf Course", "50,000 Sq.Ft Clubhouse", "Helipad", "Private Spa"]', 7, TRUE),
                (8, 'kohinoor-kaleido', 'Kohinoor Kaleido', 'Kohinoor Group', '/images/logos/kohinoor.png', 'kohinoorpune.com', 'Kohinoor', 'GROUP', 'Wagholi - Kharadi Ext., Pune', '₹ 68.20 Lacs - 1.25 Cr', 6820000, 'Residential', '2 & 3 BHK Nature Homes', '2 & 3 BHK Nature Terraces, Wagholi', '720 - 1,150 sq.ft.', 'Under Construction', 'Under Construction', 'P52100031890', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', 'Featured', 'Well-planned homes with modern interiors, lifestyle amenities, and access to key areas of East Pune and EON IT Park.', '["Fitness Centre", "Children''s Play Area", "Clubhouse", "Security"]', 8, TRUE)
            `;
            await pool.execute(seedSql);
            console.log("🌱 Auto-seeded 8 featured projects successfully into MySQL.");
        }

        // 13. New Launch Projects Table (Container 2: New Launch Projects)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS new_launch_projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                developer VARCHAR(150) NOT NULL,
                developer_logo VARCHAR(100),
                location VARCHAR(200) NOT NULL,
                area_locality VARCHAR(100),
                property_type VARCHAR(100) DEFAULT 'Luxury Residences',
                configuration VARCHAR(100) DEFAULT '2 & 3 BHK',
                area VARCHAR(100),
                price VARCHAR(100) NOT NULL,
                numeric_price BIGINT DEFAULT 0,
                emi VARCHAR(100),
                offer TEXT,
                status VARCHAR(100) DEFAULT 'Newly Launched',
                badge VARCHAR(100) DEFAULT 'New Launch',
                possession VARCHAR(100) DEFAULT 'Under Construction',
                rera_number VARCHAR(100),
                towers VARCHAR(100),
                total_units VARCHAR(100),
                image_url TEXT NOT NULL,
                gallery JSON,
                highlights JSON,
                description TEXT,
                display_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_nlp_slug (slug),
                INDEX idx_nlp_developer (developer),
                INDEX idx_nlp_locality (area_locality),
                INDEX idx_nlp_price (numeric_price),
                INDEX idx_nlp_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 10 new launch projects if table is empty
        const [nlpCountResult] = await pool.execute("SELECT COUNT(*) as count FROM new_launch_projects");
        if (nlpCountResult && nlpCountResult[0]?.count === 0) {
            const nlpSeedSql = `
                INSERT INTO new_launch_projects (
                    id, slug, name, developer, developer_logo, location, area_locality,
                    property_type, configuration, area, price, numeric_price, emi, offer,
                    status, badge, possession, rera_number, towers, total_units,
                    image_url, gallery, highlights, description, display_order, is_active
                ) VALUES 
                (1, 'mantra-magnus', 'Mantra Magnus', 'Mantra Properties', 'MANTRA', 'Hadapsar, Pune', 'Hadapsar', 'Luxury Residences', '2 & 3 BHK', '2,712 Sq. Ft.', '₹1.25 Cr*', 12500000, 'EMI from ₹88,000/mo', 'Pre-Launch Privilege: Zero Floor Rise + Modular Kitchen Included', 'New Launch Premiere', 'Premium Project', 'Under Construction', 'P52100051280', '4 Towers (32 Storeys)', '320 Units', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"]', '["Olympic Infinity Pool", "Private Balcony Decks", "Zero Brokerage", "5 Min to Magarpatta"]', 'Expansive residential living featuring double-height club lounges, wrap-around sundecks, and Olympic-length infinity pool with direct Magarpatta connectivity.', 1, TRUE),
                (2, 'godrej-elements', 'Godrej Elements', 'Godrej Properties', 'GODREJ', 'Hinjewadi Phase 1, Pune', 'Hinjewadi', 'Eco-Luxury Apartments', '2 & 3 BHK', '1,450 Sq. Ft.', '₹1.30 Cr*', 13000000, 'EMI from ₹92,000/mo', 'Early Access Offer: 10:90 Payment Plan Available', 'Newly Launched', 'Eco-Luxury Living', 'Under Construction', 'P52100050893', '6 Towers (28 Storeys)', '480 Units', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"]', '["3-Acre Forest Park", "Smart Home Automation", "Next to Quadron IT Park", "Sky Walk"]', 'Botanical high-rises centered around 3 acres of indigenous greenery, state-of-the-art EV charging, and biometric smart locks in Hinjewadi Phase 1.', 2, TRUE),
                (3, 'kumar-primus', 'Kumar Primus', 'Kumar Properties', 'KUMAR', 'Kalyani Nagar, Pune', 'Kalyani Nagar', 'Boutique Sky Condos', '3 & 4 BHK', '2,100 Sq. Ft.', '₹1.95 Cr*', 19500000, 'EMI from ₹1.35 L/mo', 'VIP Pre-Launch Allotment: Exclusive High-Floor Selection', 'Pre-Launch Privilege', 'Ultra Luxury', 'Under Construction', 'P52100049871', '2 Boutique Towers', '96 Exclusive Units', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"]', '["Private Elevator Access", "Mula River Views", "Cigar & Spa Lounge", "2 Homes Per Floor"]', 'Private elevator residences overlooking the Mula riverbed. Only two homes per floor with acoustic soundproof glazing and 24/7 concierge assistance.', 3, TRUE),
                (4, 'vtp-hilife', 'VTP HiLife', 'VTP Realty', 'VTP REALTY', 'Kharadi, Pune', 'Kharadi', 'High-Rise Smart Homes', '2 & 3 BHK', '1,280 Sq. Ft.', '₹98 Lacs*', 9800000, 'EMI from ₹69,000/mo', 'New Tower Launch: Stamp Duty & Registration Discount', 'New Tower Launch', 'Smart Residences', 'Under Construction', 'P52100048712', '5 Towers (30 Storeys)', '550 Units', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"]', '["5 Min to EON IT Park", "40+ Amenities", "High Rental Yield", "Covered Badminton Court"]', 'Premium towers strategically positioned 5 minutes from EON IT Park and World Trade Center, equipped with 40+ curated clubhouse sports and work pods.', 4, TRUE),
                (5, 'the-ark-voyage', 'The Ark Voyage', 'Tribeca Developers', 'TRIBECA', 'Wakad, Pune', 'Wakad', 'Contemporary Suites', '2 & 3 BHK', '1,150 Sq. Ft.', '₹85 Lacs*', 8500000, 'EMI from ₹59,000/mo', 'Pre-Launch Advantage: ₹7.5 Lakh Early Bird Price Freeze', 'Early Access', 'Best Investment Value', 'Under Construction', 'P52100052319', '3 Iconic Towers', '360 Units', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"]', '["Expressway Access", "Skyline Views", "Flexible Payment", "Rooftop Observatory"]', 'Designed by world-acclaimed architects, offering panoramic skyline decks, rooftop observatory lounge, and seamless access to Mumbai-Pune Expressway.', 5, TRUE),
                (6, 'the-aurelia', 'The Aurelia', 'Vilas Javdekar Group', 'VILAS JAVDEKAR', 'Baner-Balewadi High Street, Pune', 'Baner', 'Palatial Sky Mansions', '3 & 4 BHK', '2,450 Sq. Ft.', '₹1.85 Cr*', 18500000, 'EMI from ₹1.28 L/mo', 'Pre-Launch Allotment: Italian Marble & Private Plunge Pool Upgrades', 'Exclusive Premiere', 'High-Street Elegance', 'Under Construction', 'P52100049871', '3 Signature Towers', '180 Mansions', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"]', '["Baner High Street Walk", "Private Plunge Pool", "Italian Marble", "Valet Concierge"]', 'Italian-marble floored sky residences on Baner-Balewadi High Street with private plunge pools, temperature-regulated wine cellars, and valet chauffeur service.', 6, TRUE),
                (7, 'skyline-one', 'Skyline One', 'Prestige Group', 'PRESTIGE', 'Kharadi Riverside, Pune', 'Kharadi', 'Ultra-Luxury Waterfront', '2, 3 & 4 BHK', '1,890 Sq. Ft.', '₹1.45 Cr*', 14500000, 'EMI from ₹1.02 L/mo', 'VIP Launch Offer: 20:80 Possession Linked Plan', 'Pre-Launch Privilege', 'Waterfront Landmark', 'Under Construction', 'P52100052319', '2 Towers (34 Storeys)', '240 Waterfront Suites', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"]', '["34-Storey Riverfront", "Full Glass Facade", "Rooftop Helipad", "Co-Working Club"]', 'Rising 34 storeys above the Mula-Mutha riverbed with full-bleed floor-to-ceiling glass facades, rooftop helipad, and private co-working business lounges.', 7, TRUE),
                (8, 'urban-crest', 'Urban Crest', 'Kohinoor Group', 'KOHINOOR', 'Wakad, Pune', 'Wakad', 'Engineered Smart Homes', '2 & 3 BHK', '1,150 Sq. Ft.', '₹78.5 Lacs*', 7850000, 'EMI from ₹54,000/mo', 'New Tower Release: Zero Stamp Duty on First 25 Bookings', 'Newly Launched', 'Smart Automation', 'Under Construction', 'P52100048712', '4 Towers (24 Storeys)', '420 Units', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"]', '["App Controlled Home", "3 Clubhouses", "Prime Wakad Junction", "Infinity Pool"]', 'Next-generation apartments integrated with voice and mobile app automation, multi-tiered biometrics, and 3 grand community lifestyle clubhouses.', 8, TRUE),
                (9, 'geras-world-of-joy', 'Gera\\'s World of Joy', 'Gera Developments', 'GERA', 'Upper Kharadi, Pune', 'Kharadi', 'Child-Centric Duplexes', '2 & 3 BHK Duplexes', '1,650 Sq. Ft.', '₹82 Lacs*', 8200000, 'EMI from ₹57,000/mo', 'Celebrity Academy Subscriptions Included + 5-Year Warranty', 'New Tower Release', 'Child-Centric Homes', 'Under Construction', 'P52100050893', '6 Towers (Duplex Layouts)', '500 Duplexes', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"]', '["Celebrity Academies", "5-Year Gera Warranty", "Duplex Layouts", "Upper Kharadi"]', 'India\\'s pioneering child-centric residences with professional celebrity academies on-campus, covered temperature-controlled pools, and 5-year structural warranty.', 9, TRUE),
                (10, 'tribeca-highstreet', 'Tribeca Highstreet', 'Tribeca Developers', 'TRIBECA', 'Baner, Pune', 'Baner', 'Signature Condos', '3 & 4 BHK', '2,350 Sq. Ft.', '₹2.10 Cr*', 21000000, 'EMI from ₹1.46 L/mo', 'Pre-Launch Allotment: Private Penthouse & Sundeck Upgrades', 'Exclusive Launch', 'Iconic Landmark', 'Under Construction', 'P52100051199', '3 Iconic High-Rises', '150 Exclusive Suites', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', '["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"]', '["International Design", "Triple Height Lobby", "Baner Prime", "Sky Deck Lounge"]', 'Architectural marvel crafted in collaboration with international masterplanners. Triple-height lobbies, rooftop infinity deck, and bespoke lifestyle amenities.', 10, TRUE)
            `;
            await pool.execute(nlpSeedSql);
            console.log("🌱 Auto-seeded 10 new launch projects successfully into MySQL.");
        }

        // 14. Featured Properties Table (Container 4: Featured Pune Developments with Walkthrough Videos)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS featured_properties (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                brand_name VARCHAR(100) NOT NULL,
                location VARCHAR(200) NOT NULL,
                locality_name VARCHAR(100),
                youtube_id VARCHAR(50) NOT NULL,
                start_seconds INT DEFAULT 0,
                youtube_url VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                tagline TEXT,
                completion VARCHAR(100) DEFAULT 'Under Construction',
                completion_sub VARCHAR(100) DEFAULT 'MahaRERA',
                configurations VARCHAR(100) DEFAULT '2, 3 BHK',
                config_sub VARCHAR(100),
                carpet VARCHAR(100),
                carpet_sub VARCHAR(100),
                price VARCHAR(100) NOT NULL,
                price_sub VARCHAR(100) DEFAULT 'Direct Price',
                badge VARCHAR(100) DEFAULT 'SAMPLE FLAT TOUR',
                thumbnail_url TEXT,
                site_images JSON,
                display_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_fp_slug (slug),
                INDEX idx_fp_locality (locality_name),
                INDEX idx_fp_brand (brand_name),
                INDEX idx_fp_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 6 featured properties if table is empty
        const [fpPropCountResult] = await pool.execute("SELECT COUNT(*) as count FROM featured_properties");
        if (fpPropCountResult && fpPropCountResult[0]?.count === 0) {
            const fpPropSeedSql = `
                INSERT INTO featured_properties (
                    id, slug, name, brand_name, location, locality_name,
                    youtube_id, start_seconds, youtube_url, title, tagline,
                    completion, completion_sub, configurations, config_sub,
                    carpet, carpet_sub, price, price_sub, badge,
                    thumbnail_url, site_images, display_order, is_active
                ) VALUES 
                (1, 'mantra-magnus', 'Mantra Magnus', 'MANTRA', 'Mundhwa, Pune', 'Mundhwa', 'v1KcS0G22EQ', 0, 'https://www.youtube.com/watch?v=v1KcS0G22EQ', 'Mantra Magnus Mundhwa Project Details | 2, 2.5, 3.5 BHK | Vridhi Bhava Concept', 'Iconic Vridhi Bhava architectural design concept delivering optimal privacy, 360-degree cross ventilation, and scenic views.', 'Under Construction', 'MahaRERA', '2, 2.5 & 3.5 BHK', '5 Towers // 22 Storeys', '420 M²', '1,420 - 2,150 SQ.FT', '₹ 1.55 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', '/images/mantra-magnus-shorts-thumb.jpg', '[{"url":"/images/mantra-magnus-site-elevation.jpg","label":"Site Elevation & Towers"},{"url":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80","label":"Sample Flat Living Room"},{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80","label":"Grand Entrance & Reflecting Pool"},{"url":"https://images.unsplash.com/photo-160056675376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80","label":"Landscaped Courtyards"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","label":"Master Suite & Private Deck"}]', 1, TRUE),
                (2, 'godrej-elements', 'Godrej Elements', 'GODREJ', 'Hinjewadi, Pune', 'Hinjewadi', 'M1sDYNUJQrY', 203, 'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s', 'Godrej Elements Hinjewadi Project Details | 2 & 3 BHK Eco-Luxury Residences', 'Eco-architectural high-rises centered on active wellness, smart automation, and panoramic Hinjewadi skyline views.', 'Under Construction', 'MahaRERA', '2 & 3 BHK', '6 Towers // 28 Storeys', '380 M²', '980 - 1,420 SQ.FT', '₹ 1.30 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', '[{"url":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80","label":"Tower Elevation & Skyline"},{"url":"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80","label":"Living & Dining Room"},{"url":"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80","label":"Rooftop Infinity Pool"},{"url":"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80","label":"Wellness Club & Gym"}]', 2, TRUE),
                (3, 'vtp-hilife', 'VTP HiLife', 'VTP REALTY', 'Kharadi, Pune', 'Kharadi', 'FbWb8gl35BE', 0, 'https://www.youtube.com/watch?v=FbWb8gl35BE', 'VTP HiLife Kharadi Project Details | 2 & 3 BHK Riverfront Luxury', 'Riverfront promenade lifestyle with Maximum Livable Area (MLA) architectural design in prime New Kharadi.', 'Under Construction', 'MahaRERA', '2 & 3 BHK', '8 Towers // 24 Storeys', '360 M²', '890 - 1,320 SQ.FT', '₹ 1.05 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', '[{"url":"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80","label":"Riverfront Facade"},{"url":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","label":"Designer Show Flat"},{"url":"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80","label":"Olympic-Length Pool"},{"url":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80","label":"Sky Deck Lounge"}]', 3, TRUE),
                (4, 'kumar-primus', 'Kumar Primus', 'KUMAR', 'Kalyani Nagar, Pune', 'Kalyani Nagar', 'v1KcS0G22EQ', 0, 'https://www.youtube.com/watch?v=v1KcS0G22EQ', 'Kumar Primus Kalyani Nagar | 3 & 4 BHK Bespoke High-Rise Residences', 'Bespoke high-rises commanding sweeping views of Koregaon Park skyline with private sundecks and plunge pools.', 'Ready to Move', 'MahaRERA', '3 & 4 BHK', '3 Towers // 26 Storeys', '540 M²', '1,750 - 2,450 SQ.FT', '₹ 1.85 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', '[{"url":"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80","label":"Grand Tower Elevation"},{"url":"https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80","label":"Ultra Luxury Suite"},{"url":"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80","label":"Private Sundeck"}]', 4, TRUE),
                (5, 'the-ark-voyage', 'The Ark Voyage', 'TRIBECA', 'Wakad, Pune', 'Wakad', 'M1sDYNUJQrY', 203, 'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s', 'The Ark Voyage Wakad | 3 & 4 BHK Cruise-Inspired Architecture', 'Cruise-inspired towers surrounded by protected green reserves, rooftop sky-bridge, and Trump Tower design pedigree.', 'Under Construction', 'MahaRERA', '3 & 4 BHK', '4 Towers // 30 Storeys', '610 M²', '1,920 - 2,680 SQ.FT', '₹ 2.10 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', '[{"url":"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80","label":"The Ark Facade"},{"url":"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80","label":"Duplex Penthouse"},{"url":"https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80","label":"Sky Promenade"}]', 5, TRUE),
                (6, 'kohinoor-kaleido', 'Kohinoor Kaleido', 'KOHINOOR', 'Wagholi, Pune', 'Wagholi', 'FbWb8gl35BE', 0, 'https://www.youtube.com/watch?v=FbWb8gl35BE', 'Kohinoor Kaleido Wagholi | 3 & 4 BHK Urban Forest Residences', 'An urban masterpiece celebrating natural sunlight, forested landscape, and innovative residential design in East Pune.', 'Under Construction', 'MahaRERA', '3 & 4 BHK', '5 Towers // 22 Storeys', '480 M²', '1,450 - 2,200 SQ.FT', '₹ 1.45 Cr*', 'Direct Price', 'SAMPLE FLAT TOUR', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', '[{"url":"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80","label":"Urban Forest Facade"},{"url":"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80","label":"Bespoke Salon"},{"url":"https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80","label":"Panoramic Deck"}]', 6, TRUE)
            `;
            await pool.execute(fpPropSeedSql);
            console.log("🌱 Auto-seeded 6 featured properties successfully into MySQL.");
        }

        // 15. Property Shorts / Reels Table (Container 5: Property Reels & YouTube Shorts)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS property_shorts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                title VARCHAR(255) NOT NULL,
                display_title VARCHAR(100),
                duration VARCHAR(20) DEFAULT '1:30',
                location VARCHAR(150) NOT NULL,
                price VARCHAR(100),
                configurations VARCHAR(100),
                developer VARCHAR(150),
                youtube_url TEXT NOT NULL,
                youtube_id VARCHAR(32) NOT NULL,
                thumbnail_url TEXT,
                likes_count INT DEFAULT 0,
                description TEXT,
                is_visible TINYINT(1) DEFAULT 1,
                display_order INT DEFAULT 0,
                property_id VARCHAR(64),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ps_slug (slug),
                INDEX idx_ps_visible (is_visible),
                INDEX idx_ps_order (display_order),
                INDEX idx_ps_location (location)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 7 property reels if table is empty
        const [psCountResult] = await pool.execute("SELECT COUNT(*) as count FROM property_shorts");
        if (psCountResult && psCountResult[0]?.count === 0) {
            const psSeedSql = `
                INSERT INTO property_shorts (
                    id, slug, title, display_title, duration, location, price,
                    configurations, developer, youtube_url, youtube_id,
                    thumbnail_url, likes_count, description, is_visible, display_order
                ) VALUES 
                (1, 'sky-luxe-joyville', 'Sky Luxe Joyville', 'Premium 2 BHK ...', '1:34', 'Hadapsar, Pune', '₹ 1.25 Cr*', '2 & 3 BHK', 'Shapoorji Pallonji', 'https://www.youtube.com/shorts/GbNlxWtdOvA', 'GbNlxWtdOvA', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80', 3100, 'Ultra-spacious 2 & 3 BHK luxury residences with modern clubhouse and landscaped greens in Hadapsar.', 1, 1),
                (2, 'kumar-primavera', 'Kumar Primavera', 'Kumar Primevi...', '1:21', 'Hadapsar, Pune', '₹ 95 Lacs*', '2 BHK', 'Kumar Properties', 'https://www.youtube.com/shorts/M1sDYNUJQrY', 'M1sDYNUJQrY', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=720&q=80', 2400, 'Contemporary design residences near Magarpatta City with premium amenities.', 1, 2),
                (3, 'kumar-magna', 'Kumar Magna', 'Kumar Magnac...', '1:42', 'Hadapsar, Pune', '₹ 1.45 Cr*', '3 BHK', 'Kumar Properties', 'https://www.youtube.com/shorts/v1KcS0G22EQ', 'v1KcS0G22EQ', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=80', 4200, 'Exclusive high-rise living with sundecks and panoramic city views.', 1, 3),
                (4, 'ganga-avanta', 'Ganga Avanta', 'Ganga Avanta', '1:15', 'Mundhwa, Pune', '₹ 2.02 Cr*', '3 & 4 BHK', 'Goel Ganga Developments', 'https://www.youtube.com/shorts/GbNlxWtdOvA', 'GbNlxWtdOvA', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=80', 3100, 'Ultra-spacious simplex and duplex riverfront sky suites with triple-height entrance lobbies and 30+ international standard lifestyle amenities.', 1, 4),
                (5, 'empyrean-leela', 'Empyrean Leela', 'Empyrean Leela', '1:28', 'Kharadi, Pune', '₹ 1.25 Cr*', '2 & 3 BHK', 'Empyrean Realty', 'https://www.youtube.com/shorts/M1sDYNUJQrY', 'M1sDYNUJQrY', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=720&q=80', 4800, 'Signature architectural luxury in Kharadi featuring Italian marble, deck balconies, landscaped courtyards & 40+ lifestyle amenities.', 1, 5),
                (6, 'amara-riverside', 'Amara Riverside', 'Amara Riverside', '1:45', 'Keshav Nagar, Pune', '₹ 85 Lacs*', '2 & 3 BHK', 'Amara Living', 'https://www.youtube.com/shorts/v1KcS0G22EQ', 'v1KcS0G22EQ', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=720&q=80', 3900, 'Riverside living nestled in Keshav Nagar offering rooftop infinity pool, yoga decks, and 5 mins connectivity to Koregaon Park.', 1, 6),
                (7, 'adani-atelier-greens', 'Adani Atelier Greens', 'Adani Atelier', '1:30', 'Koregaon Park Annex, Pune', '₹ 1.65 Cr*', '2.5 & 3 BHK', 'Adani Realty', 'https://www.youtube.com/shorts/GbNlxWtdOvA', 'GbNlxWtdOvA', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=720&q=80', 5200, 'Vertical green living surrounded by lush bio-diverse vertical gardens and club facilities in Koregaon Park Annex.', 1, 7)
            `;
            await pool.execute(psSeedSql);
            console.log("🌱 Auto-seeded 7 property reels successfully into MySQL.");
        }

        // 16. Upcoming Projects Table (Container 6: Upcoming Project Showcase)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS upcoming_projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(191) NOT NULL UNIQUE,
                title VARCHAR(255) NOT NULL,
                brand_subtext VARCHAR(255),
                developer VARCHAR(150),
                location VARCHAR(200) NOT NULL,
                locality VARCHAR(100),
                badge_text VARCHAR(100) DEFAULT 'GRAND PRE-LAUNCH',
                rera_status VARCHAR(100) DEFAULT 'MahaRERA Applied',
                youtube_url TEXT NOT NULL,
                youtube_id VARCHAR(32) NOT NULL,
                video_start_seconds INT DEFAULT 14,
                configurations VARCHAR(100),
                configurations_sub VARCHAR(150),
                price VARCHAR(100),
                price_sub VARCHAR(150),
                launch_timeline VARCHAR(100),
                launch_timeline_sub VARCHAR(150),
                eyebrow VARCHAR(150),
                heading VARCHAR(255),
                subtitle TEXT,
                whatsapp_number VARCHAR(30) DEFAULT '917398174444',
                is_active TINYINT(1) DEFAULT 1,
                is_featured TINYINT(1) DEFAULT 1,
                display_order INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_up_slug (slug),
                INDEX idx_up_active (is_active),
                INDEX idx_up_featured (is_featured),
                INDEX idx_up_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial upcoming projects if table is empty
        const [upCountResult] = await pool.execute("SELECT COUNT(*) as count FROM upcoming_projects");
        if (upCountResult && upCountResult[0]?.count === 0) {
            const upSeedSql = `
                INSERT INTO upcoming_projects (
                    id, slug, title, brand_subtext, developer, location, locality,
                    badge_text, rera_status, youtube_url, youtube_id, video_start_seconds,
                    configurations, configurations_sub, price, price_sub,
                    launch_timeline, launch_timeline_sub, eyebrow, heading, subtitle,
                    whatsapp_number, is_active, is_featured, display_order
                ) VALUES 
                (1, 'vtp-aurelia-new-kharadi', 'VTP Aurelia', 'VTP REALTY • TOWNSHIP CODENAME PEGASUS', 'VTP Realty', 'New Kharadi - Riverside Corridor, Pune', 'New Kharadi', 'GRAND PRE-LAUNCH', 'MahaRERA Applied', 'https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s', 'yTzvQko2gYo', 14, '2, 3 & 4.5 BHK', 'Forest & River Views', 'Starting ₹ 85 Lacs*', 'Zero Floor Rise in EOI', 'Pre-Launch 2026–2027', 'Early Bird Window', 'EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027', 'Upcoming Project Showcase', 'Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi. Lock in inaugural pre-registration privileges before public release.', '917398174444', 1, 1, 1),
                (2, 'lodha-giardino-kharadi', 'Lodha Giardino Phase 2', 'LODHA LUXURY • PRIME KHARADI', 'Lodha Group', 'Kharadi, Pune', 'Kharadi', 'COMING SOON', 'MahaRERA Registered', 'https://www.youtube.com/watch?v=GbNlxWtdOvA', 'GbNlxWtdOvA', 0, '3 & 4 BHK Luxury Suites', 'Private Deck & Club Privileges', 'Starting ₹ 1.95 Cr*', 'Pre-Booking Priority Tokens', 'Mid 2026', 'VIP Investor Allotment', 'PRE-LAUNCH OPPORTUNITY', 'Upcoming Luxury Residences', 'Expansive resort-style condominiums set in the heart of Pune\\'s leading IT corridor.', '917398174444', 1, 0, 2)
            `;
            await pool.execute(upSeedSql);
            console.log("🌱 Auto-seeded 2 upcoming projects successfully into MySQL.");
        }

        // 17. Workflow Steps Table (Container 8: How It Works / Buying Journey)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS workflow_steps (
                id INT AUTO_INCREMENT PRIMARY KEY,
                step_number INT NOT NULL,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                icon_name VARCHAR(50) DEFAULT 'MapPin',
                is_active TINYINT(1) DEFAULT 1,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ws_order (display_order),
                INDEX idx_ws_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 7 workflow steps if table is empty
        const [wsCountResult] = await pool.execute("SELECT COUNT(*) as count FROM workflow_steps");
        if (wsCountResult && wsCountResult[0]?.count === 0) {
            const wsSeedSql = `
                INSERT INTO workflow_steps (id, step_number, title, description, icon_name, is_active, display_order) VALUES
                (1, 1, 'Select Property', 'Explore verified luxury properties and new launches that match your lifestyle and investment goals.', 'MapPin', 1, 1),
                (2, 2, 'Submit Your Enquiry', 'Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.', 'FileText', 1, 2),
                (3, 3, 'Meet Our Expert', 'Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.', 'Users', 1, 3),
                (4, 4, 'Visit Property', 'Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.', 'Building2', 1, 4),
                (5, 5, 'Buy Property', 'Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.', 'KeyRound', 1, 5),
                (6, 6, 'Loan Assistance', 'Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.', 'Landmark', 1, 6),
                (7, 7, 'Customer Support', 'Ongoing documentation, legal verification, agreement registration, and lifetime handover support.', 'Headset', 1, 7)
            `;
            await pool.execute(wsSeedSql);
            console.log("🌱 Auto-seeded 7 workflow steps successfully into MySQL.");
        }

        // 18. Trust Stats Table (Container 9: Our Achievements / Trust Statistics)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS trust_stats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                stat_key VARCHAR(100) NOT NULL UNIQUE,
                label VARCHAR(150) NOT NULL,
                target_value INT NOT NULL DEFAULT 0,
                suffix VARCHAR(20) DEFAULT ' +',
                icon_name VARCHAR(50) DEFAULT 'Users',
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ts_order (display_order),
                INDEX idx_ts_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 5 trust stats if table is empty
        const [tsCountResult] = await pool.execute("SELECT COUNT(*) as count FROM trust_stats");
        if (tsCountResult && tsCountResult[0]?.count === 0) {
            const tsSeedSql = `
                INSERT INTO trust_stats (id, stat_key, label, target_value, suffix, icon_name, display_order, is_active) VALUES
                (1, 'team-size', 'Team Size', 200, ' +', 'Users', 1, 1),
                (2, 'happy-clients', 'Happy Clients', 20000, ' +', 'UserRoundCheck', 2, 1),
                (3, 'site-visits', 'Site Visits', 10000, ' +', 'CarFront', 3, 1),
                (4, 'sqft-sold', 'Sq. Ft Sold Till Date', 900000, ' +', 'Building2', 4, 1),
                (5, 'zero-brokerage', 'Brokerage', 0, ' %', 'CirclePercent', 5, 1)
            `;
            await pool.execute(tsSeedSql);
            console.log("🌱 Auto-seeded 5 trust stats successfully into MySQL.");
        }

        // 19. Trust Highlights Table (Container 10: Trust Highlights Banner)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS trust_highlights (
                id INT AUTO_INCREMENT PRIMARY KEY,
                highlight_key VARCHAR(100) NOT NULL UNIQUE,
                title VARCHAR(150) NOT NULL,
                line1 VARCHAR(100),
                line2 VARCHAR(100),
                description TEXT NOT NULL,
                icon_name VARCHAR(50) DEFAULT 'ShieldCheck',
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_th_order (display_order),
                INDEX idx_th_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 3 trust highlights if table is empty
        const [thCountResult] = await pool.execute("SELECT COUNT(*) as count FROM trust_highlights");
        if (thCountResult && thCountResult[0]?.count === 0) {
            const thSeedSql = `
                INSERT INTO trust_highlights (id, highlight_key, title, line1, line2, description, icon_name, display_order, is_active) VALUES
                (1, 'trust', '100% TRUST', '100%', 'TRUST', 'Complete Transparency. Confident Decisions.', 'ShieldCheck', 1, 1),
                (2, 'brokerage', 'ZERO BROKERAGE', 'ZERO', 'BROKERAGE', 'No Brokerage. No Hidden Charges.', 'CirclePercent', 2, 1),
                (3, 'price', 'BEST LAUNCH PRICE', 'BEST LAUNCH', 'PRICE', 'Exclusive Launch Offers. Maximum Savings.', 'Sparkles', 3, 1)
            `;
            await pool.execute(thSeedSql);
            console.log("🌱 Auto-seeded 3 trust highlights successfully into MySQL.");
        }

        // 20. Advertisements Table (Container 11: Partner Spotlight Sidebar)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS advertisements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                eyebrow VARCHAR(100) DEFAULT 'FEATURED PROPERTY',
                type VARCHAR(50) DEFAULT 'video',
                description TEXT,
                video_id VARCHAR(50),
                video_url TEXT,
                image_url TEXT,
                button_text VARCHAR(100) DEFAULT 'Explore Properties',
                button_url VARCHAR(255) DEFAULT '/properties',
                external_url VARCHAR(255),
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ad_type (type),
                INDEX idx_ad_order (display_order),
                INDEX idx_ad_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Auto-seed initial 2 advertisements if table is empty
        const [adCountResult] = await pool.execute("SELECT COUNT(*) as count FROM advertisements");
        if (adCountResult && adCountResult[0]?.count === 0) {
            const adSeedSql = `
                INSERT INTO advertisements (id, title, eyebrow, type, description, video_id, video_url, image_url, button_text, button_url, display_order, is_active) VALUES
                (1, 'Explore Our Featured Property', 'FEATURED PROPERTY', 'video', 'Watch the property video and discover your next home in Pune.', 'PRCOvxoYAzo', 'https://www.youtube.com/watch?v=PRCOvxoYAzo', 'https://img.youtube.com/vi/PRCOvxoYAzo/hqdefault.jpg', 'Explore Properties', '/properties', 1, 1),
                (2, 'Discover Pune Real Estate', 'WATCH ON YOUTUBE', 'video', 'Watch our property video and explore real estate opportunities.', 'Dyb_iyhg-MU', 'https://www.youtube.com/watch?v=Dyb_iyhg-MU', 'https://img.youtube.com/vi/Dyb_iyhg-MU/hqdefault.jpg', 'Watch on YouTube', '/properties', 2, 1)
            `;
            await pool.execute(adSeedSql);
            console.log("🌱 Auto-seeded 2 advertisements successfully into MySQL.");
        }

        // 21. Testimonials Table (Container 12: Customer Reviews & Experiences)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                role VARCHAR(100) DEFAULT 'Homebuyer',
                location VARCHAR(100) DEFAULT 'Pune',
                rating TINYINT UNSIGNED DEFAULT 5,
                text TEXT NOT NULL,
                avatar_url VARCHAR(500) NULL,
                project_name VARCHAR(150) NULL,
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_testimonial_order (display_order),
                INDEX idx_testimonial_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 22. Hero Settings & Hero Trust Badges (Container 14: Top Banner & Trust Marquee)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS hero_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                eyebrow VARCHAR(150) DEFAULT 'YOUR PROPERTY PARTNER IN PUNE',
                heading_line1 VARCHAR(255) DEFAULT 'Find Your Dream Home.',
                heading_line2 VARCHAR(255) DEFAULT 'Invest in Your Future',
                subtitle VARCHAR(1000) DEFAULT 'Explore verified residential apartments, luxury villas, and high-yield commercial spaces across Pune with 0% brokerage and guaranteed builder pricing.',
                video_url VARCHAR(1000) DEFAULT 'https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true',
                background_image VARCHAR(500) NULL,
                primary_cta_text VARCHAR(100) DEFAULT 'Explore Verified Properties',
                primary_cta_url VARCHAR(255) DEFAULT '/buy',
                show_category_tabs TINYINT(1) DEFAULT 1,
                show_search_card TINYINT(1) DEFAULT 1,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS hero_trust_badges (
                id INT AUTO_INCREMENT PRIMARY KEY,
                badge_key VARCHAR(50) NOT NULL UNIQUE,
                strong_text VARCHAR(50) NOT NULL,
                label_text VARCHAR(100) NOT NULL,
                icon_name VARCHAR(50) DEFAULT 'ShieldCheck',
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_badge_order (display_order),
                INDEX idx_badge_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 23. Contact Settings (Container 16: Home Contact Showcase)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS contact_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                eyebrow VARCHAR(100) DEFAULT 'GET IN TOUCH',
                title VARCHAR(255) DEFAULT 'Connect With Our Property Advisors',
                card_eyebrow VARCHAR(100) DEFAULT 'PUNE PROPERTY INVESTORS',
                card_title VARCHAR(255) DEFAULT 'Start your Pune property journey today',
                card_subtitle TEXT,
                office_location VARCHAR(255) DEFAULT 'Gera Imperium Alpha, Kharadi',
                phone_number VARCHAR(50) DEFAULT '+91 73981 74444',
                whatsapp_number VARCHAR(50) DEFAULT '917398174444',
                background_image VARCHAR(500) DEFAULT '/images/luxury-villa-bg.jpg',
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 24. Advertisement Popup Settings (Container 17: Floating Corner Video Reel)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS advertisement_popup_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                is_enabled TINYINT(1) DEFAULT 1,
                delay_seconds INT DEFAULT 3,
                auto_mute TINYINT(1) DEFAULT 1,
                source_type VARCHAR(50) DEFAULT 'shorts',
                pinned_video_id VARCHAR(100) NULL,
                pinned_title VARCHAR(255) NULL,
                pinned_link VARCHAR(255) DEFAULT '/shorts',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        console.log("🛡️ MySQL Tables initialized successfully (admins, properties, enquiries, floor_plans, floor_plan_enquiries, settings, projects, locations, developers, articles, jobs, featured_projects, new_launch_projects, featured_properties, property_shorts, upcoming_projects, workflow_steps, trust_stats, trust_highlights, advertisements, testimonials, hero_settings, hero_trust_badges, contact_settings, advertisement_popup_settings).");
    } catch (err) {
        console.error("Schema initialization error:", err.message);
    }
}
