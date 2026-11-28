"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Star, Quote } from "lucide-react";
import { testimonialService } from "../../services/testimonial.service";
import { testimonials as staticTestimonials } from "../../data/testimonials.js";
import "./Testimonials.css";

export default function Testimonials({ previewData, customTestimonials }) {
    const [dbTestimonials, setDbTestimonials] = useState([]);
    const sectionRef = useRef(null);

    // Fetch live testimonials from MySQL database
    useEffect(() => {
        let isMounted = true;
        const fetchTestimonials = async () => {
            try {
                const res = await testimonialService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setDbTestimonials(list);
                }
            } catch (err) {
                console.error("Failed to load testimonials from database:", err);
            }
        };

        fetchTestimonials();
        return () => {
            isMounted = false;
        };
    }, []);

    // Priority: previewData.items > customTestimonials > dbTestimonials > staticTestimonials
    const items = useMemo(() => {
        if (Array.isArray(previewData?.items) && previewData.items.length > 0) {
            return previewData.items;
        }
        if (Array.isArray(customTestimonials) && customTestimonials.length > 0) {
            return customTestimonials.filter((t) => t.visible !== false);
        }
        if (dbTestimonials.length > 0) {
            return dbTestimonials.filter((t) => t.isActive !== false);
        }
        return staticTestimonials;
    }, [previewData?.items, customTestimonials, dbTestimonials]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("testimonials--visible");
                }
            },
            {
                threshold: 0.05,
            }
        );

        observer.observe(section);
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            className="testimonials"
            id="testimonials"
            ref={sectionRef}
        >
            <div className="testimonials__container">
                {/* SECTION HEADING */}
                <div className="testimonials__heading">
                    <span
                        className="testimonials__eyebrow testimonials-animate"
                        style={{ "--card-index": 0 }}
                    >
                        {previewData?.eyebrow ?? "CLIENT EXPERIENCES"}
                    </span>

                    <h2
                        className="testimonials-animate"
                        style={{ "--card-index": 1 }}
                    >
                        {previewData?.heading ?? "What Our Customers Say"}
                    </h2>

                    <p
                        className="testimonials-animate"
                        style={{ "--card-index": 2 }}
                    >
                        {previewData?.subtitle ??
                            "Every property journey is different. Hear from verified homebuyers and investors about their experiences with Pune Property Investors."}
                    </p>
                </div>

                {/* TESTIMONIAL CARDS */}
                <div className="testimonials__grid">
                    {items.map((testimonial, index) => (
                        <article
                            className="testimonial-card testimonials-animate"
                            key={testimonial.id || index}
                            style={{ "--card-index": index + 3 }}
                        >
                            <Quote
                                className="testimonial-card__quote"
                                size={32}
                                aria-hidden="true"
                            />

                            {/* STAR RATING */}
                            <div
                                className="testimonial-card__rating"
                                aria-label={`${testimonial.rating || 5} out of 5 stars`}
                                role="img"
                            >
                                {Array.from(
                                    { length: Number(testimonial.rating || 5) },
                                    (_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={17}
                                            fill="currentColor"
                                            aria-hidden="true"
                                        />
                                    )
                                )}
                            </div>

                            {/* TESTIMONIAL TEXT */}
                            <p className="testimonial-card__text">
                                "{testimonial.text}"
                            </p>

                            {/* CUSTOMER DETAILS */}
                            <div className="testimonial-card__author">
                                {testimonial.avatarUrl ? (
                                    <img
                                        src={testimonial.avatarUrl}
                                        alt={testimonial.name}
                                        className="testimonial-card__avatar-img"
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="testimonial-card__avatar"
                                        aria-hidden="true"
                                    >
                                        {testimonial.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "C"}
                                    </div>
                                )}

                                <div>
                                    <h3>{testimonial.name}</h3>

                                    <span>
                                        {testimonial.role}
                                        {testimonial.location ? `, ${testimonial.location}` : ""}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
