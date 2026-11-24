-- =============================================================
-- Pune Property Investors (PPI Infra)
-- Database Table Schema for: ppi_development
-- =============================================================

CREATE DATABASE IF NOT EXISTS ppi_development 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ppi_development;

-- Disable foreign key checks while creating/rebuilding tables
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. USERS & ADMIN AUTH
-- -------------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'admin', 'agent') NOT NULL DEFAULT 'agent',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 2. PROPERTIES (Main Table)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS properties;
CREATE TABLE properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    developer_name VARCHAR(150) NOT NULL,
    project_name VARCHAR(150) NULL,
    rera_id VARCHAR(100) NULL,
    
    -- Categorization & Segmentation
    property_category ENUM('residential', 'commercial', 'plot', 'industrial') NOT NULL,
    property_type ENUM(
        'Apartment', 
        'Villa', 
        'Penthouse', 
        'Row House', 
        'Studio', 
        'Office Space', 
        'Retail Shop', 
        'Showroom', 
        'Plot / Land', 
        'Warehouse'
    ) NOT NULL,
    purpose ENUM('buy', 'rent', 'lease', 'investment') NOT NULL DEFAULT 'buy',
    
    -- Marketing Badges & Discovery
    is_new_launch BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_trending BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    custom_badge VARCHAR(80) NULL,
    
    -- Pricing
    price_label VARCHAR(100) NOT NULL,
    min_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    max_price DECIMAL(15, 2) NULL,
    
    -- Status & Possession
    status ENUM('Under Construction', 'Ready to Move', 'New Launch', 'Sold Out') NOT NULL DEFAULT 'Under Construction',
    possession_date VARCHAR(50) NULL,
    
    -- Area Specifications
    min_area DECIMAL(10, 2) NULL,
    max_area DECIMAL(10, 2) NULL,
    area_unit VARCHAR(20) NOT NULL DEFAULT 'sq.ft.',
    
    -- Location & Geo
    location VARCHAR(255) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Pune',
    pincode VARCHAR(10) NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    
    -- Media
    featured_image VARCHAR(500) NOT NULL,
    video_url VARCHAR(500) NULL,
    
    -- Content & Meta
    description TEXT NULL,
    created_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_properties_category (property_category),
    INDEX idx_properties_type (property_type),
    INDEX idx_properties_locality (locality),
    INDEX idx_properties_price (min_price),
    INDEX idx_properties_flags (is_featured, is_new_launch, is_trending),
    INDEX idx_properties_status (status)
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 3. PROPERTY CONFIGURATIONS / FLOOR PLANS (e.g. 2 BHK, 3 BHK)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS property_configurations;
CREATE TABLE property_configurations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    bhk_type ENUM('1 BHK', '1.5 BHK', '2 BHK', '2.5 BHK', '3 BHK', '3.5 BHK', '4 BHK', '5+ BHK', 'Studio', 'Plot') NOT NULL,
    carpet_area DECIMAL(10, 2) NULL,
    area_unit VARCHAR(20) NOT NULL DEFAULT 'sq.ft.',
    price DECIMAL(15, 2) NULL,
    price_label VARCHAR(100) NULL,
    floor_plan_image VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_config_property_bhk (property_id, bhk_type)
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 4. PROPERTY IMAGES (Multi-image Gallery)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS property_images;
CREATE TABLE property_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(150) NULL,
    display_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property_images (property_id, display_order)
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 5. AMENITIES & PROPERTY_AMENITIES
-- -------------------------------------------------------------
DROP TABLE IF EXISTS property_amenities;
DROP TABLE IF EXISTS amenities;

CREATE TABLE amenities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(80) NULL,
    category VARCHAR(50) NULL DEFAULT 'General'
) ENGINE=InnoDB;

CREATE TABLE property_amenities (
    property_id BIGINT UNSIGNED NOT NULL,
    amenity_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (property_id, amenity_id),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 6. ENQUIRIES & LEADS (Site Visit Requests, Inquiries)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS enquiries;
CREATE TABLE enquiries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NULL,
    visit_date DATE NULL,
    visit_time VARCHAR(30) NULL,
    message TEXT NULL,
    source VARCHAR(50) DEFAULT 'Website',
    status ENUM('New', 'Contacted', 'Scheduled', 'Closed - Won', 'Closed - Lost') NOT NULL DEFAULT 'New',
    assigned_to BIGINT UNSIGNED NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_enquiries_status (status),
    INDEX idx_enquiries_phone (phone),
    INDEX idx_enquiries_created (created_at DESC)
) ENGINE=InnoDB;

-- -------------------------------------------------------------
-- 7. BLOGS / ARTICLES
-- -------------------------------------------------------------
DROP TABLE IF EXISTS blogs;
CREATE TABLE blogs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NULL,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(500) NULL,
    author_id BIGINT UNSIGNED NULL,
    category VARCHAR(100) DEFAULT 'Real Estate Trends',
    read_time VARCHAR(20) DEFAULT '5 min read',
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_blogs_slug (slug),
    INDEX idx_blogs_published (is_published, published_at DESC)
) ENGINE=InnoDB;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- -------------------------------------------------------------
-- SEED INITIAL DATA
-- -------------------------------------------------------------
INSERT IGNORE INTO amenities (name, icon) VALUES 
('Swimming Pool', 'Waves'),
('Clubhouse', 'Building'),
('Gymnasium', 'Dumbbell'),
('Kids Play Area', 'Smile'),
('Jogging Track', 'Footprints'),
('24/7 Security', 'ShieldCheck'),
('Power Backup', 'Zap'),
('EV Charging Point', 'BatteryCharging'),
('Landscape Gardens', 'Trees');

INSERT INTO properties (
    slug, title, developer_name, project_name, rera_id,
    property_category, property_type, purpose,
    is_new_launch, is_featured, is_trending, is_verified,
    price_label, min_price, max_price, status, possession_date,
    min_area, max_area, location, locality, city,
    featured_image, description
) VALUES 
(
    'godrej-rivergreens-kharadi',
    'Godrej Rivergreens',
    'Godrej Properties',
    'Godrej Rivergreens',
    'P52100051240',
    'residential',
    'Apartment',
    'buy',
    TRUE, TRUE, TRUE, TRUE,
    '₹85 Lac - 1.45 Cr', 8500000.00, 14500000.00,
    'Under Construction', 'Dec 2026',
    750.00, 1250.00, 'Kharadi, Pune', 'Kharadi', 'Pune',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    'Premium riverside township by Godrej Properties featuring modern amenities and seamless connectivity to Kharadi IT hub.'
),
(
    'panchshil-towers-kharadi',
    'Panchshil Towers',
    'Panchshil Realty',
    'Panchshil Towers',
    'P52100000100',
    'residential',
    'Apartment',
    'buy',
    FALSE, TRUE, FALSE, TRUE,
    '₹2.2 Cr - 3.8 Cr', 22000000.00, 38000000.00,
    'Ready to Move', 'Immediate',
    1900.00, 3100.00, 'Kharadi, Pune', 'Kharadi', 'Pune',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    'Ultra-luxury modern residences with panoramic skyline views, bespoke specifications, and high-end concierge services.'
);
