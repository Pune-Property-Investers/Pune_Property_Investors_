"use client";

import { useEffect, useRef, useState } from "react";
import {
    MapPin,
    FileText,
    Users,
    Building2,
    KeyRound,
    Landmark,
    Headset,
    ArrowRight,
} from "lucide-react";

import "./Workflow.css";

const workflowSteps = [
    {
        title: "Select Property",
        description: "Explore properties that match your needs.",
        icon: MapPin,
    },
    {
        title: "Submit Your Enquiry",
        description: "Tell us your preferred location and budget.",
        icon: FileText,
    },
    {
        title: "Meet Our Expert",
        description: "Get personalized property guidance.",
        icon: Users,
    },
    {
        title: "Visit Property",
        description: "Schedule a site visit and explore your options.",
        icon: Building2,
    },
    {
        title: "Buy Property",
        description: "Take the next step towards your dream property.",
        icon: KeyRound,
    },
    {
        title: "Loan Assistance",
        description: "Understand your home-loan options.",
        icon: Landmark,
    },
    {
        title: "Customer Support",
        description: "We're here to help throughout your journey.",
        icon: Headset,
    },
];

export default function Workflow() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
            className={`workflow-section ${isVisible ? "workflow-visible" : ""
                }`}
            id="workflow"
        >
            <div className="workflow-container">
                <div className="workflow-heading">
                    <span className="workflow-eyebrow">
                        SIMPLE. TRANSPARENT. PERSONALIZED.
                    </span>

                    <h2>
                        Our <span>Workflow</span>
                    </h2>

                    <p>
                        From finding your ideal property to getting the keys,
                        we guide you through every step.
                    </p>
                </div>

                <div className="workflow-grid">
                    {workflowSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                className="workflow-step"
                                key={step.title}
                                style={{
                                    "--step-index": index,
                                }}
                            >
                                <div className="workflow-icon-wrap">
                                    <div className="workflow-icon-circle">
                                        <Icon
                                            size={32}
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    <span className="workflow-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3>{step.title}</h3>

                                <p>{step.description}</p>

                                {index < workflowSteps.length - 1 && (
                                    <ArrowRight
                                        className="workflow-arrow"
                                        size={22}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
