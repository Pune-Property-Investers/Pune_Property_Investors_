-- ==============================================================================
-- PUNE PROPERTY INVESTORS (PPI INFRA) — COMPREHENSIVE PRODUCTION DATABASE SCHEMA
-- Database: ppi_development / ppi_infra
-- Engine: InnoDB | Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- Covers: Containers 1 through 17, Authentication, Inventory, CRM, and Site Settings
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `ppi_development` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `ppi_development`;

-- ------------------------------------------------------------------------------
-- 1. ADMINS TABLE
-- Purpose: Authentication & Authorization for PPI Admin CMS
-- Stores hashed passwords (bcrypt), roles, and contact info for administrators.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'AGENT') DEFAULT 'ADMIN',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. PROPERTIES TABLE
-- Purpose: Complete property inventory for residential, commercial & plots
-- Stores titles, slugs, prices, specs, amenities, media, and verification tags.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `properties` (
    `id` VARCHAR(64) PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `developer` VARCHAR(150) NOT NULL,
    `location` VARCHAR(200) NOT NULL,
    `locality` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) DEFAULT 'Pune',
    `property_category` ENUM('residential', 'commercial', 'plot', 'luxury') DEFAULT 'residential',
    `property_type` VARCHAR(60) DEFAULT 'Apartment',
    `purpose` ENUM('buy', 'rent', 'lease') DEFAULT 'buy',
    `price` VARCHAR(100) NOT NULL,
    `numeric_price` BIGINT DEFAULT 0,
    `bhk` JSON,
    `area` VARCHAR(100),
    `status` ENUM('Under Construction', 'Ready to Move', 'New Launch') DEFAULT 'Under Construction',
    `possession` VARCHAR(60),
    `is_new_launch` BOOLEAN DEFAULT FALSE,
    `is_featured` BOOLEAN DEFAULT FALSE,
    `is_trending` BOOLEAN DEFAULT FALSE,
    `verified` BOOLEAN DEFAULT TRUE,
    `badge` VARCHAR(100),
    `image` TEXT NOT NULL,
    `images` JSON,
    `video_url` TEXT,
    `description` TEXT,
    `amenities` JSON,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_prop_slug` (`slug`),
    INDEX `idx_prop_locality` (`locality`),
    INDEX `idx_prop_category` (`property_category`),
    INDEX `idx_prop_purpose` (`purpose`),
    INDEX `idx_prop_status` (`status`),
    INDEX `idx_prop_price` (`numeric_price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. ENQUIRIES / LEADS TABLE
-- Purpose: CRM Lead generation & pipeline tracking
-- Stores inquiries from website contact forms, WhatsApp clicks, and EMI calculator.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
    `id` VARCHAR(64) PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191),
    `property_id` VARCHAR(64),
    `property_title` VARCHAR(255),
    `locality` VARCHAR(150),
    `budget` VARCHAR(100),
    `message` TEXT,
    `type` ENUM('contact', 'site_visit', 'brochure', 'emi_calculator', 'whatsapp') DEFAULT 'contact',
    `date` VARCHAR(50),
    `time` VARCHAR(50),
    `status` ENUM('New', 'Contacted', 'Site Visit Scheduled', 'Follow Up', 'Closed', 'Archived') DEFAULT 'New',
    `follow_up_date` DATE,
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_enquiry_status` (`status`),
    INDEX `idx_enquiry_phone` (`phone`),
    INDEX `idx_enquiry_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. LOCATIONS TABLE (Container 1: Browse Locations / Investment Hubs)
-- Purpose: Locality hubs & investment appreciation data across Pune
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `locations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `tagline` VARCHAR(200),
    `avg_price_per_sqft` INT DEFAULT 0,
    `price_growth_rate` VARCHAR(50),
    `landmarks` JSON,
    `image` TEXT,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. FLOOR PLANS TABLE
-- Purpose: Architectural configurations and layouts per property
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `floor_plans` (
    `id` VARCHAR(64) PRIMARY KEY,
    `property_id` VARCHAR(64),
    `property_title` VARCHAR(255),
    `plan_name` VARCHAR(150) NOT NULL,
    `bhk` VARCHAR(50) NOT NULL,
    `bhk_category` VARCHAR(50),
    `config` VARCHAR(100),
    `carpet_area` INT,
    `super_area` INT,
    `balcony_area` INT,
    `facing` VARCHAR(100),
    `price` VARCHAR(100),
    `price_label` VARCHAR(50) DEFAULT 'Starting from',
    `description` TEXT,
    `rooms` JSON,
    `tag` VARCHAR(100),
    `image_url` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_fp_property` (`property_id`),
    INDEX `idx_fp_bhk` (`bhk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. FLOOR PLAN ENQUIRIES TABLE
-- Purpose: Specific inquiries for floor plans via WhatsApp & Website
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `floor_plan_enquiries` (
    `id` VARCHAR(64) PRIMARY KEY,
    `property_id` VARCHAR(64),
    `property_title` VARCHAR(255),
    `plan_id` VARCHAR(64),
    `plan_name` VARCHAR(150),
    `bhk` VARCHAR(50),
    `carpet_area` VARCHAR(50),
    `price` VARCHAR(100),
    `client_name` VARCHAR(150) NOT NULL,
    `client_phone` VARCHAR(30) NOT NULL,
    `client_email` VARCHAR(191),
    `message` TEXT,
    `channel` VARCHAR(50) DEFAULT 'WhatsApp',
    `status` VARCHAR(50) DEFAULT 'New',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_fpe_phone` (`client_phone`),
    INDEX `idx_fpe_property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. SETTINGS TABLE
-- Purpose: Global CMS settings, SEO configuration, profile and general state
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
    `section_key` VARCHAR(64) PRIMARY KEY,
    `section_data` JSON NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. PROJECTS TABLE
-- Purpose: Comprehensive master project directory across Pune
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
    `id` VARCHAR(64) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `developer` VARCHAR(150),
    `location` VARCHAR(200),
    `locality` VARCHAR(100),
    `price` VARCHAR(100),
    `status` VARCHAR(50) DEFAULT 'Under Construction',
    `publication_status` VARCHAR(50) DEFAULT 'Published',
    `configurations` VARCHAR(100),
    `possession_date` VARCHAR(50),
    `featured` BOOLEAN DEFAULT FALSE,
    `image` TEXT,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. DEVELOPERS TABLE (Container 7: Authorized Partner Builders)
-- Purpose: Builder logos, verified partners, and contact credentials
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `developers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `domain` VARCHAR(100),
    `logo_url` TEXT,
    `website` TEXT,
    `phone` VARCHAR(50),
    `email` VARCHAR(191),
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. ARTICLES / BLOGS TABLE
-- Purpose: Real estate research, market insights & investment guides
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `articles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(50) DEFAULT 'blog',
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `category` VARCHAR(100),
    `author` VARCHAR(100),
    `date` VARCHAR(50),
    `read_time` VARCHAR(50),
    `status` VARCHAR(50) DEFAULT 'Published',
    `image` TEXT,
    `excerpt` TEXT,
    `content` LONGTEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 11. JOBS / CAREERS TABLE
-- Purpose: PPI Infra hiring openings and application tracking
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100),
    `location` VARCHAR(100),
    `experience` VARCHAR(100),
    `type` VARCHAR(50) DEFAULT 'Full Time',
    `status` VARCHAR(50) DEFAULT 'Open',
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 12. FEATURED PROJECTS TABLE (Container 2: Explore Our Featured Projects)
-- Purpose: Flagship high-visibility projects with developer logos and pricing
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `featured_projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `developer` VARCHAR(150) NOT NULL,
    `logo_url` VARCHAR(255),
    `domain` VARCHAR(150),
    `logo_brand` VARCHAR(100),
    `logo_sub` VARCHAR(100),
    `location` VARCHAR(200) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `numeric_price` BIGINT DEFAULT 0,
    `property_type` VARCHAR(60) DEFAULT 'Residential',
    `configuration` VARCHAR(150),
    `subtitle` VARCHAR(255),
    `area` VARCHAR(100),
    `status` VARCHAR(60) DEFAULT 'Under Construction',
    `possession` VARCHAR(60) DEFAULT 'Under Construction',
    `rera_id` VARCHAR(100) DEFAULT 'RERA Approved',
    `image_url` TEXT NOT NULL,
    `badge` VARCHAR(100) DEFAULT 'Featured',
    `description` TEXT,
    `amenities` JSON,
    `display_order` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_fp_slug` (`slug`),
    INDEX `idx_fp_developer` (`developer`),
    INDEX `idx_fp_price` (`numeric_price`),
    INDEX `idx_fp_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 13. NEW LAUNCH PROJECTS TABLE (Container 3: New Launch Projects Showcase)
-- Purpose: Newly released projects with launch offers, EMI schemes & floor plans
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_launch_projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `developer` VARCHAR(150) NOT NULL,
    `developer_logo` VARCHAR(100),
    `location` VARCHAR(200) NOT NULL,
    `area_locality` VARCHAR(100),
    `property_type` VARCHAR(100) DEFAULT 'Luxury Residences',
    `configuration` VARCHAR(100) DEFAULT '2 & 3 BHK',
    `area` VARCHAR(100),
    `price` VARCHAR(100) NOT NULL,
    `numeric_price` BIGINT DEFAULT 0,
    `emi` VARCHAR(100),
    `offer` TEXT,
    `status` VARCHAR(100) DEFAULT 'Newly Launched',
    `badge` VARCHAR(100) DEFAULT 'New Launch',
    `possession` VARCHAR(100) DEFAULT 'Under Construction',
    `rera_number` VARCHAR(100),
    `towers` VARCHAR(100),
    `total_units` VARCHAR(100),
    `image_url` TEXT NOT NULL,
    `gallery` JSON,
    `highlights` JSON,
    `description` TEXT,
    `display_order` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_nlp_slug` (`slug`),
    INDEX `idx_nlp_developer` (`developer`),
    INDEX `idx_nlp_locality` (`area_locality`),
    INDEX `idx_nlp_price` (`numeric_price`),
    INDEX `idx_nlp_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 14. FEATURED PROPERTIES TABLE (Container 4: Video Walkthrough Showcase)
-- Purpose: Properties with full sample flat video tours & high-res image sets
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `featured_properties` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `brand_name` VARCHAR(100) NOT NULL,
    `location` VARCHAR(200) NOT NULL,
    `locality_name` VARCHAR(100),
    `youtube_id` VARCHAR(50) NOT NULL,
    `start_seconds` INT DEFAULT 0,
    `youtube_url` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `tagline` TEXT,
    `completion` VARCHAR(100) DEFAULT 'Under Construction',
    `completion_sub` VARCHAR(100) DEFAULT 'MahaRERA',
    `configurations` VARCHAR(100) DEFAULT '2, 3 BHK',
    `config_sub` VARCHAR(100),
    `carpet` VARCHAR(100),
    `carpet_sub` VARCHAR(100),
    `price` VARCHAR(100) NOT NULL,
    `price_sub` VARCHAR(100) DEFAULT 'Direct Price',
    `badge` VARCHAR(100) DEFAULT 'SAMPLE FLAT TOUR',
    `thumbnail_url` TEXT,
    `site_images` JSON,
    `display_order` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_fp_slug` (`slug`),
    INDEX `idx_fp_locality` (`locality_name`),
    INDEX `idx_fp_brand` (`brand_name`),
    INDEX `idx_fp_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 15. PROPERTY SHORTS / REELS TABLE (Container 5: Vertical Reels & Shorts)
-- Purpose: Mobile-first vertical video reels with duration, price, and likes count
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `property_shorts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `display_title` VARCHAR(100),
    `duration` VARCHAR(20) DEFAULT '1:30',
    `location` VARCHAR(150) NOT NULL,
    `price` VARCHAR(100),
    `configurations` VARCHAR(100),
    `developer` VARCHAR(150),
    `youtube_url` TEXT NOT NULL,
    `youtube_id` VARCHAR(32) NOT NULL,
    `thumbnail_url` TEXT,
    `likes_count` INT DEFAULT 0,
    `description` TEXT,
    `is_visible` TINYINT(1) DEFAULT 1,
    `display_order` INT DEFAULT 0,
    `property_id` VARCHAR(64),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_ps_slug` (`slug`),
    INDEX `idx_ps_visible` (`is_visible`),
    INDEX `idx_ps_order` (`display_order`),
    INDEX `idx_ps_location` (`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 16. UPCOMING PROJECTS TABLE (Container 6: Pre-Launch Milestone Showcase)
-- Purpose: Upcoming projects preview with MahaRERA applied status & video trailer
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `upcoming_projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `brand_subtext` VARCHAR(255),
    `developer` VARCHAR(150),
    `location` VARCHAR(200) NOT NULL,
    `locality` VARCHAR(100),
    `badge_text` VARCHAR(100) DEFAULT 'GRAND PRE-LAUNCH',
    `rera_status` VARCHAR(100) DEFAULT 'MahaRERA Applied',
    `youtube_url` TEXT NOT NULL,
    `youtube_id` VARCHAR(32) NOT NULL,
    `video_start_seconds` INT DEFAULT 14,
    `configurations` VARCHAR(100),
    `configurations_sub` VARCHAR(150),
    `price` VARCHAR(100),
    `price_sub` VARCHAR(150),
    `launch_timeline` VARCHAR(100),
    `launch_timeline_sub` VARCHAR(150),
    `eyebrow` VARCHAR(150),
    `heading` VARCHAR(255),
    `subtitle` TEXT,
    `whatsapp_number` VARCHAR(30) DEFAULT '917398174444',
    `is_active` TINYINT(1) DEFAULT 1,
    `is_featured` TINYINT(1) DEFAULT 1,
    `display_order` INT DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_up_slug` (`slug`),
    INDEX `idx_up_active` (`is_active`),
    INDEX `idx_up_featured` (`is_featured`),
    INDEX `idx_up_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 17. WORKFLOW STEPS TABLE (Container 8: 7-Step Homebuying Journey)
-- Purpose: Step-by-step verified buying workflow with icons and descriptions
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `workflow_steps` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `step_number` INT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `icon_name` VARCHAR(50) DEFAULT 'MapPin',
    `is_active` TINYINT(1) DEFAULT 1,
    `display_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_ws_order` (`display_order`),
    INDEX `idx_ws_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 18. TRUST STATS TABLE (Container 9: Numbers That Define Our Commitment)
-- Purpose: Live achievement counters (Team Size, Happy Clients, Site Visits, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `trust_stats` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `stat_key` VARCHAR(100) NOT NULL UNIQUE,
    `label` VARCHAR(150) NOT NULL,
    `target_value` INT NOT NULL DEFAULT 0,
    `suffix` VARCHAR(20) DEFAULT ' +',
    `icon_name` VARCHAR(50) DEFAULT 'Users',
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_ts_order` (`display_order`),
    INDEX `idx_ts_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 19. TRUST HIGHLIGHTS TABLE (Container 10: 100% Trust Bar Highlights)
-- Purpose: Three pillars of PPI Infra (100% Trust, Zero Brokerage, Best Price)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `trust_highlights` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `highlight_key` VARCHAR(100) NOT NULL UNIQUE,
    `title` VARCHAR(150) NOT NULL,
    `line1` VARCHAR(100),
    `line2` VARCHAR(100),
    `description` TEXT NOT NULL,
    `icon_name` VARCHAR(50) DEFAULT 'ShieldCheck',
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_th_order` (`display_order`),
    INDEX `idx_th_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 20. ADVERTISEMENTS TABLE (Container 11: Sidebar Partner Spotlight)
-- Purpose: Right-hand advertisement video & banner spots on homepage
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `advertisements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `eyebrow` VARCHAR(100) DEFAULT 'FEATURED PROPERTY',
    `type` VARCHAR(50) DEFAULT 'video',
    `description` TEXT,
    `video_id` VARCHAR(50),
    `video_url` TEXT,
    `image_url` TEXT,
    `button_text` VARCHAR(100) DEFAULT 'Explore Properties',
    `button_url` VARCHAR(255) DEFAULT '/properties',
    `external_url` VARCHAR(255),
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_ad_type` (`type`),
    INDEX `idx_ad_order` (`display_order`),
    INDEX `idx_ad_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 21. TESTIMONIALS TABLE (Container 12: Customer Reviews & Client Experiences)
-- Purpose: Verified homebuyer & investor ratings, avatars, and quotes
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `role` VARCHAR(100) DEFAULT 'Homebuyer',
    `location` VARCHAR(100) DEFAULT 'Pune',
    `rating` TINYINT UNSIGNED DEFAULT 5,
    `text` TEXT NOT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `project_name` VARCHAR(150) NULL,
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_testimonial_order` (`display_order`),
    INDEX `idx_testimonial_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 22. HERO SETTINGS & TRUST BADGES (Containers 14 & 15: Hero Section Stage)
-- Purpose: Top video background, eyebrow, headings, and scrolling marquee badges
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `eyebrow` VARCHAR(150) DEFAULT 'YOUR PROPERTY PARTNER IN PUNE',
    `heading_line1` VARCHAR(255) DEFAULT 'Find Your Dream Home.',
    `heading_line2` VARCHAR(255) DEFAULT 'Invest in Your Future',
    `subtitle` VARCHAR(1000) DEFAULT 'Explore verified residential apartments, luxury villas, and high-yield commercial spaces across Pune with 0% brokerage and guaranteed builder pricing.',
    `video_url` VARCHAR(1000) DEFAULT 'https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true',
    `background_image` VARCHAR(500) NULL,
    `primary_cta_text` VARCHAR(100) DEFAULT 'Explore Verified Properties',
    `primary_cta_url` VARCHAR(255) DEFAULT '/buy',
    `show_category_tabs` TINYINT(1) DEFAULT 1,
    `show_search_card` TINYINT(1) DEFAULT 1,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `hero_trust_badges` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `badge_key` VARCHAR(50) NOT NULL UNIQUE,
    `strong_text` VARCHAR(50) NOT NULL,
    `label_text` VARCHAR(100) NOT NULL,
    `icon_name` VARCHAR(50) DEFAULT 'ShieldCheck',
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_badge_order` (`display_order`),
    INDEX `idx_badge_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 23. CONTACT SETTINGS TABLE (Container 16: Home Contact Showcase)
-- Purpose: Full-width architectural contact section, office badge, and hotline
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `eyebrow` VARCHAR(100) DEFAULT 'GET IN TOUCH',
    `title` VARCHAR(255) DEFAULT 'Connect With Our Property Advisors',
    `card_eyebrow` VARCHAR(100) DEFAULT 'PUNE PROPERTY INVESTORS',
    `card_title` VARCHAR(255) DEFAULT 'Start your Pune property journey today',
    `card_subtitle` TEXT,
    `office_location` VARCHAR(255) DEFAULT 'Gera Imperium Alpha, Kharadi',
    `phone_number` VARCHAR(50) DEFAULT '+91 73981 74444',
    `whatsapp_number` VARCHAR(50) DEFAULT '917398174444',
    `background_image` VARCHAR(500) DEFAULT '/images/luxury-villa-bg.jpg',
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 24. ADVERTISEMENT POPUP SETTINGS (Container 17: Floating Corner Video Reel)
-- Purpose: Controls floating mini video reel (delay, auto-mute, pinned video, status)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `advertisement_popup_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `is_enabled` TINYINT(1) DEFAULT 1,
    `delay_seconds` INT DEFAULT 3,
    `auto_mute` TINYINT(1) DEFAULT 1,
    `source_type` VARCHAR(50) DEFAULT 'shorts',
    `pinned_video_id` VARCHAR(100) NULL,
    `pinned_title` VARCHAR(255) NULL,
    `pinned_link` VARCHAR(255) DEFAULT '/shorts',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================================
-- INITIAL SEED DATA (PRODUCTION BASELINE)
-- ==============================================================================

-- 1. Default Super Admin
INSERT INTO `admins` (`name`, `email`, `password_hash`, `role`)
VALUES (
    'PPI Senior Administrator',
    'admin@punepropertyinvestor.com',
    '$2a$10$T8Zg8jS0G7i3mZ3K4l8L4.fP4B6P7w5r6v2u1q9Y2Z1W0X9Y8Z1W0',
    'SUPER_ADMIN'
) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. Hero Section Settings (Container 14)
INSERT INTO `hero_settings` (`id`, `eyebrow`, `heading_line1`, `heading_line2`, `subtitle`, `video_url`, `primary_cta_text`, `primary_cta_url`, `show_category_tabs`, `show_search_card`, `is_active`)
VALUES (
    1,
    'YOUR PROPERTY PARTNER IN PUNE',
    'Find Your Dream Home.',
    'Invest in Your Future',
    'Explore verified residential apartments, luxury villas, and high-yield commercial spaces across Pune with 0% brokerage and guaranteed builder pricing.',
    'https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true',
    'Explore Verified Properties',
    '/buy',
    1, 1, 1
) ON DUPLICATE KEY UPDATE `id`=VALUES(`id`);

-- 3. Hero Trust Badges (Container 15 - Updated 6 Metrics)
INSERT INTO `hero_trust_badges` (`id`, `badge_key`, `strong_text`, `label_text`, `icon_name`, `display_order`, `is_active`)
VALUES
(1, 'establishment', 'Since 2022', 'in Pune', 'ShieldCheck', 1, 1),
(2, 'rating', '4.9/5', 'Client Rating', 'Star', 2, 1),
(3, 'brokerage', '0%', 'Brokerage', 'CirclePercent', 3, 1),
(4, 'happy-families', '20,000+', 'Happy Families', 'Users', 4, 1),
(5, 'team-size', '200+', 'Team Size', 'Building2', 5, 1),
(6, 'localities', '30+', 'Pune Localities', 'MapPin', 6, 1)
ON DUPLICATE KEY UPDATE `strong_text`=VALUES(`strong_text`), `label_text`=VALUES(`label_text`);

-- 4. Trust Highlights (Container 10)
INSERT INTO `trust_highlights` (`id`, `highlight_key`, `title`, `line1`, `line2`, `description`, `icon_name`, `display_order`, `is_active`)
VALUES
(1, 'trust', '100% TRUST', '100%', 'TRUST', 'Complete Transparency. Confident Decisions.', 'ShieldCheck', 1, 1),
(2, 'brokerage', 'ZERO BROKERAGE', 'ZERO', 'BROKERAGE', 'No Brokerage. No Hidden Charges.', 'CirclePercent', 2, 1),
(3, 'price', 'BEST LAUNCH PRICE', 'BEST LAUNCH', 'PRICE', 'Exclusive Launch Offers. Maximum Savings.', 'Sparkles', 3, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 5. Trust Stats (Container 9)
INSERT INTO `trust_stats` (`id`, `stat_key`, `label`, `target_value`, `suffix`, `icon_name`, `display_order`, `is_active`)
VALUES
(1, 'team-size', 'Team Size', 200, ' +', 'Users', 1, 1),
(2, 'happy-clients', 'Happy Clients', 20000, ' +', 'UserRoundCheck', 2, 1),
(3, 'site-visits', 'Site Visits', 10000, ' +', 'CarFront', 3, 1),
(4, 'sqft-sold', 'Sq. Ft Sold Till Date', 900000, ' +', 'Building2', 4, 1),
(5, 'zero-brokerage', 'Brokerage', 0, ' %', 'CirclePercent', 5, 1)
ON DUPLICATE KEY UPDATE `target_value`=VALUES(`target_value`);

-- 6. Workflow Steps (Container 8)
INSERT INTO `workflow_steps` (`id`, `step_number`, `title`, `description`, `icon_name`, `is_active`, `display_order`)
VALUES
(1, 1, 'Select Property', 'Explore verified luxury properties and new launches that match your lifestyle and investment goals.', 'MapPin', 1, 1),
(2, 2, 'Submit Your Enquiry', 'Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.', 'FileText', 1, 2),
(3, 3, 'Meet Our Expert', 'Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.', 'Users', 1, 3),
(4, 4, 'Visit Property', 'Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.', 'Building2', 1, 4),
(5, 5, 'Buy Property', 'Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.', 'KeyRound', 1, 5),
(6, 6, 'Loan Assistance', 'Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.', 'Landmark', 1, 6),
(7, 7, 'Customer Support', 'Ongoing documentation, legal verification, agreement registration, and lifetime handover support.', 'Headset', 1, 7)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 7. Developer Partners (Container 7)
INSERT INTO `developers` (`id`, `name`, `domain`, `logo_url`, `website`, `phone`, `email`, `description`)
VALUES
(1, 'Godrej Properties', 'godrejproperties.com', '/images/logos/godrej.svg', 'https://www.godrejproperties.com', '+91 22 6169 8500', 'contact@godrejproperties.com', 'One of India\'s most trusted real estate developers bringing 125-year legacy of excellence to Pune.'),
(2, 'VTP Realty', 'vtprealty.in', '/images/logos/vtp.png', 'https://www.vtprealty.in', '+91 20 6710 5555', 'sales@vtprealty.in', 'Leading Pune-based developer known for Maximum Livable Area (MLA) designs and integrated townships.'),
(3, 'Kolte-Patil Developers', 'koltepatil.com', '/images/logos/kolte-patil.jpg', 'https://www.koltepatil.com', '+91 20 6622 4000', 'marketing@koltepatil.com', 'Pioneering developer behind iconic projects and 400-acre Life Republic township in Pune.'),
(4, 'Sobha Limited', 'sobha.com', '/images/logos/sobha.png', 'https://www.sobha.com', '+91 80 4646 4500', 'enquiry@sobha.com', 'Renowned for backward integrated craftsmanship and German engineering quality standards.'),
(5, 'Shapoorji Pallonji', 'shapoorjirealestate.com', '/images/logos/shapoorji.svg', 'https://www.shapoorjirealestate.com', '+91 22 6749 0000', 'info@shapoorji.com', '150-year engineering heritage delivering premium homes and smart Joyville communities in Pune.'),
(6, 'Lodha Group', 'lodhagroup.com', '/images/logos/lodha.png', 'https://www.lodhagroup.in', '+91 22 6133 4400', 'sales@lodhagroup.com', 'India\'s premier luxury developer crafting world-class residences and the 100-acre Belmondo reserve.'),
(7, 'Kohinoor Group', 'kohinoorpune.com', '/images/logos/kohinoor.png', 'https://www.kohinoorpune.com', '+91 20 6764 1818', 'sales@kohinoorpune.com', 'Sada Sukhi Raho philosophy with 30+ years of trust across prime residential micro-markets in Pune.'),
(8, 'K Raheja Corp', 'krahejacorp.com', '/images/logos/kraheja.jpg', 'https://www.krahejacorp.com', '+91 22 2656 4000', 'contact@krahejacorp.com', 'Pioneers in luxury hospitality, Grade-A IT parks, and ultra-premium residential towers.')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 8. Customer Testimonials (Container 12)
INSERT INTO `testimonials` (`id`, `name`, `role`, `location`, `rating`, `text`, `avatar_url`, `project_name`, `display_order`, `is_active`)
VALUES
(1, 'Vikram Malhotra', 'First-time Homebuyer', 'Kharadi, Pune', 5, 'PPI helped us secure our dream 3 BHK in Kharadi with zero brokerage and guided us through transparent builder negotiations. Truly exceptional service.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Panchshil Towers', 1, 1),
(2, 'Dr. Ananya Deshmukh', 'Luxury Villa Buyer', 'Baner, Pune', 5, 'Their in-depth knowledge of Baner-Balewadi developments and swift loan coordination made the whole buying journey completely stress-free.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'VTP Earth One', 2, 1),
(3, 'Rajesh & Sunita Kulkarni', 'NRI Property Investor', 'Hinjewadi, Pune', 5, 'Investing from Dubai was seamless. The PPI team arranged live video walkthroughs, verified RERA documentation, and provided accurate rental yield projections.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Godrej Woodsville', 3, 1),
(4, 'Amitesh Sengupta', 'Tech Entrepreneur', 'Wakad, Pune', 5, 'Honest advisory without sales pressure. Got pre-launch pricing and complete assistance right up to registration day.', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', 'Kohinoor Courtyard', 4, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 9. Contact Settings (Container 16)
INSERT INTO `contact_settings` (`id`, `eyebrow`, `title`, `card_eyebrow`, `card_title`, `card_subtitle`, `office_location`, `phone_number`, `whatsapp_number`, `background_image`, `is_active`)
VALUES (
    1,
    'GET IN TOUCH',
    'Connect With Our Property Advisors',
    'PUNE PROPERTY INVESTORS',
    'Start your Pune property journey today',
    'Complete the form and get a personalized list of verified properties within 24 hours.',
    'Gera Imperium Alpha, Kharadi',
    '+91 73981 74444',
    '917398174444',
    '/images/luxury-villa-bg.jpg',
    1
) ON DUPLICATE KEY UPDATE `id`=VALUES(`id`);

-- 10. Advertisement Popup Settings (Container 17)
INSERT INTO `advertisement_popup_settings` (`id`, `is_enabled`, `delay_seconds`, `auto_mute`, `source_type`, `pinned_video_id`, `pinned_title`, `pinned_link`)
VALUES (
    1,
    1,
    3,
    1,
    'shorts',
    NULL,
    'Featured Property Reel',
    '/shorts'
) ON DUPLICATE KEY UPDATE `id`=VALUES(`id`);

-- 11. Advertisements Sidebar (Container 11 - Including user-requested shorts)
INSERT INTO `advertisements` (`id`, `title`, `eyebrow`, `type`, `description`, `video_id`, `video_url`, `image_url`, `button_text`, `button_url`, `display_order`, `is_active`)
VALUES
(1, 'Explore Our Featured Property', 'FEATURED PROPERTY', 'video', 'Watch the property video and discover your next home in Pune.', 'PRCOvxoYAzo', 'https://www.youtube.com/watch?v=PRCOvxoYAzo', 'https://img.youtube.com/vi/PRCOvxoYAzo/hqdefault.jpg', 'Explore Properties', '/properties', 1, 1),
(2, 'Discover Pune Real Estate', 'WATCH ON YOUTUBE', 'video', 'Watch our property video and explore real estate opportunities.', 'Dyb_iyhg-MU', 'https://www.youtube.com/watch?v=Dyb_iyhg-MU', 'https://img.youtube.com/vi/Dyb_iyhg-MU/hqdefault.jpg', 'Watch on YouTube', '/properties', 2, 1),
(3, 'Exclusive Property Tour', 'FEATURED SHORT', 'video', 'Discover verified residential luxury living in Pune with zero brokerage.', '6EGZJ-RtTqs', 'https://www.youtube.com/shorts/6EGZJ-RtTqs', 'https://img.youtube.com/vi/6EGZJ-RtTqs/hqdefault.jpg', 'Watch Reel', '/shorts', 3, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);
