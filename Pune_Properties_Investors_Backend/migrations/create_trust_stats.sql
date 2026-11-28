-- Migration: Create trust_stats table with INT AUTO_INCREMENT PRIMARY KEY
-- Database: ppi_development

DROP TABLE IF EXISTS trust_stats;

CREATE TABLE trust_stats (
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

-- Initial Seed Data: 5 Credibility Achievements
INSERT INTO trust_stats (
    id, stat_key, label, target_value, suffix, icon_name, display_order, is_active
) VALUES 
(
    1,
    'team-size',
    'Team Size',
    200,
    ' +',
    'Users',
    1,
    1
),
(
    2,
    'happy-clients',
    'Happy Clients',
    20000,
    ' +',
    'UserRoundCheck',
    2,
    1
),
(
    3,
    'site-visits',
    'Site Visits',
    10000,
    ' +',
    'CarFront',
    3,
    1
),
(
    4,
    'sqft-sold',
    'Sq. Ft Sold Till Date',
    900000,
    ' +',
    'Building2',
    4,
    1
),
(
    5,
    'zero-brokerage',
    'Brokerage',
    0,
    ' %',
    'CirclePercent',
    5,
    1
);
