"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PropertyCard from "../properties/PropertyCard";
import { projects } from "../../data/projects";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Replay animation whenever the section
                // enters or leaves the viewport.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className={`featured-projects ${isVisible ? "featured-projects--visible" : ""
                }`}
        >
            <div className="featured-projects__container">
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

                <div className="featured-projects__grid">
                    {projects.map((project, index) => (
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

                <div className="featured-projects__footer">
                    <Link href="/properties" className="button button-outline">
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
}
