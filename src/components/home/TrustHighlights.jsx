"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheck, CirclePercent, Sparkles } from "lucide-react";
import "./TrustHighlights.css";

const TRUST_ITEMS = [
    {
        id: "trust",
        title: "100% TRUST",
        desc: "Complete Transparency. Confident Decisions.",
        icon: ShieldCheck,
    },
    {
        id: "brokerage",
        title: "ZERO BROKERAGE",
        desc: "No Brokerage. No Hidden Charges.",
        icon: CirclePercent,
    },
    {
        id: "price",
        title: "BEST LAUNCH PRICE",
        desc: "Exclusive Launch Offers. Maximum Savings.",
        icon: Sparkles,
    },
];

function TypewriterHeader({ text, isStarted }) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isStarted) return;

        setShowCursor(true);
        let index = 0;
        let intervalId;

        // Gentle pause before starting typing
        const initialTimer = setTimeout(() => {
            intervalId = setInterval(() => {
                index++;
                setDisplayedText(text.slice(0, index));

                if (index >= text.length) {
                    clearInterval(intervalId);
                    // Keep cursor blinking calmly after completion, then fade out
                    setTimeout(() => {
                        setShowCursor(false);
                    }, 1500);
                }
            }, 110);
        }, 200);

        return () => {
            clearTimeout(initialTimer);
            if (intervalId) clearInterval(intervalId);
        };
    }, [isStarted, text]);

    // SSR fallback: pre-render the full text for search engines and SEO
    if (!isMounted) {
        return <span className="trust-highlights__typing-text">{text}</span>;
    }

    return (
        <span className="trust-highlights__typing-wrapper">
            <span className="trust-highlights__typing-text">{displayedText}</span>
            {showCursor && (
                <span className="trust-highlights__cursor" aria-hidden="true">
                    |
                </span>
            )}
        </span>
    );
}

export default function TrustHighlights() {
    const sectionRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) {
            setIsStarted(true);
            return;
        }

        if (typeof window !== "undefined" && !window.IntersectionObserver) {
            setIsStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="trust-highlights"
            aria-label="Trust and Benefits"
        >
            <div className="trust-highlights__card">
                {TRUST_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={item.id} className="trust-highlights__item">
                            <div className="trust-highlights__header">
                                    <span
                                        className={`trust-highlights__icon-box trust-highlights__icon-box--${item.id}`}
                                    >
                                        <IconComponent size={16} strokeWidth={2.4} />
                                    </span>
                                    <h3 className="trust-highlights__title">
                                        <TypewriterHeader
                                            text={item.title}
                                            isStarted={isStarted}
                                        />
                                    </h3>
                            </div>
                            <p className="trust-highlights__desc">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
