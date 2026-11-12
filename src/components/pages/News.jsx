"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Newspaper,
    ArrowRight,
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import { usePublishedCms } from "../../services/liveContent";
import "./News.css";

const newsArticles = [
    {
        id: 1,
        title: "Pune Metro Line 3 Trials Commence: 23 Stations Connecting Hinjewadi to Civil Court",
        category: "Metro & Transit",
        date: "October 27, 2026",
        source: "Pune Urban Infrastructure Bureau",
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        summary:
            "The 23.3 km elevated corridor enters final trial runs. Major residential localities like Wakad, Baner, Balewadi, and Aundh report rising housing inquiries ahead of full public operations.",
        impact: "Expected 20-30 min commute time reduction between West Pune IT hubs and downtown.",
    },
    {
        id: 2,
        title: "PMC Approves New 36-Meter DP Road Links Connecting Upper Kharadi Directly to Wagholi",
        category: "Infrastructure",
        date: "October 22, 2026",
        source: "Civic Development Authority",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        summary:
            "New arterial connecting corridors cleared to decongest Nagar Road and facilitate direct connectivity between EON IT Park, WTC Tower 4, and eastern residential developments.",
        impact: "Eases heavy freight and daily IT commuter traffic through eastern suburbs.",
    },
    {
        id: 3,
        title: "Pune Real Estate Registers 18% Annual Appreciation in Premium Residential Townships",
        category: "Market Reports",
        date: "October 15, 2026",
        source: "Maharashtra Property Index",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        summary:
            "Third-quarter data reveals robust demand for 2 and 3 BHK gated communities, with NRI buyers driving significant capital into integrated riverfront and lifestyle township projects.",
        impact: "Rental yields across Kharadi, Hinjewadi, and Baner remain healthy at 3.8% to 4.5%.",
    },
    {
        id: 4,
        title: "MahaRERA Enforces Stringent Quality Audits & Escrow Verification for Mega Projects",
        category: "Policy & RERA",
        date: "October 08, 2026",
        source: "RERA Maharashtra Press Release",
        image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
        summary:
            "New regulatory mandate requires independent structural audits and quarterly geo-tagged photographic updates for all housing projects exceeding 50,000 sq. meters.",
        impact: "Significantly enhances buyer security and ensures timely possession handover.",
    },
    {
        id: 5,
        title: "Ring Road Package 2 Land Acquisition Completed: Bidding Initiated for Phase 1",
        category: "Infrastructure",
        date: "September 30, 2026",
        source: "State Highway Authority",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        summary:
            "The 128 km Pune Ring Road achieves 94% land acquisition milestone. Peripheral growth pockets like Wagholi, Charholi, and Shirwal prepare for accelerated residential zoning.",
        impact: "Boosts long-term capital appreciation for NA plotted layouts and township developments.",
    },
    {
        id: 6,
        title: "Commercial Grade-A Office Absorption Hits Record 7.2 Million Sq.Ft. in Pune",
        category: "Market Reports",
        date: "September 19, 2026",
        source: "Commercial Real Estate Pulse",
        image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
        summary:
            "Global capability centers (GCCs), semiconductor research offices, and fintech firms drive historic space absorption in Kharadi and Baner business hubs.",
        impact: "Spurs sustained housing rental demand from top corporate professionals.",
    },
];

const categories = [
    "All",
    "Metro & Transit",
    "Infrastructure",
    "Market Reports",
    "Policy & RERA",
];

export default function News() {
    const published = usePublishedCms();
    const publishedNews = Array.isArray(published?.news)
        ? published.news.filter((n) => n.status !== "Draft")
        : [];
    const activeNews = publishedNews.length > 0 ? publishedNews : newsArticles;

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = activeNews.filter((article) => {
        if (selectedCategory === "All") return true;
        return article.category === selectedCategory;
    });

    return (
        <div className="news-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title="Pune Property News"
                    titleAccent="& Market Updates."
                    eyebrow="PUNE PROPERTY INVESTOR NEWSROOM"
                    description="Stay informed with real-time news on Metro expansions, civic master plans, Ring Road progress, and MahaRERA real estate policy updates."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "News" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
                    icon={Newspaper}
                />

                <div className="container news-page__content">
                    {/* Category Filter Pills */}
                    <div className="news-categories-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`news-category-btn ${
                                    selectedCategory === cat
                                        ? "news-category-btn--active"
                                        : ""
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* News Grid */}
                    <div className="news-articles-grid">
                        {filteredArticles.map((article) => (
                            <article
                                key={article.id}
                                className="news-article-card"
                            >
                                <div className="news-article-image-wrap">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="news-article-image"
                                    />
                                    <span className="news-article-badge">
                                        {article.category}
                                    </span>
                                </div>

                                <div className="news-article-body">
                                    <div className="news-article-meta">
                                        <span className="news-article-date">
                                            <Calendar size={14} />
                                            {article.date}
                                        </span>
                                        <span>{article.source}</span>
                                    </div>

                                    <h3 className="news-article-title">
                                        {article.title}
                                    </h3>

                                    <p className="news-article-summary">
                                        {article.summary}
                                    </p>

                                    {article.impact && (
                                        <div className="news-article-takeaway">
                                            Key Takeaway: {article.impact}
                                        </div>
                                    )}

                                    <Link
                                        href="/contact"
                                        className="news-article-link"
                                    >
                                        Consult Our Advisors
                                        <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
