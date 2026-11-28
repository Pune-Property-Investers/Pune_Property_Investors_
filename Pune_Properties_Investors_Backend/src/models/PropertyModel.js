import { query, isDBConnected } from "../config/db.js";

/**
 * Property Model (Data Layer)
 * Supports parameterized MySQL database operations with seamless in-memory fallback.
 */

let memoryProperties = [
    {
        id: "1",
        slug: "godrej-rivergreens-kharadi",
        title: "Godrej Rivergreens",
        developer: "Godrej Properties",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "residential",
        propertyType: "Apartment",
        purpose: "buy",
        price: "₹85 Lac - 1.45 Cr",
        numericPrice: 8500000,
        bhk: ["2 BHK", "3 BHK"],
        area: "750 - 1250 sq.ft.",
        status: "Under Construction",
        possession: "Dec 2026",
        isNewLaunch: true,
        isFeatured: true,
        isTrending: true,
        verified: true,
        badge: "New Launch Premiere",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Premium township living by Godrej Properties featuring modern amenities, riverside lifestyle, and seamless connectivity to Kharadi IT hub.",
        amenities: ["Swimming Pool", "Clubhouse", "Gymnasium", "Kids Play Area", "Jogging Track", "24/7 Security"],
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        slug: "panchshil-towers-kharadi",
        title: "Panchshil Towers",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "residential",
        propertyType: "Apartment",
        purpose: "buy",
        price: "₹2.2 Cr - 3.8 Cr",
        numericPrice: 22000000,
        bhk: ["3 BHK", "4 BHK"],
        area: "1900 - 3100 sq.ft.",
        status: "Ready to Move",
        possession: "Immediate",
        isNewLaunch: false,
        isFeatured: true,
        isTrending: false,
        verified: true,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Ultra-luxury modern residences with panoramic skyline views, bespoke specifications, and high-end concierge services.",
        amenities: ["Infinity Pool", "Sky Lounge", "Tennis Court", "Spa", "Private Theater"],
        createdAt: new Date().toISOString()
    },
    {
        id: "3",
        slug: "eon-free-zone-office-kharadi",
        title: "Grade-A Commercial Space at EON IT Park",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "commercial",
        propertyType: "Commercial Office",
        purpose: "lease",
        price: "₹4.5 Cr",
        numericPrice: 45000000,
        area: "4200 sq.ft.",
        status: "Ready to Move",
        possession: "Immediate",
        isNewLaunch: false,
        isFeatured: true,
        isTrending: true,
        verified: true,
        badge: "Grade-A IT Asset",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "High-yield commercial IT office space with 100% DG power backup, high-speed elevators, and LEED gold certification.",
        amenities: ["Central AC", "24/7 Power Backup", "High-Speed Elevators", "Conference Center", "Cafeteria", "Ample Parking"],
        createdAt: new Date().toISOString()
    },
    {
        id: "4",
        slug: "hinjewadi-prime-villa-plots",
        title: "Exclusive Villa Plots in Hinjewadi",
        developer: "Megapolis Developers",
        location: "Hinjewadi Phase 3, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyCategory: "plot",
        propertyType: "Plot",
        purpose: "buy",
        price: "₹65 Lac - 1.1 Cr",
        numericPrice: 6500000,
        area: "1800 - 3200 sq.ft.",
        status: "New Launch",
        possession: "Within 6 Months",
        isNewLaunch: true,
        isFeatured: false,
        isTrending: false,
        verified: true,
        badge: "Gated Community Plots",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Clear title, PMRDA sanctioned residential NA plots in a luxury gated community near Hinjewadi IT hub with clubhouse and landscaped gardens.",
        amenities: ["Gated Perimeter", "Wide Asphalt Roads", "Water & Electricity Points", "Clubhouse", "24/7 Guarded Entry"],
        createdAt: new Date().toISOString()
    }
,
    {
            "id": "920",
            "slug": "laxmi-emerald-dhanori",
            "title": "Laxmi Emerald",
            "developer": "Laxmi Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹65.87 L - 79.96 L",
            "numericPrice": 6587000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "690 - 848 sq.ft.",
            "status": "Ready to Move",
            "possession": "Ready to Move",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Ready Possession",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Laxmi Emerald is a premium residential enclave in Dhanori spread across 4 acres with 7 towers (2+10 stories). Offering ready-possession 2 BHK (690-694 sq.ft.) and 3 BHK (848 sq.ft.) residences designed with optimal ventilation, Vastu compliance, and zero brokerage advantage.",
            "amenities": [
                    "Clubhouse",
                    "Children's Play Area",
                    "Gym",
                    "Landscaped Gardens",
                    "Security",
                    "Power Backup",
                    "Parking",
                    "Lift"
            ],
            "floorPlans": [
                    {
                            "id": "laxmi-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Premium",
                            "config": "2 BHK Elegant Suite",
                            "carpetArea": 690,
                            "superArea": 920,
                            "balconyArea": 55,
                            "facing": "East Facing (Vastu)",
                            "price": "₹65.87 L - 67.35 L",
                            "priceLabel": "Starting from",
                            "description": "Thoughtfully planned 2 BHK residence with spacious master bedroom, living-dining balcony, and contemporary kitchen utility.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Children's Bedroom",
                                            "size": "10'6\" × 10'0\""
                                    },
                                    {
                                            "name": "Kitchen",
                                            "size": "9'0\" × 7'6\""
                                    }
                            ],
                            "tag": "Best Value"
                    },
                    {
                            "id": "laxmi-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 848,
                            "superArea": 1130,
                            "balconyArea": 75,
                            "facing": "East Facing (Vastu)",
                            "price": "₹79.96 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home featuring 3 expansive bedrooms, private balcony views, and premium modern fixtures.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Family Choice"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.771Z"
    },
    {
            "id": "921",
            "slug": "yash-grecia-dhanori",
            "title": "Yash Grecia",
            "developer": "Yash Promoters & Builders",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹67 Lac - 74 Lac",
            "numericPrice": 6700000,
            "bhk": [
                    "2 BHK"
            ],
            "area": "653 - 722 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "New Launch",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Yash Grecia across 3.5 acres in Dhanori brings European-inspired architecture with 5 towers of 14 stories. Features boutique 2 BHK residences (653 - 722 sq.ft.) offering sunlit layouts, landscaped podiums, and seamless airport connectivity.",
            "amenities": [
                    "Swimming Pool",
                    "Gym",
                    "Jogging Track",
                    "Clubhouse",
                    "Security",
                    "Parking",
                    "Lift",
                    "Power Backup"
            ],
            "floorPlans": [
                    {
                            "id": "grecia-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Urban Suite",
                            "carpetArea": 653,
                            "superArea": 870,
                            "balconyArea": 50,
                            "facing": "North-East Facing",
                            "price": "₹67 Lac - 74 Lac",
                            "priceLabel": "Starting from",
                            "description": "Efficiently engineered 2 BHK layout optimizing every square foot for comfort and natural ventilation.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "11'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Guest Bedroom",
                                            "size": "10'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Kitchen",
                                            "size": "8'6\" × 7'0\""
                                    }
                            ],
                            "tag": "High Demand"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "922",
            "slug": "shriram-nysa-dhanori",
            "title": "Shriram Nysa",
            "developer": "Shriram Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹71 Lac - 1.07 Cr",
            "numericPrice": 7100000,
            "bhk": [
                    "2 BHK"
            ],
            "area": "748 - 1,154 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Verified Project",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Shriram Nysa in Dhanori is set over 2 acres in a private G+13 storey tower. Features generous 2 BHK layouts from 748 sq.ft. standard suites to expansive 1,154 sq.ft. executive residences with modern amenities.",
            "amenities": [
                    "Clubhouse",
                    "Fitness Center",
                    "Children Play Area",
                    "Multipurpose Hall",
                    "CCTV Security",
                    "Rainwater Harvesting",
                    "Covered Parking"
            ],
            "floorPlans": [
                    {
                            "id": "nysa-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Standard",
                            "config": "2 BHK Urban Flat",
                            "carpetArea": 748,
                            "superArea": 995,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹71 Lac - 1.07 Cr",
                            "priceLabel": "Starting from",
                            "description": "Well-ventilated 2 BHK home with 2 full bathrooms and scenic sit-out balcony.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Popular"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "923",
            "slug": "nivasa-enchante-dhanori",
            "title": "Nivasa Enchante",
            "developer": "Nivasa Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹60 Lac - 1.86 Cr",
            "numericPrice": 6000000,
            "bhk": [
                    "1.5 BHK",
                    "2 BHK",
                    "2.5 BHK",
                    "3 BHK"
            ],
            "area": "585 - 1,046 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": true,
            "isFeatured": true,
            "isTrending": true,
            "verified": true,
            "badge": "Township Premiere",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Nivasa Enchante is a flagship 4.25-acre lifestyle community in Dhanori comprising 9 magnificent towers of 14 floors. Offering 1.5, 2, 2.5, and 3 BHK homes with resort-style podium amenities and scenic panoramic surrounds.",
            "amenities": [
                    "Grand Clubhouse",
                    "Infinity Edge Pool",
                    "Kids Water Park",
                    "Tennis Court",
                    "Jogging Path",
                    "Senior Citizen Park",
                    "24/7 Security"
            ],
            "floorPlans": [
                    {
                            "id": "enchante-1.5bhk",
                            "bhk": "1.5 BHK",
                            "bhkCategory": "1 BHK",
                            "name": "1.5 BHK Smart Studio",
                            "config": "1.5 BHK Urban Suite",
                            "carpetArea": 585,
                            "superArea": 780,
                            "balconyArea": 45,
                            "facing": "East Facing",
                            "price": "₹60 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smart 1.5 BHK configuration with flexible work-from-home study nook.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "14'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Study Room",
                                            "size": "8'0\" × 7'6\""
                                    }
                            ],
                            "tag": "Smart Living"
                    },
                    {
                            "id": "enchante-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Family Suite",
                            "carpetArea": 787,
                            "superArea": 1050,
                            "balconyArea": 65,
                            "facing": "North-East Facing",
                            "price": "₹81 Lac - 82.5 Lac",
                            "priceLabel": "Starting from",
                            "description": "Comfortable 2 BHK home with large bedrooms, dry balcony, and living sit-out.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Best Seller"
                    },
                    {
                            "id": "enchante-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2.5 BHK Plus",
                            "config": "2.5 BHK Luxury Home",
                            "carpetArea": 858,
                            "superArea": 1140,
                            "balconyArea": 70,
                            "facing": "East Facing",
                            "price": "₹91 Lac - 92 Lac",
                            "priceLabel": "Starting from",
                            "description": "Dedicated 2.5 BHK home featuring a spacious study / hobby room in addition to 2 large bedrooms.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Children's Room",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Study Room",
                                            "size": "9'0\" × 8'0\""
                                    }
                            ],
                            "tag": "High Utility"
                    },
                    {
                            "id": "enchante-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Luxury",
                            "config": "3 BHK Grand Residence",
                            "carpetArea": 1039,
                            "superArea": 1390,
                            "balconyArea": 85,
                            "facing": "North Facing",
                            "price": "₹1.78 Cr - 1.86 Cr",
                            "priceLabel": "Starting from",
                            "description": "Premium 3 BHK residence with 3 expansive bedrooms, separate puja space, and double balcony.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "20'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Luxury"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "924",
            "slug": "shriram-skypark-dhanori",
            "title": "Shriram SkyPark",
            "developer": "Shriram Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹62 Lac - 72 Lac",
            "numericPrice": 6200000,
            "bhk": [
                    "2 BHK",
                    "2.5 BHK"
            ],
            "area": "707 - 842 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Verified Listing",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Shriram SkyPark features 3 towers of 11 storeys in Dhanori. Offering comfortable 2 BHK (707-708 sq.ft.) and 2.5 BHK (842 sq.ft.) residences with sky lounges and scenic outlooks.",
            "amenities": [
                    "Rooftop Sky Lounge",
                    "Gym",
                    "Landscaped Court",
                    "Kids Play Zone",
                    "High Speed Lifts",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "skypark-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Urban Suite",
                            "carpetArea": 707,
                            "superArea": 940,
                            "balconyArea": 55,
                            "facing": "East Facing",
                            "price": "₹62 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with separate living and dining zones.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Value Pick"
                    },
                    {
                            "id": "skypark-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2.5 BHK Deluxe",
                            "config": "2.5 BHK Family Flat",
                            "carpetArea": 842,
                            "superArea": 1120,
                            "balconyArea": 65,
                            "facing": "North Facing",
                            "price": "₹72 Lac",
                            "priceLabel": "Starting from",
                            "description": "2.5 BHK layout offering a work-from-home room or prayer sanctuary.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Study",
                                            "size": "8'6\" × 8'0\""
                                    }
                            ],
                            "tag": "Trending"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "925",
            "slug": "gulmohar-skypark-dhanori",
            "title": "Gulmohar SkyPark",
            "developer": "Gulmohar Development",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹65 Lac - 1.00 Cr",
            "numericPrice": 6500000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "641 - 1,049 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2028",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Under Construction",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Gulmohar SkyPark is a lush 6-acre gated development in Dhanori featuring 3 mid-rise towers of 12 storeys. Offers 2 BHK (641-675 sq.ft.) and 3 BHK (912-1049 sq.ft.) residences surrounded by manicured green lawns.",
            "amenities": [
                    "Swimming Pool",
                    "Clubhouse",
                    "Party Lawn",
                    "Gym",
                    "Jogging Track",
                    "Power Backup",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "gulmohar-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Residential Flat",
                            "carpetArea": 641,
                            "superArea": 855,
                            "balconyArea": 50,
                            "facing": "East Facing",
                            "price": "₹65 Lac - 68 Lac",
                            "priceLabel": "Starting from",
                            "description": "Efficient 2 BHK apartment with balcony and well-placed bathrooms.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value"
                    },
                    {
                            "id": "gulmohar-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Premium",
                            "config": "3 BHK Grand Home",
                            "carpetArea": 912,
                            "superArea": 1215,
                            "balconyArea": 75,
                            "facing": "North-East Facing",
                            "price": "₹90 Lac - 1.00 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with 3 distinct bedrooms, sun-facing deck, and designer kitchen.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Family Home"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "926",
            "slug": "skyrise-sparkle-dhanori",
            "title": "Skyrise Sparkle",
            "developer": "Skyrise Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹69 Lac - 70 Lac",
            "numericPrice": 6900000,
            "bhk": [
                    "2 BHK"
            ],
            "area": "696 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2025",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Possession Dec 2025",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Skyrise Sparkle offers boutique 2 BHK residences (696 sq.ft.) across 2 towers of 10 storeys on a 1-acre plot in Dhanori. Fast possession scheduled for Dec 2025.",
            "amenities": [
                    "Community Hall",
                    "Kids Play Area",
                    "Gym",
                    "Landscaped Garden",
                    "24/7 Security",
                    "Solar Water Heating"
            ],
            "floorPlans": [
                    {
                            "id": "sparkle-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Sparkle",
                            "config": "2 BHK Modern Residence",
                            "carpetArea": 696,
                            "superArea": 928,
                            "balconyArea": 50,
                            "facing": "East Facing",
                            "price": "₹69 Lac - 70 Lac",
                            "priceLabel": "Starting from",
                            "description": "Well-lit 2 BHK layout with cross-ventilation and attached terrace balcony.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Children Room",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Fast Handover"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "927",
            "slug": "elite-platinum-dhanori",
            "title": "Elite Platinum",
            "developer": "Elite Landmarks",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹69 Lac - 1.38 Cr",
            "numericPrice": 6900000,
            "bhk": [
                    "2 BHK",
                    "3 BHK",
                    "4 BHK"
            ],
            "area": "692 - 1,540 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2027",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Premium High-Rise",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Elite Platinum in Dhanori is a standalone luxury tower of 13 storeys on a 1-acre plot. Features versatile 2 BHK (692-849 sq.ft.), 3 BHK (952-1450 sq.ft.), and opulent 4 BHK (1540 sq.ft.) residences.",
            "amenities": [
                    "Grand Entrance Lobby",
                    "Rooftop Infinity Deck",
                    "Gymnasium",
                    "Kids Play Zone",
                    "CCTV Surveillance",
                    "Intercom",
                    "EV Charging Point"
            ],
            "floorPlans": [
                    {
                            "id": "elite-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Platinum",
                            "config": "2 BHK Luxury Suite",
                            "carpetArea": 692,
                            "superArea": 925,
                            "balconyArea": 55,
                            "facing": "East Facing",
                            "price": "₹69 Lac - 76.42 Lac",
                            "priceLabel": "Starting from",
                            "description": "Modern 2 BHK layout with options from 692 to 849 sq.ft.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value"
                    },
                    {
                            "id": "elite-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Platinum",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 952,
                            "superArea": 1270,
                            "balconyArea": 75,
                            "facing": "North Facing",
                            "price": "₹85 Lac - 1.30 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with options from 952 to 1,450 sq.ft.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Spacious"
                    },
                    {
                            "id": "elite-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Presidential",
                            "config": "4 BHK Grand Flat",
                            "carpetArea": 1540,
                            "superArea": 2050,
                            "balconyArea": 120,
                            "facing": "East Facing",
                            "price": "₹1.38 Cr",
                            "priceLabel": "Starting from",
                            "description": "Expansive 4 BHK residence with 4 master suites, double terrace decks, and private foyer.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "22'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "16'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Suite 2",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Suite 3",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Suite 4",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Ultra Luxury"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "928",
            "slug": "metropolis-east-phase-ii-dhanori",
            "title": "Metropolis East Phase II",
            "developer": "Metropolis Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹78 Lac - 82.64 Lac",
            "numericPrice": 7800000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "756 - 859 sq.ft.",
            "status": "Under Construction",
            "possession": "Mar 2026",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Possession Mar 2026",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Metropolis East Phase II spans 3.5 to 4 acres in Dhanori featuring 5 towers of B+G+12 storeys. Offers 2 BHK (756 sq.ft.) and 3 BHK (859 sq.ft.) residences delivering in March 2026.",
            "amenities": [
                    "Clubhouse",
                    "Fitness Center",
                    "Landscape Court",
                    "Kids Play Zone",
                    "Basement Parking",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "metro-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Executive",
                            "config": "2 BHK Modern Suite",
                            "carpetArea": 756,
                            "superArea": 1010,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹78 Lac",
                            "priceLabel": "Starting from",
                            "description": "Executive 2 BHK with broad living hall and scenic private terrace.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value"
                    },
                    {
                            "id": "metro-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Executive",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 859,
                            "superArea": 1145,
                            "balconyArea": 70,
                            "facing": "North-East Facing",
                            "price": "₹82.64 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home engineered for comfortable family living.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Family Choice"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "929",
            "slug": "bramha-sky-city-dhanori",
            "title": "Bramha Sky City",
            "developer": "BramhaCorp",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹73.70 Lac - 90.03 Lac",
            "numericPrice": 7370000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "786 - 970 sq.ft.",
            "status": "Ready to Move",
            "possession": "Ready to Move",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Ready Possession",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Bramha Sky City is a sprawling 15.5-acre mega integrated township in Dhanori with 16 majestic towers of 12 storeys. Offers ready 2 BHK (786-787 sq.ft.) and 3 BHK (970 sq.ft.) residences.",
            "amenities": [
                    "Olympic Sized Pool",
                    "Grand Clubhouse",
                    "Tennis Court",
                    "Cricket Pitch",
                    "Jogging Track",
                    "Gym",
                    "Landscaped Gardens",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "bramha-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK City Suite",
                            "config": "2 BHK Residential Flat",
                            "carpetArea": 786,
                            "superArea": 1050,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹73.70 Lac - 73.76 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious ready-to-move 2 BHK with garden facing balcony.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Ready to Move"
                    },
                    {
                            "id": "bramha-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK City Suite",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 970,
                            "superArea": 1295,
                            "balconyArea": 80,
                            "facing": "North Facing",
                            "price": "₹90.03 Lac",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK ready home inside a 15.5-acre township with full amenities.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Township Living"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "930",
            "slug": "mind-space-dhanori",
            "title": "Mind Space",
            "developer": "Mindspace Realty",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹76 Lac - 1.04 Cr",
            "numericPrice": 7600000,
            "bhk": [
                    "2 BHK",
                    "2.5 BHK",
                    "3 BHK"
            ],
            "area": "762 - 1,066 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2027",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Verified Project",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Mind Space in Dhanori features 2 towers of 13 floors on 1.29 acres. Offering 2 BHK (762-808 sq.ft.), 2.5 BHK (918-949 sq.ft.), and 3 BHK (989-1066 sq.ft.) residences.",
            "amenities": [
                    "Modern Clubhouse",
                    "Gymnasium",
                    "Kids Play Park",
                    "Senior Citizen Corner",
                    "24/7 Security",
                    "Covered Parking"
            ],
            "floorPlans": [
                    {
                            "id": "mindspace-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Suite",
                            "carpetArea": 762,
                            "superArea": 1015,
                            "balconyArea": 55,
                            "facing": "East Facing",
                            "price": "₹76 Lac - 81 Lac",
                            "priceLabel": "Starting from",
                            "description": "Well-designed 2 BHK layout with sunlit rooms and cross-ventilation.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value"
                    },
                    {
                            "id": "mindspace-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2.5 BHK Executive",
                            "config": "2.5 BHK Deluxe Suite",
                            "carpetArea": 918,
                            "superArea": 1225,
                            "balconyArea": 65,
                            "facing": "North Facing",
                            "price": "₹91 Lac - 94 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2.5 BHK home with extra study room.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Study",
                                            "size": "9'0\" × 8'0\""
                                    }
                            ],
                            "tag": "Utility"
                    },
                    {
                            "id": "mindspace-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Luxury",
                            "config": "3 BHK Grand Home",
                            "carpetArea": 989,
                            "superArea": 1320,
                            "balconyArea": 80,
                            "facing": "East Facing",
                            "price": "₹97 Lac - 1.04 Cr",
                            "priceLabel": "Starting from",
                            "description": "Generous 3 BHK layout with master deck and premium fittings.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "13'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Premium"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "931",
            "slug": "divine-garden-dhanori",
            "title": "Divine Garden",
            "developer": "Divine Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹81 Lac - 1.13 Cr",
            "numericPrice": 8100000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "812 - 1,080 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "16-Acre Township",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Divine Garden is a massive 16-acre residential community in Dhanori comprising 14 to 20 towers of B+G+10 storeys. Offers expansive 2 BHK (812-820 sq.ft.) and 3 BHK (992-1080 sq.ft.) residences.",
            "amenities": [
                    "Olympic Sized Pool",
                    "Clubhouse",
                    "Badminton Court",
                    "Amphitheatre",
                    "Jogging Track",
                    "Gym",
                    "Gardens",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "divine-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Garden Suite",
                            "config": "2 BHK Deluxe Suite",
                            "carpetArea": 812,
                            "superArea": 1085,
                            "balconyArea": 65,
                            "facing": "East Facing",
                            "price": "₹81 Lac - 84 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with large bedrooms and community lawn vistas.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "Spacious"
                    },
                    {
                            "id": "divine-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grand Suite",
                            "config": "3 BHK Luxury Flat",
                            "carpetArea": 992,
                            "superArea": 1320,
                            "balconyArea": 80,
                            "facing": "North-East Facing",
                            "price": "₹1.01 Cr - 1.13 Cr",
                            "priceLabel": "Starting from",
                            "description": "Luxurious 3 BHK home inside a 16-acre garden township.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'6\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Township Choice"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "932",
            "slug": "ganga-new-town-dhanori",
            "title": "Ganga New Town",
            "developer": "Goel Ganga Developments",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹87 Lac - 1.74 Cr",
            "numericPrice": 8700000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "828 - 1,654 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2027",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "15-Acre Community",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Ganga New Town is an upscale 15-acre community in Dhanori offering 4 high-rise towers of 12 floors. Features 2 BHK (828-853 sq.ft.), 3 BHK (1031-1099 sq.ft.), and signature 2 BHK Penthouse (1654 sq.ft.).",
            "amenities": [
                    "Infinity Pool",
                    "Clubhouse",
                    "Gymnasium",
                    "Multipurpose Court",
                    "Kids Play Area",
                    "Landscape Podium",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "ganga-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Deluxe",
                            "config": "2 BHK Premium Suite",
                            "carpetArea": 828,
                            "superArea": 1105,
                            "balconyArea": 65,
                            "facing": "East Facing",
                            "price": "₹87 Lac - 89 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with large sun deck and master bath.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "Best Seller"
                    },
                    {
                            "id": "ganga-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grand",
                            "config": "3 BHK Luxury Suite",
                            "carpetArea": 1031,
                            "superArea": 1375,
                            "balconyArea": 80,
                            "facing": "North Facing",
                            "price": "₹1.15 Cr - 1.22 Cr",
                            "priceLabel": "Starting from",
                            "description": "Grand 3 BHK residence with expansive living and dining hall.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "20'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Luxury"
                    },
                    {
                            "id": "ganga-penthouse",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Sky Penthouse",
                            "config": "2 BHK Sky Penthouse",
                            "carpetArea": 1654,
                            "superArea": 2200,
                            "balconyArea": 240,
                            "facing": "East Facing",
                            "price": "₹1.74 Cr",
                            "priceLabel": "Starting from",
                            "description": "Exclusive penthouse duplex with private sky terrace and panoramic city views.",
                            "rooms": [
                                    {
                                            "name": "Grand Foyer & Living",
                                            "size": "24'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "16'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Sky Terrace",
                                            "size": "20'0\" × 12'0\""
                                    }
                            ],
                            "tag": "Exclusive Penthouse"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "933",
            "slug": "nyati-era-dhanori",
            "title": "Nyati Era",
            "developer": "Nyati Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹88 Lac - 1.32 Cr",
            "numericPrice": 8800000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "809 - 1,175 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2027",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Nyati Quality",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Nyati Era brings Nyati Group's acclaimed construction quality to Dhanori across 8 acres with 18 towers of 13 floors. Features spacious 2 BHK (809-835 sq.ft.) and 3 BHK (1175 sq.ft.) residences.",
            "amenities": [
                    "Signature Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Squash Court",
                    "Jogging Track",
                    "Multipurpose Hall",
                    "Security"
            ],
            "floorPlans": [
                    {
                            "id": "nyati-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Era Suite",
                            "config": "2 BHK Deluxe Suite",
                            "carpetArea": 809,
                            "superArea": 1080,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹88 Lac - 90 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home built with first-class engineering and fine finishes.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "High Quality"
                    },
                    {
                            "id": "nyati-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Era Grand",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 1175,
                            "superArea": 1565,
                            "balconyArea": 90,
                            "facing": "North-East Facing",
                            "price": "₹1.32 Cr",
                            "priceLabel": "Starting from",
                            "description": "Expansive 3 BHK home with 3 distinct bathrooms and double private decks.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "21'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "Flagship"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "934",
            "slug": "skyscape-dhanori",
            "title": "SkyScape",
            "developer": "SkyScape Infra",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹57 Lac - 90 Lac",
            "numericPrice": 5700000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "654 - 1,016 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2028",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Affordable Luxury",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "SkyScape in Dhanori offers attractive pricing starting from ₹57 Lac on a 1-acre plot with a 10-storey tower. Features 2 BHK (654-923 sq.ft.) and 3 BHK (1004-1016 sq.ft.) configurations.",
            "amenities": [
                    "Rooftop Gazebo",
                    "Gym",
                    "Kids Play Area",
                    "CCTV Security",
                    "Covered Parking",
                    "Lift with Backup"
            ],
            "floorPlans": [
                    {
                            "id": "skyscape-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Value",
                            "config": "2 BHK Urban Flat",
                            "carpetArea": 654,
                            "superArea": 870,
                            "balconyArea": 50,
                            "facing": "East Facing",
                            "price": "₹57 Lac - 81 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smart 2 BHK apartment with balcony and open modular kitchen.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value Pick"
                    },
                    {
                            "id": "skyscape-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grand",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 1004,
                            "superArea": 1340,
                            "balconyArea": 75,
                            "facing": "North Facing",
                            "price": "₹88 Lac - 90 Lac",
                            "priceLabel": "Starting from",
                            "description": "Comfortable 3 BHK home with 3 bedrooms and scenic valley views.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "18'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "13'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Family Home"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "935",
            "slug": "kohinoor-viva-pixel-dhanori",
            "title": "Kohinoor Viva Pixel",
            "developer": "Kohinoor Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹78 Lac - 1.27 Cr",
            "numericPrice": 7800000,
            "bhk": [
                    "2 BHK",
                    "2.5 BHK",
                    "3 BHK",
                    "4 BHK"
            ],
            "area": "780 - 1,280 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2026",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Sada Sukhi Raho",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Kohinoor Viva Pixel (Ph I & II) across 4 acres in Dhanori delivers Kohinoor's 'Sada Sukhi Raho' philosophy in 6 towers of 15 floors. Offers 2 BHK (780-826 sq.ft.), 2.5 BHK (900 sq.ft.), 3 BHK (999-1115 sq.ft.), and 4 BHK (1280 sq.ft.) residences.",
            "amenities": [
                    "Swimming Pool",
                    "Grand Clubhouse",
                    "Indoor Badminton",
                    "Gym",
                    "Landscaped Podium",
                    "Jogging Track",
                    "24/7 Security"
            ],
            "floorPlans": [
                    {
                            "id": "viva-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Pixel",
                            "config": "2 BHK Suite",
                            "carpetArea": 780,
                            "superArea": 1040,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹78 Lac - 80 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smartly planned 2 BHK flat with broad living deck.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Popular"
                    },
                    {
                            "id": "viva-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2.5 BHK Pixel Plus",
                            "config": "2.5 BHK Suite",
                            "carpetArea": 900,
                            "superArea": 1200,
                            "balconyArea": 65,
                            "facing": "North-East Facing",
                            "price": "₹91 Lac",
                            "priceLabel": "Starting from",
                            "description": "Comfortable 2.5 BHK with dedicated study room.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Study Room",
                                            "size": "9'0\" × 8'0\""
                                    }
                            ],
                            "tag": "High Utility"
                    },
                    {
                            "id": "viva-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Pixel Grande",
                            "config": "3 BHK Family Flat",
                            "carpetArea": 999,
                            "superArea": 1330,
                            "balconyArea": 80,
                            "facing": "East Facing",
                            "price": "₹99 Lac - 1.11 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with 3 bedrooms and open deck.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Spacious"
                    },
                    {
                            "id": "viva-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Presidential",
                            "config": "4 BHK Luxury Suite",
                            "carpetArea": 1280,
                            "superArea": 1710,
                            "balconyArea": 105,
                            "facing": "North Facing",
                            "price": "₹1.27 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 4 BHK residence offering premium finishes and panoramic airport corridor vistas.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "21'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "15'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Luxury"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "936",
            "slug": "shreeram-euphoria-dhanori",
            "title": "Shreeram Euphoria",
            "developer": "Shreeram Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹78 Lac - 1.10 Cr",
            "numericPrice": 7800000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "761 - 1,081 sq.ft.",
            "status": "Ready to Move",
            "possession": "Ready to Move",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Ready Possession",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Shreeram Euphoria in Dhanori offers ready-possession 2 BHK (761-835 sq.ft.) and 3 BHK (1022-1081 sq.ft.) homes across 2 low-density towers of G+9 floors on 1.5 acres.",
            "amenities": [
                    "Clubhouse",
                    "Gym",
                    "Children Play Park",
                    "Power Backup",
                    "Security",
                    "Intercom",
                    "Car Parking"
            ],
            "floorPlans": [
                    {
                            "id": "euphoria-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Ready",
                            "config": "2 BHK Modern Suite",
                            "carpetArea": 761,
                            "superArea": 1015,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹78 Lac - 85 Lac",
                            "priceLabel": "Starting from",
                            "description": "Ready-to-move 2 BHK with full occupancy certificate and open terrace.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Ready OC"
                    },
                    {
                            "id": "euphoria-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Ready",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 1022,
                            "superArea": 1365,
                            "balconyArea": 80,
                            "facing": "North-East Facing",
                            "price": "₹1.03 Cr - 1.10 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious ready 3 BHK residence with 3 well-lit bedrooms.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Ready OC"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "937",
            "slug": "one-aretha-dhanori",
            "title": "One Aretha",
            "developer": "Aretha Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹85 Lac - 1.60 Cr",
            "numericPrice": 8500000,
            "bhk": [
                    "2 BHK",
                    "3 BHK",
                    "4 BHK"
            ],
            "area": "784 - 1,246 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2027",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Boutique Living",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "One Aretha is a premier 4-acre development in Dhanori offering 2 BHK (784 sq.ft.), 3 BHK (1082 sq.ft.), and 4 BHK (1246 sq.ft.) homes with curated sky amenities and close proximity to IT corridors.",
            "amenities": [
                    "Signature Infinity Pool",
                    "Sky Lounge",
                    "Gym",
                    "Landscaped Gardens",
                    "Banquet Hall",
                    "24/7 Security",
                    "EV Points"
            ],
            "floorPlans": [
                    {
                            "id": "aretha-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Aretha",
                            "config": "2 BHK Premium Suite",
                            "carpetArea": 784,
                            "superArea": 1045,
                            "balconyArea": 60,
                            "facing": "East Facing",
                            "price": "₹85 Lac",
                            "priceLabel": "Starting from",
                            "description": "Elegantly finished 2 BHK residence with deck overlooking greenery.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Value"
                    },
                    {
                            "id": "aretha-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Aretha",
                            "config": "3 BHK Luxury Flat",
                            "carpetArea": 1082,
                            "superArea": 1445,
                            "balconyArea": 80,
                            "facing": "North Facing",
                            "price": "₹1.22 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with 3 bathrooms and wide entertaining balcony.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "20'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Popular"
                    },
                    {
                            "id": "aretha-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Aretha",
                            "config": "4 BHK Grand Flat",
                            "carpetArea": 1246,
                            "superArea": 1660,
                            "balconyArea": 100,
                            "facing": "East Facing",
                            "price": "₹1.60 Cr",
                            "priceLabel": "Starting from",
                            "description": "Expansive 4 BHK family residence with panoramic view deck.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "22'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Ultra Luxury"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "938",
            "slug": "prestigia-unique-properties-dhanori",
            "title": "PRESTIGIA",
            "developer": "Unique Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹89 Lac - 3.13 Cr",
            "numericPrice": 8900000,
            "bhk": [
                    "2 BHK",
                    "3 BHK",
                    "4 BHK"
            ],
            "area": "883 - 3,115 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2028",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": true,
            "verified": true,
            "badge": "Ultra Luxury Duplex",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "PRESTIGIA by Unique Properties is an elite low-density development of B+G+7 floors across 1.5 acres in Dhanori. Features lavish 2 BHK, 3 BHK, 3 BHK Duplex & Penthouse, and 4 BHK Duplex & Penthouse.",
            "amenities": [
                    "Private Elevator Access",
                    "Rooftop Swimming Pool",
                    "Clubhouse",
                    "Gym",
                    "Landscaped Courtyards",
                    "24/7 Security",
                    "EV Stations"
            ],
            "floorPlans": [
                    {
                            "id": "prestigia-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Prestigia",
                            "config": "2 BHK Luxury Suite",
                            "carpetArea": 883,
                            "superArea": 1180,
                            "balconyArea": 70,
                            "facing": "East Facing",
                            "price": "₹89 Lac - 1.06 Cr",
                            "priceLabel": "Starting from",
                            "description": "Generous 2 BHK with options from 883 to 1,060 sq.ft.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Spacious"
                    },
                    {
                            "id": "prestigia-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Prestigia",
                            "config": "3 BHK Family Suite",
                            "carpetArea": 1183,
                            "superArea": 1575,
                            "balconyArea": 90,
                            "facing": "North-East Facing",
                            "price": "₹1.19 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home (1183 - 1188 sq.ft.) with premium Italian marble flooring.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "21'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Flagship"
                    },
                    {
                            "id": "prestigia-3bhk-duplex",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Luxury Duplex",
                            "config": "3 BHK Duplex Suite",
                            "carpetArea": 1563,
                            "superArea": 2080,
                            "balconyArea": 150,
                            "facing": "East Facing",
                            "price": "₹1.57 Cr - 1.87 Cr",
                            "priceLabel": "Starting from",
                            "description": "Double-height living duplex with internal designer staircase and dual balconies (1563 - 1861 sq.ft.).",
                            "rooms": [
                                    {
                                            "name": "Double-Height Living",
                                            "size": "24'0\" × 15'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "16'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "13'0\" × 11'6\""
                                    }
                            ],
                            "tag": "Duplex"
                    },
                    {
                            "id": "prestigia-3bhk-penthouse",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Sky Penthouse",
                            "config": "3 BHK Penthouse Suite",
                            "carpetArea": 2647,
                            "superArea": 3520,
                            "balconyArea": 380,
                            "facing": "North Facing",
                            "price": "₹2.66 Cr - 2.70 Cr",
                            "priceLabel": "Starting from",
                            "description": "Palatial 3 BHK penthouse (2647 - 2690 sq.ft.) with expansive private rooftop sun deck.",
                            "rooms": [
                                    {
                                            "name": "Grand Entertainer Hall",
                                            "size": "28'0\" × 18'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "18'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Sky Terrace",
                                            "size": "30'0\" × 14'0\""
                                    }
                            ],
                            "tag": "Ultra Luxury Penthouse"
                    },
                    {
                            "id": "prestigia-4bhk-duplex",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Luxury Duplex",
                            "config": "4 BHK Duplex Suite",
                            "carpetArea": 1896,
                            "superArea": 2520,
                            "balconyArea": 180,
                            "facing": "East Facing",
                            "price": "₹1.90 Cr - 2.11 Cr",
                            "priceLabel": "Starting from",
                            "description": "Grand 4 BHK duplex (1896 - 2105 sq.ft.) with 4 master suites and private family lounge.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "26'0\" × 16'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "18'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "15'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "13'0\" × 11'6\""
                                    }
                            ],
                            "tag": "Ultra Luxury Duplex"
                    },
                    {
                            "id": "prestigia-4bhk-penthouse",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Presidential Penthouse",
                            "config": "4 BHK Penthouse",
                            "carpetArea": 2801,
                            "superArea": 3730,
                            "balconyArea": 420,
                            "facing": "North Facing",
                            "price": "₹2.81 Cr - 3.13 Cr",
                            "priceLabel": "Starting from",
                            "description": "The pinnacle of Dhanori luxury: 4 BHK Penthouse (2801 - 3115 sq.ft.) with 360-degree terrace panorama.",
                            "rooms": [
                                    {
                                            "name": "Palatial Living",
                                            "size": "32'0\" × 20'0\""
                                    },
                                    {
                                            "name": "Presidential Suite",
                                            "size": "20'0\" × 16'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "16'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "15'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "14'0\" × 12'6\""
                                    }
                            ],
                            "tag": "Crown Penthouse"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "939",
            "slug": "i-life-4-dhanori",
            "title": "I LIFE 4",
            "developer": "ILIFE Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹95 Lac - 1.15 Cr",
            "numericPrice": 9500000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "839 - 1,028 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2029",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Smart Home",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "I LIFE 4 in Dhanori features 2 modern towers of G+11 floors on a 1-acre parcel. Offering 2 BHK (839 sq.ft.) and 3 BHK (984-1028 sq.ft.) smart residences with advanced home automation and energy-efficient architecture.",
            "amenities": [
                    "Home Automation",
                    "Swimming Pool",
                    "Gymnasium",
                    "Kids Play Area",
                    "CCTV Security",
                    "Covered Parking",
                    "Clubhouse"
            ],
            "floorPlans": [
                    {
                            "id": "ilife-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Automation Suite",
                            "carpetArea": 839,
                            "superArea": 1120,
                            "balconyArea": 65,
                            "facing": "East Facing",
                            "price": "₹95 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious automated 2 BHK with touch-panel controls and large balcony.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "Smart Home"
                    },
                    {
                            "id": "ilife-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Smart",
                            "config": "3 BHK Automation Suite",
                            "carpetArea": 984,
                            "superArea": 1310,
                            "balconyArea": 80,
                            "facing": "North Facing",
                            "price": "₹1.05 Cr - 1.15 Cr",
                            "priceLabel": "Starting from",
                            "description": "Generous 3 BHK home (984 - 1028 sq.ft.) with integrated IoT smart systems.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Future Ready"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "940",
            "slug": "belmont-skydale-dhanori",
            "title": "Belmont SkyDale",
            "developer": "Belmont Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹95 Lac - 1.05 Cr",
            "numericPrice": 9500000,
            "bhk": [
                    "3 BHK"
            ],
            "area": "1,012 - 1,084 sq.ft.",
            "status": "Under Construction",
            "possession": "Dec 2028",
            "isNewLaunch": false,
            "isFeatured": false,
            "isTrending": false,
            "verified": true,
            "badge": "Low Density",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Belmont SkyDale is a low-density boutique 7-storey building on a 1-acre plot in Dhanori. Exclusively offering 3 BHK residences (1012-1084 sq.ft.) for discerning families seeking privacy.",
            "amenities": [
                    "Rooftop Garden",
                    "Gym",
                    "Kids Play Area",
                    "Solar Lighting",
                    "24/7 Security",
                    "Covered Parking"
            ],
            "floorPlans": [
                    {
                            "id": "belmont-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK SkyDale",
                            "config": "3 BHK Boutique Residence",
                            "carpetArea": 1012,
                            "superArea": 1350,
                            "balconyArea": 75,
                            "facing": "East Facing",
                            "price": "₹95 Lac - 1.05 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK residence with only 4 homes per floor for maximum privacy.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "19'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Exclusive"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    },
    {
            "id": "941",
            "slug": "aaiji-crystal-dhanori",
            "title": "Aaiji Crystal",
            "developer": "Aaiji Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "buy",
            "price": "₹1.15 Cr - 1.80 Cr",
            "numericPrice": 11500000,
            "bhk": [
                    "2 BHK",
                    "3 BHK"
            ],
            "area": "879 - 1,261 sq.ft.",
            "status": "Ready to Move",
            "possession": "Ready to Move",
            "isNewLaunch": false,
            "isFeatured": true,
            "isTrending": false,
            "verified": true,
            "badge": "Ready Possession",
            "image": "",
            "images": [],
            "videoUrl": "",
            "description": "Aaiji Crystal in Dhanori is a premium ready-possession development spread over 4 acres across 3 towers of 9 floors. Offers spacious 2 BHK (879-883 sq.ft.) and grand 3 BHK (1226-1261 sq.ft.) homes with OC received.",
            "amenities": [
                    "Grand Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Landscaped Garden",
                    "Kids Play Area",
                    "24/7 Security",
                    "Intercom",
                    "Power Backup"
            ],
            "floorPlans": [
                    {
                            "id": "aaiji-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Crystal",
                            "config": "2 BHK Luxury Suite",
                            "carpetArea": 879,
                            "superArea": 1170,
                            "balconyArea": 65,
                            "facing": "East Facing",
                            "price": "₹1.15 Cr",
                            "priceLabel": "Starting from",
                            "description": "Ready-to-move 2 BHK luxury residence with immediate possession and OC.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "17'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Ready OC"
                    },
                    {
                            "id": "aaiji-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Crystal Grande",
                            "config": "3 BHK Grand Home",
                            "carpetArea": 1226,
                            "superArea": 1635,
                            "balconyArea": 95,
                            "facing": "North-East Facing",
                            "price": "₹1.75 Cr - 1.80 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK ready home with over 1,226 sq.ft. carpet area and expansive open sit-outs.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "22'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'6\" × 12'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Ultra Luxury Ready"
                    }
            ],
            "createdAt": "2026-11-28T07:54:42.777Z"
    }
];

function formatRow(row) {
    if (!row) return null;
    const parsedBhk = typeof row.bhk === "string" ? JSON.parse(row.bhk || "[]") : row.bhk || [];
    const numericPrice = Number(row.numeric_price || row.numericPrice || 0);
    const bedrooms = Array.isArray(parsedBhk) ? Number(parsedBhk[0]) || 0 : Number(parsedBhk) || 0;
    return {
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        developer: row.developer,
        projectName: row.developer,
        location: row.location,
        locality: row.locality,
        city: row.city,
        propertyCategory: row.property_category || row.propertyCategory,
        propertyType: row.property_type || row.propertyType,
        purpose: row.purpose,
        price: numericPrice > 0 ? numericPrice : row.price,
        priceLabel: row.price,
        numericPrice,
        bhk: Array.isArray(parsedBhk) && parsedBhk.length === 1 ? parsedBhk[0] : parsedBhk,
        bedrooms,
        area: row.area,
        status: row.status,
        possession: row.possession,
        isNewLaunch: Boolean(row.is_new_launch || row.isNewLaunch),
        isFeatured: Boolean(row.is_featured || row.isFeatured),
        featured: Boolean(row.is_featured || row.isFeatured),
        isTrending: Boolean(row.is_trending || row.isTrending),
        verified: Boolean(row.verified),
        badge: row.badge,
        image: row.image,
        images: (() => {
            try {
                if (typeof row.images === "string") {
                    return row.images.startsWith("[") ? JSON.parse(row.images) : row.images.split(",").map((s) => s.trim()).filter(Boolean);
                }
                return Array.isArray(row.images) ? row.images : (row.image ? [row.image] : []);
            } catch {
                return row.image ? [row.image] : [];
            }
        })(),
        videoUrl: row.video_url || row.videoUrl,
        description: row.description,
        amenities: typeof row.amenities === "string" ? JSON.parse(row.amenities || "[]") : row.amenities || [],
        createdAt: row.created_at || row.createdAt
    };
}

export const PropertyModel = {
    async findAll() {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM properties ORDER BY created_at DESC");
        return Array.isArray(rows) ? rows.map(formatRow) : [];
    },

    async findBySlugOrId(identifier) {
        if (!isDBConnected()) return null;
        const rows = await query(
            "SELECT * FROM properties WHERE slug = ? OR id = ? LIMIT 1",
            [identifier, identifier]
        );
        return rows && rows.length > 0 ? formatRow(rows[0]) : null;
    },

    async create(propertyData) {
        const id = String(Date.now());
        const now = new Date().toISOString();

        if (isDBConnected()) {
            await query(
                `INSERT INTO properties (
                    id, slug, title, developer, location, locality, city,
                    property_category, property_type, purpose, price, numeric_price,
                    bhk, area, status, possession, is_new_launch, is_featured, is_trending,
                    verified, badge, image, images, video_url, description, amenities
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    propertyData.slug || id,
                    propertyData.title,
                    propertyData.developer || "",
                    propertyData.location || "",
                    propertyData.locality || "",
                    propertyData.city || "Pune",
                    propertyData.propertyCategory || "residential",
                    propertyData.propertyType || "Apartment",
                    propertyData.purpose || "buy",
                    propertyData.price || "",
                    propertyData.numericPrice || 0,
                    JSON.stringify(propertyData.bhk || []),
                    propertyData.area || "",
                    propertyData.status || "Under Construction",
                    propertyData.possession || "",
                    propertyData.isNewLaunch ? 1 : 0,
                    propertyData.isFeatured ? 1 : 0,
                    propertyData.isTrending ? 1 : 0,
                    propertyData.verified ? 1 : 0,
                    propertyData.badge || "",
                    propertyData.image || "",
                    JSON.stringify(propertyData.images || []),
                    propertyData.videoUrl || "",
                    propertyData.description || "",
                    JSON.stringify(propertyData.amenities || [])
                ]
            );
            return this.findBySlugOrId(id);
        }

        const newProperty = {
            id,
            createdAt: now,
            ...propertyData
        };
        memoryProperties.unshift(newProperty);
        return newProperty;
    },

    async update(id, updateData) {
        if (isDBConnected()) {
            const existing = await this.findBySlugOrId(id);
            if (!existing) return null;

            const merged = { ...existing, ...updateData };
            await query(
                `UPDATE properties SET
                    title = ?, developer = ?, location = ?, locality = ?, city = ?,
                    property_category = ?, property_type = ?, purpose = ?, price = ?, numeric_price = ?,
                    bhk = ?, area = ?, status = ?, possession = ?, is_new_launch = ?, is_featured = ?, is_trending = ?,
                    verified = ?, badge = ?, image = ?, images = ?, video_url = ?, description = ?, amenities = ?
                WHERE id = ?`,
                [
                    merged.title,
                    merged.developer || "",
                    merged.location || "",
                    merged.locality || "",
                    merged.city || "Pune",
                    merged.propertyCategory || "residential",
                    merged.propertyType || "Apartment",
                    merged.purpose || "buy",
                    merged.price || "",
                    merged.numericPrice || 0,
                    JSON.stringify(merged.bhk || []),
                    merged.area || "",
                    merged.status || "Under Construction",
                    merged.possession || "",
                    merged.isNewLaunch ? 1 : 0,
                    merged.isFeatured ? 1 : 0,
                    merged.isTrending ? 1 : 0,
                    merged.verified ? 1 : 0,
                    merged.badge || "",
                    merged.image || "",
                    JSON.stringify(merged.images || []),
                    merged.videoUrl || "",
                    merged.description || "",
                    JSON.stringify(merged.amenities || []),
                    id
                ]
            );
            return this.findBySlugOrId(id);
        }

        const index = memoryProperties.findIndex(p => p.id === id);
        if (index === -1) return null;
        memoryProperties[index] = { ...memoryProperties[index], ...updateData, updatedAt: new Date().toISOString() };
        return memoryProperties[index];
    },

    async delete(id) {
        if (isDBConnected()) {
            const result = await query("DELETE FROM properties WHERE id = ?", [id]);
            return result && result.affectedRows > 0;
        }

        const index = memoryProperties.findIndex(p => p.id === id);
        if (index === -1) return false;
        memoryProperties.splice(index, 1);
        return true;
    }
};
