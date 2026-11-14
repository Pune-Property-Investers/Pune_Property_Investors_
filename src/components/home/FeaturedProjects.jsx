"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import PropertyCard from "../properties/PropertyCard";
import { projects } from "../../data/projects";
import "./FeaturedProjects.css";

export default function FeaturedProjects({ previewData, customProjects }) {
    const sectionRef = useRef(null);
    const carouselRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isGrabbing, setIsGrabbing] = useState(false);

    const projectList = Array.isArray(previewData) && previewData.length > 0 ? previewData : projects;
    const filteredProjects = Array.isArray(customProjects) && customProjects.length > 0 ? customProjects : projectList;

    // Mouse drag support for desktop slider

    const getScrollStep = () => {
        if (!carouselRef.current) return 320;
        const container = carouselRef.current;
        const firstCard = container.firstElementChild;
        if (!firstCard) return 320;
        const cardWidth = firstCard.getBoundingClientRect().width;
        const styles = window.getComputedStyle(container);
        const gap = parseFloat(styles.gap || styles.columnGap) || 20;
        return cardWidth + gap;
    };

    const scrollCarousel = (direction) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const step = getScrollStep();

        if (direction === "prev") {
            if (container.scrollLeft <= 10) {
                container.scrollTo({
                    left: container.scrollWidth - container.clientWidth,
                    behavior: "smooth",
                });
            } else {
                container.scrollBy({ left: -step, behavior: "smooth" });
            }
        } else {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScroll - 10) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                container.scrollBy({ left: step, behavior: "smooth" });
            }
        }
    };

    const scrollToSlide = (index) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cards = container.children;
        if (cards[index]) {
            const targetLeft = cards[index].offsetLeft - container.offsetLeft;
            container.scrollTo({ left: targetLeft, behavior: "smooth" });
        }
        setActiveSlideIndex(index);
    };

    const handleScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const step = getScrollStep();
        if (step <= 0) return;

        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 15;
        if (isAtEnd) {
            setActiveSlideIndex(filteredProjects.length - 1);
        } else {
            const newIndex = Math.round(container.scrollLeft / step);
            if (newIndex >= 0 && newIndex < filteredProjects.length) {
                setActiveSlideIndex(newIndex);
            }
        }
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0 || !carouselRef.current) return;
        isMouseDownRef.current = true;
        hasDraggedRef.current = false;
        setIsGrabbing(true);
        startXRef.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeftRef.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isMouseDownRef.current || !carouselRef.current) return;
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = x - startXRef.current;
        if (Math.abs(walk) > 5) {
            hasDraggedRef.current = true;
        }
        carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUpOrLeave = () => {
        if (isMouseDownRef.current) {
            isMouseDownRef.current = false;
            setIsGrabbing(false);
            handleScroll();
        }
    };

    const handleClickCapture = (e) => {
        if (hasDraggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
            hasDraggedRef.current = false;
        }
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(section);
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className={`featured-projects ${isVisible ? "featured-projects--visible" : ""}`}
        >
            <div className="featured-projects__container">
                {/* Top Section Editorial Header */}
                <div className="featured-projects__heading">
                    <span className="featured-projects__eyebrow">
                        {previewData?.eyebrow ?? "OUR PORTFOLIO"}
                    </span>

                    <h2>{previewData?.heading ?? "Explore Our Featured Projects"}</h2>

                    <p>
                        {previewData?.subtitle ??
                            "Discover thoughtfully selected properties across Pune that match your lifestyle and investment goals."}
                    </p>
                </div>

                {/* Subheader: ALL LANDMARK DEVELOPMENTS + Project Counter + Nav Chevrons */}
                <div className="featured-projects__subbar">
                    <div className="featured-projects__subbar-left">
                        <h3 className="featured-projects__subbar-title">ALL LANDMARK DEVELOPMENTS</h3>
                        <span className="featured-projects__subbar-count">{filteredProjects.length} Projects</span>
                    </div>

                    <div className="featured-projects__subbar-nav">
                        <button
                            type="button"
                            className="featured-projects__nav-circle"
                            onClick={() => scrollCarousel("prev")}
                            aria-label="Previous development"
                            title="Previous"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            type="button"
                            className="featured-projects__nav-circle"
                            onClick={() => scrollCarousel("next")}
                            aria-label="Next development"
                            title="Next"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Desktop & Mobile Slider Track with Interactive Controls */}
                <div className="featured-projects__slider-wrap">
                    <button
                        type="button"
                        className="featured-projects__side-arrow featured-projects__side-arrow--prev"
                        onClick={() => scrollCarousel("prev")}
                        aria-label="Previous development"
                        title="Previous"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div
                        className={`featured-projects__grid ${isGrabbing ? "featured-projects__grid--grabbing" : ""
                            }`}
                        ref={carouselRef}
                        onScroll={handleScroll}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        onClickCapture={handleClickCapture}
                        role="region"
                        aria-label="Featured landmark developments"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowLeft") scrollCarousel("prev");
                            if (e.key === "ArrowRight") scrollCarousel("next");
                        }}
                    >
                        {filteredProjects.map((project, index) => (
                            <div
                                className="featured-projects__item"
                                key={project.id ?? project.name}
                                style={{
                                    "--card-index": index,
                                }}
                            >
                                <PropertyCard property={project} />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="featured-projects__side-arrow featured-projects__side-arrow--next"
                        onClick={() => scrollCarousel("next")}
                        aria-label="Next development"
                        title="Next"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Bottom Navigation Controls & Pagination Dots */}
                <div className="featured-projects__bottom-nav">
                    <button
                        type="button"
                        className="featured-projects__nav-circle"
                        onClick={() => scrollCarousel("prev")}
                        aria-label="Previous property slide"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="featured-projects__dots" role="tablist" aria-label="Carousel pagination">
                        {filteredProjects.map((_, dotIdx) => (
                            <button
                                key={dotIdx}
                                type="button"
                                className={`featured-projects__dot ${dotIdx === activeSlideIndex ? "featured-projects__dot--active" : ""
                                    }`}
                                onClick={() => scrollToSlide(dotIdx)}
                                aria-label={`Go to slide ${dotIdx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className="featured-projects__nav-circle"
                        onClick={() => scrollCarousel("next")}
                        aria-label="Next property slide"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* 100% Verified Developer Inventory & Direct Builder Pricing Trust Banner */}
                <div className="featured-projects__trust-banner">
                    <div className="featured-projects__trust-icon-box">
                        <ShieldCheck size={24} className="featured-projects__trust-icon" />
                    </div>
                    <div className="featured-projects__trust-content">
                        <h4 className="featured-projects__trust-title">
                            100% Verified Developer Inventory & Direct Builder Pricing
                        </h4>
                        <p className="featured-projects__trust-desc">
                            Every project undergoes title search, sanction check, and MahaRERA / RERA certificate validation. Zero brokerage on new bookings.
                        </p>
                    </div>
                </div>

                <div className="featured-projects__footer">
                    <Link href="/buy" className="button button-outline">
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
}
