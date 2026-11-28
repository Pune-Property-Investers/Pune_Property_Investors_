-- Migration: Enhance and seed developers table with INT AUTO_INCREMENT PRIMARY KEY
-- Database: ppi_development

DROP TABLE IF EXISTS developers;

CREATE TABLE developers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    domain VARCHAR(100),
    logo_url TEXT,
    website TEXT,
    experience_years INT DEFAULT 10,
    total_projects INT DEFAULT 5,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_dev_slug (slug),
    INDEX idx_dev_order (display_order),
    INDEX idx_dev_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed Data: 13 Leading Real Estate Developers in Pune
INSERT INTO developers (
    id, name, slug, domain, logo_url, website,
    experience_years, total_projects, description, is_active, display_order
) VALUES 
(
    1,
    'Shapoorji Pallonji',
    'shapoorji-pallonji',
    'shapoorjirealestate.com',
    'https://www.google.com/s2/favicons?domain=shapoorjirealestate.com&sz=128',
    'https://shapoorjirealestate.com',
    158,
    35,
    'Global engineering and infrastructure giant with over 150 years of excellence delivering premium residential landmarks across Pune.',
    1,
    1
),
(
    2,
    'Vilas Javdekar',
    'vilas-javdekar',
    'vilasjavdekar.com',
    'https://www.google.com/s2/favicons?domain=vilasjavdekar.com&sz=128',
    'https://vilasjavdekar.com',
    40,
    28,
    'Pioneers of architectural trust and sustainable lifestyle homes including iconic developments in Baner, Balewadi, and Wakad.',
    1,
    2
),
(
    3,
    'Pride Purple',
    'pride-purple',
    'pridepurpleproperties.com',
    'https://www.google.com/s2/favicons?domain=pridepurpleproperties.com&sz=128',
    'https://pridepurpleproperties.com',
    25,
    40,
    'Creators of world-class township communities and commercial business hubs in Pune including Park Connect and Park District.',
    1,
    3
),
(
    4,
    'Kohinoor Group',
    'kohinoor-group',
    'kohinoorpune.com',
    'https://www.google.com/s2/favicons?domain=kohinoorpune.com&sz=128',
    'https://kohinoorpune.com',
    39,
    45,
    'Renowned developer with the Sada Sukhi Raho philosophy delivering quality homes across Pune with on-time delivery assurance.',
    1,
    4
),
(
    5,
    'Kolte Patil',
    'kolte-patil',
    'koltepatil.com',
    'https://www.google.com/s2/favicons?domain=koltepatil.com&sz=128',
    'https://koltepatil.com',
    33,
    50,
    'NSE/BSE listed developer creating landmark integrated townships like Life Republic and modern residences in Pune.',
    1,
    5
),
(
    6,
    'Gera Developments',
    'gera-developments',
    'gera.in',
    'https://www.google.com/s2/favicons?domain=gera.in&sz=128',
    'https://gera.in',
    50,
    62,
    'Pioneers of ChildCentric homes and India\'s first 7-year real estate warranty, shaping vibrant family communities across Pune.',
    1,
    6
),
(
    7,
    'VTP Realty',
    'vtp-realty',
    'vtprealty.in',
    'https://www.google.com/s2/favicons?domain=vtprealty.in&sz=128',
    'https://vtprealty.in',
    38,
    30,
    'Pune\'s leading residential brand renowned for Maximum Livable Area, grand township codenames, and swift high-speed execution.',
    1,
    7
),
(
    8,
    'K Raheja Corp',
    'k-raheja-corp',
    'kraheja.com',
    'https://www.google.com/s2/favicons?domain=kraheja.com&sz=128',
    'https://kraheja.com',
    65,
    70,
    'Leading pan-India real estate conglomerate shaping Grade-A IT parks and luxury residential destinations in Pune.',
    1,
    8
),
(
    9,
    'SS Group',
    'ss-group',
    'ssgroupindia.com',
    'https://www.google.com/s2/favicons?domain=ssgroupindia.com&sz=128',
    'https://ssgroupindia.com',
    28,
    22,
    'Trusted real estate group delivering architectural grandeur, high-value properties, and modern amenities.',
    1,
    9
),
(
    10,
    'Pristine Developers',
    'pristine-developers',
    'pristineproperties.com',
    'https://www.google.com/s2/favicons?domain=pristineproperties.com&sz=128',
    'https://pristineproperties.com',
    30,
    35,
    'Specialists in eco-friendly residential sanctuaries and premium gated enclaves in Wagholi, Kharadi, and Baner.',
    1,
    10
),
(
    11,
    'Lodha',
    'lodha-group',
    'lodhagroup.com',
    'https://www.google.com/s2/favicons?domain=lodhagroup.com&sz=128',
    'https://lodhagroup.com',
    44,
    85,
    'India\'s premier real estate developer delivering world-class residences, luxury towers, and lifestyle developments.',
    1,
    11
),
(
    12,
    'Godrej Properties',
    'godrej-properties',
    'godrejproperties.com',
    'https://www.google.com/s2/favicons?domain=godrejproperties.com&sz=128',
    'https://godrejproperties.com',
    34,
    90,
    '125-year legacy of Godrej bringing innovation, sustainability, and cutting-edge engineering excellence to Pune.',
    1,
    12
),
(
    13,
    'Mahindra Lifespaces',
    'mahindra-lifespaces',
    'mahindralifespaces.com',
    'https://www.google.com/s2/favicons?domain=mahindralifespaces.com&sz=128',
    'https://mahindralifespaces.com',
    30,
    48,
    'Real estate and infrastructure development arm of the renowned Mahindra Group, committed to green and sustainable urban living.',
    1,
    13
),
(
    14,
    'JP Morgan',
    'jp-morgan',
    'jpmorgan.com',
    'https://www.google.com/s2/favicons?domain=jpmorgan.com&sz=128',
    'https://www.jpmorgan.com',
    150,
    50,
    'Global financial services leader and institutional real estate investor backing prime commercial and luxury developments.',
    1,
    14
);
