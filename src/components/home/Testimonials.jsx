"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials.js";
import "./Testimonials.css";

export default function Testimonials() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("testimonials--visible");
                } else {
                    section.classList.remove("testimonials--visible");
                }
            },
            {
                threshold: 0.15,
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
                        CLIENT EXPERIENCES
                    </span>

                    <h2
                        className="testimonials-animate"
                        style={{ "--card-index": 1 }}
                    >
                        What Our Customers Say
                    </h2>

                    <p
                        className="testimonials-animate"
                        style={{ "--card-index": 2 }}
                    >
                        Every property journey is different. Hear from
                        customers about their experiences with us.
                    </p>
                </div>

                {/* TESTIMONIAL CARDS */}
                <div className="testimonials__grid">
                    {testimonials.map((testimonial, index) => (
                        <article
                            className="testimonial-card testimonials-animate"
                            key={testimonial.id}
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
                                aria-label={`${testimonial.rating} out of 5 stars`}
                                role="img"
                            >
                                {Array.from(
                                    { length: testimonial.rating },
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
                                <div
                                    className="testimonial-card__avatar"
                                    aria-hidden="true"
                                >
                                    {testimonial.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <h3>{testimonial.name}</h3>

                                    <span>
                                        {testimonial.role},{" "}
                                        {testimonial.location}
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
