"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
    Users,
    UserRoundCheck,
    CarFront,
    Building2,
    CirclePercent,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { trustStatService } from "../../services/trustStat.service";
import "./TrustStats.css";

const ICON_MAP = {
    Users,
    UserRoundCheck,
    CarFront,
    Building2,
    CirclePercent,
    Sparkles,
    ShieldCheck,
};

export const stats = [
    { id: 1, target: 200, suffix: " +", label: "Team Size", iconName: "Users", icon: Users },
    { id: 2, target: 20000, suffix: " +", label: "Happy Clients", iconName: "UserRoundCheck", icon: UserRoundCheck },
    { id: 3, target: 10000, suffix: " +", label: "Site Visits", iconName: "CarFront", icon: CarFront },
    { id: 4, target: 900000, suffix: " +", label: "Sq. Ft Sold Till Date", iconName: "Building2", icon: Building2 },
    { id: 5, target: 0, suffix: " %", label: "Brokerage", iconName: "CirclePercent", icon: CirclePercent },
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
    const [fetchedStats, setFetchedStats] = useState([]);
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadStats = async () => {
            try {
                const res = await trustStatService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setFetchedStats(list);
                }
            } catch (err) {
                console.error("Failed to load trust stats from DB:", err);
            }
        };
        loadStats();
        return () => {
            isMounted = false;
        };
    }, []);

    const activeStats = useMemo(() => {
        let rawList = stats;
        if (Array.isArray(previewData?.stats) && previewData.stats.length > 0) {
            rawList = previewData.stats;
        } else if (fetchedStats.length > 0) {
            rawList = fetchedStats;
        }

        return rawList.map((s, idx) => {
            const iconName = s.iconName || s.icon_name || (typeof s.icon === "string" ? s.icon : null);
            const ResolvedIcon =
                (iconName && ICON_MAP[iconName]) ||
                (typeof s.icon === "function" ? s.icon : null) ||
                stats[idx % stats.length].icon ||
                Users;

            return {
                ...s,
                target: Number(s.targetValue ?? s.target) || 0,
                suffix: s.suffix !== undefined ? s.suffix : " +",
                icon: ResolvedIcon,
            };
        });
    }, [previewData?.stats, fetchedStats]);

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
                                key={stat.id || stat.statKey || stat.label || index}
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
