-- ==============================================================================
-- PUNE PROPERTY INVESTORS (PPI INFRA) — PRODUCTION DATABASE SCHEMA
-- Database: ppi_infra
-- Engine: InnoDB | Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS ppi_infra 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ppi_infra;

-- ------------------------------------------------------------------------------
-- 1. ADMINS TABLE
-- Purpose: Authentication & Authorization for PPI Admin CMS
-- Stores hashed passwords (bcrypt), roles, and contact info for administrators.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'AGENT') DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. PROPERTIES TABLE
-- Purpose: Complete property inventory for residential, commercial & plots
-- Stores titles, slugs, prices, specs, amenities, media, and verification tags.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    developer VARCHAR(150) NOT NULL,
    location VARCHAR(200) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    city VARCHAR(100) DEFAULT 'Pune',
    property_category ENUM('residential', 'commercial', 'plot', 'luxury') DEFAULT 'residential',
    property_type VARCHAR(60) DEFAULT 'Apartment',
    purpose ENUM('buy', 'rent', 'lease') DEFAULT 'buy',
    price VARCHAR(100) NOT NULL,
    numeric_price BIGINT DEFAULT 0,
    bhk JSON,
    area VARCHAR(100),
    status ENUM('Under Construction', 'Ready to Move', 'New Launch') DEFAULT 'Under Construction',
    possession VARCHAR(60),
    is_new_launch BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT TRUE,
    badge VARCHAR(100),
    image TEXT NOT NULL,
    images JSON,
    video_url TEXT,
    description TEXT,
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_prop_slug (slug),
    INDEX idx_prop_locality (locality),
    INDEX idx_prop_category (property_category),
    INDEX idx_prop_purpose (purpose),
    INDEX idx_prop_status (status),
    INDEX idx_prop_price (numeric_price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. ENQUIRIES / LEADS TABLE
-- Purpose: CRM Lead generation & pipeline tracking
-- Stores inquiries from website contact forms, WhatsApp clicks, and EMI calculator.
-- ------------------------------------------------------------------------------
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
    type ENUM('contact', 'site_visit', 'brochure', 'emi_calculator', 'whatsapp') DEFAULT 'contact',
    date VARCHAR(50),
    time VARCHAR(50),
    status ENUM('New', 'Contacted', 'Site Visit Scheduled', 'Follow Up', 'Closed', 'Archived') DEFAULT 'New',
    follow_up_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_enquiry_status (status),
    INDEX idx_enquiry_phone (phone),
    INDEX idx_enquiry_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. LOCATIONS TABLE
-- Purpose: Locality hubs & investment appreciation data across Pune
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- INITIAL SEED DATA
-- Default Super Admin: admin@punepropertyinvestor.com / Admin@PPI2026!
-- (Password is bcrypt hashed with salt rounds: 10)
-- ------------------------------------------------------------------------------
INSERT INTO admins (name, email, password_hash, role)
VALUES (
    'PPI Senior Administrator',
    'admin@punepropertyinvestor.com',
    '$2a$10$T8Zg8jS0G7i3mZ3K4l8L4.fP4B6P7w5r6v2u1q9Y2Z1W0X9Y8Z1W0',
    'SUPER_ADMIN'
) ON DUPLICATE KEY UPDATE name=name;

-- Initial Verified Properties
INSERT INTO properties (
    id, slug, title, developer, location, locality, city, property_category, property_type, purpose,
    price, numeric_price, bhk, area, status, possession, is_new_launch, is_featured, is_trending, verified, badge,
    image, images, video_url, description, amenities
) VALUES
(
    '1',
    'godrej-rivergreens-kharadi',
    'Godrej Rivergreens',
    'Godrej Properties',
    'Kharadi, Pune',
    'Kharadi',
    'Pune',
    'residential',
    'Apartment',
    'buy',
    '₹85 Lac - 1.45 Cr',
    8500000,
    '["2 BHK", "3 BHK"]',
    '750 - 1250 sq.ft.',
    'Under Construction',
    'Dec 2026',
    1, 1, 1, 1,
    'New Launch Premiere',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"]',
    'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s',
    'Premium township living by Godrej Properties featuring modern amenities, riverside lifestyle, and seamless connectivity to Kharadi IT hub.',
    '["Swimming Pool", "Clubhouse", "Gymnasium", "Kids Play Area", "Jogging Track", "24/7 Security"]'
),
(
    '2',
    'panchshil-towers-kharadi',
    'Panchshil Towers',
    'Panchshil Realty',
    'Kharadi, Pune',
    'Kharadi',
    'Pune',
    'residential',
    'Apartment',
    'buy',
    '₹2.2 Cr - 3.8 Cr',
    22000000,
    '["3 BHK", "4 BHK"]',
    '1900 - 3100 sq.ft.',
    'Ready to Move',
    'Immediate',
    0, 1, 0, 1,
    'Ready to Move Luxury',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"]',
    'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s',
    'Ultra-luxury modern residences with panoramic skyline views, bespoke specifications, and high-end concierge services.',
    '["Infinity Pool", "Sky Lounge", "Tennis Court", "Spa", "Private Theater"]'
),
(
    '3',
    'eon-free-zone-office-kharadi',
    'Grade-A Commercial Space at EON IT Park',
    'Panchshil Realty',
    'Kharadi, Pune',
    'Kharadi',
    'Pune',
    'commercial',
    'Commercial Office',
    'lease',
    '₹4.5 Cr',
    45000000,
    '[]',
    '4200 sq.ft.',
    'Ready to Move',
    'Immediate',
    0, 1, 1, 1,
    'Grade-A IT Asset',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"]',
    'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s',
    'High-yield commercial IT office space with 100% DG power backup, high-speed elevators, and LEED gold certification.',
    '["Central AC", "24/7 Power Backup", "High-Speed Elevators", "Conference Center", "Cafeteria", "Ample Parking"]'
),
(
    '4',
    'hinjewadi-prime-villa-plots',
    'Exclusive Villa Plots in Hinjewadi',
    'Megapolis Developers',
    'Hinjewadi Phase 3, Pune',
    'Hinjewadi',
    'Pune',
    'plot',
    'Plot',
    'buy',
    '₹65 Lac - 1.1 Cr',
    6500000,
    '[]',
    '1800 - 3200 sq.ft.',
    'New Launch',
    'Within 6 Months',
    1, 0, 0, 1,
    'Gated Community Plots',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"]',
    'https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s',
    'Clear title, PMRDA sanctioned residential NA plots in a luxury gated community near Hinjewadi IT hub with clubhouse and landscaped gardens.',
    '["Gated Perimeter", "Wide Asphalt Roads", "Water & Electricity Points", "Clubhouse", "24/7 Guarded Entry"]'
)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- ------------------------------------------------------------------------------
-- 5. FLOOR PLANS TABLE
-- Purpose: Architectural configurations and layouts per property
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 6. FLOOR PLAN ENQUIRIES TABLE
-- Purpose: Specific inquiries for floor plans via WhatsApp & Website
-- ------------------------------------------------------------------------------
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
