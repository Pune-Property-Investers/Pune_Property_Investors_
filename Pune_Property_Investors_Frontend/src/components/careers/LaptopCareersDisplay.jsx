"use client";

import { useMemo } from "react";
import {
    Briefcase,
    MapPin,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Building2,
    Sparkles,
    Pause,
    Play,
    Clock,
} from "lucide-react";

export default function LaptopCareersDisplay({
    jobs = [],
    currentIndex = 0,
    totalSlides = 1,
    isPaused = false,
    onExplore,
    onViewDetails,
    onApply,
    onPrev,
    onNext,
    onSelectSlide,
    onTogglePause,
}) {
    // Current active job (if on a job slide, currentIndex > 0)
    const currentJob = useMemo(() => {
        if (currentIndex <= 0) return null;
        const jobIndex = (currentIndex - 1) % (jobs.length || 1);
        return jobs[jobIndex] || null;
    }, [currentIndex, jobs]);

    return (
        <div
            className="laptop-screen-viewport"
            role="region"
            aria-label="Cinematic Laptop Careers Recruitment Showcase"
        >
            {/* Realistic Physical Laptop Webcam Notch */}
            <div className="laptop-screen__notch" aria-hidden="true">
                <span className="laptop-screen__camera-lens" />
            </div>

            {/* Inner Backlight & Screen Glass Glare */}
            <div className="laptop-screen__ambient-glow" aria-hidden="true" />
            <div className="laptop-screen__glass-reflection" aria-hidden="true" />

            {/* Screen Content Canvas */}
            <div className="laptop-screen__canvas">
                {/* SLIDE 0: WE ARE HIRING (Opening Screen) */}
                {currentIndex === 0 && (
                    <div className="cinematic-slide cinematic-slide--intro">
                        <div className="cinematic-intro__header">
                            <div className="cinematic-brand">
                                <div className="cinematic-brand__icon">
                                    <Building2 size={13} />
                                </div>
                                <div className="cinematic-brand__text">
                                    <span className="cinematic-brand__abbr">PPI</span>
                                    <span className="cinematic-brand__full">PUNE PROPERTY INVESTORS</span>
                                </div>
                            </div>
                            <span className="cinematic-hiring-pill">WE ARE HIRING</span>
                        </div>

                        <div className="cinematic-intro__body">
                            <div className="cinematic-intro__copy-block">
                                <h2 className="cinematic-intro__headline">
                                    Build Your Career With Us.
                                </h2>
                                <p className="cinematic-intro__subtext">
                                    Explore exciting opportunities and become part of our growing team across Pune.
                                </p>
                            </div>

                            <div className="cinematic-intro__cta-row">
                                <button
                                    type="button"
                                    onClick={onExplore}
                                    className="cinematic-btn cinematic-btn--explore"
                                >
                                    <span>EXPLORE OPEN POSITIONS</span>
                                    <ArrowRight size={11} />
                                </button>
                            </div>
                        </div>

                        {/* Subtle Real Estate Skyline Graphic Motif */}
                        <div className="cinematic-intro__skyline-accent" aria-hidden="true">
                            <div className="cinematic-skyline__tower tower-1" />
                            <div className="cinematic-skyline__tower tower-2" />
                            <div className="cinematic-skyline__tower tower-3" />
                        </div>
                    </div>
                )}

                {/* SLIDES 1..N: AVAILABLE JOB POSITIONS */}
                {currentIndex > 0 && currentJob && (
                    <div className="cinematic-slide cinematic-slide--job">
                        <div className="cinematic-job__header">
                            <div className="cinematic-dept-badge">
                                <Briefcase size={10} />
                                <span>{currentJob.department || "OPEN POSITION"}</span>
                            </div>
                            <span className="cinematic-type-badge">
                                {currentJob.type || "Full-time"}
                            </span>
                        </div>

                        <div className="cinematic-job__body">
                            <h3 className="cinematic-job__title">{currentJob.title}</h3>

                            <div className="cinematic-job__meta">
                                <div className="cinematic-meta-item">
                                    <MapPin size={10} />
                                    <span>{currentJob.location || "Pune"}</span>
                                </div>
                                {currentJob.genderCriteria && (
                                    <div className="cinematic-meta-item cinematic-meta-item--highlight">
                                        <Sparkles size={9} />
                                        <span>{currentJob.genderCriteria}</span>
                                    </div>
                                )}
                                {currentJob.experience && (
                                    <div className="cinematic-meta-item">
                                        <Clock size={9} />
                                        <span>{currentJob.experience}</span>
                                    </div>
                                )}
                            </div>

                            <p className="cinematic-job__desc">
                                {currentJob.description
                                    ? currentJob.description.slice(0, 95) +
                                      (currentJob.description.length > 95 ? "..." : "")
                                    : "Connect property buyers with the right real estate opportunities."}
                            </p>
                        </div>

                        <div className="cinematic-job__actions">
                            <button
                                type="button"
                                onClick={() => onViewDetails && onViewDetails(currentJob)}
                                className="cinematic-btn cinematic-btn--details"
                            >
                                VIEW DETAILS
                            </button>
                            <button
                                type="button"
                                onClick={() => onApply && onApply(currentJob)}
                                className="cinematic-btn cinematic-btn--apply"
                            >
                                APPLY NOW
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Status & Navigation Bar */}
            <div className="laptop-screen__footer-bar">
                <div className="laptop-footer__indicators">
                    {Array.from({ length: Math.min(totalSlides, 8) }).map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectSlide && onSelectSlide(idx)}
                            className={`laptop-indicator-dot ${
                                currentIndex % 8 === idx ? "active" : ""
                            }`}
                            aria-label={`Slide ${idx + 1}`}
                        />
                    ))}
                    {totalSlides > 8 && (
                        <span className="laptop-indicator-more">+{totalSlides - 8}</span>
                    )}
                </div>

                <div className="laptop-footer__controls">
                    <button
                        type="button"
                        onClick={onTogglePause}
                        className="laptop-ctrl-btn laptop-ctrl-btn--pause"
                        aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
                        title={isPaused ? "Resume" : "Pause"}
                    >
                        {isPaused ? <Play size={9} /> : <Pause size={9} />}
                    </button>
                    <button
                        type="button"
                        onClick={onPrev}
                        className="laptop-ctrl-btn"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={10} />
                    </button>
                    <span className="laptop-counter">
                        {String(currentIndex + 1).padStart(2, "0")}/
                        {String(totalSlides).padStart(2, "0")}
                    </span>
                    <button
                        type="button"
                        onClick={onNext}
                        className="laptop-ctrl-btn"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={10} />
                    </button>
                </div>
            </div>
        </div>
    );
}
