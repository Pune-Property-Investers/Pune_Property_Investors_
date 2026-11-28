-- Create contact_settings table for Container 16: HomeContact
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

-- Seed default initial contact setting if empty
INSERT INTO `contact_settings` (
  `id`,
  `eyebrow`,
  `title`,
  `card_eyebrow`,
  `card_title`,
  `card_subtitle`,
  `office_location`,
  `phone_number`,
  `whatsapp_number`,
  `background_image`,
  `is_active`
)
SELECT
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
WHERE NOT EXISTS (SELECT 1 FROM `contact_settings` WHERE `id` = 1);
