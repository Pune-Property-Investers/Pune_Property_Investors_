-- Hero Settings & Hero Trust Badges Migration
USE `ppi_development`;

CREATE TABLE IF NOT EXISTS `hero_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `eyebrow` VARCHAR(150) DEFAULT 'YOUR PROPERTY PARTNER IN PUNE',
  `heading_line1` VARCHAR(255) DEFAULT 'Find Your Dream Home.',
  `heading_line2` VARCHAR(255) DEFAULT 'Invest in Your Future',
  `subtitle` VARCHAR(1000) NULL,
  `video_url` VARCHAR(1000) DEFAULT 'https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true',
  `background_image` VARCHAR(500) NULL,
  `primary_cta_text` VARCHAR(100) NULL,
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
  INDEX idx_badge_order (display_order),
  INDEX idx_badge_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clean and insert new hero trust badges
TRUNCATE TABLE `hero_trust_badges`;

INSERT INTO `hero_trust_badges` (`id`, `badge_key`, `strong_text`, `label_text`, `icon_name`, `display_order`, `is_active`)
VALUES
  (1, 'establishment', 'Since 2022', 'in Pune', 'ShieldCheck', 1, 1),
  (2, 'rating', '4.9/5', 'Client Rating', 'Star', 2, 1),
  (3, 'brokerage', '0%', 'Brokerage', 'CirclePercent', 3, 1),
  (4, 'happy-families', '20,000+', 'Happy Families', 'Users', 4, 1),
  (5, 'team-size', '200+', 'Team Size', 'Building2', 5, 1),
  (6, 'localities', '30+', 'Pune Localities', 'MapPin', 6, 1);
