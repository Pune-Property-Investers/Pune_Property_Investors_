-- Create advertisement_popup_settings table for Container 17: AdvertisementPopup
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

-- Seed initial default configuration
INSERT INTO `advertisement_popup_settings` (
  `id`,
  `is_enabled`,
  `delay_seconds`,
  `auto_mute`,
  `source_type`,
  `pinned_video_id`,
  `pinned_title`,
  `pinned_link`
)
SELECT
  1,
  1,
  3,
  1,
  'shorts',
  NULL,
  'Featured Property Reel',
  '/shorts'
WHERE NOT EXISTS (SELECT 1 FROM `advertisement_popup_settings` WHERE `id` = 1);
