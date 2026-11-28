/** @type {any[]} */
const propertyListingsData = [
    {
        id: 1,
        title: "Premium 2 BHK Apartment in Kharadi",
        projectName: "Sample Residential Project",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 850,
        areaUnit: "sq.ft.",
        price: 8000000,
        priceLabel: "₹80 Lakh",
        pricePerSqFt: 9412,
        possession: "Ready to Move",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Modern apartment living room with large windows",
        amenities: [
            "Parking",
            "Lift",
            "Security",
            "Gym",
            "Garden",
            "Playing Area",
            "Clubhouse",
        ],
        description: "A sample 2 BHK listing in Kharadi for demonstrating property search and filtering.",
    },
    {
        id: 2,
        title: "Spacious 3 BHK Home near EON IT Park",
        projectName: "Sample Urban Homes",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 1250,
        areaUnit: "sq.ft.",
        price: 12000000,
        priceLabel: "₹1.2 Crore",
        pricePerSqFt: 9600,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: false,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Contemporary apartment interior",
        amenities: ["Clubhouse", "Parking", "Security", "Children's Play Area"],
        description: "A sample 3 BHK listing for users looking for a home around Kharadi and EON IT Park.",
    },
    {
        id: 3,
        title: "Modern 2 BHK Apartment in Baner",
        projectName: "Sample Green Residency",
        location: "Baner, Pune",
        locality: "Baner",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 920,
        areaUnit: "sq.ft.",
        price: 9500000,
        priceLabel: "₹95 Lakh",
        pricePerSqFt: 10326,
        possession: "Ready to Move",
        furnishing: "Semi-Furnished",
        featured: false,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Bright modern apartment with neutral finishes",
        amenities: ["Gym", "Lift", "Power Backup", "Parking"],
        description: "A sample Baner apartment listing for testing locality and budget filters.",
    },
    {
        id: 4,
        title: "Family 3 BHK Apartment in Wakad",
        projectName: "Sample Parkside Homes",
        location: "Wakad, Pune",
        locality: "Wakad",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 1180,
        areaUnit: "sq.ft.",
        price: 10500000,
        priceLabel: "₹1.05 Crore",
        pricePerSqFt: 8898,
        possession: "Ready to Move",
        furnishing: "Unfurnished",
        featured: false,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Comfortable modern residential interior",
        amenities: ["Garden", "Parking", "Security", "Clubhouse"],
        description: "A sample 3 BHK home in Wakad for testing property listing layouts.",
    },
    {
        id: 5,
        title: "Affordable 1 BHK Apartment in Hinjewadi",
        projectName: "Sample Tech Park Homes",
        location: "Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 1,
        bedrooms: 1,
        bathrooms: 1,
        area: 620,
        areaUnit: "sq.ft.",
        price: 4800000,
        priceLabel: "₹48 Lakh",
        pricePerSqFt: 7742,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: false,
        verified: false,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Compact modern apartment interior",
        amenities: ["Lift", "Security", "Parking"],
        description: "A sample 1 BHK listing for buyers searching around Hinjewadi's employment hubs.",
    },
    {
        id: 6,
        title: "Residential Plot in Wagholi",
        projectName: "Sample Green Acres",
        location: "Wagholi, Pune",
        locality: "Wagholi",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 1500,
        areaUnit: "sq.ft.",
        price: 5500000,
        priceLabel: "₹55 Lakh",
        pricePerSqFt: 3667,
        possession: "Ready to Register",
        furnishing: "Not Applicable",
        featured: false,
        verified: false,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        ],
        imageAlt: "Open green land under a clear sky",
        amenities: ["Road Access", "Residential Zone"],
        description: "A sample residential plot listing for testing non-apartment property types.",
    },

    // New Launches
    {
        id: 101,
        title: "Skyline One Luxury Residences",
        projectName: "Skyline One",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 2,
        area: 1250,
        areaUnit: "sq.ft.",
        price: 8500000,
        priceLabel: "₹85 Lakh",
        pricePerSqFt: 6800,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isNewLaunch: true,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Skyline One high-rise tower Kharadi",
        amenities: ["Infinity Pool", "Clubhouse", "EV Charging", "Gym"],
        description: "Newly launched architectural marvel in Kharadi with world-class lifestyle amenities.",
    },
    {
        id: 102,
        title: "The Aurelia Premium Homes",
        projectName: "The Aurelia",
        location: "Baner, Pune",
        locality: "Baner",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 1350,
        areaUnit: "sq.ft.",
        price: 11500000,
        priceLabel: "₹1.15 Crore",
        pricePerSqFt: 8518,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isNewLaunch: true,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "The Aurelia modern facade Baner",
        amenities: ["Smart Home Automation", "Rooftop Lounge", "Tennis Court", "Spa"],
        description: "Early access opportunity at Baner with unmatched connectivity to Mumbai-Pune Expressway.",
    },
    {
        id: 103,
        title: "Urban Crest Contemporary Apartments",
        projectName: "Urban Crest",
        location: "Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 890,
        areaUnit: "sq.ft.",
        price: 6200000,
        priceLabel: "₹62 Lakh",
        pricePerSqFt: 6966,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isNewLaunch: true,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Urban Crest Hinjewadi residence",
        amenities: ["Co-Working Space", "Gym", "Jogging Track", "Power Backup"],
        description: "Smartly planned 1, 2 & 3 BHK residences right next to Hinjewadi Phase 1 IT hub.",
    },
    {
        id: 104,
        title: "Kohinoor Presidentia Luxury Living",
        projectName: "Kohinoor Presidentia",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 950,
        areaUnit: "sq.ft.",
        price: 9200000,
        priceLabel: "₹92 Lakh",
        pricePerSqFt: 9684,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isNewLaunch: true,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Kohinoor Presidentia towers",
        amenities: ["Podium Garden", "Swimming Pool", "Banquet Hall", "Cricket Pitch"],
        description: "Newly unveiled residential masterpiece in upper Kharadi with majestic hill views.",
    },

    // Commercial Properties
    {
        id: 201,
        title: "World Trade Center Grade-A Office Space",
        projectName: "World Trade Center Tower 4",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Commercial",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 1450,
        areaUnit: "sq.ft.",
        price: 14500000,
        priceLabel: "₹1.45 Crore",
        pricePerSqFt: 10000,
        possession: "Ready to Move",
        furnishing: "Bare Shell",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "World Trade Center commercial glass facade",
        amenities: ["Centrally Air Conditioned", "High Speed Elevators", "Conference Facilities", "24/7 Security"],
        description: "Prestigious Grade-A office suite inside Pune's premier World Trade Center corporate campus.",
    },
    {
        id: 202,
        title: "EON Free Zone Ready IT Suites",
        projectName: "EON Free Zone Tech Suites",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Commercial",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 1200,
        areaUnit: "sq.ft.",
        price: 18500000,
        priceLabel: "₹1.85 Crore",
        pricePerSqFt: 15416,
        possession: "Immediate",
        furnishing: "Fully Furnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Furnished modern office space",
        amenities: ["Workstations Ready", "Meeting Rooms", "Cafeteria", "Power Backup"],
        description: "Turnkey plug-and-play corporate office space right inside the heart of EON IT Park Kharadi.",
    },
    {
        id: 203,
        title: "Amar Apex High-Street Retail & Corporate Office",
        projectName: "Amar Apex Commercial Hub",
        location: "Baner, Pune",
        locality: "Baner",
        city: "Pune",
        propertyType: "Commercial",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 850,
        areaUnit: "sq.ft.",
        price: 9500000,
        priceLabel: "₹95 Lakh",
        pricePerSqFt: 11176,
        possession: "Under Construction",
        furnishing: "Bare Shell",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Amar Apex high street retail front",
        amenities: ["Double Height Lobby", "Multi-Level Parking", "CCTV Surveillance", "Fire Safety"],
        description: "High-footfall commercial retail and boutique office spaces located on prime Baner High Street.",
    },
    {
        id: 204,
        title: "Quadron Business Park Corporate Offices",
        projectName: "Quadron Business Park",
        location: "Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Commercial",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 950,
        areaUnit: "sq.ft.",
        price: 11500000,
        priceLabel: "₹1.15 Crore",
        pricePerSqFt: 12105,
        possession: "Ready to Move",
        furnishing: "Semi-Furnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Quadron Business Park Hinjewadi",
        amenities: ["Visitor Parking", "Food Court", "High Speed Fiber Internet", "Security Guard"],
        description: "Strategically located commercial office spaces right within Hinjewadi Phase 2 IT corridor.",
    },

    // Plots / Land
    {
        id: 301,
        title: "Clear-Title NA Residential Plot in Wagholi",
        projectName: "Sample Green Acres",
        location: "Wagholi, Pune",
        locality: "Wagholi",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 1500,
        areaUnit: "sq.ft.",
        price: 5500000,
        priceLabel: "₹55 Lakh",
        pricePerSqFt: 3667,
        possession: "Ready to Register",
        furnishing: "Not Applicable",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Open green NA residential plot",
        amenities: ["Tar Roads", "Water Connection", "Electricity", "Demarcated Boundary"],
        description: "Collector sanctioned NA residential plot in booming Wagholi corridor, ideal for custom villa construction.",
    },
    {
        id: 302,
        title: "Gated Community Villa Plots Hinjewadi",
        projectName: "Hinjewadi Green Meadows",
        location: "Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 2000,
        areaUnit: "sq.ft.",
        price: 7200000,
        priceLabel: "₹72 Lakh",
        pricePerSqFt: 3600,
        possession: "Immediate",
        furnishing: "Not Applicable",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Gated community layout landscape",
        amenities: ["Gated Compound", "Clubhouse", "24/7 Security", "Street Lighting"],
        description: "Gated society villa plots offering scenic Sahyadri backdrop just minutes from Hinjewadi Phase 3.",
    },
    {
        id: 303,
        title: "Prime NA Land Parcel in Pirangut",
        projectName: "Western Valley Estates",
        location: "Pirangut, Pune",
        locality: "Pirangut",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 2500,
        areaUnit: "sq.ft.",
        price: 6500000,
        priceLabel: "₹65 Lakh",
        pricePerSqFt: 2600,
        possession: "Ready to Register",
        furnishing: "Not Applicable",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Lush green land parcel in Pirangut",
        amenities: ["Clear Title", "Compound Wall", "Water Tank", "Wide Internal Roads"],
        description: "High-potential NA land investment near Paud Road & Chandani Chowk growth corridor.",
    },
    {
        id: 304,
        title: "Hillview Country NA Plots Shirwal",
        projectName: "Nature View Developers",
        location: "Shirwal, Pune",
        locality: "Shirwal",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        bhk: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 1800,
        areaUnit: "sq.ft.",
        price: 4200000,
        priceLabel: "₹42 Lakh",
        pricePerSqFt: 2333,
        possession: "Immediate",
        furnishing: "Not Applicable",
        featured: false,
        verified: true,
        image: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=85",
        images: ["https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=85"],
        imageAlt: "Hillview countryside plots",
        amenities: ["Weekend Home Layout", "Plantations", "Security Gate", "Water Line"],
        description: "Peaceful scenic NA plots in the fast-growing southern expansion zone of Pune.",
    },

    // Upcoming Projects
    {
        id: 401,
        title: "Godrej Sky Greens Phase 2",
        projectName: "Godrej Sky Greens",
        location: "Manjari, Pune",
        locality: "Manjari",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 750,
        areaUnit: "sq.ft.",
        price: 5200000,
        priceLabel: "₹52 Lakh*",
        pricePerSqFt: 6933,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isUpcoming: true,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Godrej Sky Greens pre-launch towers",
        amenities: ["Grand Clubhouse", "Forest Trails", "Cricket Ground", "Swimming Pool"],
        description: "Pre-launch opportunity within Godrej Rivergreens 100+ acre township in East Pune.",
    },
    {
        id: 402,
        title: "VTP Earth One Mega Township",
        projectName: "VTP Earth One",
        location: "Mahalunge, Pune",
        locality: "Mahalunge",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 2,
        area: 1100,
        areaUnit: "sq.ft.",
        price: 8200000,
        priceLabel: "₹82 Lakh*",
        pricePerSqFt: 7454,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isUpcoming: true,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "VTP Earth One contemporary high-rise",
        amenities: ["Olympic Sized Pool", "Multiple Clubhouses", "School within Campus", "Hospital"],
        description: "Upcoming flagship launch at Blue Waters township with premium specifications and river views.",
    },
    {
        id: 403,
        title: "Life Republic New High-Rise Sector",
        projectName: "Life Republic",
        location: "Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 820,
        areaUnit: "sq.ft.",
        price: 6800000,
        priceLabel: "₹68 Lakh*",
        pricePerSqFt: 8292,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isUpcoming: true,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Life Republic towers Hinjewadi",
        amenities: ["Sports Arena", "Botanical Garden", "Retail High Street", "Gym"],
        description: "New residential sector launch within the famous 400-acre township of Life Republic by Kolte Patil.",
    },
    {
        id: 404,
        title: "Pride World City Upcoming Towers",
        projectName: "Pride World City",
        location: "Charholi, Pune",
        locality: "Charholi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 780,
        areaUnit: "sq.ft.",
        price: 6000000,
        priceLabel: "₹60 Lakh*",
        pricePerSqFt: 7692,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        isUpcoming: true,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Pride World City Charholi",
        amenities: ["Lake View Promenade", "Amphitheatre", "Clubhouse", "24/7 Security"],
        description: "Pre-booking open for new sky towers in the self-sustained mega city near Pune Airport & Ring Road.",
    },

    // Projects
    {
        id: 501,
        title: "Godrej Rivergreens Integrated Township",
        projectName: "Godrej Rivergreens",
        location: "Manjari, Pune",
        locality: "Manjari",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 850,
        areaUnit: "sq.ft.",
        price: 4500000,
        priceLabel: "₹45 Lakh* onwards",
        pricePerSqFt: 5294,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Godrej Rivergreens sprawling township",
        amenities: ["Mula-Mutha Riverfront", "Health Club", "Commercial Plaza", "School"],
        description: "Integrated riverfront township development with 80% open greens and direct access to Pune IT clusters.",
    },
    {
        id: 502,
        title: "VTP Blue Waters High-Rise Residences",
        projectName: "VTP Blue Waters",
        location: "Mahalunge, Pune",
        locality: "Mahalunge",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 2,
        area: 1050,
        areaUnit: "sq.ft.",
        price: 7500000,
        priceLabel: "₹75 Lakh* onwards",
        pricePerSqFt: 7142,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "VTP Blue Waters Mahalunge",
        amenities: ["Spa & Wellness Center", "Gym", "Badminton Courts", "Party Hall"],
        description: "Pune's best-selling township project nestled between Baner and Hinjewadi with world-class infrastructure.",
    },
    {
        id: 503,
        title: "Kumar Parc Residences Urban Homes",
        projectName: "Kumar Parc Residences",
        location: "Hadapsar, Pune",
        locality: "Hadapsar",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 2,
        area: 1150,
        areaUnit: "sq.ft.",
        price: 8000000,
        priceLabel: "₹80 Lakh* onwards",
        pricePerSqFt: 6956,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Kumar Parc Residences Hadapsar",
        amenities: ["Podium Club", "Jogging Track", "Solar Heating", "Children Play Area"],
        description: "Centrally positioned in Hadapsar near Magarpatta City & SP Infocity with contemporary floor layouts.",
    },
    {
        id: 504,
        title: "Lodha Belmondo Luxury Golf Residences",
        projectName: "Lodha Belmondo",
        location: "Gahunje, Pune",
        locality: "Gahunje",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 4,
        bedrooms: 4,
        bathrooms: 4,
        area: 2100,
        areaUnit: "sq.ft.",
        price: 10500000,
        priceLabel: "₹1.05 Cr* onwards",
        pricePerSqFt: 5000,
        possession: "Ready to Move",
        furnishing: "Semi-Furnished",
        featured: true,
        verified: true,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
        images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85"],
        imageAlt: "Lodha Belmondo luxury estate",
        amenities: ["9-Hole Golf Course", "50,000 sq.ft. Clubhouse", "Helipad", "Private Theatre"],
        description: "Ultra-luxury residences on Mumbai-Pune Expressway overlooking Pavana river and golf greens.",
    },
    {
        id: 901,
        slug: "gated-villa-na-plot-hinjewadi",
        title: "Gated Villa NA Plot with Clubhouse Access",
        name: "Gated Villa NA Plot with Clubhouse Access",
        projectName: "Megapolis Villa NA Plots",
        developer: "Megapolis Prime Infrastructure",
        location: "Phase 3, Megapolis Circle, Hinjewadi, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Plot",
        purpose: "Buy",
        area: 2400,
        areaUnit: "sq.ft.",
        price: 13500000,
        priceLabel: "₹1.35 Crore",
        pricePerSqFt: 5625,
        possession: "Ready for Possession",
        furnishing: "Clear Title NA Sanctioned",
        featured: true,
        verified: true,
        badge: "NA Villa Plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "Gated Villa NA Plot in Hinjewadi Phase 3 with scenic landscape",
        amenities: [
            "Clubhouse",
            "Gym",
            "Swimming Pool",
            "Garden",
            "Security",
            "Playing Area",
            "Power Backup",
            "Parking",
        ],
        description: "Exclusive Gated Villa NA Sanctioned Plot located at Phase 3 Megapolis Circle, Hinjewadi. Features PMRDA sanctioned layouts, grand decorative arch, private clubhouse access, concrete internal roads, 24/7 security, and immediate individual 7/12 demarcation ready for custom luxury villa construction.",
    },
    {
        id: 902,
        slug: "mantra-magnus-riverside-residences",
        title: "Mantra Magnus Riverside Residences",
        name: "Mantra Magnus Riverside Residences",
        projectName: "Mantra Magnus",
        developer: "Mantra Properties",
        location: "Mundhwa-Kharadi Bridge, Pune",
        locality: "Mundhwa",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 1712,
        areaUnit: "sq.ft.",
        price: 12500000,
        priceLabel: "₹1.25 Crore",
        pricePerSqFt: 7200,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        badge: "Riverside Luxury",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "Mantra Magnus Riverside Residences modern architectural facade",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Garden",
            "Playing Area",
            "Security",
            "Power Backup",
            "Lift",
        ],
        description: "Mantra Magnus Riverside Residences offers expansive 3 BHK luxury waterfront living on the Mundhwa-Kharadi Bridge. Designed with Vridhi Bhava concepts for 360-degree cross-ventilation, scenic waterfront views, infinity edge pool, and instant 5-minute connectivity to Magarpatta City and EON Free Zone Kharadi.",
    },
    {
        id: 903,
        slug: "godrej-elements-botanical-condos",
        title: "Godrej Elements Botanical Smart Condos",
        name: "Godrej Elements Botanical Smart Condos",
        projectName: "Godrej Elements",
        developer: "Godrej Properties",
        location: "Hinjewadi Phase 1, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 1450,
        areaUnit: "sq.ft.",
        price: 13000000,
        priceLabel: "₹1.30 Crore",
        pricePerSqFt: 8965,
        possession: "Under Construction",
        furnishing: "Smart Automation Ready",
        featured: true,
        verified: true,
        badge: "Eco Luxury",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "Godrej Elements Hinjewadi botanical towers and landscape",
        amenities: [
            "Garden",
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Security",
            "Playing Area",
            "Lift",
            "Power Backup",
        ],
        description: "Godrej Elements in Hinjewadi Phase 1 features 3 acres of curated botanical greenery, biometric digital locks, smart lighting automation, and rooftop wellness decks. Positioned adjoining prime IT corridors with unmatched walk-to-work comfort and exceptional rental appreciation.",
    },
    {
        id: 904,
        slug: "the-aurelia-high-street-mansions",
        title: "The Aurelia High-Street Mansions",
        name: "The Aurelia High-Street Mansions",
        projectName: "The Aurelia",
        developer: "Vilas Javdekar Group",
        location: "Baner-Balewadi High Street, Pune",
        locality: "Baner",
        city: "Pune",
        propertyType: "Sky Villa",
        purpose: "Buy",
        bhk: 4,
        bedrooms: 4,
        bathrooms: 4,
        area: 2450,
        areaUnit: "sq.ft.",
        price: 18500000,
        priceLabel: "₹1.85 Crore",
        pricePerSqFt: 7550,
        possession: "Under Construction",
        furnishing: "Semi-Furnished Luxury",
        featured: true,
        verified: true,
        badge: "Sky Villa",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "The Aurelia High-Street Mansions Baner luxury architecture",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Garden",
            "Security",
            "Parking",
            "Lift",
            "Power Backup",
        ],
        description: "Palatial 4 BHK sky mansions positioned directly on Baner-Balewadi High Street. Showcasing double-height Italian marble grand living spaces, private sundeck plunge pools, temperature-controlled wine cellars, and concierge services amidst Pune's finest dining and lifestyle destination.",
    },
    {
        id: 905,
        slug: "vtp-hilife-smart-towers",
        title: "VTP HiLife Smart Towers",
        name: "VTP HiLife Smart Towers",
        projectName: "VTP HiLife",
        developer: "VTP Realty",
        location: "EON IT Park, Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 2,
        area: 1280,
        areaUnit: "sq.ft.",
        price: 9800000,
        priceLabel: "₹98 Lakh",
        pricePerSqFt: 7650,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        badge: "Smart Residences",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "VTP HiLife Kharadi smart apartment tower",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Garden",
            "Security",
            "Playing Area",
            "Lift",
            "Power Backup",
        ],
        description: "High-rise smart towers strategically located 5 minutes from EON IT Park and World Trade Center in Kharadi. Boasting 40+ curated clubhouse sports, dedicated co-working soundproof pods, grand balconies, and optimum internal layout design.",
    },
    {
        id: 906,
        slug: "tribeca-highstreet-sky-mansions",
        title: "Tribeca Highstreet Sky Mansions",
        name: "Tribeca Highstreet Sky Mansions",
        projectName: "Tribeca Highstreet",
        developer: "Tribeca Developers",
        location: "Baner Prime, Pune",
        locality: "Baner",
        city: "Pune",
        propertyType: "Penthouse",
        purpose: "Buy",
        bhk: 4,
        bedrooms: 4,
        bathrooms: 4,
        area: 2350,
        areaUnit: "sq.ft.",
        price: 21000000,
        priceLabel: "₹2.10 Crore",
        pricePerSqFt: 8930,
        possession: "Under Construction",
        furnishing: "Bespoke Designer Finish",
        featured: true,
        verified: true,
        badge: "Ultra Penthouse",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "Tribeca Highstreet Penthouse with panoramic city views",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Garden",
            "Security",
            "Lift",
            "Parking",
            "Power Backup",
        ],
        description: "Crown-jewel 4 BHK sky penthouses by Tribeca Developers overlooking the Pune cityscape. Features private access elevators, double-height wrap-around entertainment decks, glass-enclosed infinity lounge, and personalised VIP concierge service.",
    },
    {
        id: 907,
        slug: "kumar-primus-river-residences",
        title: "Kumar Primus River Residences",
        name: "Kumar Primus River Residences",
        projectName: "Kumar Primus",
        developer: "Kumar Properties",
        location: "Kalyani Nagar, Pune",
        locality: "Kalyani Nagar",
        city: "Pune",
        propertyType: "Condo",
        purpose: "Buy",
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        area: 2100,
        areaUnit: "sq.ft.",
        price: 19500000,
        priceLabel: "₹1.95 Crore",
        pricePerSqFt: 9285,
        possession: "Under Construction",
        furnishing: "Semi-Furnished",
        featured: true,
        verified: true,
        badge: "Riverfront Boutique",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "Kumar Primus River Residences boutique condos Kalyani Nagar",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Garden",
            "Security",
            "Lift",
            "Playing Area",
            "Power Backup",
        ],
        description: "Boutique ultra-luxury condominiums on the banks of Mula riverbed in coveted Kalyani Nagar. Designed with only two residences per floor, private high-speed elevator access, acoustic soundproofing glass, and verdant riverside vistas.",
    },
    {
        id: 908,
        slug: "the-ark-voyage-skyline-suites",
        title: "The Ark Voyage Skyline Suites",
        name: "The Ark Voyage Skyline Suites",
        projectName: "The Ark Voyage",
        developer: "Tribeca Developers",
        location: "Wakad Expressway, Pune",
        locality: "Wakad",
        city: "Pune",
        propertyType: "Apartment",
        purpose: "Buy",
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        area: 1150,
        areaUnit: "sq.ft.",
        price: 8500000,
        priceLabel: "₹85 Lakh",
        pricePerSqFt: 7390,
        possession: "Under Construction",
        furnishing: "Unfurnished",
        featured: true,
        verified: true,
        badge: "Skyline Suite",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        ],
        imageAlt: "The Ark Voyage Skyline Suites Wakad Pune architecture",
        amenities: [
            "Clubhouse",
            "Swimming Pool",
            "Gym",
            "Security",
            "Garden",
            "Playing Area",
            "Power Backup",
            "Lift",
        ],
        description: "The Ark Voyage offers skyline luxury suites positioned directly on the Wakad Mumbai-Pune Expressway node. Features observatory sky lounges, zero brokerage advantage, swift connectivity to Hinjewadi Phase 1, and premium lifestyle clubhouse facilities.",
    },
                    {
            "id": 920,
            "slug": "laxmi-emerald-dhanori",
            "title": "Laxmi Emerald",
            "name": "Laxmi Emerald",
            "projectName": "Laxmi Emerald",
            "developer": "Laxmi Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "690 - 848",
            "areaUnit": "sq.ft.",
            "price": 6587000,
            "numericPrice": 6587000,
            "priceLabel": "₹65.87 L - 79.96 L",
            "pricePerSqFt": 9546,
            "possession": "Ready to Move",
            "possessionDate": "Ready to Move",
            "status": "Ready to Move",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Ready Possession",
            "totalLand": "4 Acres",
            "landArea": "4 Acres",
            "floors": "2+10 Floors",
            "floorsCount": "2+10 Floors",
            "towers": "7 Towers",
            "towersCount": "7 Towers",
            "buildingCount": 7,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Grand Clubhouse",
                    "Children's Play Area",
                    "Gym",
                    "Landscaped Gardens",
                    "24/7 Security",
                    "Power Backup",
                    "Covered Parking",
                    "High Speed Elevators"
            ],
            "description": "Laxmi Emerald in Dhanori offers ready-to-move 2 BHK (690-694 sq.ft.) and 3 BHK (848 sq.ft.) homes set across 4 acres with 7 towers (2+10 floors).",
            "floorPlans": [
                    {
                            "id": "920-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Deluxe",
                            "config": "2 BHK Luxury Home",
                            "carpetArea": "690 - 694",
                            "superArea": "920 - 935",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹65.87 L - 67.35 L",
                            "priceLabel": "Starting from",
                            "description": "Thoughtfully crafted 2 BHK with 690 - 694 sq.ft. carpet area, well-ventilated living room, and sunlit balcony.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Kitchen",
                                            "size": "9'0\" × 7'6\""
                                    }
                            ],
                            "tag": "Ready Possession"
                    },
                    {
                            "id": "920-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Grand Home",
                            "carpetArea": "848",
                            "superArea": "1,140",
                            "balconyArea": "75",
                            "facing": "North-East Facing",
                            "price": "₹79.96 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious ready 3 BHK residence with 848 sq.ft. carpet area, 3 dedicated bedrooms, and modern modular layout.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "18'0\" × 12'0\""
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
                            "tag": "Ready to Move"
                    }
            ]
    },
    {
            "id": 921,
            "slug": "yash-grecia-dhanori",
            "title": "Yash Grecia",
            "name": "Yash Grecia",
            "projectName": "Yash Grecia",
            "developer": "Yash Promoters & Builders",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2 BHK",
            "area": "653 - 722",
            "areaUnit": "sq.ft.",
            "price": 6700000,
            "numericPrice": 6700000,
            "priceLabel": "₹67 Lac - 74 Lac",
            "pricePerSqFt": 10260,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Smart Residences",
            "totalLand": "3.5 Acres",
            "landArea": "3.5 Acres",
            "floors": "14 Floors",
            "floorsCount": "14 Floors",
            "towers": "5 Towers",
            "towersCount": "5 Towers",
            "buildingCount": 5,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Swimming Pool",
                    "Clubhouse",
                    "Children's Play Zone",
                    "Jogging Track",
                    "Power Backup",
                    "24/7 Security",
                    "Gymnasium"
            ],
            "description": "Yash Grecia in Dhanori spans 3.5 acres across 5 towers of 14 stories offering 2 BHK homes from 653 to 722 sq.ft. with possession by Dec 2026.",
            "floorPlans": [
                    {
                            "id": "921-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Contemporary",
                            "config": "2 BHK Smart Apartment",
                            "carpetArea": "653 - 722",
                            "superArea": "880 - 975",
                            "balconyArea": "50",
                            "facing": "East Facing",
                            "price": "₹67 Lac - 74 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smartly configured 2 BHK residence with 653 - 722 sq.ft. carpet area, zero space wastage, and open sit-out deck.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "15'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Children's Room",
                                            "size": "10'6\" × 10'0\""
                                    },
                                    {
                                            "name": "Kitchen",
                                            "size": "8'6\" × 7'6\""
                                    }
                            ],
                            "tag": "Dec 2026 Possession"
                    }
            ]
    },
    {
            "id": 922,
            "slug": "shriram-nysa-dhanori",
            "title": "Shriram Nysa",
            "name": "Shriram Nysa",
            "projectName": "Shriram Nysa",
            "developer": "Shriram Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2 BHK (Classic & Grande)",
            "area": "748 - 1,154",
            "areaUnit": "sq.ft.",
            "price": 7100000,
            "numericPrice": 7100000,
            "priceLabel": "₹71 Lac - 1.07 Cr",
            "pricePerSqFt": 9491,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Classic & Grande Suites",
            "totalLand": "2 Acres",
            "landArea": "2 Acres",
            "floors": "G+13 Floors",
            "floorsCount": "G+13 Floors",
            "towers": "1 Tower",
            "towersCount": "1 Tower",
            "buildingCount": 1,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Rooftop Infinity Deck",
                    "Fitness Center",
                    "Banquet Hall",
                    "Kids Play Area",
                    "24/7 Security",
                    "Vastu Compliant"
            ],
            "description": "Shriram Nysa on a 2-acre plot in Dhanori features G+13 stories offering 2 BHK Classic (748-816 sq.ft.) and 2 BHK Grande (1,027-1,154 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "922-2bhk-classic",
                            "bhk": "2 BHK Classic",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Classic Suite",
                            "config": "2 BHK Premium",
                            "carpetArea": "748 - 816",
                            "superArea": "1,010 - 1,100",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹71 Lac - 79 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK Classic with 748 - 816 sq.ft. carpet area, open-concept living, and elegant master suite.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "13'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "Classic Suite"
                    },
                    {
                            "id": "922-2bhk-grande",
                            "bhk": "2 BHK Grande",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Grande Suite",
                            "config": "2 BHK Grande Luxury",
                            "carpetArea": "1,027 - 1,154",
                            "superArea": "1,390 - 1,560",
                            "balconyArea": "90",
                            "facing": "North-East Facing",
                            "price": "₹96 Lac - 1.07 Cr",
                            "priceLabel": "Starting from",
                            "description": "Ultra-spacious 2 BHK Grande with up to 1,154 sq.ft. carpet area, large wrap-around deck, and walk-in dressing space.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "20'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'0\" × 11'6\""
                                    }
                            ],
                            "tag": "Grande Suite"
                    }
            ]
    },
    {
            "id": 923,
            "slug": "nivasa-enchante-dhanori",
            "title": "Nivasa Enchante",
            "name": "Nivasa Enchante",
            "projectName": "Nivasa Enchante",
            "developer": "Nivasa Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "1.5, 2, 2.5, 3 BHK",
            "area": "585 - 1,046",
            "areaUnit": "sq.ft.",
            "price": 6000000,
            "numericPrice": 6000000,
            "priceLabel": "₹60 Lac - 1.86 Cr",
            "pricePerSqFt": 10256,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Multi-BHK Township",
            "totalLand": "4.25 Acres",
            "landArea": "4.25 Acres",
            "floors": "14 Floors",
            "floorsCount": "14 Floors",
            "towers": "9 Towers",
            "towersCount": "9 Towers",
            "buildingCount": 9,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Grand Clubhouse",
                    "Swimming Pool",
                    "Tennis Court",
                    "Cricket Pitch",
                    "Children's Play Area",
                    "24/7 Security",
                    "Jogging Track"
            ],
            "description": "Nivasa Enchante spans 4.25 acres with 9 towers of 14 stories in Dhanori. Offers 1.5 BHK (585 sq.ft.), 2 BHK (787-794 sq.ft.), 2.5 BHK (858-893 sq.ft.), and 3 BHK (1,039-1,046 sq.ft.) residences.",
            "floorPlans": [
                    {
                            "id": "923-1.5bhk",
                            "bhk": "1.5 BHK",
                            "bhkCategory": "1.5 BHK",
                            "name": "1.5 BHK Smart",
                            "config": "1.5 BHK Smart Suite",
                            "carpetArea": "585",
                            "superArea": "790",
                            "balconyArea": "45",
                            "facing": "East Facing",
                            "price": "₹60 Lac",
                            "priceLabel": "Starting from",
                            "description": "Efficient 1.5 BHK with dedicated study/work-from-home room and private balcony.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "14'6\" × 10'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Study Room",
                                            "size": "8'0\" × 7'0\""
                                    }
                            ],
                            "tag": "1.5 BHK Smart"
                    },
                    {
                            "id": "923-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Premium",
                            "carpetArea": "787 - 794",
                            "superArea": "1,060 - 1,075",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹81 Lac - 82.5 Lac",
                            "priceLabel": "Starting from",
                            "description": "Well-appointed 2 BHK with 787 - 794 sq.ft. carpet area and optimal space planning.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
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
                            "tag": "2 BHK Comfort"
                    },
                    {
                            "id": "923-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2.5 BHK",
                            "name": "2.5 BHK Luxury",
                            "config": "2.5 BHK Deluxe",
                            "carpetArea": "858 - 893",
                            "superArea": "1,160 - 1,205",
                            "balconyArea": "70",
                            "facing": "North-East Facing",
                            "price": "₹91 Lac - 92 Lac",
                            "priceLabel": "Starting from",
                            "description": "2.5 BHK home with 858 - 893 sq.ft. carpet area featuring a dedicated flex/study room and expansive balcony.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Half Bedroom / Study",
                                            "size": "8'6\" × 8'0\""
                                    }
                            ],
                            "tag": "2.5 BHK Luxury"
                    },
                    {
                            "id": "923-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Royale",
                            "config": "3 BHK Royale Suite",
                            "carpetArea": "1,039 - 1,046",
                            "superArea": "1,400 - 1,415",
                            "balconyArea": "90",
                            "facing": "East Facing",
                            "price": "₹1.78 Cr - 1.86 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK residence exceeding 1,039 sq.ft. carpet area with double balconies and premium fittings.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
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
                            "tag": "3 BHK Royale"
                    }
            ]
    },
    {
            "id": 924,
            "slug": "shriram-skypark-dhanori",
            "title": "Shriram SkyPark",
            "name": "Shriram SkyPark",
            "projectName": "Shriram SkyPark",
            "developer": "Shriram Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 2.5 BHK",
            "area": "707 - 842",
            "areaUnit": "sq.ft.",
            "price": 6200000,
            "numericPrice": 6200000,
            "priceLabel": "₹62 Lac - 72 Lac",
            "pricePerSqFt": 8769,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Smart Living",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "11 Floors",
            "floorsCount": "11 Floors",
            "towers": "3 Towers",
            "towersCount": "3 Towers",
            "buildingCount": 3,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Gym",
                    "Landscaped Garden",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "Shriram SkyPark in Dhanori offers 2 BHK (707-708 sq.ft.) starting from ₹62 Lac and 2.5 BHK (842 sq.ft.) at ₹72 Lac on a 1-acre development with 3 towers of 11 floors.",
            "floorPlans": [
                    {
                            "id": "924-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Executive",
                            "config": "2 BHK Smart Residence",
                            "carpetArea": "707 - 708",
                            "superArea": "955 - 960",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹62 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smart 2 BHK with 707 - 708 sq.ft. carpet area, well-designed layout, and zero dead space.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "15'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "2 BHK Value"
                    },
                    {
                            "id": "924-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2.5 BHK",
                            "name": "2.5 BHK Suite",
                            "config": "2.5 BHK Comfort Suite",
                            "carpetArea": "842",
                            "superArea": "1,140",
                            "balconyArea": "65",
                            "facing": "North-East Facing",
                            "price": "₹72 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2.5 BHK with 842 sq.ft. carpet area featuring an extra work-from-home/study room.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    },
                                    {
                                            "name": "Study/Flex Room",
                                            "size": "8'0\" × 7'6\""
                                    }
                            ],
                            "tag": "2.5 BHK Suite"
                    }
            ]
    },
    {
            "id": 925,
            "slug": "gulmohar-skypark-dhanori",
            "title": "Gulmohar SkyPark",
            "name": "Gulmohar SkyPark",
            "projectName": "Gulmohar SkyPark",
            "developer": "Gulmohar Development",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "641 - 1,049",
            "areaUnit": "sq.ft.",
            "price": 6500000,
            "numericPrice": 6500000,
            "priceLabel": "₹65 Lac - 1.00 Cr",
            "pricePerSqFt": 10140,
            "possession": "Dec 2028",
            "possessionDate": "Dec 2028",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Eco Township",
            "totalLand": "6 Acres",
            "landArea": "6 Acres",
            "floors": "12 Floors",
            "floorsCount": "12 Floors",
            "towers": "3 Towers",
            "towersCount": "3 Towers",
            "buildingCount": 3,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Sky Lounge",
                    "Infinity Pool",
                    "Clubhouse",
                    "Gym",
                    "Jogging Track",
                    "24/7 Security",
                    "Children's Play Area"
            ],
            "description": "Gulmohar SkyPark spans 6 acres across 3 towers of 12 floors in Dhanori, offering 2 BHK (641-675 sq.ft.) and 3 BHK (912-1049 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "925-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Urban Living",
                            "carpetArea": "641 - 675",
                            "superArea": "865 - 910",
                            "balconyArea": "50",
                            "facing": "East Facing",
                            "price": "₹65 Lac - 68 Lac",
                            "priceLabel": "Starting from",
                            "description": "Efficient 2 BHK with 641 - 675 sq.ft. carpet area, modern kitchen, and scenic nature views.",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "15'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "11'6\" × 10'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'0\" × 9'6\""
                                    }
                            ],
                            "tag": "2 BHK Eco"
                    },
                    {
                            "id": "925-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Premium",
                            "config": "3 BHK Spacious Home",
                            "carpetArea": "912 - 1,049",
                            "superArea": "1,230 - 1,415",
                            "balconyArea": "75",
                            "facing": "North-East Facing",
                            "price": "₹90 Lac - 1.00 Cr",
                            "priceLabel": "Starting from",
                            "description": "Generous 3 BHK home with 912 - 1,049 sq.ft. carpet area, wide sundeck, and private master suite.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "18'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'6\" × 11'6\""
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
                            "tag": "3 BHK Premium"
                    }
            ]
    },
    {
            "id": 926,
            "slug": "skyrise-sparkle-dhanori",
            "title": "Skyrise Sparkle",
            "name": "Skyrise Sparkle",
            "projectName": "Skyrise Sparkle",
            "developer": "Skyrise Builders",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2 BHK",
            "area": "696",
            "areaUnit": "sq.ft.",
            "price": 6900000,
            "numericPrice": 6900000,
            "priceLabel": "₹69 Lac - 70 Lac",
            "pricePerSqFt": 9913,
            "possession": "Dec 2025",
            "possessionDate": "Dec 2025",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Near Completion",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "10 Floors",
            "floorsCount": "10 Floors",
            "towers": "2 Towers",
            "towersCount": "2 Towers",
            "buildingCount": 2,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Fitness Studio",
                    "Party Lawn",
                    "Kids Play Area",
                    "Power Backup",
                    "24/7 Security",
                    "CCTV Surveillance"
            ],
            "description": "Skyrise Sparkle in Dhanori offers boutique 2 BHK residences of 696 sq.ft. on a 1-acre development with 2 towers of 10 floors with possession by Dec 2025.",
            "floorPlans": [
                    {
                            "id": "926-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Compact",
                            "config": "2 BHK Residence",
                            "carpetArea": "696",
                            "superArea": "940",
                            "balconyArea": "50",
                            "facing": "East Facing",
                            "price": "₹69 Lac - 70 Lac",
                            "priceLabel": "Starting from",
                            "description": "696 sq.ft. 2 BHK residence nearing completion by Dec 2025 with modular fittings and Vastu alignment.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "15'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "Dec 2025 Move-In"
                    }
            ]
    },
    {
            "id": 927,
            "slug": "elite-platinum-dhanori",
            "title": "Elite Platinum",
            "name": "Elite Platinum",
            "projectName": "Elite Platinum",
            "developer": "Elite Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3, 4 BHK",
            "area": "692 - 1,540",
            "areaUnit": "sq.ft.",
            "price": 6900000,
            "numericPrice": 6900000,
            "priceLabel": "₹69 Lac - 1.38 Cr",
            "pricePerSqFt": 9971,
            "possession": "Dec 2027",
            "possessionDate": "Dec 2027",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Elite Residences",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "13 Floors",
            "floorsCount": "13 Floors",
            "towers": "1 Tower",
            "towersCount": "1 Tower",
            "buildingCount": 1,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Gymnasium",
                    "Rooftop Sitout",
                    "Children's Play Area",
                    "24/7 Security",
                    "Intercom",
                    "Power Backup"
            ],
            "description": "Elite Platinum in Dhanori features 2 BHK (692-849 sq.ft.), 3 BHK (952-1450 sq.ft.), and 4 BHK (1,540 sq.ft.) residences in a 13-storey high-rise.",
            "floorPlans": [
                    {
                            "id": "927-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Platinum",
                            "config": "2 BHK Luxury",
                            "carpetArea": "692 - 849",
                            "superArea": "935 - 1,145",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹69 Lac - 76.42 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with carpet area ranging from 692 to 849 sq.ft. (variants: 692, 769, 780, 849 sq.ft.).",
                            "rooms": [
                                    {
                                            "name": "Living Room",
                                            "size": "16'0\" × 11'0\""
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
                            "tag": "2 BHK Platinum"
                    },
                    {
                            "id": "927-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Platinum Grande",
                            "config": "3 BHK Luxury",
                            "carpetArea": "952 - 1,450",
                            "superArea": "1,285 - 1,955",
                            "balconyArea": "80",
                            "facing": "North-East Facing",
                            "price": "₹85 Lac - 1.30 Cr",
                            "priceLabel": "Starting from",
                            "description": "Expansive 3 BHK home from 952 to 1,450 sq.ft. (variants: 952, 1143, 1450 sq.ft.) with double sundecks.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "18'6\" × 12'6\""
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
                            "tag": "3 BHK Platinum"
                    },
                    {
                            "id": "927-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Signature Penthouse",
                            "config": "4 BHK Luxury Suite",
                            "carpetArea": "1,540",
                            "superArea": "2,080",
                            "balconyArea": "110",
                            "facing": "East Facing",
                            "price": "₹1.38 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 4 BHK palatial residence with 1,540 sq.ft. carpet area and top-floor skyline panoramas.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "22'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "16'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "13'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "12'6\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "11'6\" × 10'6\""
                                    }
                            ],
                            "tag": "4 BHK Signature"
                    }
            ]
    },
    {
            "id": 928,
            "slug": "metropolis-east-phase-ii-dhanori",
            "title": "Metropolis East Phase II",
            "name": "Metropolis East Phase II",
            "projectName": "Metropolis East Phase II",
            "developer": "Metropolis Builders",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "756 - 859",
            "areaUnit": "sq.ft.",
            "price": 7800000,
            "numericPrice": 7800000,
            "priceLabel": "₹78 Lac - 82.64 Lac",
            "pricePerSqFt": 10317,
            "possession": "Mar 2026",
            "possessionDate": "Mar 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Smart Residences",
            "totalLand": "3.5 Acres",
            "landArea": "3.5 Acres",
            "floors": "B+G+12 Floors",
            "floorsCount": "B+G+12 Floors",
            "towers": "5 Towers",
            "towersCount": "5 Towers",
            "buildingCount": 5,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Landscaped Garden",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "Metropolis East Phase II spans 3.5 acres with 5 towers (B+G+12 floors) in Dhanori, offering 2 BHK (756 sq.ft.) at ₹78 Lac and 3 BHK (859 sq.ft.) at ₹82.64 Lac.",
            "floorPlans": [
                    {
                            "id": "928-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Apartment",
                            "carpetArea": "756",
                            "superArea": "1,020",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹78 Lac",
                            "priceLabel": "Starting from",
                            "description": "Generously planned 2 BHK with 756 sq.ft. carpet area, modern kitchen, and possession by Mar 2026.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "Mar 2026 Possession"
                    },
                    {
                            "id": "928-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Apartment",
                            "carpetArea": "859",
                            "superArea": "1,160",
                            "balconyArea": "70",
                            "facing": "North-East Facing",
                            "price": "₹82.64 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with 859 sq.ft. carpet area, 3 dedicated bedrooms, and open balcony views.",
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
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "10'6\" × 10'0\""
                                    }
                            ],
                            "tag": "3 BHK Grande"
                    }
            ]
    },
    {
            "id": 929,
            "slug": "bramha-sky-city-dhanori",
            "title": "Bramha Sky City",
            "name": "Bramha Sky City",
            "projectName": "Bramha Sky City",
            "developer": "Bramha Corp",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "786 - 970",
            "areaUnit": "sq.ft.",
            "price": 7370000,
            "numericPrice": 7370000,
            "priceLabel": "₹73.70 Lac - 90.03 Lac",
            "pricePerSqFt": 9377,
            "possession": "Ready to Move (Dec 2024)",
            "possessionDate": "Ready to Move",
            "status": "Ready to Move",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Ready Mega Township",
            "totalLand": "15.5 Acres",
            "landArea": "15.5 Acres",
            "floors": "12 Floors",
            "floorsCount": "12 Floors",
            "towers": "16 Towers",
            "towersCount": "16 Towers",
            "buildingCount": 16,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Grand Clubhouse",
                    "Olympic Size Pool",
                    "Gym",
                    "Badminton Court",
                    "Tennis Court",
                    "Jogging Track",
                    "24/7 Security",
                    "Shopping Promenade"
            ],
            "description": "Bramha Sky City is a 15.5-acre landmark ready-to-move township with 16 towers (12 floors) in Dhanori, offering 2 BHK (786-787 sq.ft.) and 3 BHK (970 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "929-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Ready",
                            "config": "2 BHK Premium",
                            "carpetArea": "786 - 787",
                            "superArea": "1,060 - 1,065",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹73.70 Lac - 73.76 Lac",
                            "priceLabel": "Starting from",
                            "description": "Ready-to-move 2 BHK with 786 - 787 sq.ft. carpet area, immediate occupancy, and lush township views.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "Ready OC Received"
                    },
                    {
                            "id": "929-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Ready",
                            "config": "3 BHK Luxury",
                            "carpetArea": "970",
                            "superArea": "1,310",
                            "balconyArea": "80",
                            "facing": "North-East Facing",
                            "price": "₹90.03 Lac",
                            "priceLabel": "Starting from",
                            "description": "Ready-possession 3 BHK residence with 970 sq.ft. carpet area and access to 15.5-acre lifestyle amenities.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "18'6\" × 12'0\""
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
                            "tag": "Ready to Move"
                    }
            ]
    },
    {
            "id": 930,
            "slug": "mind-space-dhanori",
            "title": "Mind Space",
            "name": "Mind Space",
            "projectName": "Mind Space",
            "developer": "Mindspace Realty",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 2.5, 3 BHK",
            "area": "762 - 1,066",
            "areaUnit": "sq.ft.",
            "price": 7600000,
            "numericPrice": 7600000,
            "priceLabel": "₹76 Lac - 1.04 Cr",
            "pricePerSqFt": 9974,
            "possession": "Dec 2027",
            "possessionDate": "Dec 2027",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Smart High-Rise",
            "totalLand": "1.29 Acres",
            "landArea": "1.29 Acres",
            "floors": "13 Floors",
            "floorsCount": "13 Floors",
            "towers": "2 Towers",
            "towersCount": "2 Towers",
            "buildingCount": 2,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Gym",
                    "Landscaped Terrace",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "Mind Space in Dhanori on 1.29 acres features 2 towers of 13 floors offering 2 BHK (762-808 sq.ft.), 2.5 BHK (918-949 sq.ft.), and 3 BHK (989-1066 sq.ft.) residences.",
            "floorPlans": [
                    {
                            "id": "930-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Residence",
                            "carpetArea": "762 - 808",
                            "superArea": "1,030 - 1,090",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹76 Lac - 81 Lac",
                            "priceLabel": "Starting from",
                            "description": "Well-crafted 2 BHK with carpet area from 762 to 808 sq.ft. (variants: 762, 798, 808 sq.ft.).",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'0\""
                                    }
                            ],
                            "tag": "2 BHK Smart"
                    },
                    {
                            "id": "930-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2.5 BHK",
                            "name": "2.5 BHK Suite",
                            "config": "2.5 BHK Luxury",
                            "carpetArea": "918 - 949",
                            "superArea": "1,240 - 1,280",
                            "balconyArea": "65",
                            "facing": "North-East Facing",
                            "price": "₹91 Lac - 94 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2.5 BHK with 918 - 949 sq.ft. carpet area including a private work/study space.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Study/Flex",
                                            "size": "8'6\" × 8'0\""
                                    }
                            ],
                            "tag": "2.5 BHK Suite"
                    },
                    {
                            "id": "930-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Luxury",
                            "carpetArea": "989 - 1,066",
                            "superArea": "1,335 - 1,440",
                            "balconyArea": "80",
                            "facing": "East Facing",
                            "price": "₹97 Lac - 1.04 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK home with 989 - 1,066 sq.ft. carpet area with double balconies and scenic city vistas.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
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
                            "tag": "3 BHK Grande"
                    }
            ]
    },
    {
            "id": 931,
            "slug": "divine-garden-dhanori",
            "title": "Divine Garden",
            "name": "Divine Garden",
            "projectName": "Divine Garden",
            "developer": "Divine Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "812 - 1,080",
            "areaUnit": "sq.ft.",
            "price": 8100000,
            "numericPrice": 8100000,
            "priceLabel": "₹81 Lac - 1.13 Cr",
            "pricePerSqFt": 9975,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Nature Enclave",
            "totalLand": "16 Acres",
            "landArea": "16 Acres",
            "floors": "B+G+10 Floors",
            "floorsCount": "B+G+10 Floors",
            "towers": "14 Towers",
            "towersCount": "14 Towers",
            "buildingCount": 14,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Botanical Garden",
                    "Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Jogging Track",
                    "24/7 Security",
                    "Children's Play Area"
            ],
            "description": "Divine Garden is a 16-acre botanical enclave with 14 towers (B+G+10 floors) in Dhanori, offering 2 BHK (812-820 sq.ft.) and 3 BHK (992-1,080 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "931-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Garden Suite",
                            "config": "2 BHK Apartment",
                            "carpetArea": "812 - 820",
                            "superArea": "1,100 - 1,110",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹81 Lac - 84 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with 812 - 820 sq.ft. carpet area opening to landscaped green vistas.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'6\""
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
                            "tag": "2 BHK Garden"
                    },
                    {
                            "id": "931-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Royale",
                            "config": "3 BHK Luxury",
                            "carpetArea": "992 - 1,080",
                            "superArea": "1,340 - 1,460",
                            "balconyArea": "85",
                            "facing": "North-East Facing",
                            "price": "₹1.01 Cr - 1.13 Cr",
                            "priceLabel": "Starting from",
                            "description": "Luxurious 3 BHK with 992 - 1,080 sq.ft. carpet area, 3 bedrooms, and sprawling garden views.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "19'0\" × 12'6\""
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
                            "tag": "3 BHK Royale"
                    }
            ]
    },
    {
            "id": 932,
            "slug": "ganga-new-town-dhanori",
            "title": "Ganga New Town",
            "name": "Ganga New Town",
            "projectName": "Ganga New Town",
            "developer": "Goel Ganga Developments",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK & Penthouse",
            "area": "828 - 1,654",
            "areaUnit": "sq.ft.",
            "price": 8700000,
            "numericPrice": 8700000,
            "priceLabel": "₹87 Lac - 1.74 Cr",
            "pricePerSqFt": 10507,
            "possession": "Dec 2027",
            "possessionDate": "Dec 2027",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Integrated Township",
            "totalLand": "15 Acres",
            "landArea": "15 Acres",
            "floors": "12 Floors",
            "floorsCount": "12 Floors",
            "towers": "4 Towers",
            "towersCount": "4 Towers",
            "buildingCount": 4,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Grand Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Amphitheatre",
                    "Cricket Pitch",
                    "Children's Play Area",
                    "24/7 Security"
            ],
            "description": "Ganga New Town on 15 acres features 4 towers of 12 floors in Dhanori, offering 2 BHK (828-853 sq.ft.), 3 BHK (1031-1099 sq.ft.), and 2 BHK Penthouses (1,654 sq.ft.).",
            "floorPlans": [
                    {
                            "id": "932-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart Suite",
                            "config": "2 BHK Residence",
                            "carpetArea": "828 - 853",
                            "superArea": "1,120 - 1,150",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹87 Lac - 89 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 2 BHK home with 828 - 853 sq.ft. carpet area in an integrated 15-acre township.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'6\""
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
                            "tag": "2 BHK Township"
                    },
                    {
                            "id": "932-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Luxury",
                            "carpetArea": "1,031 - 1,099",
                            "superArea": "1,390 - 1,485",
                            "balconyArea": "85",
                            "facing": "North-East Facing",
                            "price": "₹1.15 Cr - 1.22 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK with 1,031 - 1,099 sq.ft. carpet area, expansive living room, and private master balcony.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
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
                            "tag": "3 BHK Grande"
                    },
                    {
                            "id": "932-penthouse",
                            "bhk": "Penthouse",
                            "bhkCategory": "Penthouse",
                            "name": "2 BHK Sky Penthouse",
                            "config": "2 BHK Sky Villa Penthouse",
                            "carpetArea": "1,654",
                            "superArea": "2,230",
                            "balconyArea": "180",
                            "facing": "East Facing",
                            "price": "₹1.74 Cr",
                            "priceLabel": "Starting from",
                            "description": "Palatial 1,654 sq.ft. top-floor penthouse with private expansive terrace and 360-degree skyline views.",
                            "rooms": [
                                    {
                                            "name": "Palatial Living",
                                            "size": "24'0\" × 15'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "17'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "14'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Private Sky Terrace",
                                            "size": "22'0\" × 12'0\""
                                    }
                            ],
                            "tag": "Sky Penthouse"
                    }
            ]
    },
    {
            "id": 933,
            "slug": "nyati-era-dhanori",
            "title": "Nyati Era",
            "name": "Nyati Era",
            "projectName": "Nyati Era",
            "developer": "Nyati Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "809 - 1,175",
            "areaUnit": "sq.ft.",
            "price": 8800000,
            "numericPrice": 8800000,
            "priceLabel": "₹88 Lac - 1.32 Cr",
            "pricePerSqFt": 10877,
            "possession": "Dec 2027",
            "possessionDate": "Dec 2027",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Nyati Signature",
            "totalLand": "8 Acres",
            "landArea": "8 Acres",
            "floors": "13 Floors",
            "floorsCount": "13 Floors",
            "towers": "18 Towers",
            "towersCount": "18 Towers",
            "buildingCount": 18,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Signature Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Squash Court",
                    "Kids Play Area",
                    "24/7 Security",
                    "Central Green Park"
            ],
            "description": "Nyati Era is an 8-acre landmark development with 18 towers of 13 floors in Dhanori, offering 2 BHK (809-835 sq.ft.) and 3 BHK (1,175 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "933-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Signature",
                            "config": "2 BHK Luxury",
                            "carpetArea": "809 - 835",
                            "superArea": "1,090 - 1,130",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹88 Lac - 90 Lac",
                            "priceLabel": "Starting from",
                            "description": "Nyati signature 2 BHK with carpet area from 809 to 835 sq.ft. (variants: 809, 828, 835 sq.ft.).",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'6\""
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
                            "tag": "2 BHK Signature"
                    },
                    {
                            "id": "933-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Royale",
                            "config": "3 BHK Ultra Luxury",
                            "carpetArea": "1,175",
                            "superArea": "1,585",
                            "balconyArea": "90",
                            "facing": "North-East Facing",
                            "price": "₹1.32 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK with 1,175 sq.ft. carpet area, expansive living and dining, and premium Nyati construction quality.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "20'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "15'0\" × 12'6\""
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
                            "tag": "3 BHK Royale"
                    }
            ]
    },
    {
            "id": 934,
            "slug": "skyscape-dhanori",
            "title": "SkyScape",
            "name": "SkyScape",
            "projectName": "SkyScape",
            "developer": "SkyScape Builders",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "654 - 1,016",
            "areaUnit": "sq.ft.",
            "price": 5700000,
            "numericPrice": 5700000,
            "priceLabel": "₹57 Lac - 90 Lac",
            "pricePerSqFt": 8715,
            "possession": "Dec 2028",
            "possessionDate": "Dec 2028",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Budget Friendly",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "10 Floors",
            "floorsCount": "10 Floors",
            "towers": "1 Tower",
            "towersCount": "1 Tower",
            "buildingCount": 1,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Rooftop Garden",
                    "Gymnasium",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup",
                    "CCTV Surveillance"
            ],
            "description": "SkyScape in Dhanori offers attractive pricing starting from ₹57 Lac on a 1-acre plot with a 10-storey tower. Features 2 BHK (654-923 sq.ft.) and 3 BHK (1004-1016 sq.ft.) configurations.",
            "floorPlans": [
                    {
                            "id": "934-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Smart",
                            "config": "2 BHK Residence",
                            "carpetArea": "654 - 923",
                            "superArea": "880 - 1,245",
                            "balconyArea": "50",
                            "facing": "East Facing",
                            "price": "₹57 Lac - 81 Lac",
                            "priceLabel": "Starting from",
                            "description": "Most budget-friendly 2 BHK in Dhanori starting at ₹57 Lac with 654 - 923 sq.ft. carpet area.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "15'0\" × 10'6\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "11'6\" × 10'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "10'0\" × 9'6\""
                                    }
                            ],
                            "tag": "Best Value"
                    },
                    {
                            "id": "934-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Comfort",
                            "config": "3 BHK Residence",
                            "carpetArea": "1,004 - 1,016",
                            "superArea": "1,355 - 1,370",
                            "balconyArea": "75",
                            "facing": "North-East Facing",
                            "price": "₹88 Lac - 90 Lac",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home exceeding 1,004 sq.ft. carpet area under ₹90 Lac.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "18'0\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'6\" × 11'6\""
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
                            "tag": "3 BHK Comfort"
                    }
            ]
    },
    {
            "id": 935,
            "slug": "kohinoor-viva-pixel-dhanori",
            "title": "Kohinoor Viva Pixel",
            "name": "Kohinoor Viva Pixel",
            "projectName": "Kohinoor Viva Pixel",
            "developer": "Kohinoor Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 2.5, 3, 4 BHK",
            "area": "780 - 1,280",
            "areaUnit": "sq.ft.",
            "price": 7800000,
            "numericPrice": 7800000,
            "priceLabel": "₹78 Lac - 1.27 Cr",
            "pricePerSqFt": 10000,
            "possession": "Dec 2026",
            "possessionDate": "Dec 2026",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Sada Sukhi Raho",
            "totalLand": "4 Acres",
            "landArea": "4 Acres",
            "floors": "15 Floors",
            "floorsCount": "15 Floors",
            "towers": "6 Towers",
            "towersCount": "6 Towers",
            "buildingCount": 6,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Grand Clubhouse",
                    "Swimming Pool",
                    "Gym",
                    "Multipurpose Court",
                    "Kids Play Area",
                    "24/7 Security",
                    "Senior Citizen Park"
            ],
            "description": "Kohinoor Viva Pixel spans 4 acres across 6 towers of 15 floors in Dhanori, offering 2 BHK (780-826 sq.ft.), 2.5 BHK (900 sq.ft.), 3 BHK (999-1115 sq.ft.), and 4 BHK (1,280 sq.ft.) residences.",
            "floorPlans": [
                    {
                            "id": "935-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Pixel Smart",
                            "config": "2 BHK Luxury",
                            "carpetArea": "780 - 826",
                            "superArea": "1,050 - 1,115",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹78 Lac - 80 Lac",
                            "priceLabel": "Starting from",
                            "description": "Smart 2 BHK with 780 - 826 sq.ft. carpet area, premium vitrified tiles, and branded sanitary fittings.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "2 BHK Smart"
                    },
                    {
                            "id": "935-2.5bhk",
                            "bhk": "2.5 BHK",
                            "bhkCategory": "2.5 BHK",
                            "name": "2.5 BHK Pixel Suite",
                            "config": "2.5 BHK Luxury",
                            "carpetArea": "900",
                            "superArea": "1,215",
                            "balconyArea": "65",
                            "facing": "North-East Facing",
                            "price": "₹91 Lac",
                            "priceLabel": "Starting from",
                            "description": "Comfortable 2.5 BHK with 900 sq.ft. carpet area and dedicated study/work room.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "13'0\" × 11'6\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'6\" × 10'6\""
                                    },
                                    {
                                            "name": "Study/Flex",
                                            "size": "8'6\" × 8'0\""
                                    }
                            ],
                            "tag": "2.5 BHK Suite"
                    },
                    {
                            "id": "935-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Pixel Grande",
                            "config": "3 BHK Luxury",
                            "carpetArea": "999 - 1,115",
                            "superArea": "1,350 - 1,505",
                            "balconyArea": "85",
                            "facing": "East Facing",
                            "price": "₹99 Lac - 1.11 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK home with 999 - 1,115 sq.ft. carpet area and private master balcony.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "19'0\" × 12'6\""
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
                            "tag": "3 BHK Grande"
                    },
                    {
                            "id": "935-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Signature",
                            "config": "4 BHK Luxury Residence",
                            "carpetArea": "1,280",
                            "superArea": "1,730",
                            "balconyArea": "105",
                            "facing": "North-East Facing",
                            "price": "₹1.27 Cr",
                            "priceLabel": "Starting from",
                            "description": "Exclusive 4 BHK home with 1,280 sq.ft. carpet area and double master suites.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "21'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Master Suite 1",
                                            "size": "15'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite 2",
                                            "size": "13'6\" × 12'0\""
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
                            "tag": "4 BHK Signature"
                    }
            ]
    },
    {
            "id": 936,
            "slug": "shreeram-euphoria-dhanori",
            "title": "Shreeram Euphoria",
            "name": "Shreeram Euphoria",
            "projectName": "Shreeram Euphoria",
            "developer": "Shreeram Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "761 - 1,081",
            "areaUnit": "sq.ft.",
            "price": 7800000,
            "numericPrice": 7800000,
            "priceLabel": "₹78 Lac - 1.10 Cr",
            "pricePerSqFt": 10249,
            "possession": "Ready to Move",
            "possessionDate": "Ready to Move",
            "status": "Ready to Move",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Ready Possession",
            "totalLand": "1.5 Acres",
            "landArea": "1.5 Acres",
            "floors": "G+9 Floors",
            "floorsCount": "G+9 Floors",
            "towers": "2 Towers",
            "towersCount": "2 Towers",
            "buildingCount": 2,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Gym",
                    "Landscaped Garden",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "Shreeram Euphoria on 1.5 acres features 2 towers of G+9 floors in Dhanori offering ready-possession 2 BHK (761-835 sq.ft.) and 3 BHK (1,022-1,081 sq.ft.) homes.",
            "floorPlans": [
                    {
                            "id": "936-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Ready",
                            "config": "2 BHK Ready Home",
                            "carpetArea": "761 - 835",
                            "superArea": "1,030 - 1,125",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹78 Lac - 85 Lac",
                            "priceLabel": "Starting from",
                            "description": "Ready-to-move 2 BHK with 761 - 835 sq.ft. carpet area, zero waiting period, and OC received.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
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
                            "id": "936-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Ready",
                            "config": "3 BHK Ready Home",
                            "carpetArea": "1,022 - 1,081",
                            "superArea": "1,380 - 1,460",
                            "balconyArea": "80",
                            "facing": "North-East Facing",
                            "price": "₹1.03 Cr - 1.10 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious ready 3 BHK residence with 1,022 - 1,081 sq.ft. carpet area (variants: 1022, 1033, 1081 sq.ft.).",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "19'0\" × 12'6\""
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
            ]
    },
    {
            "id": 937,
            "slug": "one-aretha-dhanori",
            "title": "One Aretha",
            "name": "One Aretha",
            "projectName": "One Aretha",
            "developer": "Aretha Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3, 4 BHK",
            "area": "784 - 1,246",
            "areaUnit": "sq.ft.",
            "price": 8500000,
            "numericPrice": 8500000,
            "priceLabel": "₹85 Lac - 1.60 Cr",
            "pricePerSqFt": 10841,
            "possession": "Dec 2027",
            "possessionDate": "Dec 2027",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Skyline Living",
            "totalLand": "4 Acres",
            "landArea": "4 Acres",
            "floors": "17 Floors",
            "floorsCount": "17 Floors",
            "towers": "17 Towers",
            "towersCount": "17 Towers",
            "buildingCount": 17,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Skywalk Promenade",
                    "Clubhouse",
                    "Infinity Pool",
                    "Gym",
                    "Kids Play Area",
                    "24/7 Security",
                    "Yoga Lawn"
            ],
            "description": "One Aretha on 4 acres with 17 towers of 17 floors in Dhanori offers 2 BHK (784 sq.ft.), 3 BHK (1,082 sq.ft.), and 4 BHK (1,246 sq.ft.) residences.",
            "floorPlans": [
                    {
                            "id": "937-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Skyline",
                            "config": "2 BHK Luxury",
                            "carpetArea": "784",
                            "superArea": "1,060",
                            "balconyArea": "55",
                            "facing": "East Facing",
                            "price": "₹85 Lac",
                            "priceLabel": "Starting from",
                            "description": "Elegant 2 BHK with 784 sq.ft. carpet area, aerodynamic architecture, and panoramic city views.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'0\" × 11'0\""
                                    },
                                    {
                                            "name": "Master Bedroom",
                                            "size": "12'6\" × 11'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "11'0\" × 10'6\""
                                    }
                            ],
                            "tag": "2 BHK Skyline"
                    },
                    {
                            "id": "937-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Royale",
                            "config": "3 BHK Luxury",
                            "carpetArea": "1,082",
                            "superArea": "1,460",
                            "balconyArea": "80",
                            "facing": "North-East Facing",
                            "price": "₹1.22 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK with 1,082 sq.ft. carpet area, wide sundeck, and master bedroom with walk-in closet space.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
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
                            "tag": "3 BHK Royale"
                    },
                    {
                            "id": "937-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Grand",
                            "config": "4 BHK Luxury Suite",
                            "carpetArea": "1,246",
                            "superArea": "1,680",
                            "balconyArea": "100",
                            "facing": "East Facing",
                            "price": "₹1.60 Cr",
                            "priceLabel": "Starting from",
                            "description": "Grand 4 BHK residence with 1,246 sq.ft. carpet area, double suites, and designer finishes.",
                            "rooms": [
                                    {
                                            "name": "Palatial Living",
                                            "size": "21'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Master Suite 1",
                                            "size": "15'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Master Suite 2",
                                            "size": "13'6\" × 12'0\""
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
                            "tag": "4 BHK Grand"
                    }
            ]
    },
    {
            "id": 938,
            "slug": "prestigia-dhanori",
            "title": "PRESTIGIA",
            "name": "PRESTIGIA",
            "projectName": "PRESTIGIA",
            "developer": "Unique Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3, 4 BHK, Duplex & Penthouses",
            "area": "883 - 3,115",
            "areaUnit": "sq.ft.",
            "price": 8900000,
            "numericPrice": 8900000,
            "priceLabel": "₹89 Lac - 3.13 Cr",
            "pricePerSqFt": 10079,
            "possession": "Dec 2028",
            "possessionDate": "Dec 2028",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Ultra Luxury Duplex",
            "totalLand": "1.5 Acres",
            "landArea": "1.5 Acres",
            "floors": "B+G+7 Floors",
            "floorsCount": "B+G+7 Floors",
            "towers": "6 Towers",
            "towersCount": "6 Towers",
            "buildingCount": 6,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Temperature Controlled Pool",
                    "Private Elevators",
                    "Sky Garden",
                    "Gym",
                    "Concierge Desk",
                    "24/7 Security"
            ],
            "description": "PRESTIGIA by Unique Properties spans 1.5 acres across 6 boutique towers (B+G+7 floors) in Dhanori, offering 2 BHK, 3 BHK, 3 BHK Duplex, 3 BHK Penthouse, 4 BHK, and 4 BHK Penthouses up to 3,115 sq.ft.",
            "floorPlans": [
                    {
                            "id": "938-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Boutique",
                            "config": "2 BHK Luxury",
                            "carpetArea": "883 - 1,060",
                            "superArea": "1,190 - 1,430",
                            "balconyArea": "65",
                            "facing": "East Facing",
                            "price": "₹89 Lac - 1.06 Cr",
                            "priceLabel": "Starting from",
                            "description": "Expansive 2 BHK boutique home with 883 - 1,060 sq.ft. carpet area.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "17'0\" × 12'0\""
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
                            "tag": "2 BHK Boutique"
                    },
                    {
                            "id": "938-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Luxury",
                            "config": "3 BHK Luxury",
                            "carpetArea": "1,183 - 1,188",
                            "superArea": "1,600 - 1,605",
                            "balconyArea": "85",
                            "facing": "North-East Facing",
                            "price": "₹1.19 Cr",
                            "priceLabel": "Starting from",
                            "description": "3 BHK luxury suite with 1,183 - 1,188 sq.ft. carpet area and private balcony.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "20'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'6\" × 12'0\""
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
                            "tag": "3 BHK Luxury"
                    },
                    {
                            "id": "938-3bhk-duplex",
                            "bhk": "Duplex",
                            "bhkCategory": "Duplex",
                            "name": "3 BHK Duplex Mansion",
                            "config": "3 BHK Duplex",
                            "carpetArea": "1,563 - 1,861",
                            "superArea": "2,110 - 2,510",
                            "balconyArea": "120",
                            "facing": "East Facing",
                            "price": "₹1.57 Cr - 1.87 Cr",
                            "priceLabel": "Starting from",
                            "description": "Two-level 3 BHK duplex mansion with double-height ceiling living hall and internal staircase.",
                            "rooms": [
                                    {
                                            "name": "Double Height Living",
                                            "size": "22'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Master Suite (Upper)",
                                            "size": "16'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 2 (Upper)",
                                            "size": "13'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 3 (Lower)",
                                            "size": "13'0\" × 11'6\""
                                    }
                            ],
                            "tag": "Duplex Mansion"
                    },
                    {
                            "id": "938-3bhk-penthouse",
                            "bhk": "Penthouse",
                            "bhkCategory": "Penthouse",
                            "name": "3 BHK Sky Penthouse",
                            "config": "3 BHK Penthouse",
                            "carpetArea": "2,647 - 2,690",
                            "superArea": "3,570 - 3,630",
                            "balconyArea": "250",
                            "facing": "East Facing",
                            "price": "₹2.66 Cr - 2.70 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK sky penthouse with over 2,647 sq.ft. carpet area and expansive private terrace garden.",
                            "rooms": [
                                    {
                                            "name": "Palatial Living Hall",
                                            "size": "26'0\" × 16'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "18'0\" × 14'0\""
                                    },
                                    {
                                            "name": "Bedroom 2",
                                            "size": "15'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "14'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Private Terrace Garden",
                                            "size": "28'0\" × 14'0\""
                                    }
                            ],
                            "tag": "Sky Penthouse"
                    },
                    {
                            "id": "938-4bhk",
                            "bhk": "4 BHK",
                            "bhkCategory": "4 BHK",
                            "name": "4 BHK Presidential",
                            "config": "4 BHK Presidential Suite",
                            "carpetArea": "1,896 - 2,125",
                            "superArea": "2,560 - 2,870",
                            "balconyArea": "140",
                            "facing": "North-East Facing",
                            "price": "₹1.90 Cr - 2.11 Cr",
                            "priceLabel": "Starting from",
                            "description": "Presidential 4 BHK residence spanning 1,896 to 2,125 sq.ft. carpet area with double master suites.",
                            "rooms": [
                                    {
                                            "name": "Grand Living & Dining",
                                            "size": "24'0\" × 15'0\""
                                    },
                                    {
                                            "name": "Presidential Suite",
                                            "size": "17'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Junior Suite",
                                            "size": "15'0\" × 12'6\""
                                    },
                                    {
                                            "name": "Bedroom 3",
                                            "size": "13'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Bedroom 4",
                                            "size": "12'0\" × 11'0\""
                                    }
                            ],
                            "tag": "Presidential 4 BHK"
                    },
                    {
                            "id": "938-4bhk-penthouse",
                            "bhk": "Penthouse",
                            "bhkCategory": "Penthouse",
                            "name": "4 BHK Imperial Penthouse",
                            "config": "4 BHK Imperial Penthouse",
                            "carpetArea": "2,801 - 3,115",
                            "superArea": "3,780 - 4,200",
                            "balconyArea": "320",
                            "facing": "East Facing",
                            "price": "₹2.81 Cr - 3.13 Cr",
                            "priceLabel": "Starting from",
                            "description": "Ultra-luxury 4 BHK Imperial Penthouse with over 3,115 sq.ft. carpet area, private deck, and infinity dip lounge.",
                            "rooms": [
                                    {
                                            "name": "Imperial Living",
                                            "size": "28'0\" × 18'0\""
                                    },
                                    {
                                            "name": "Master Sanctuary",
                                            "size": "20'0\" × 15'0\""
                                    },
                                    {
                                            "name": "Suite 2",
                                            "size": "16'0\" × 13'6\""
                                    },
                                    {
                                            "name": "Suite 3",
                                            "size": "15'0\" × 13'0\""
                                    },
                                    {
                                            "name": "Guest Bedroom",
                                            "size": "13'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Private Skyline Deck",
                                            "size": "30'0\" × 15'0\""
                                    }
                            ],
                            "tag": "Imperial Penthouse"
                    }
            ]
    },
    {
            "id": 939,
            "slug": "i-life-4-dhanori",
            "title": "I LIFE 4",
            "name": "I LIFE 4",
            "projectName": "I LIFE 4",
            "developer": "I LIFE Developers",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "839 - 1,028",
            "areaUnit": "sq.ft.",
            "price": 9500000,
            "numericPrice": 9500000,
            "priceLabel": "₹95 Lac - 1.15 Cr",
            "pricePerSqFt": 11186,
            "possession": "Dec 2029",
            "possessionDate": "Dec 2029",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Smart Enclave",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "G+11 Floors",
            "floorsCount": "G+11 Floors",
            "towers": "2 Towers",
            "towersCount": "2 Towers",
            "buildingCount": 2,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Clubhouse",
                    "Gym",
                    "Landscaped Garden",
                    "Children's Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "I LIFE 4 in Dhanori on 1 acre offers 2 towers of G+11 floors featuring 2 BHK (839 sq.ft.) at ₹95 Lac and 3 BHK (984-1,028 sq.ft.) from ₹1.05 Cr to ₹1.15 Cr.",
            "floorPlans": [
                    {
                            "id": "939-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Comfort",
                            "config": "2 BHK Residence",
                            "carpetArea": "839",
                            "superArea": "1,130",
                            "balconyArea": "60",
                            "facing": "East Facing",
                            "price": "₹95 Lac",
                            "priceLabel": "Starting from",
                            "description": "Comfortable 2 BHK with 839 sq.ft. carpet area, modern aesthetics, and high-floor ventilation.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "16'6\" × 11'6\""
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
                            "tag": "2 BHK Comfort"
                    },
                    {
                            "id": "939-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Grande",
                            "config": "3 BHK Luxury",
                            "carpetArea": "984 - 1,028",
                            "superArea": "1,330 - 1,390",
                            "balconyArea": "80",
                            "facing": "North-East Facing",
                            "price": "₹1.05 Cr - 1.15 Cr",
                            "priceLabel": "Starting from",
                            "description": "Spacious 3 BHK residence with 984 - 1,028 sq.ft. carpet area and private sit-out deck.",
                            "rooms": [
                                    {
                                            "name": "Grand Living",
                                            "size": "19'0\" × 12'6\""
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
                            "tag": "3 BHK Grande"
                    }
            ]
    },
    {
            "id": 940,
            "slug": "belmont-skydale-dhanori",
            "title": "Belmont SkyDale",
            "name": "Belmont SkyDale",
            "projectName": "Belmont SkyDale",
            "developer": "Belmont Properties",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 3,
            "bedrooms": 3,
            "bathrooms": 3,
            "configuration": "3 BHK",
            "area": "1,012 - 1,084",
            "areaUnit": "sq.ft.",
            "price": 9500000,
            "numericPrice": 9500000,
            "priceLabel": "₹95 Lac - 1.05 Cr",
            "pricePerSqFt": 9537,
            "possession": "Dec 2028",
            "possessionDate": "Dec 2028",
            "status": "Under Construction",
            "furnishing": "Unfurnished",
            "featured": false,
            "isFeatured": false,
            "verified": true,
            "badge": "Boutique Living",
            "totalLand": "1 Acre",
            "landArea": "1 Acre",
            "floors": "7 Floors",
            "floorsCount": "7 Floors",
            "towers": "1 Tower",
            "towersCount": "1 Tower",
            "buildingCount": 1,
            "image": "",
            "images": [],
            "videoUrl": "",
            "amenities": [
                    "Rooftop Sitout",
                    "Gym",
                    "Landscaped Garden",
                    "Kids Play Area",
                    "24/7 Security",
                    "Power Backup"
            ],
            "description": "Belmont SkyDale in Dhanori offers boutique 3 BHK residences (1,012 - 1,084 sq.ft.) on a 1-acre development with a low-density 7-storey building.",
            "floorPlans": [
                    {
                            "id": "940-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Boutique",
                            "config": "3 BHK Boutique Residence",
                            "carpetArea": "1,012 - 1,084",
                            "superArea": "1,365 - 1,460",
                            "balconyArea": "80",
                            "facing": "East Facing",
                            "price": "₹95 Lac - 1.05 Cr",
                            "priceLabel": "Starting from",
                            "description": "Low-density 3 BHK with 1,012 - 1,084 sq.ft. carpet area, 3 airy bedrooms, and private balcony.",
                            "rooms": [
                                    {
                                            "name": "Living & Dining",
                                            "size": "18'6\" × 12'0\""
                                    },
                                    {
                                            "name": "Master Suite",
                                            "size": "14'0\" × 11'6\""
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
                            "tag": "3 BHK Boutique"
                    }
            ]
    },
    {
            "id": 941,
            "slug": "aaiji-crystal-dhanori",
            "title": "Aaiji Crystal",
            "name": "Aaiji Crystal",
            "projectName": "Aaiji Crystal",
            "developer": "Aaiji Group",
            "location": "Dhanori, Pune",
            "locality": "Dhanori",
            "city": "Pune",
            "propertyCategory": "residential",
            "propertyType": "Apartment",
            "purpose": "Buy",
            "bhk": 2,
            "bedrooms": 2,
            "bathrooms": 2,
            "configuration": "2, 3 BHK",
            "area": "879 - 1,261",
            "areaUnit": "sq.ft.",
            "price": 11500000,
            "numericPrice": 11500000,
            "priceLabel": "₹1.15 Cr - 1.80 Cr",
            "pricePerSqFt": 13083,
            "possession": "Ready to Move",
            "possessionDate": "Ready to Move",
            "status": "Ready to Move",
            "furnishing": "Unfurnished",
            "featured": true,
            "isFeatured": true,
            "verified": true,
            "badge": "Ready Possession",
            "totalLand": "4 Acres",
            "landArea": "4 Acres",
            "floors": "9 Floors",
            "floorsCount": "9 Floors",
            "towers": "3 Towers",
            "towersCount": "3 Towers",
            "buildingCount": 3,
            "image": "",
            "images": [],
            "videoUrl": "",
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
            "description": "Aaiji Crystal in Dhanori is a premium ready-possession development spread over 4 acres across 3 towers of 9 floors offering 2 BHK (879-883 sq.ft.) and 3 BHK (1,226-1,261 sq.ft.) homes with OC received.",
            "floorPlans": [
                    {
                            "id": "941-2bhk",
                            "bhk": "2 BHK",
                            "bhkCategory": "2 BHK",
                            "name": "2 BHK Crystal",
                            "config": "2 BHK Luxury Suite",
                            "carpetArea": "879 - 883",
                            "superArea": "1,180 - 1,190",
                            "balconyArea": "65",
                            "facing": "East Facing",
                            "price": "₹1.15 Cr",
                            "priceLabel": "Starting from",
                            "description": "Ready-to-move 2 BHK luxury residence with immediate possession, OC, and 879 - 883 sq.ft. carpet area.",
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
                            "id": "941-3bhk",
                            "bhk": "3 BHK",
                            "bhkCategory": "3 BHK",
                            "name": "3 BHK Crystal Grande",
                            "config": "3 BHK Grand Home",
                            "carpetArea": "1,226 - 1,261",
                            "superArea": "1,655 - 1,700",
                            "balconyArea": "95",
                            "facing": "North-East Facing",
                            "price": "₹1.75 Cr - 1.80 Cr",
                            "priceLabel": "Starting from",
                            "description": "Lavish 3 BHK ready home with 1,226 - 1,261 sq.ft. carpet area and expansive open sit-outs.",
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
            ]
    }
];

export default propertyListingsData;
