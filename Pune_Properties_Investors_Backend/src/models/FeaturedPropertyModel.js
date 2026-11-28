import { query, isDBConnected } from "../config/db.js";

const fallbackFeaturedProperties = [
    {
        id: 1,
        name: "Mantra Magnus",
        brandName: "MANTRA",
        location: "Mundhwa, Pune",
        localityName: "Mundhwa",
        youtubeId: "v1KcS0G22EQ",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=v1KcS0G22EQ",
        title: "Mantra Magnus Mundhwa Project Details | 2, 2.5, 3.5 BHK | Vridhi Bhava Concept",
        tagline: "Iconic Vridhi Bhava architectural design concept delivering optimal privacy, 360-degree cross ventilation, and scenic views.",
        completion: "Under Construction",
        completionSub: "MahaRERA",
        configurations: "2, 2.5 & 3.5 BHK",
        configSub: "5 Towers // 22 Storeys",
        carpet: "420 M²",
        carpetSub: "1,420 - 2,150 SQ.FT",
        price: "₹ 1.55 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "mantra-magnus",
        thumbnail: "/images/mantra-magnus-shorts-thumb.jpg",
        siteImages: [
            { url: "/images/mantra-magnus-site-elevation.jpg", label: "Site Elevation & Towers" },
            { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", label: "Sample Flat Living Room" },
            { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", label: "Grand Entrance & Reflecting Pool" },
            { url: "https://images.unsplash.com/photo-160056675376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80", label: "Landscaped Courtyards" },
            { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", label: "Master Suite & Private Deck" }
        ],
        displayOrder: 1,
        isActive: true
    },
    {
        id: 2,
        name: "Godrej Elements",
        brandName: "GODREJ",
        location: "Hinjewadi, Pune",
        localityName: "Hinjewadi",
        youtubeId: "M1sDYNUJQrY",
        startSeconds: 203,
        youtubeUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s",
        title: "Godrej Elements Hinjewadi Project Details | 2 & 3 BHK Eco-Luxury Residences",
        tagline: "Eco-architectural high-rises centered on active wellness, smart automation, and panoramic Hinjewadi skyline views.",
        completion: "Under Construction",
        completionSub: "MahaRERA",
        configurations: "2 & 3 BHK",
        configSub: "6 Towers // 28 Storeys",
        carpet: "380 M²",
        carpetSub: "980 - 1,420 SQ.FT",
        price: "₹ 1.30 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "godrej-elements",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", label: "Tower Elevation & Skyline" },
            { url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80", label: "Living & Dining Room" },
            { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", label: "Rooftop Infinity Pool" },
            { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", label: "Wellness Club & Gym" }
        ],
        displayOrder: 2,
        isActive: true
    },
    {
        id: 3,
        name: "VTP HiLife",
        brandName: "VTP REALTY",
        location: "Kharadi, Pune",
        localityName: "Kharadi",
        youtubeId: "FbWb8gl35BE",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=FbWb8gl35BE",
        title: "VTP HiLife Kharadi Project Details | 2 & 3 BHK Riverfront Luxury",
        tagline: "Riverfront promenade lifestyle with Maximum Livable Area (MLA) architectural design in prime New Kharadi.",
        completion: "Under Construction",
        completionSub: "MahaRERA",
        configurations: "2 & 3 BHK",
        configSub: "8 Towers // 24 Storeys",
        carpet: "360 M²",
        carpetSub: "890 - 1,320 SQ.FT",
        price: "₹ 1.05 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "vtp-hilife",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", label: "Riverfront Facade" },
            { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", label: "Designer Show Flat" },
            { url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80", label: "Olympic-Length Pool" },
            { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80", label: "Sky Deck Lounge" }
        ],
        displayOrder: 3,
        isActive: true
    },
    {
        id: 4,
        name: "Kumar Primus",
        brandName: "KUMAR",
        location: "Kalyani Nagar, Pune",
        localityName: "Kalyani Nagar",
        youtubeId: "v1KcS0G22EQ",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=v1KcS0G22EQ",
        title: "Kumar Primus Kalyani Nagar | 3 & 4 BHK Bespoke High-Rise Residences",
        tagline: "Bespoke high-rises commanding sweeping views of Koregaon Park skyline with private sundecks and plunge pools.",
        completion: "Ready to Move",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "3 Towers // 26 Storeys",
        carpet: "540 M²",
        carpetSub: "1,750 - 2,450 SQ.FT",
        price: "₹ 1.85 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "kumar-primus",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", label: "Grand Tower Elevation" },
            { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80", label: "Ultra Luxury Suite" },
            { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", label: "Private Sundeck" }
        ],
        displayOrder: 4,
        isActive: true
    },
    {
        id: 5,
        name: "The Ark Voyage",
        brandName: "TRIBECA",
        location: "Wakad, Pune",
        localityName: "Wakad",
        youtubeId: "M1sDYNUJQrY",
        startSeconds: 203,
        youtubeUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s",
        title: "The Ark Voyage Wakad | 3 & 4 BHK Cruise-Inspired Architecture",
        tagline: "Cruise-inspired towers surrounded by protected green reserves, rooftop sky-bridge, and Trump Tower design pedigree.",
        completion: "Under Construction",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "4 Towers // 30 Storeys",
        carpet: "610 M²",
        carpetSub: "1,920 - 2,680 SQ.FT",
        price: "₹ 2.10 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "the-ark-voyage",
        thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", label: "The Ark Facade" },
            { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", label: "Duplex Penthouse" },
            { url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80", label: "Sky Promenade" }
        ],
        displayOrder: 5,
        isActive: true
    },
    {
        id: 6,
        name: "Kohinoor Kaleido",
        brandName: "KOHINOOR",
        location: "Wagholi, Pune",
        localityName: "Wagholi",
        youtubeId: "FbWb8gl35BE",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=FbWb8gl35BE",
        title: "Kohinoor Kaleido Wagholi | 3 & 4 BHK Urban Forest Residences",
        tagline: "An urban masterpiece celebrating natural sunlight, forested landscape, and innovative residential design in East Pune.",
        completion: "Under Construction",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "5 Towers // 22 Storeys",
        carpet: "480 M²",
        carpetSub: "1,450 - 2,200 SQ.FT",
        price: "₹ 1.45 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "kohinoor-kaleido",
        thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80", label: "Urban Forest Facade" },
            { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", label: "Bespoke Salon" },
            { url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80", label: "Panoramic Deck" }
        ],
        displayOrder: 6,
        isActive: true
    }
];

let memoryFeaturedProperties = [...fallbackFeaturedProperties];

function mapRowToFeaturedProperty(row) {
    if (!row) return null;

    let parsedSiteImages = [];
    if (typeof row.site_images === "string") {
        try {
            parsedSiteImages = JSON.parse(row.site_images);
        } catch (_) {
            parsedSiteImages = [];
        }
    } else if (Array.isArray(row.site_images)) {
        parsedSiteImages = row.site_images;
    }

    return {
        id: row.id,
        name: row.name,
        brandName: row.brand_name || row.brandName || "",
        location: row.location || "",
        localityName: row.locality_name || row.localityName || "",
        youtubeId: row.youtube_id || row.youtubeId || "",
        startSeconds: row.start_seconds ?? (row.startSeconds ?? 0),
        youtubeUrl: row.youtube_url || row.youtubeUrl || "",
        title: row.title || "",
        tagline: row.tagline || "",
        completion: row.completion || "Under Construction",
        completionSub: row.completion_sub || row.completionSub || "MahaRERA",
        configurations: row.configurations || "",
        configSub: row.config_sub || row.configSub || "",
        carpet: row.carpet || "",
        carpetSub: row.carpet_sub || row.carpetSub || "",
        price: row.price || "",
        priceSub: row.price_sub || row.priceSub || "Direct Price",
        badge: row.badge || "SAMPLE FLAT TOUR",
        slug: row.slug || row.property_slug || row.propertySlug || String(row.id),
        propertySlug: row.slug || row.property_slug || row.propertySlug || String(row.id),
        thumbnail: row.thumbnail_url || row.thumbnail || "",
        thumbnailUrl: row.thumbnail_url || row.thumbnail || "",
        siteImages: parsedSiteImages,
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const FeaturedPropertyModel = {
    /**
     * Fetch list of all featured properties
     */
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM featured_properties WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else {
                    sql += " AND is_active = 1";
                }

                if (filters.locality) {
                    sql += " AND (locality_name = ? OR location LIKE ?)";
                    params.push(filters.locality, `%${filters.locality}%`);
                }
                if (filters.brand) {
                    sql += " AND brand_name = ?";
                    params.push(filters.brand);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                if (rows && rows.length > 0) {
                    return rows.map(mapRowToFeaturedProperty);
                }
            } catch (err) {
                console.error("FeaturedPropertyModel.list DB error:", err.message);
            }
        }
        return [...memoryFeaturedProperties];
    },

    /**
     * Fetch single featured property by ID or slug
     */
    async getById(idOrSlug) {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM featured_properties WHERE id = ? OR slug = ? LIMIT 1",
                    [idOrSlug, idOrSlug]
                );
                if (rows && rows.length > 0) {
                    return mapRowToFeaturedProperty(rows[0]);
                }
            } catch (err) {
                console.error("FeaturedPropertyModel.getById DB error:", err.message);
            }
        }
        return (
            memoryFeaturedProperties.find(
                (p) => String(p.id) === String(idOrSlug) || p.propertySlug === idOrSlug || p.slug === idOrSlug
            ) || null
        );
    },

    /**
     * Create new featured property
     */
    async create(data) {
        const siteImagesJson = JSON.stringify(data.siteImages || []);
        const slug = data.slug || data.propertySlug || (data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `fp-${Date.now()}`);
        const thumbnail = data.thumbnailUrl || data.thumbnail || "";

        if (isDBConnected()) {
            try {
                const result = await query(
                    `INSERT INTO featured_properties (
                        slug, name, brand_name, location, locality_name,
                        youtube_id, start_seconds, youtube_url, title, tagline,
                        completion, completion_sub, configurations, config_sub,
                        carpet, carpet_sub, price, price_sub, badge,
                        thumbnail_url, site_images, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        slug,
                        data.name,
                        data.brandName || "",
                        data.location || "",
                        data.localityName || "",
                        data.youtubeId || "",
                        data.startSeconds || 0,
                        data.youtubeUrl || "",
                        data.title || "",
                        data.tagline || "",
                        data.completion || "Under Construction",
                        data.completionSub || "MahaRERA",
                        data.configurations || "",
                        data.configSub || "",
                        data.carpet || "",
                        data.carpetSub || "",
                        data.price || "",
                        data.priceSub || "Direct Price",
                        data.badge || "SAMPLE FLAT TOUR",
                        thumbnail,
                        siteImagesJson,
                        data.displayOrder || 0,
                        data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1
                    ]
                );
                return this.getById(result.insertId);
            } catch (err) {
                console.error("FeaturedPropertyModel.create DB error:", err.message);
                throw err;
            }
        }

        const newId = memoryFeaturedProperties.length > 0
            ? Math.max(...memoryFeaturedProperties.map(p => p.id)) + 1
            : 1;
        const newProperty = {
            id: newId,
            ...data,
            slug,
            propertySlug: slug,
            thumbnail,
            thumbnailUrl: thumbnail,
            siteImages: data.siteImages || [],
            displayOrder: data.displayOrder || newId,
            isActive: data.isActive !== undefined ? data.isActive : true
        };
        memoryFeaturedProperties.push(newProperty);
        return newProperty;
    },

    /**
     * Update existing featured property
     */
    async update(id, data) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (data.name !== undefined) { fields.push("name = ?"); params.push(data.name); }
                if (data.brandName !== undefined) { fields.push("brand_name = ?"); params.push(data.brandName); }
                if (data.location !== undefined) { fields.push("location = ?"); params.push(data.location); }
                if (data.localityName !== undefined) { fields.push("locality_name = ?"); params.push(data.localityName); }
                if (data.youtubeId !== undefined) { fields.push("youtube_id = ?"); params.push(data.youtubeId); }
                if (data.startSeconds !== undefined) { fields.push("start_seconds = ?"); params.push(data.startSeconds); }
                if (data.youtubeUrl !== undefined) { fields.push("youtube_url = ?"); params.push(data.youtubeUrl); }
                if (data.title !== undefined) { fields.push("title = ?"); params.push(data.title); }
                if (data.tagline !== undefined) { fields.push("tagline = ?"); params.push(data.tagline); }
                if (data.completion !== undefined) { fields.push("completion = ?"); params.push(data.completion); }
                if (data.completionSub !== undefined) { fields.push("completion_sub = ?"); params.push(data.completionSub); }
                if (data.configurations !== undefined) { fields.push("configurations = ?"); params.push(data.configurations); }
                if (data.configSub !== undefined) { fields.push("config_sub = ?"); params.push(data.configSub); }
                if (data.carpet !== undefined) { fields.push("carpet = ?"); params.push(data.carpet); }
                if (data.carpetSub !== undefined) { fields.push("carpet_sub = ?"); params.push(data.carpetSub); }
                if (data.price !== undefined) { fields.push("price = ?"); params.push(data.price); }
                if (data.priceSub !== undefined) { fields.push("price_sub = ?"); params.push(data.priceSub); }
                if (data.badge !== undefined) { fields.push("badge = ?"); params.push(data.badge); }
                if (data.slug !== undefined || data.propertySlug !== undefined) {
                    fields.push("slug = ?");
                    params.push(data.slug || data.propertySlug);
                }
                if (data.thumbnail !== undefined || data.thumbnailUrl !== undefined) {
                    fields.push("thumbnail_url = ?");
                    params.push(data.thumbnailUrl || data.thumbnail);
                }
                if (data.siteImages !== undefined) {
                    fields.push("site_images = ?");
                    params.push(JSON.stringify(data.siteImages));
                }
                if (data.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(data.displayOrder); }
                if (data.isActive !== undefined) { fields.push("is_active = ?"); params.push(data.isActive ? 1 : 0); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(
                        `UPDATE featured_properties SET ${fields.join(", ")} WHERE id = ?`,
                        params
                    );
                }
                return this.getById(id);
            } catch (err) {
                console.error("FeaturedPropertyModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryFeaturedProperties.findIndex(p => String(p.id) === String(id));
        if (idx !== -1) {
            memoryFeaturedProperties[idx] = {
                ...memoryFeaturedProperties[idx],
                ...data
            };
            return memoryFeaturedProperties[idx];
        }
        return null;
    },

    /**
     * Delete featured property
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM featured_properties WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("FeaturedPropertyModel.delete DB error:", err.message);
                throw err;
            }
        }
        const initialLength = memoryFeaturedProperties.length;
        memoryFeaturedProperties = memoryFeaturedProperties.filter(p => String(p.id) !== String(id));
        return memoryFeaturedProperties.length < initialLength;
    }
};
