"use client";

import { useState } from "react";
import Header from "../layouts/Header";
import HeroSection from "../home/HeroSection";
import TrustHighlights from "../home/TrustHighlights";
import FeaturedProperties from "../home/FeaturedProperties";
import Footer from "../layouts/Footer";
import BrowseLocations from "../home/BrowseLocations";
import NewLaunchProjects from "../home/NewLaunchProjects";
import UpcomingProjects from "../home/UpcomingProjects";
import AdvertisementSidebar from "../common/AdvertisementSidebar";
import AdvertisementPopup from "../common/AdvertisementPopup";
import TrustStats from "../home/TrustStats";
import FeaturedProjects from "../home/FeaturedProjects";
import Workflow from "../home/Workflow";
import DeveloperLogos from "../home/DeveloperLogos";
import Testimonials from "../home/Testimonials";
import HomeContact from "../home/HomeContact";
import SmartCalculator from "../home/SmartCalculator";
import CustomContainersRenderer from "../home/CustomContainersRenderer";
import { usePublishedCms } from "../../services/liveContent";

const MAIN_COLUMN_TYPES = new Set([
    "trust-highlights",
    "featured-properties",
    "new-launches",
    "browse-locations",
    "featured-projects",
    "upcoming-projects",
]);

function renderPublishedSection(section, activeTab, setActiveTab, published) {
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
            return <BrowseLocations key={section.id} customLocations={published?.locations} previewData={data} />;
        case "featured-projects":
            return (
                <FeaturedProjects
                    key={section.id}
                    previewData={data}
                    customProjects={published?.projects}
                />
            );
        case "upcoming-projects":
            return <UpcomingProjects key={section.id} previewData={data} />;
        case "scroll-story-properties":
        case "featured-prop":
            return null;
        case "workflow":
            return <Workflow key={section.id} previewData={data} />;
        case "developer-logos":
            return <DeveloperLogos key={section.id} previewData={data} />;
        case "testimonials":
            return (
                <Testimonials
                    key={section.id}
                    previewData={data}
                    customTestimonials={published?.testimonials}
                />
            );
        case "home-contact":
            return <HomeContact key={section.id} previewData={data} />;
        case "smart-calculator":
            return <SmartCalculator key={section.id} />;
        case "trust-stats":
            return <TrustStats key={section.id} previewData={data} />;
        case "custom-containers":
        case "custom-container":
        case "container":
            return (
                <CustomContainersRenderer
                    key={section.id}
                    containers={data.containers || data.items}
                    title={data.heading || data.title}
                    eyebrow={data.eyebrow}
                />
            );
        default:
            return null;
    }
}

function Home() {
    const [activeTab, setActiveTab] = useState("projects");
    const published = usePublishedCms();

    const sections = Array.isArray(published?.homepage?.sections)
        ? [...published.homepage.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
        : null;

    if (sections && sections.length > 0) {
        const adSection = sections.find((s) => s.type === "advertisements");
        const showSidebar = adSection ? adSection.enabled : true;

        const fullWidthTop = sections.filter((s) => s.type === "hero");
        const mainColumn = sections.filter((s) => MAIN_COLUMN_TYPES.has(s.type));
        const fullWidthBottom = sections.filter(
            (s) => s.type !== "hero" && s.type !== "advertisements" && !MAIN_COLUMN_TYPES.has(s.type)
        );

        return (
            <>
                <Header />

                <main className="home-page">
                    {fullWidthTop.map((sec) =>
                        renderPublishedSection(sec, activeTab, setActiveTab, published)
                    )}

                    <div className="home-page__content-layout">
                        <div className="home-page__main-content">
                            {mainColumn.map((sec) =>
                                renderPublishedSection(sec, activeTab, setActiveTab, published)
                            )}
                        </div>

                        {showSidebar && (
                            <aside className="home-page__sidebar">
                                <AdvertisementSidebar customAds={published?.advertisements} />
                            </aside>
                        )}
                    </div>

                    {/* Interactive Smart Home Loan & Investment ROI Calculator */}
                    <SmartCalculator />

                    {fullWidthBottom.map((sec) =>
                        renderPublishedSection(sec, activeTab, setActiveTab, published)
                    )}
                </main>

                <Footer />
                <AdvertisementPopup customAds={published?.advertisements} />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="home-page">
                {/* Full-width hero */}
                <HeroSection
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Main content and right advertisement sidebar */}
                <div className="home-page__content-layout">
                    <div className="home-page__main-content">
                        {/* 100% Trust, Zero Brokerage, Best Launch Price Highlights */}
                        <TrustHighlights />

                        {/* 1. Projects in Pune showcase with YouTube Video Tours in Play */}
                        <FeaturedProperties
                            filters={{ projectType: activeTab }}
                        />

                        <NewLaunchProjects />
                        <BrowseLocations />

                        {/* 3. Upcoming Projects & Pre-Launch Milestones */}
                        <FeaturedProjects />
                        <UpcomingProjects />
                    </div>

                    <aside className="home-page__sidebar">
                        <AdvertisementSidebar />
                    </aside>
                </div>

                {/* Interactive Smart Home Loan & Investment ROI Calculator */}
                <SmartCalculator />

                <Workflow />
                <DeveloperLogos />

                {/* Full-width Architectural Contact Us section */}
                <HomeContact />

                <TrustStats />
            </main>

            <Footer />
            <AdvertisementPopup />
        </>
    );
}

export default Home;
