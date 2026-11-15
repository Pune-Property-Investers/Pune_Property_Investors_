"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import {
    Briefcase,
    MapPin,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import LaptopCareersDisplay from "./LaptopCareersDisplay";
import "./CareersHero.css";

// Fallback example roles as requested in specification
const DEFAULT_SPEC_JOBS = [
    {
        id: "spec-1",
        title: "WEB DEVELOPER",
        department: "Technology",
        location: "Pune",
        type: "Full-time",
        experience: "2-4 Years",
        description:
            "Build and maintain modern digital platforms and high-performance web systems for PPI.",
    },
    {
        id: "spec-2",
        title: "HR RECRUITER (FEMALE)",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        type: "Full-time",
        experience: "1-3 Years",
        genderCriteria: "Female Candidates",
        description:
            "Manage recruitment pipelines, candidate screening, interviews, and corporate onboarding.",
    },
    {
        id: "spec-3",
        title: "DIGITAL MARKETING EXECUTIVE",
        department: "Marketing",
        location: "Kharadi, Pune",
        type: "Full-time",
        experience: "2-5 Years",
        description:
            "Lead high-converting real estate performance campaigns, SEO, and social brand awareness.",
    },
    {
        id: "spec-4",
        title: "REAL ESTATE SALES EXECUTIVE",
        department: "Sales",
        location: "Kharadi & Dighi",
        type: "Full-time",
        experience: "1-5 Years",
        description:
            "Connect premium property buyers with luxury developers and high-yield real estate investments.",
    },
    {
        id: "spec-5",
        title: "GRAPHIC DESIGNER & CREATIVE",
        department: "Creative",
        location: "Pune",
        type: "Full-time",
        experience: "1-3 Years",
        description:
            "Design compelling visual campaigns, project brochures, presentation decks, and video assets.",
    },
];

export default function CareersHero({
    jobs = [],
    onApply,
    onViewDetails,
    onExplore,
}) {
    // Combine live backend jobs with spec jobs if empty, prioritizing live jobs
    const activeJobs = useMemo(() => {
        const filtered = jobs.filter(
            (j) => !j.status || j.status.toLowerCase() !== "closed"
        );
        return filtered.length > 0 ? filtered : DEFAULT_SPEC_JOBS;
    }, [jobs]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    // Total slides = 1 (Slide 0: "We Are Hiring") + number of active jobs
    const totalSlides = 1 + activeJobs.length;

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const handleSelectSlide = (idx) => {
        setCurrentIndex(idx);
    };

    const handleTogglePause = () => {
        setIsPaused((prev) => !prev);
    };

    // Auto-advance slideshow every 1.5 seconds (1500ms) as specified
    useEffect(() => {
        if (isPaused) return;

        // Check user's OS preference for reduced motion
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        timerRef.current = setTimeout(() => {
            handleNext();
        }, 1500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentIndex, isPaused, handleNext]);

    const handleExploreClick = (e) => {
        if (e) e.preventDefault();
        if (onExplore) {
            onExplore();
        } else {
            const section = document.getElementById("open-roles");
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const handleViewJob = (job) => {
        if (onViewDetails) {
            onViewDetails(job);
        } else {
            handleExploreClick();
        }
    };

    const handleApplyJob = (job) => {
        if (onApply) {
            onApply(job);
        }
    };

    // Current job for mobile view
    const currentMobileJob =
        currentIndex > 0 ? activeJobs[(currentIndex - 1) % activeJobs.length] : null;

    return (
        <section className="careers-cinematic-hero">
            {/* Cinematic Head Section Heading */}
            <div className="careers-hero__intro">
                <h1 className="careers-hero__title">
                    Find Your Place. <em>Build Your Future.</em>
                </h1>
            </div>

            {/* Cinematic Stage: Laptop on Rock Surface with Real React Display */}
            <div className="careers-cinematic-stage">
                <div
                    className="careers-laptop-frame"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Background Photograph Asset */}
                    <div className="careers-laptop-photo-wrap">
                        <Image
                            src="/images/careers-cinematic-laptop.jpg"
                            alt="Cinematic laptop on natural rock presenting PPI Careers recruitment portal"
                            width={404}
                            height={316}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1140px"
                            className="careers-laptop-base-img"
                        />
                    </div>

                    {/* Precise Real React Laptop Screen Display */}
                    <div className="careers-laptop-screen-mount">
                        <LaptopCareersDisplay
                            jobs={activeJobs}
                            currentIndex={currentIndex}
                            totalSlides={totalSlides}
                            isPaused={isPaused}
                            onExplore={handleExploreClick}
                            onViewDetails={handleViewJob}
                            onApply={handleApplyJob}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onSelectSlide={handleSelectSlide}
                            onTogglePause={handleTogglePause}
                        />
                    </div>
                </div>

                {/* Mobile Companion Hiring Card (< 768px viewports) */}
                <div className="careers-mobile-panel">
                    <div className="mobile-companion-card">
                        <div className="mobile-card__header">
                            <span className="mobile-card__badge">
                                {currentIndex === 0 ? "PPI CAREERS" : "CURRENT OPENING"}
                            </span>
                            <span className="mobile-card__count">
                                {currentIndex + 1} of {totalSlides}
                            </span>
                        </div>

                        {currentIndex === 0 ? (
                            <div className="mobile-card__body">
                                <h3>We Are Hiring!</h3>
                                <p>
                                    Join Pune Property Investors. Build your career with industry
                                    mentors and uncapped growth.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleExploreClick}
                                    className="mobile-card__btn mobile-card__btn--primary"
                                >
                                    <span>Explore All Openings</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        ) : currentMobileJob ? (
                            <div className="mobile-card__body">
                                <h3>{currentMobileJob.title}</h3>
                                <div className="mobile-card__meta">
                                    <span className="m-tag">📍 {currentMobileJob.location}</span>
                                    <span className="m-tag">💼 {currentMobileJob.department}</span>
                                    {currentMobileJob.genderCriteria && (
                                        <span className="m-tag m-tag--star">
                                            ✨ {currentMobileJob.genderCriteria}
                                        </span>
                                    )}
                                </div>
                                <p>{currentMobileJob.description}</p>
                                <div className="mobile-card__actions">
                                    <button
                                        type="button"
                                        onClick={() => handleViewJob(currentMobileJob)}
                                        className="mobile-card__btn mobile-card__btn--secondary"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleApplyJob(currentMobileJob)}
                                        className="mobile-card__btn mobile-card__btn--primary"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ) : null}

                        <div className="mobile-card__footer">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="mobile-card__nav-btn"
                                aria-label="Previous position"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="mobile-card__dots">
                                {Array.from({ length: Math.min(totalSlides, 7) }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelectSlide(idx)}
                                        className={`m-dot ${currentIndex % 7 === idx ? "active" : ""
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="mobile-card__nav-btn"
                                aria-label="Next position"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

