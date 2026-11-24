"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from "lucide-react";
import trendingProjects from "../../data/trendingProjectsData";
import "./TrendingProjects.css";

const TOTAL = trendingProjects.length;
// 3 repeats create seamless continuous infinite wrap-around
const EXTENDED_LIST = [
    ...trendingProjects,
    ...trendingProjects,
    ...trendingProjects,
];

function TrendingProjects() {
    // Start on the middle set at "Golden Savannah" (index 1 of middle block = TOTAL + 1)
    const [activeIndex, setActiveIndex] = useState(TOTAL + 1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const autoplayTimerRef = useRef(null);
    const resizeRafRef = useRef(null);

    // Touch gesture tracking (direct DOM update during swipe for 120fps performance)
    const touchStartRef = useRef({ x: 0, y: 0 });
    const isHorizontalSwipeRef = useRef(null);
    const dragDistanceRef = useRef(0);

    // Mouse drag tracking for desktop
    const isMouseDownRef = useRef(false);
    const mouseStartRef = useRef(0);

    // Read actual container width on mount and resize via RAF
    useEffect(() => {
        const updateWidth = () => {
            if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
            resizeRafRef.current = requestAnimationFrame(() => {
                if (containerRef.current) {
                    setContainerWidth(containerRef.current.clientWidth);
                }
            });
        };

        updateWidth();
        window.addEventListener("resize", updateWidth, { passive: true });
        window.addEventListener("orientationchange", updateWidth, { passive: true });

        // Pause autoplay if tab is hidden
        const handleVisibilityChange = () => {
            setIsPaused(document.hidden);
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
            window.removeEventListener("resize", updateWidth);
            window.removeEventListener("orientationchange", updateWidth);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // Handle seamless infinite looping when sliding out of the middle block
    const handleTransitionEnd = useCallback((e) => {
        // Only respond to track transform transitionend, ignore children
        if (e && e.target !== trackRef.current) return;

        if (activeIndex >= TOTAL * 2) {
            setIsTransitioning(false);
            setActiveIndex((prev) => prev - TOTAL);
        } else if (activeIndex < TOTAL) {
            setIsTransitioning(false);
            setActiveIndex((prev) => prev + TOTAL);
        }
    }, [activeIndex]);

    // Restore smooth transition after a silent boundary reset
    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 40);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        setActiveIndex((prev) => prev + 1);
    }, []);

    const handlePrev = useCallback(() => {
        setIsTransitioning(true);
        setActiveIndex((prev) => prev - 1);
    }, []);

    const handleSlideClick = (index, project, e) => {
        // If the user performed a drag gesture, prevent accidental click
        if (Math.abs(dragDistanceRef.current) > 8) {
            e.preventDefault();
            return;
        }

        if (index === activeIndex) {
            // Active slide lets normal link navigation through
            return;
        }

        // Tapping any neighbor slide brings it to center focus
        e.preventDefault();
        setIsTransitioning(true);
        setActiveIndex(index);
    };

    // Autoplay slider every 4s (paused on hover, drag, or hidden tab)
    useEffect(() => {
        if (isPaused) return;

        autoplayTimerRef.current = setInterval(() => {
            handleNext();
        }, 4000);

        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [isPaused, handleNext]);

    // Responsive card dimensions
    const effectiveWidth = containerWidth || 1200;
    const isMobile = effectiveWidth < 768;
    const cardWidth = isMobile
        ? Math.max(215, Math.min(260, Math.round(effectiveWidth * 0.65)))
        : 320;
    const cardGap = isMobile ? 14 : 24;

    const centerOffset = effectiveWidth / 2 - cardWidth / 2;
    const baseTranslateX = centerOffset - activeIndex * (cardWidth + cardGap);

    // =========================================================================
    // MOBILE TOUCH GESTURES (Direct DOM update - ZERO React re-renders during drag)
    // =========================================================================
    const handleTouchStart = (e) => {
        if (!e.touches || !e.touches[0]) return;
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
        isHorizontalSwipeRef.current = null;
        dragDistanceRef.current = 0;
        setIsPaused(true);
    };

    const handleTouchMove = (e) => {
        if (!e.touches || !e.touches[0]) return;

        const deltaX = e.touches[0].clientX - touchStartRef.current.x;
        const deltaY = e.touches[0].clientY - touchStartRef.current.y;

        // Detect user intent: horizontal slider swipe vs vertical page scroll
        if (isHorizontalSwipeRef.current === null) {
            if (Math.abs(deltaY) > 7 && Math.abs(deltaY) > Math.abs(deltaX)) {
                // Vertical page scroll detected -> do NOT touch slider, let browser scroll naturally!
                isHorizontalSwipeRef.current = false;
                return;
            } else if (Math.abs(deltaX) > 7 && Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe detected
                isHorizontalSwipeRef.current = true;
            }
        }

        // Direct hardware transform without triggering React re-renders
        if (isHorizontalSwipeRef.current === true && trackRef.current) {
            dragDistanceRef.current = deltaX;
            trackRef.current.style.transition = "none";
            trackRef.current.style.transform = `translate3d(${baseTranslateX + deltaX}px, 0, 0)`;
        }
    };

    const handleTouchEnd = () => {
        const distance = dragDistanceRef.current;

        if (trackRef.current) {
            trackRef.current.style.transition = "";
            trackRef.current.style.transform = "";
        }

        if (isHorizontalSwipeRef.current === true) {
            if (distance < -35) {
                handleNext();
            } else if (distance > 35) {
                handlePrev();
            }
        }

        setTimeout(() => {
            dragDistanceRef.current = 0;
            isHorizontalSwipeRef.current = null;
            setIsPaused(false);
        }, 300);
    };

    // =========================================================================
    // DESKTOP MOUSE DRAG (Direct DOM update)
    // =========================================================================
    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        isMouseDownRef.current = true;
        mouseStartRef.current = e.clientX;
        dragDistanceRef.current = 0;
        setIsPaused(true);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDownRef.current) return;
        const diff = e.clientX - mouseStartRef.current;
        dragDistanceRef.current = diff;

        if (trackRef.current) {
            trackRef.current.style.transition = "none";
            trackRef.current.style.transform = `translate3d(${baseTranslateX + diff}px, 0, 0)`;
        }
    };

    const handleMouseUp = () => {
        if (!isMouseDownRef.current) return;
        isMouseDownRef.current = false;

        const distance = dragDistanceRef.current;

        if (trackRef.current) {
            trackRef.current.style.transition = "";
            trackRef.current.style.transform = "";
        }

        if (distance < -35) {
            handleNext();
        } else if (distance > 35) {
            handlePrev();
        }

        setTimeout(() => {
            dragDistanceRef.current = 0;
            setIsPaused(false);
        }, 300);
    };

    return (
        <section
            className="trending-projects"
            aria-labelledby="trending-projects-title"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="trending-projects__container">
                {/* Section Header */}
                <div className="trending-projects__header">
                    <div className="trending-projects__heading-content">
                        <p className="trending-projects__eyebrow">
                            <span aria-hidden="true"></span>
                            Pune Real Estate
                        </p>

                        <h2
                            className="trending-projects__title"
                            id="trending-projects-title"
                        >
                            Trending Projects.
                            <span>Architectural Living.</span>
                        </h2>

                        <p className="trending-projects__description">
                            Explore sought-after architectural residences across
                            Pune and discover a home designed with refined aesthetics
                            and enduring value.
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="trending-projects__controls-wrapper">
                        <div className="trending-projects__nav-arrows">
                            <button
                                type="button"
                                className="trending-nav-btn trending-nav-btn--prev"
                                onClick={handlePrev}
                                aria-label="Previous trending project"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                className="trending-nav-btn trending-nav-btn--next"
                                onClick={handleNext}
                                aria-label="Next trending project"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <Link
                            href="/buy"
                            className="trending-projects__view-all"
                        >
                            View All Projects
                            <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                    </div>
                </div>

                {/* Slider Viewport with Separate Touch & Mouse Listeners */}
                <div
                    className="trending-slider__viewport"
                    ref={containerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="trending-slider__track"
                        ref={trackRef}
                        style={{
                            transform: `translate3d(${baseTranslateX}px, 0, 0)`,
                            transition: isTransitioning
                                ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
                                : "none",
                            gap: `${cardGap}px`,
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {EXTENDED_LIST.map((project, index) => {
                            const isActive = index === activeIndex;
                            const isNearby = Math.abs(index - activeIndex) <= 2;

                            return (
                                <div
                                    key={`${project.id}-${index}`}
                                    className={`trending-slide ${
                                        isActive ? "is-active" : ""
                                    }`}
                                    style={{ width: `${cardWidth}px` }}
                                    onClick={(e) =>
                                        handleSlideClick(index, project, e)
                                    }
                                >
                                    {/* Image with bottom alignment using GPU transform */}
                                    <div className="trending-slide__media-box">
                                        <Link
                                            href={`/properties/${project.slug}`}
                                            className="trending-slide__media-link"
                                            tabIndex={isActive ? 0 : -1}
                                            onClick={(e) => {
                                                if (!isActive) {
                                                    e.preventDefault();
                                                    handleSlideClick(index, project, e);
                                                }
                                            }}
                                        >
                                            <img
                                                src={project.image}
                                                alt={`${project.name} - ${project.location}`}
                                                className="trending-slide__img"
                                                loading={isNearby ? "eager" : "lazy"}
                                                decoding="async"
                                                draggable={false}
                                            />
                                        </Link>
                                    </div>

                                    {/* Bottom Info Bar matching reference */}
                                    <div className="trending-slide__content">
                                        <div className="trending-slide__header">
                                            <h3 className="trending-slide__title">
                                                <Link
                                                    href={`/properties/${project.slug}`}
                                                    tabIndex={isActive ? 0 : -1}
                                                >
                                                    {project.name}
                                                </Link>
                                            </h3>

                                            <Link
                                                href={`/properties/${project.slug}`}
                                                className="trending-slide__btn"
                                                aria-label={`Explore ${project.name}`}
                                                tabIndex={isActive ? 0 : -1}
                                            >
                                                <ArrowUpRight size={17} />
                                            </Link>
                                        </div>

                                        <p className="trending-slide__subtitle">
                                            For Sale / {project.location}
                                        </p>

                                        <p className="trending-slide__price">
                                            {project.price}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="trending-slider__dots" aria-hidden="true">
                    {trendingProjects.map((project, idx) => {
                        const isCurrent = (activeIndex % TOTAL) === idx;
                        return (
                            <button
                                key={project.id}
                                type="button"
                                className={`trending-slider__dot ${
                                    isCurrent ? "is-active" : ""
                                }`}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setActiveIndex(TOTAL + idx);
                                }}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default TrendingProjects;
