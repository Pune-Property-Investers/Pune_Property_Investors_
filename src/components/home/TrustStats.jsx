"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
    Users,
    UserRoundCheck,
    CarFront,
    Building2,
    CirclePercent,
} from "lucide-react";

import "./TrustStats.css";

export const stats = [
    { target: 200, suffix: " +", label: "Team Size", icon: Users },
    { target: 20000, suffix: " +", label: "Happy Clients", icon: UserRoundCheck },
    { target: 10000, suffix: " +", label: "Site Visits", icon: CarFront },
    { target: 900000, suffix: " +", label: "Sq. Ft Sold Till Date", icon: Building2 },
    { target: 0, suffix: " %", label: "Brokerage", icon: CirclePercent },
];

function AnimatedNumber({ target, suffix, started }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!started || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        let frameId;
        let startTime;

        const animate = (timestamp) => {
            if (startTime === undefined) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic for satisfying counter effect
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            setCount(value);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [started, target]);

    return (
        <>
            {count.toLocaleString("en-IN")}
            {suffix}
        </>
    );
}

    function SpeedometerDottedRing({ active = false, id = 0 }) {
        const maskId = `speedo-dots-mask-${id}`;
        return (
            <svg
                className="trust-stats__speedo-dots"
                viewBox="0 0 100 100"
                aria-hidden="true"
            >
            <defs>
                    <mask id={maskId}>
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="264"
                            className={`trust-stats__speedo-sweep ${active ? "is-active" : ""}`}
                        />
                    </mask>
                </defs>

                {/* Base faint gold dotted ring */}
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#efe8dc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0.1 5.5"
                />

                    {/* Active gold dots that sweep in like a speedometer accelerating */}
            <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#a77a48"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0.1 5.5"
                    mask={`url(#${maskId})`}
                    className="trust-stats__speedo-active-dots"
                />
            </svg>
        );
    }

    export default function TrustStats({ previewData }) {
        const activeStats =
            Array.isArray(previewData?.stats) && previewData.stats.length > 0
                ? previewData.stats.map((s, idx) => ({
                    ...s,
                    target: Number(s.target) || 0,
                    icon: stats[idx % stats.length].icon,
                }))
                : stats;
        const sectionRef = useRef(null);
        const [started, setStarted] = useState(false);

        useEffect(() => {
            const section = sectionRef.current;
            if (!section || started) return;

            const triggerAnimation = () => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        setStarted(true);
                    }
                }
            };

            // Check immediately on mount in case section is already in or near viewport
            triggerAnimation();

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setStarted(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.02, rootMargin: "60px 0px" }
            );

            observer.observe(section);
            window.addEventListener("scroll", triggerAnimation, { passive: true });

            return () => {
                observer.disconnect();
                window.removeEventListener("scroll", triggerAnimation);
            };
        }, [started]);

        return (
            <section
                ref={sectionRef}
                className={`trust-stats ${started ? "trust-stats--visible" : ""}`}
                aria-label="Our achievements"
            >
                <div className="trust-stats__inner">
                    <div className="trust-stats__heading-wrap">
                        <span className="trust-stats__eyebrow">
                            {previewData?.eyebrow || "OUR ACHIEVEMENTS"}
                        </span>

                        <h2 className="trust-stats__heading">
                            {previewData?.heading || "Trusted by Professionals Across Pune"}
                        </h2>

                        <span className="trust-stats__heading-line" />
                    </div>

                    <div className="trust-stats__grid">
                        {activeStats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <article
                                    className="trust-stats__card"
                                    key={stat.label}
                                    style={{ "--stat-index": index }}
                                >
                                    <div className="trust-stats__icon-ring">
                                        <SpeedometerDottedRing active={started} id={index} />
                                        <div className="trust-stats__icon">
                                            <Icon
                                                size={26}
                                                strokeWidth={1.8}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <span className="trust-stats__number-badge">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h3 className="trust-stats__value">
                                        <AnimatedNumber
                                            target={stat.target}
                                            suffix={stat.suffix}
                                            started={started}
                                        />
                                    </h3>

                                    <p className="trust-stats__label">
                                        {stat.label}
                                    </p>

                                    <span className="trust-stats__accent" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
