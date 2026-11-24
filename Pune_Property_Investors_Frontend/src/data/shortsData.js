/**
 * Pune Property Investors - YouTube Shorts & Video Reels Data
 */

export function extractYouTubeId(urlOrId) {
    if (!urlOrId) return "";
    const cleaned = String(urlOrId).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleaned)) {
        return cleaned;
    }
    const shortsMatch = cleaned.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];
    const watchMatch = cleaned.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];
    const beMatch = cleaned.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (beMatch) return beMatch[1];
    const embedMatch = cleaned.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    return "";
}

export const propertyShorts = [
    {
        id: "short-ganga-avanta",
        title: "Ganga Avanta",
        configurations: "3 & 4 BHK",
        developer: "Goel Ganga Developments",
        location: "Mundhwa, Pune",
        price: "₹ 2.02 Cr*",
        likes: "3.1K",
        views: "54K",
        shares: "640",
        youtubeUrl: "https://www.youtube.com/shorts/GbNlxWtdOvA",
        description: "Ultra-spacious simplex and duplex riverfront sky suites with triple-height entrance lobbies and 30+ international standard lifestyle amenities.",
        audioTitle: "Pune Property Investors • Ganga Avanta Sample Flat Walkthrough",
    },
    {
        id: "short-empyrean-leela",
        title: "Empyrean Leela",
        configurations: "2 & 3 BHK",
        developer: "Empyrean Realty",
        location: "Kharadi, Pune",
        price: "₹ 1.25 Cr*",
        likes: "4.8K",
        views: "62K",
        shares: "730",
        youtubeUrl: "https://www.youtube.com/shorts/M1sDYNUJQrY",
        description: "Signature architectural luxury in Kharadi featuring Italian marble, deck balconies, landscaped courtyards & 40+ lifestyle amenities.",
        audioTitle: "Pune Property Investors • Empyrean Leela Luxury Tour",
    },
    {
        id: "short-amara-keshav",
        title: "Amara Riverside",
        configurations: "2 & 3 BHK",
        developer: "Amara Living",
        location: "Keshav Nagar, Pune",
        price: "₹ 85 Lacs*",
        likes: "3.9K",
        views: "45K",
        shares: "512",
        youtubeUrl: "https://www.youtube.com/shorts/v1KcS0G22EQ",
        description: "Riverside living nestled in Keshav Nagar offering rooftop infinity pool, yoga decks, and 5 mins connectivity to Koregaon Park.",
        audioTitle: "Pune Property Investors • Amara Riverside Walkthrough",
    },
    {
        id: "short-adani-atelier",
        title: "Adani Atelier Greens",
        configurations: "2.5 & 3 BHK",
        developer: "Adani Realty",
        location: "Koregaon Park Annex, Pune",
        price: "₹ 1.80 Cr*",
        likes: "5.2K",
        views: "71K",
        shares: "890",
        youtubeUrl: "https://www.youtube.com/shorts/FbWb8gl35BE",
        description: "Vertical garden facade, oxygen-enhancing biophilic architecture, and ultra-spacious suites in prime Pune location.",
        audioTitle: "Pune Property Investors • Adani Atelier Greens Showcase",
    },
    {
        id: "short-vtp-aurelia",
        title: "VTP Aurelia",
        configurations: "2 & 3 BHK",
        developer: "VTP Realty",
        location: "New Kharadi, Pune",
        price: "₹ 85 Lacs*",
        likes: "4.2K",
        views: "49K",
        shares: "610",
        youtubeUrl: "https://www.youtube.com/shorts/6lWl3IxSDT0",
        description: "Township Codename Pegasus premiere featuring riverside promenade, smart biometric locks, and grand clubhouse avenues.",
        audioTitle: "Pune Property Investors • VTP Aurelia Launch Tour",
    },
];

export default propertyShorts;
