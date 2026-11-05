"use client";

import { useState } from "react";
import Header from "../layouts/Header";
import HeroSection from "../home/HeroSection";
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
                        {/* 1. Projects in Pune showcase with YouTube Video Tours in Play */}
                        <FeaturedProperties
                            filters={{ projectType: activeTab }}
                        />

                        <BrowseLocations />
                        <NewLaunchProjects />

                        {/* 3. Upcoming Projects & Pre-Launch Milestones */}
                        <UpcomingProjects />

                        <FeaturedProjects />
                        <FeaturedProp />
                    </div>

                    <aside className="home-page__sidebar">
                        <AdvertisementSidebar />
                    </aside>
                </div>

                <TrustStats />
                <Workflow />
                <DeveloperLogos />

                {/* Full-width Architectural Contact Us section */}
                <HomeContact />
            </main>

            <Footer />
        </>
    );
}

export default Home;
