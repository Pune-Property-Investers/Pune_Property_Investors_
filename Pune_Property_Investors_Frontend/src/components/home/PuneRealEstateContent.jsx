"use client";

import { useEffect, useRef } from "react";
import "./PuneRealEstateContent.css";

export default function PuneRealEstateContent() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Reveal the section.
                    section.classList.add(
                        "pune-real-estate-content--visible"
                    );

                    // Stop observing so the animation runs only once.
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            className="pune-real-estate-content"
            id="real-estate-consultant-pune"
            ref={sectionRef}
        >
            <div className="pune-real-estate-content__container">
                <span className="pune-real-estate-content__label">
                    PUNE PROPERTY INVESTOR
                </span>

                <h2>
                    Your Trusted Real Estate Consultant in Pune
                </h2>

                <p>
                    Pune Property Investor is a reliable{" "}
                    <strong>Real Estate Consultant in Pune</strong>{" "}
                    that provides guidance to homebuyers and investors
                    looking for the right property in the city. We help
                    you make informed real estate decisions with a strong
                    focus on transparency, market research, and long-term
                    value. Whether you are buying your first home or
                    planning a property investment, our team helps you
                    explore options that suit your needs and budget.
                </p>

                <p>
                    As an experienced{" "}
                    <strong>Property Advisor in Pune</strong>, we help
                    buyers explore new-launch, under-construction, and
                    ready-to-move projects from reputed builders. We focus
                    on prominent residential locations such as Kharadi,
                    Hinjewadi, Baner, Wakad, Hadapsar, Viman Nagar, and
                    Balewadi. Our project comparisons, price analysis, and
                    rental-yield assessments help you evaluate properties
                    according to your goals.
                </p>

                <p>
                    As a trusted{" "}
                    <strong>Real Estate Agent in Pune</strong>, we simplify
                    the property-buying process through project
                    shortlisting, site visits, price negotiations, and
                    documentation support. Our research considers builder
                    reputation, infrastructure development, connectivity,
                    and local price trends to help you assess a property's
                    potential for long-term appreciation.
                </p>

                <p>
                    Our{" "}
                    <strong>
                        Real Estate Advisory Services in Pune
                    </strong>{" "}
                    help homebuyers and investors understand market trends
                    and make informed decisions. Hinjewadi can be attractive
                    to IT professionals because of its employment hubs,
                    while Baner and Wakad appeal to buyers seeking modern
                    residential communities and connectivity to business
                    districts and major roads. The right location depends
                    on your budget, lifestyle, and investment objectives.
                </p>

                <p>
                    At Pune Property Investor, our goal is to make your
                    property journey simpler, more transparent, and better
                    informed. Whether you need an honest real estate
                    consultant or a reliable property advisor in Pune,
                    we help you compare suitable options and move forward
                    with greater confidence toward your homeownership or
                    investment goals.
                </p>
            </div>
        </section>
    );
}
