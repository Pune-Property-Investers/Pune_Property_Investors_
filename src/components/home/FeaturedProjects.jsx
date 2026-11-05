"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import PropertyCard from "../properties/PropertyCard";
import { projects } from "../../data/projects";
import "./FeaturedProjects.css";

const DEVELOPER_TAGS = [
    "All Developers",
    "Paras Buildtech",
    "Kolte-Patil",
    "VTP Realty",
    "Sobha Limited",
    "Shapoorji Pallonji",
    "Godrej Properties",
    "Lodha Group",
];

export default function FeaturedProjects() {
    const sectionRef = useRef(null);
    const carouselRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState("All Developers");
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const filteredProjects = selectedDeveloper === "All Developers"
        ? projects
        : projects.filter((p) => p.developer === selectedDeveloper);

    const scrollCarousel = (direction) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardWidth = container.firstElementChild?.clientWidth || 290;
        const scrollAmount = cardWidth + 18;

        if (direction === "prev") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const scrollToSlide = (index) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cards = container.children;
        if (cards[index]) {
            cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
        setActiveSlideIndex(index);
    };

    const handleScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardWidth = container.firstElementChild?.clientWidth || 290;
        const newIndex = Math.round(container.scrollLeft / (cardWidth + 18));
        if (newIndex >= 0 && newIndex < filteredProjects.length) {
            setActiveSlideIndex(newIndex);
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
                        OUR PORTFOLIO
                    </span>

                    <h2>Explore Our Featured Projects</h2>

                    <p>
                        Discover thoughtfully selected properties across Pune
                        that match your lifestyle and investment goals.
                    </p>
                </div>

                {/* Developer Filter Pills matching reference image */}
                <div className="featured-projects__tags-wrap" role="tablist" aria-label="Filter by developer">
                    {DEVELOPER_TAGS.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            role="tab"
                            aria-selected={selectedDeveloper === tag}
                            className={`featured-projects__tag-pill ${
                                selectedDeveloper === tag ? "featured-projects__tag-pill--active" : ""
                            }`}
                            onClick={() => {
                                setSelectedDeveloper(tag);
                                setActiveSlideIndex(0);
                                if (carouselRef.current) {
                                    carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                                }
                            }}
                        >
                            {tag}
                        </button>
                    ))}
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

                {/* Side-Scroll / Grid Cards Track */}
                <div
                    className="featured-projects__grid"
                    ref={carouselRef}
                    onScroll={handleScroll}
                    role="region"
                    aria-label="Featured landmark developments"
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
                                className={`featured-projects__dot ${
                                    dotIdx === activeSlideIndex ? "featured-projects__dot--active" : ""
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
