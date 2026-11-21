/**
 * Property Model (Data Layer)
 * Manages storage and raw retrieval of property records.
 */

let properties = [
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
];

export const PropertyModel = {
    async findAll() {
        return [...properties];
    },

    async findBySlugOrId(identifier) {
        return properties.find(p => p.slug === identifier || p.id === identifier) || null;
    },

    async create(propertyData) {
        const newProperty = {
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
            ...propertyData
        };
        properties.push(newProperty);
        return newProperty;
    },

    async update(id, updateData) {
        const index = properties.findIndex(p => p.id === id);
        if (index === -1) return null;
        properties[index] = { ...properties[index], ...updateData, updatedAt: new Date().toISOString() };
        return properties[index];
    },

    async delete(id) {
        const index = properties.findIndex(p => p.id === id);
        if (index === -1) return false;
        properties.splice(index, 1);
        return true;
    }
};
