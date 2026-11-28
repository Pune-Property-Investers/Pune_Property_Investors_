-- Migration: Create trust_highlights table with INT AUTO_INCREMENT PRIMARY KEY
-- Database: ppi_development

DROP TABLE IF EXISTS trust_highlights;

CREATE TABLE trust_highlights (
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

-- Initial Seed Data: 3 Core Customer Promises
INSERT INTO trust_highlights (
    id, highlight_key, title, line1, line2, description, icon_name, display_order, is_active
) VALUES 
(
    1,
    'trust',
    '100% TRUST',
    '100%',
    'TRUST',
    'Complete Transparency. Confident Decisions.',
    'ShieldCheck',
    1,
    1
),
(
    2,
    'brokerage',
    'ZERO BROKERAGE',
    'ZERO',
    'BROKERAGE',
    'No Brokerage. No Hidden Charges.',
    'CirclePercent',
    2,
    1
),
(
    3,
    'price',
    'BEST LAUNCH PRICE',
    'BEST LAUNCH',
    'PRICE',
    'Exclusive Launch Offers. Maximum Savings.',
    'Sparkles',
    3,
    1
);
