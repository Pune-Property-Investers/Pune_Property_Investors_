-- Testimonials Table Migration
USE `ppi_development`;

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
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `name`, `role`, `location`, `rating`, `text`, `avatar_url`, `project_name`, `display_order`, `is_active`)
VALUES
  (1, 'Vikram Malhotra', 'First-time Homebuyer', 'Kharadi, Pune', 5, 'PPI helped us secure our dream 3 BHK in Kharadi with zero brokerage and guided us through transparent builder negotiations. Truly exceptional service.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Panchshil Towers', 1, 1),
  (2, 'Dr. Ananya Deshmukh', 'Luxury Villa Buyer', 'Baner, Pune', 5, 'Their in-depth knowledge of Baner-Balewadi developments and swift loan coordination made the whole buying journey completely stress-free.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'VTP Earth One', 2, 1),
  (3, 'Rajesh & Sunita Kulkarni', 'NRI Property Investor', 'Hinjewadi, Pune', 5, 'Investing from Dubai was seamless. The PPI team arranged live video walkthroughs, verified RERA documentation, and provided accurate rental yield projections.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Godrej Woodsville', 3, 1),
  (4, 'Amitesh Sengupta', 'Tech Entrepreneur', 'Wakad, Pune', 5, 'Honest advisory without sales pressure. Got pre-launch pricing and complete assistance right up to registration day.', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', 'Kohinoor Courtyard', 4, 1)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `role` = VALUES(`role`),
  `location` = VALUES(`location`),
  `rating` = VALUES(`rating`),
  `text` = VALUES(`text`),
  `avatar_url` = VALUES(`avatar_url`),
  `project_name` = VALUES(`project_name`),
  `display_order` = VALUES(`display_order`),
  `is_active` = VALUES(`is_active`);
