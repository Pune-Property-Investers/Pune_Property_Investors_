import propertyListingsData from "../data/propertyListingsData.js";
import trendingProjects from "../data/trendingProjectsData.js";

export interface PropertyItem {
    id: string | number;
    title?: string;
    name?: string;
    projectName?: string;
    developer?: string;
    location?: string;
    locality?: string;
    city?: string;
    propertyType?: string;
    purpose?: string;
    bhk?: number | string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number | string;
    areaUnit?: string;
    price?: number | string;
    priceLabel?: string;
    pricePerSqFt?: number | string;
    possession?: string;
    furnishing?: string;
    featured?: boolean;
    verified?: boolean;
    image?: string;
    images?: string[];
    imageAlt?: string;
    amenities?: string[];
    description?: string;
    badge?: string;
    slug?: string;
    [key: string]: any;
}

export function normalizeTrendingProject(item: any): PropertyItem {
    return {
        id: item.id,
        title: item.name,
        name: item.name,
        projectName: item.name,
        developer: item.developer,
        location: item.location,
        locality: item.location ? item.location.split(",")[0].trim() : "Pune",
        city: "Pune",
        propertyType: "Residential",
        configuration: item.configuration,
        price: item.price,
        priceLabel: item.price,
        image: item.image,
        images: [item.image],
        badge: item.status,
        featured: true,
        verified: true,
        possession: "Under Construction",
        amenities: [
            "Clubhouse",
            "Gymnasium",
            "Swimming Pool",
            "Landscaped Gardens",
            "Children Play Area",
            "24/7 Security",
            "Power Backup",
            "Car Parking",
        ],
        description: `${item.name} is a premier residential development by ${item.developer} in ${item.location}. Offering luxurious ${item.configuration} with state-of-the-art amenities and prime connectivity across Pune.`,
    };
}

export function findProperty(identifier: string | number | undefined | null): PropertyItem | null {
    if (!identifier) return null;
    const rawId = String(identifier).trim();
    const cleanId = rawId.toLowerCase();
    const decodedId = decodeURIComponent(cleanId).trim().toLowerCase();

    // 1. Direct match on propertyListingsData id, slug, title slug, or project slug
    const fromListings = (propertyListingsData as any[]).find(
        (item: any) =>
            String(item.id) === cleanId ||
            String(item.id) === decodedId ||
            (item.slug && (item.slug.toLowerCase() === cleanId || item.slug.toLowerCase() === decodedId)) ||
            (item.title && (
                item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanId ||
                item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decodedId ||
                item.title.toLowerCase() === cleanId ||
                item.title.toLowerCase() === decodedId
            )) ||
            (item.projectName && (
                item.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanId ||
                item.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decodedId
            ))
    );
    if (fromListings) return fromListings as PropertyItem;

    // 2. Direct match on trendingProjects id or slug
    const fromTrending = (trendingProjects as any[]).find(
        (item: any) =>
            String(item.id) === cleanId ||
            (item.slug && item.slug.toLowerCase() === cleanId) ||
            item.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanId
    );
    if (fromTrending) return normalizeTrendingProject(fromTrending);

    return null;
}

export type PropertyCategory = "commercial" | "plot" | "villa" | "residential";

export function getPropertyCategory(property: any): PropertyCategory {
    if (!property) return "residential";
    const type = String(property.propertyType || property.type || property.category || "").toLowerCase();
    const title = String(property.title || property.name || property.projectName || "").toLowerCase();
    const config = String(property.configuration || property.subtitle || "").toLowerCase();
    const purpose = String(property.purpose || "").toLowerCase();
    const combined = `${type} ${title} ${config} ${purpose}`;

    // 1. Plot / Land check
    if (/\b(plot|plots|land|layout|na plot|demarcated)\b/i.test(combined)) {
        return "plot";
    }
    // 2. Commercial check
    if (/\b(commercial|office|offices|shop|shops|retail|showroom|business park|it park|tech park|workspace|bare shell|warm shell)\b/i.test(combined)) {
        return "commercial";
    }
    // 3. Villa check (and not plot)
    if (/\b(villa|villas|sky villa|row house|bungalow|duplex|mansion|mansions)\b/i.test(combined)) {
        return "villa";
    }
    // 4. Default: Residential
    return "residential";
}
