import { query, isDBConnected } from "../config/db.js";

let memoryContent = {
    homepageDraft: {
        status: "Published",
        updatedAt: new Date().toISOString()
    },
    homepagePublished: {
        status: "Published",
        updatedAt: new Date().toISOString()
    },
    festivalPopup: {
        active: true,
        title: "Exclusive Launch Privileges",
        subtitle: "Special zero brokerage & developer pre-launch pricing on verified Pune properties.",
        tag: "Limited Period Opportunity",
        ctaText: "Claim Exclusive Offer",
        ctaLink: "/contact"
    },
    shorts: [
        { id: "1", title: "Luxury 3 BHK Penthouse Walkthrough in Kharadi", videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY", thumbnail: "/images/luxury-villa-bg.jpg", visible: true, order: 1 },
        { id: "2", title: "Top 5 Infrastructure Projects Shaping Pune Real Estate", videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY", thumbnail: "/images/hero.png", visible: true, order: 2 }
    ],
    testimonials: [
        { id: "1", name: "Rahul Deshmukh", role: "Homebuyer, Kharadi", comment: "The team at Pune Property Investors made our home buying experience completely hassle-free with zero brokerage and total transparency.", rating: 5, visible: true },
        { id: "2", name: "Priya & Amit Kulkarni", role: "Investors, Hinjewadi", comment: "Exceptional market analysis and verified title verification. Highly recommended for property investors looking for strong ROI.", rating: 5, visible: true }
    ],
    advertisements: [
        { id: "1", title: "New Launch: Godrej Rivergreens", bannerUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", link: "/buy", placement: "Sidebar Primary", visible: true }
    ]
};

export const ContentModel = {
    async getHomepage() {
        return {
            draft: memoryContent.homepageDraft,
            published: memoryContent.homepagePublished
        };
    },

    async saveHomepageDraft(draft) {
        memoryContent.homepageDraft = { ...draft, status: "Draft", updatedAt: new Date().toISOString() };
        return memoryContent.homepageDraft;
    },

    async publishHomepage(payload) {
        memoryContent.homepagePublished = {
            ...(payload || memoryContent.homepageDraft),
            status: "Published",
            publishedAt: new Date().toISOString()
        };
        memoryContent.homepageDraft = { ...memoryContent.homepagePublished };
        return memoryContent.homepagePublished;
    },

    async getFestivalPopup() {
        return memoryContent.festivalPopup;
    },

    async updateFestivalPopup(payload) {
        memoryContent.festivalPopup = { ...memoryContent.festivalPopup, ...payload };
        return memoryContent.festivalPopup;
    },

    async getShorts() {
        return memoryContent.shorts;
    },

    async updateShorts(payload) {
        if (Array.isArray(payload)) {
            memoryContent.shorts = payload;
        }
        return memoryContent.shorts;
    },

    async getTestimonials() {
        return memoryContent.testimonials;
    },

    async updateTestimonials(payload) {
        if (Array.isArray(payload)) {
            memoryContent.testimonials = payload;
        }
        return memoryContent.testimonials;
    },

    async getAdvertisements() {
        return memoryContent.advertisements;
    },

    async updateAdvertisements(payload) {
        if (Array.isArray(payload)) {
            memoryContent.advertisements = payload;
        }
        return memoryContent.advertisements;
    }
};
