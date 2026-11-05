"use client";

import { useState } from "react";
import Header from "../layouts/Header";
import HeroSection from "../home/HeroSection";
import FeaturedProperties from "../home/FeaturedProperties";
import PropertyTypes from "../home/PropertyTypes";
import Footer from "../layouts/Footer";
import BrowseLocations from "../home/BrowseLocations";
import NewLaunchProjects from "../home/NewLaunchProjects";
import UpcomingProjects from "../home/UpcomingProjects";
import TrendingProjects from "../home/TrendingProjects";
import WhyChooseUs from "../home/WhyChooseUs";
import AdvertisementSidebar from "../common/AdvertisementSidebar";
import PuneRealEstateContent from "../home/PuneRealEstateContent";
import Testimonials from "../home/Testimonials";
import TrustStats from "../home/TrustStats";
import FeaturedProjects from "../home/FeaturedProjects";
import FeaturedProp from "../home/FeaturedProp";
import Workflow from "../home/Workflow";
import DeveloperLogos from "../home/DeveloperLogos";
import HomeContact from "../home/HomeContact";
import AboutSection from "../home/AboutSection";

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

                        {/* 2. Browse by Property Type */}
                        <PropertyTypes />

                        <BrowseLocations />
                        <NewLaunchProjects />

                        {/* 3. Upcoming Projects & Pre-Launch Milestones */}
                        <UpcomingProjects />

                        <FeaturedProjects />
                        <TrendingProjects />
                        <FeaturedProp />
                        <PuneRealEstateContent />
                    </div>

                    <aside className="home-page__sidebar">
                        <AdvertisementSidebar />
                    </aside>
                </div>

                {/* About Pune Property Investors - Partnership Built on Trust */}
                <AboutSection />

                <TrustStats />
                <Workflow />
                <Testimonials />
                {/* Full-width Why Choose Us section */}
                <DeveloperLogos />
                <WhyChooseUs />

                {/* Full-width Architectural Contact Us section */}
                <HomeContact />
            </main>

            <Footer />
        </>
    );
}

export default Home;
