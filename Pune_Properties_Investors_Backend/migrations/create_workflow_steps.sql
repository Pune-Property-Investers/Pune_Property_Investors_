-- Migration: Create workflow_steps table with INT AUTO_INCREMENT PRIMARY KEY
-- Database: ppi_development

DROP TABLE IF EXISTS workflow_steps;

CREATE TABLE workflow_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    step_number INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'MapPin',
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ws_order (display_order),
    INDEX idx_ws_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed Data: 7 Guided Buying Journey Steps
INSERT INTO workflow_steps (
    id, step_number, title, description, icon_name, is_active, display_order
) VALUES 
(
    1,
    1,
    'Select Property',
    'Explore verified luxury properties and new launches that match your lifestyle and investment goals.',
    'MapPin',
    1,
    1
),
(
    2,
    2,
    'Submit Your Enquiry',
    'Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.',
    'FileText',
    1,
    2
),
(
    3,
    3,
    'Meet Our Expert',
    'Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.',
    'Users',
    1,
    3
),
(
    4,
    4,
    'Visit Property',
    'Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.',
    'Building2',
    1,
    4
),
(
    5,
    5,
    'Buy Property',
    'Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.',
    'KeyRound',
    1,
    5
),
(
    6,
    6,
    'Loan Assistance',
    'Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.',
    'Landmark',
    1,
    6
),
(
    7,
    7,
    'Customer Support',
    'Ongoing documentation, legal verification, agreement registration, and lifetime handover support.',
    'Headset',
    1,
    7
);
