"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
    MapPin,
    FileText,
    Users,
    Building2,
    KeyRound,
    Landmark,
    Headset,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { workflowService } from "../../services/workflow.service";
import "./Workflow.css";

const ICON_MAP = {
    MapPin,
    FileText,
    Users,
    Building2,
    KeyRound,
    Landmark,
    Headset,
    Sparkles,
};

export const workflowSteps = [
    {
        id: 1,
        title: "Select Property",
        description: "Explore verified luxury properties and new launches that match your lifestyle and investment goals.",
        iconName: "MapPin",
        icon: MapPin,
    },
    {
        id: 2,
        title: "Submit Your Enquiry",
        description: "Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.",
        iconName: "FileText",
        icon: FileText,
    },
    {
        id: 3,
        title: "Meet Our Expert",
        description: "Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.",
        iconName: "Users",
        icon: Users,
    },
    {
        id: 4,
        title: "Visit Property",
        description: "Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.",
        iconName: "Building2",
        icon: Building2,
    },
    {
        id: 5,
        title: "Buy Property",
        description: "Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.",
        iconName: "KeyRound",
        icon: KeyRound,
    },
    {
        id: 6,
        title: "Loan Assistance",
        description: "Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.",
        iconName: "Landmark",
        icon: Landmark,
    },
    {
        id: 7,
        title: "Customer Support",
        description: "Ongoing documentation, legal verification, agreement registration, and lifetime handover support.",
        iconName: "Headset",
        icon: Headset,
    },
];

export default function Workflow({ previewData }) {
    const [fetchedSteps, setFetchedSteps] = useState([]);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadSteps = async () => {
            try {
                const res = await workflowService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setFetchedSteps(list);
                }
            } catch (err) {
                console.error("Failed to load workflow steps from DB:", err);
            }
        };
        loadSteps();
        return () => {
            isMounted = false;
        };
    }, []);

    const activeSteps = useMemo(() => {
        let rawList = workflowSteps;
        if (Array.isArray(previewData?.steps) && previewData.steps.length > 0) {
            rawList = previewData.steps;
        } else if (fetchedSteps.length > 0) {
            rawList = fetchedSteps;
        }

        return rawList.map((s, idx) => {
            const iconName = s.iconName || s.icon_name || (typeof s.icon === "string" ? s.icon : null);
            const ResolvedIcon =
                (iconName && ICON_MAP[iconName]) ||
                (typeof s.icon === "function" ? s.icon : null) ||
                workflowSteps[idx % workflowSteps.length].icon ||
                MapPin;

            return {
                ...s,
                icon: ResolvedIcon,
            };
        });
    }, [previewData?.steps, fetchedSteps]);

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
            className={`workflow-section ${isVisible ? "workflow-visible" : ""}`}
            id="workflow"
        >
            <div className="workflow-container">
                <div className="workflow-heading">
                    <span className="workflow-eyebrow">
                        {previewData?.eyebrow || "SIMPLE. TRANSPARENT. PERSONALIZED."}
                    </span>

                    <h2>
                        {previewData?.heading ? (
                            previewData.heading
                        ) : (
                            <>
                                Our <span>Workflow</span>
                            </>
                        )}
                    </h2>

                    <p>
                        {previewData?.subtitle ||
                            "From finding your ideal property to getting the keys, we guide you through every step."}
                    </p>
                </div>

                <div className="workflow-grid">
                    {activeSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                className="workflow-step"
                                key={step.id || step.title || index}
                                style={{
                                    "--step-index": index,
                                }}
                            >
                                <div className="workflow-icon-wrap">
                                    <div className="workflow-icon-circle">
                                        <Icon size={32} strokeWidth={1.7} />
                                    </div>

                                    <span className="workflow-number">
                                        {String(step.stepNumber || index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3>{step.title}</h3>

                                <p>{step.description}</p>

                                {index < activeSteps.length - 1 && (
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
