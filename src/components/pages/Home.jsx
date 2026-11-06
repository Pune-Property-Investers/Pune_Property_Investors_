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
import TrustStats from "../home/TrustStats";
import FeaturedProjects from "../home/FeaturedProjects";
import FeaturedProp from "../home/FeaturedProp";
import Workflow from "../home/Workflow";
import DeveloperLogos from "../home/DeveloperLogos";
import HomeContact from "../home/HomeContact";

function Home() {
    const [activeTab, setActiveTab] = useState("projects");

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

                        <FeaturedProp />
                    </div>

                    <aside className="home-page__sidebar">
                        <AdvertisementSidebar />
                    </aside>
                </div>

                <Workflow />
                <DeveloperLogos />

                {/* Full-width Architectural Contact Us section */}
                <HomeContact />

                <TrustStats />
            </main>

            <Footer />
        </>
    );
}

export default Home;
