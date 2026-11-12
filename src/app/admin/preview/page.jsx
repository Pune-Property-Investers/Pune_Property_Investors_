"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Star, Quote, Calendar, User, MapPin, ShieldCheck, ExternalLink } from "lucide-react";

import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import HeroSection from "../../../components/home/HeroSection";
import TrustHighlights from "../../../components/home/TrustHighlights";
import FeaturedProperties from "../../../components/home/FeaturedProperties";
import NewLaunchProjects from "../../../components/home/NewLaunchProjects";
import BrowseLocations from "../../../components/home/BrowseLocations";
import FeaturedProjects from "../../../components/home/FeaturedProjects";
import UpcomingProjects from "../../../components/home/UpcomingProjects";
import FeaturedProp from "../../../components/home/FeaturedProp";
import AdvertisementSidebar from "../../../components/common/AdvertisementSidebar";
import Workflow from "../../../components/home/Workflow";
import DeveloperLogos from "../../../components/home/DeveloperLogos";
import Testimonials from "../../../components/home/Testimonials";
import HomeContact from "../../../components/home/HomeContact";
import TrustStats from "../../../components/home/TrustStats";
import PageHeroBanner from "../../../components/common/PageHeroBanner";
import PropertyCard from "../../../components/properties/PropertyCard";
import { extractYouTubeId } from "../../../data/shortsData";
import { resolveAssetUrl } from "../../../components/admin/content/ImageUploader";

function renderSectionByType(section, activeTab, setActiveTab) {
    if (!section?.enabled) return null;
    const data = section.data || {};

    switch (section.type) {
        case "hero":
            return (
                <HeroSection
                    key={section.id}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    previewData={data}
                />
            );
        case "trust-highlights":
            return <TrustHighlights key={section.id} previewData={data} />;
        case "featured-properties":
            return <FeaturedProperties key={section.id} filters={{ projectType: activeTab }} previewData={data} />;
        case "new-launches":
            return <NewLaunchProjects key={section.id} previewData={data} />;
        case "browse-locations":
            return <BrowseLocations key={section.id} previewData={data} />;
        case "featured-projects":
            return <FeaturedProjects key={section.id} previewData={data} />;
        case "upcoming-projects":
            return <UpcomingProjects key={section.id} previewData={data} />;
        case "featured-prop":
            return <FeaturedProp key={section.id} previewData={data} />;
        case "workflow":
            return <Workflow key={section.id} previewData={data} />;
        case "developer-logos":
            return <DeveloperLogos key={section.id} previewData={data} />;
        case "testimonials":
            return <Testimonials key={section.id} previewData={data} />;
        case "home-contact":
            return <HomeContact key={section.id} previewData={data} />;
        case "trust-stats":
            return <TrustStats key={section.id} previewData={data} />;
        default:
            return null;
    }
}

function HomepagePreview({ payload }) {
    const [activeTab, setActiveTab] = useState("projects");
    const sections = Array.isArray(payload?.sections)
        ? [...payload.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
        : [];

    const mainColumnTypes = new Set([
        "trust-highlights",
        "featured-properties",
        "new-launches",
        "browse-locations",
        "featured-projects",
        "upcoming-projects",
        "featured-prop",
    ]);

    const focusedSection = payload?.focusedSectionId
        ? sections.find((s) => s.id === payload.focusedSectionId)
        : null;

    if (focusedSection) {
        const forcedVisible = { ...focusedSection, enabled: true };
        return (
            <main className="home-page">
                {!focusedSection.enabled && (
                    <div
                        style={{
                            background: "#fef3c7",
                            color: "#92400e",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 14px",
                            textAlign: "center",
                            borderBottom: "1px solid #fde68a",
                        }}
                    >
                        Currently hidden on live website — toggle &ldquo;Show on Homepage&rdquo; to publish it.
                    </div>
                )}
                {focusedSection.type === "advertisements" ? (
                    <div className="home-page__content-layout" style={{ padding: "24px 16px" }}>
                        <aside className="home-page__sidebar" style={{ margin: "0 auto" }}>
                            <AdvertisementSidebar />
                        </aside>
                    </div>
                ) : mainColumnTypes.has(focusedSection.type) ? (
                    <div className="home-page__content-layout" style={{ padding: "16px" }}>
                        <div className="home-page__main-content" style={{ width: "100%" }}>
                            {renderSectionByType(forcedVisible, activeTab, setActiveTab)}
                        </div>
                    </div>
                ) : (
                    renderSectionByType(forcedVisible, activeTab, setActiveTab)
                )}
            </main>
        );
    }

    const adSection = sections.find((s) => s.type === "advertisements");
    const showSidebar = adSection ? adSection.enabled : true;

    const fullWidthTop = sections.filter((s) => s.type === "hero");
    const mainColumn = sections.filter((s) => mainColumnTypes.has(s.type));
    const fullWidthBottom = sections.filter(
        (s) => s.type !== "hero" && s.type !== "advertisements" && !mainColumnTypes.has(s.type)
    );

    return (
        <>
            <Header />
            <main className="home-page">
                {fullWidthTop.map((sec) => renderSectionByType(sec, activeTab, setActiveTab))}

                <div className="home-page__content-layout">
                    <div className="home-page__main-content">
                        {mainColumn.map((sec) => renderSectionByType(sec, activeTab, setActiveTab))}
                    </div>

                    {showSidebar && (
                        <aside className="home-page__sidebar">
                            <AdvertisementSidebar />
                        </aside>
                    )}
                </div>

                {fullWidthBottom.map((sec) => renderSectionByType(sec, activeTab, setActiveTab))}
            </main>
            <Footer />
        </>
    );
}

function AboutPreview({ payload }) {
    const about = payload || {};
    return (
        <div className="about-page">
            <Header />
            <main>
                <PageHeroBanner
                    title={about.title || "Guiding Your Journey With"}
                    titleAccent={about.titleAccent || "Trust & Expertise."}
                    eyebrow={about.eyebrow || "ABOUT PUNE PROPERTY INVESTOR"}
                    description={
                        about.description ||
                        "Pune Property Investors is your dedicated advisory partner across Pune."
                    }
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
                    backgroundImage={
                        about.backgroundImage ||
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                    }
                />
                <div className="about-page__content">
                    <section className="container" style={{ padding: "48px 20px", maxWidth: 920 }}>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, marginBottom: 12 }}>
                            {about.storyTitle || "Transparent Advisory Since 2015"}
                        </h2>
                        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569", marginBottom: 24 }}>
                            {about.storyContent}
                        </p>
                        {about.ctaText && (
                            <span
                                style={{
                                    display: "inline-flex",
                                    padding: "11px 22px",
                                    borderRadius: 9999,
                                    background: "#0f172a",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}
                            >
                                {about.ctaText}
                            </span>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function PropertyOrProjectPreview({ payload, mode }) {
    const item = payload || {};
    const cardProperty = {
        id: item.id || 1,
        name: item.name || item.title || "Sample Property",
        developer: item.developer || "Pune Property Partner",
        logo: item.logoUrl || item.logo || "",
        location: item.location || "Pune",
        price: item.priceLabel || item.price || item.startingPrice || "₹ 1.25 Cr",
        configuration: item.configuration || (item.bhk ? `${item.bhk} BHK ${item.propertyType || "Apartment"}` : item.propertyType),
        possession: item.possession || "Ready",
        status: item.status || "Ready to Move",
        reraId: item.reraId || "MahaRERA Verified",
        image: resolveAssetUrl(item.image || item.gallery?.[0]),
        badge: item.badge || (item.isNewLaunch ? "New Launch" : "Featured"),
    };

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "32px 20px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "340px 1fr", gap: 28, alignItems: "start" }}>
                <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", color: "#64748b", marginBottom: 10 }}>
                        Card Preview ({mode === "project" ? "Featured Project" : "Property Listing"})
                    </div>
                    <PropertyCard property={cardProperty} />
                </div>

                <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#fef3c7", color: "#92400e" }}>
                            {item.publicationStatus || "Draft"}
                        </span>
                        {item.reraId && (
                            <span style={{ fontSize: 12, color: "#059669", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <ShieldCheck size={14} /> {item.reraId}
                            </span>
                        )}
                    </div>

                    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 26, margin: "0 0 8px", color: "#0f172a" }}>
                        {cardProperty.name}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 14, marginBottom: 16 }}>
                        <MapPin size={15} />
                        <span>{cardProperty.location}</span>
                    </div>

                    <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
                        {cardProperty.price}
                    </div>

                    <div
                        style={{ fontSize: 14.5, lineHeight: 1.65, color: "#334155", marginBottom: 18 }}
                        dangerouslySetInnerHTML={{ __html: item.description || "Property description appears here." }}
                    />

                    {Array.isArray(item.amenities) && item.amenities.length > 0 && (
                        <div>
                            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                                Key Amenities &amp; Highlights
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {item.amenities.map((am, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            padding: "5px 12px",
                                            borderRadius: 9999,
                                            background: "#f1f5f9",
                                            fontSize: 12.5,
                                            color: "#334155",
                                        }}
                                    >
                                        {am}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ArticlePreview({ payload }) {
    const post = payload || {};
    return (
        <div className="blog-page">
            <Header />
            <main style={{ paddingTop: 96, paddingBottom: 64, background: "#f8fafc", minHeight: "85vh" }}>
                <article style={{ maxWidth: 820, margin: "0 auto", background: "#ffffff", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                    {post.image && (
                        <img
                            src={resolveAssetUrl(post.image)}
                            alt={post.title}
                            style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }}
                        />
                    )}
                    <div style={{ padding: 32 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12.5, color: "#64748b", marginBottom: 12 }}>
                            <span style={{ padding: "3px 10px", borderRadius: 9999, background: "#fef3c7", color: "#92400e", fontWeight: 700 }}>
                                {post.category || "Article"}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <Calendar size={13} /> {post.publishDate || "Today"}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <User size={13} /> {post.author || "PPI Editorial"}
                            </span>
                        </div>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 30, lineHeight: 1.25, margin: "0 0 14px", color: "#0f172a" }}>
                            {post.title || "Untitled Article"}
                        </h1>
                        {(post.excerpt || post.summary) && (
                            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", fontWeight: 500, marginBottom: 20 }}>
                                {post.excerpt || post.summary}
                            </p>
                        )}
                        <div
                            style={{ fontSize: 15, lineHeight: 1.75, color: "#1e293b" }}
                            dangerouslySetInnerHTML={{ __html: post.content || "<p>Start writing content...</p>" }}
                        />
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}

function ShortPreview({ payload }) {
    const s = payload || {};
    const ytId = extractYouTubeId(s.youtubeUrl || s.videoUrl);
    const isGumlet = (s.youtubeUrl || s.videoUrl || "").includes("gumlet.io");

    return (
        <div style={{ background: "#0c1017", minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
            <div
                style={{
                    width: 340,
                    height: 600,
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative",
                    background: "#1e293b",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.14)",
                }}
            >
                {isGumlet ? (
                    <iframe
                        src={s.youtubeUrl || s.videoUrl}
                        title={s.title}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        allow="autoplay; fullscreen"
                    />
                ) : ytId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=0&controls=1`}
                        title={s.title}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        allow="autoplay; encrypted-media"
                    />
                ) : s.thumbnail ? (
                    <img
                        src={resolveAssetUrl(s.thumbnail)}
                        alt={s.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#94a3b8", fontSize: 13 }}>
                        Paste Gumlet or YouTube Shorts URL
                    </div>
                )}

                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: 18,
                        background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)",
                        color: "#ffffff",
                    }}
                >
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#f6d28b", marginBottom: 4 }}>
                        {s.developer} • {s.location}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{s.title || "Short Video Title"}</div>
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>
                        {s.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TestimonialSinglePreview({ payload }) {
    const t = payload || {};
    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
            <div style={{ maxWidth: 420, width: "100%" }}>
                <article className="testimonial-card" style={{ opacity: 1, transform: "none" }}>
                    <Quote className="testimonial-card__quote" size={32} aria-hidden="true" />
                    <div className="testimonial-card__rating">
                        {Array.from({ length: Number(t.rating) || 5 }, (_, i) => (
                            <Star key={i} size={17} fill="currentColor" />
                        ))}
                    </div>
                    <p className="testimonial-card__text">"{t.text || "Client review text..."}"</p>
                    <div className="testimonial-card__author">
                        <div className="testimonial-card__avatar">
                            {t.photo ? (
                                <img
                                    src={resolveAssetUrl(t.photo)}
                                    alt={t.name}
                                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                                />
                            ) : (
                                (t.name || "C").charAt(0).toUpperCase()
                            )}
                        </div>
                        <div>
                            <h3>{t.name || "Customer Name"}</h3>
                            <span>
                                {t.designation || t.role || "Homebuyer"}, {t.location || "Pune"}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

function AdPreview({ payload }) {
    const ad = payload || {};
    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
            <div className="ad-card" style={{ maxWidth: 340, width: "100%", background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                {ad.image && (
                    <img
                        src={resolveAssetUrl(ad.image)}
                        alt={ad.title}
                        style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                    />
                )}
                <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: "#a77a48", marginBottom: 4 }}>
                        {ad.eyebrow || "SPONSORED"}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", color: "#0f172a" }}>
                        {ad.title || "Advertisement Title"}
                    </h3>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.5, margin: "0 0 14px" }}>
                        {ad.description}
                    </p>
                    {ad.buttonText && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9999, background: "#0f172a", color: "#fff", fontSize: 12.5, fontWeight: 600 }}>
                            {ad.buttonText} <ExternalLink size={12} />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function PreviewCanvas() {
    const searchParams = useSearchParams();
    const initialMode = searchParams.get("mode") || "homepage";
    const [mode, setMode] = useState(initialMode);
    const [payload, setPayload] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "PPI_LIVE_PREVIEW_UPDATE") {
                if (event.data.mode) setMode(event.data.mode);
                setPayload(event.data.payload);
            }
        };
        window.addEventListener("message", handleMessage);
        window.parent?.postMessage({ type: "PPI_PREVIEW_READY" }, "*");
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    if (!payload) {
        return (
            <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc", color: "#64748b", fontSize: 14 }}>
                Connecting Live Website Preview...
            </div>
        );
    }

    if (mode === "homepage") return <HomepagePreview payload={payload} />;
    if (mode === "about") return <AboutPreview payload={payload} />;
    if (mode === "property" || mode === "project") return <PropertyOrProjectPreview payload={payload} mode={mode} />;
    if (mode === "article" || mode === "news") return <ArticlePreview payload={payload} />;
    if (mode === "short") return <ShortPreview payload={payload} />;
    if (mode === "testimonial") return <TestimonialSinglePreview payload={payload} />;
    if (mode === "advertisement") return <AdPreview payload={payload} />;

    return <HomepagePreview payload={payload} />;
}

export default function AdminLivePreviewPage() {
    return (
        <Suspense
            fallback={
                <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#64748b" }}>
                    Loading preview canvas...
                </div>
            }
        >
            <PreviewCanvas />
        </Suspense>
    );
}

