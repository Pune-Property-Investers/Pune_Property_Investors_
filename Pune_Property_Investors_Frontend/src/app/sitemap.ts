import { MetadataRoute } from "next";
import propertyListingsData from "../data/propertyListingsData.js";
import trendingProjects from "../data/trendingProjectsData.js";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://punepropertyinvestor.com";

    const staticRoutes = [
        "",
        "/buy",
        "/properties",
        "/projects",
        "/commercial",
        "/plots",
        "/about",
        "/investment",
        "/blog",
        "/career",
        "/privacy-policy",
        "/terms-and-conditions",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === "" || route === "/buy" ? "daily" : "weekly") as
            | "daily"
            | "weekly",
        priority: route === "" ? 1.0 : route === "/buy" ? 0.9 : 0.7,
    }));

    const propertyRoutes = propertyListingsData.map((item) => ({
        url: `${baseUrl}/property/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const projectRoutes = trendingProjects.map((item) => ({
        url: `${baseUrl}/properties/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...propertyRoutes, ...projectRoutes];
}

