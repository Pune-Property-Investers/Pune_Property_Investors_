"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    ArrowRight,
    BookOpen,
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import "./Blog.css";

const blogPosts = [
    {
        id: 1,
        title: "Top 7 High-Growth Localities to Buy Property in Pune (2026 Edition)",
        slug: "top-high-growth-localities-pune",
        category: "Locality Guide",
        date: "October 24, 2026",
        readTime: "6 min read",
        author: "Pune Property Research Team",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "From Kharadi's IT corridor expansion to Baner and Wakad's connectivity surge, discover where smart homebuyers and NRI investors are securing highest rental yields.",
        featured: true,
    },
    {
        id: 2,
        title: "First-Time Homebuyer's Checklist: Documents, RERA, and Stamp Duty in Maharashtra",
        slug: "first-time-homebuyer-checklist-maharashtra",
        category: "Buying Guide",
        date: "October 18, 2026",
        readTime: "8 min read",
        author: "Legal Advisory Desk",
        image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "A step-by-step roadmap to navigating MahaRERA registration, title clearance verification, home loan eligibility, and government registration fees in Pune.",
        featured: false,
    },
    {
        id: 3,
        title: "Why Kharadi and EON Free Zone Corridor Remain Pune's #1 Real Estate Hotspot",
        slug: "why-kharadi-eon-free-zone-real-estate-hotspot",
        category: "Investment",
        date: "October 12, 2026",
        readTime: "5 min read",
        author: "Investment Advisory Team",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "With multi-national tech hubs, World Trade Center Tower 4, and direct riverfront township developments, Kharadi continues to deliver consistent double-digit appreciation.",
        featured: false,
    },
    {
        id: 4,
        title: "Under-Construction vs. Ready-to-Move Flats: Which Offers Better ROI in Pune?",
        slug: "under-construction-vs-ready-to-move-flats-pune",
        category: "Investment",
        date: "October 05, 2026",
        readTime: "7 min read",
        author: "Property Advisory Desk",
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "A clear financial comparison of price appreciation, construction milestones, GST implications, and possession guarantees under RERA guidelines.",
        featured: false,
    },
    {
        id: 5,
        title: "Pune Metro Line 3 Route Map & Property Value Impact on Hinjewadi, Wakad & Baner",
        slug: "pune-metro-line-3-property-value-impact",
        category: "Infrastructure",
        date: "September 28, 2026",
        readTime: "6 min read",
        author: "Urban Infrastructure Desk",
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "How the 23-station elevated Metro line between Hinjewadi IT Park and Civil Court is altering rental demand and capital appreciation along the western expressway.",
        featured: false,
    },
    {
        id: 6,
        title: "A Complete Guide to Buying Plots & NA Farmhouses Around Pune Suburbs",
        slug: "complete-guide-buying-plots-pune-suburbs",
        category: "Locality Guide",
        date: "September 20, 2026",
        readTime: "9 min read",
        author: "Land Advisory Division",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "Understand Collector NA sanctions, 7/12 extract verification, demarcation fencing, and internal road infrastructure in Wagholi, Pirangut, and Shirwal layouts.",
        featured: false,
    },
];

const categories = [
    "All",
    "Buying Guide",
    "Investment",
    "Locality Guide",
    "Infrastructure",
];

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = blogPosts.filter((post) => {
        if (selectedCategory === "All") return true;
        return post.category === selectedCategory;
    });

    const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

    return (
        <div className="blog-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title="Real Estate Insights"
                    titleAccent="& Market Trends."
                    eyebrow="PUNE PROPERTY INVESTOR BLOG"
                    description="Expert guidance, neighborhood deep-dives, home buying checklists, and verified market trends from seasoned Pune real estate specialists."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Blog" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85"
                    icon={BookOpen}
                />

                <div className="container blog-page__content">
                    {/* Featured Article Spotlight */}
                    {selectedCategory === "All" && (
                        <div className="blog-featured-card">
                            <div className="blog-featured-image-wrap">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="blog-featured-image"
                                />
                            </div>

                            <div className="blog-featured-body">
                                <span className="blog-featured-tag">
                                    FEATURED STORY • {featuredPost.category}
                                </span>

                                <h2 className="blog-featured-title">
                                    {featuredPost.title}
                                </h2>

                                <p className="blog-featured-excerpt">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="blog-meta-row">
                                    <span className="blog-meta-item">
                                        <Calendar size={15} />
                                        {featuredPost.date}
                                    </span>
                                    <span className="blog-meta-item">
                                        <Clock size={15} />
                                        {featuredPost.readTime}
                                    </span>
                                </div>

                                <Link
                                    href={`/buy?projectType=projects`}
                                    className="primary-button blog-featured-cta"
                                >
                                    Explore Top Localities
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Category Filter Pills */}
                    <div className="blog-categories-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`blog-category-btn ${
                                    selectedCategory === cat
                                        ? "blog-category-btn--active"
                                        : ""
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="blog-posts-grid">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="blog-post-card"
                            >
                                <div className="blog-post-image-wrap">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="blog-post-image"
                                    />
                                    <span className="blog-post-badge">
                                        {post.category}
                                    </span>
                                </div>

                                <div className="blog-post-body">
                                    <div className="blog-post-meta">
                                        <span className="blog-meta-item">
                                            <Calendar size={14} />
                                            {post.date}
                                        </span>
                                        <span className="blog-meta-item">
                                            <Clock size={14} />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="blog-post-title">
                                        {post.title}
                                    </h3>

                                    <p className="blog-post-excerpt">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="blog-post-link"
                                    >
                                        Speak with an Advisor
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
