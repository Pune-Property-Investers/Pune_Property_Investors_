"use client";

import { useEffect, useRef, useState } from "react";
import {
    UserRoundCheck,
    MapPinned,
    Handshake,
    ShieldCheck,
    MessagesSquare,
    ChartNoAxesCombined,
} from "lucide-react";

import "./WhyChooseUs.css";

const reasons = [
    {
        icon: UserRoundCheck,
        title: "Personalized Guidance",
        description:
            "Property recommendations tailored to your requirements, preferences, and budget.",
    },
    {
        icon: MapPinned,
        title: "Local Market Knowledge",
        description:
            "Explore residential opportunities across Pune and its growing neighborhoods.",
    },
    {
        icon: Handshake,
        title: "Customer-Focused Service",
        description:
            "Get support throughout your property search and decision-making journey.",
    },
    {
        icon: ShieldCheck,
        title: "Informed Decisions",
        description:
            "Understand important property details and questions to consider before buying.",
    },
    {
        icon: MessagesSquare,
        title: "Clear Communication",
        description:
            "Discuss your requirements and get clear information about shortlisted properties.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Investment Perspective",
        description:
            "Compare locations, budgets, and property options against your investment objectives.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
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
            className={`why-choose-us ${isVisible ? "why-choose-us--visible" : ""
                }`}
            id="why-choose-us"
        >
            <div className="why-choose-us__container">
                <div className="why-choose-us__heading">
                    <span
                        className="why-choose-us__eyebrow why-animate"
                        style={{ "--card-index": 0 }}
                    >
                        THE PPI DIFFERENCE
                    </span>

                    <h2
                        className="why-animate"
                        style={{ "--card-index": 1 }}
                    >
                        Why Choose Pune Property Investors?
                    </h2>

                    <p
                        className="why-animate"
                        style={{ "--card-index": 2 }}
                    >
                        We help simplify your property search with
                        personalized assistance and a focus on your needs.
                    </p>
                </div>

                <div className="why-choose-us__grid">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <article
                                className="why-card why-animate"
                                key={reason.title}
                                style={{
                                    "--card-index": index + 3,
                                }}
                            >
                                <div className="why-card__icon">
                                    <Icon size={27} strokeWidth={1.7} />
                                </div>

                                <div className="why-card__content">
                                    <h3>{reason.title}</h3>
                                    <p>{reason.description}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}