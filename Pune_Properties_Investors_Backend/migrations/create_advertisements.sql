-- Migration: Create advertisements table with INT AUTO_INCREMENT PRIMARY KEY
-- Database: ppi_development

DROP TABLE IF EXISTS advertisements;

CREATE TABLE advertisements (
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

-- Initial Seed Data: 2 Featured Partner Spotlight Video Showcases
INSERT INTO advertisements (
    id, title, eyebrow, type, description, video_id, video_url, image_url, button_text, button_url, display_order, is_active
) VALUES 
(
    1,
    'Explore Our Featured Property',
    'FEATURED PROPERTY',
    'video',
    'Watch the property video and discover your next home in Pune.',
    'PRCOvxoYAzo',
    'https://www.youtube.com/watch?v=PRCOvxoYAzo',
    'https://img.youtube.com/vi/PRCOvxoYAzo/hqdefault.jpg',
    'Explore Properties',
    '/properties',
    1,
    1
),
(
    2,
    'Discover Pune Real Estate',
    'WATCH ON YOUTUBE',
    'video',
    'Watch our property video and explore real estate opportunities.',
    'Dyb_iyhg-MU',
    'https://www.youtube.com/watch?v=Dyb_iyhg-MU',
    'https://img.youtube.com/vi/Dyb_iyhg-MU/hqdefault.jpg',
    'Watch on YouTube',
    '/properties',
    2,
    1
);
