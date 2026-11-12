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
        line1: "BEST LAUNCH",
        line2: "PRICE",
        desc: "Exclusive Launch Offers. Maximum Savings.",
        icon: Sparkles,
    },
];

    function TypewriterHeader({ title, line1, line2, isStarted }) {
        const isMultiLine = Boolean(line1 && line2);
        const fullText = isMultiLine ? `${line1} ${line2}` : title;
        const [charCount, setCharCount] = useState(0);
        const [showCursor, setShowCursor] = useState(false);
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        useEffect(() => {
            if (!isStarted) return;

            setShowCursor(true);
            let count = 0;
            let intervalId;

            // Smooth initial breath before typing begins
            const initialTimer = setTimeout(() => {
                intervalId = setInterval(() => {
                    count++;
                    setCharCount(count);

                        if (count >= fullText.length) {
                            clearInterval(intervalId);
                            // Keep cursor pulsing gently then smoothly fade out
                            setTimeout(() => {
                                setShowCursor(false);
                        }, 1400);
            }
}, 70);
        }, 180);

return () => {
    clearTimeout(initialTimer);
    if (intervalId) clearInterval(intervalId);
};
    }, [isStarted, fullText]);

// SSR fallback: pre-render the full text for search engines and SEO
if (!isMounted) {
    if (isMultiLine) {
        return (
            <span className="trust-highlights__typing-wrapper trust-highlights__typing-wrapper--multiline">
                <span className="trust-highlights__title-line1">{line1}</span>
                <span className="trust-highlights__break-mobile" />
                <span className="trust-highlights__title-line2">{line2}</span>
            </span>
        );
    }
    return <span className="trust-highlights__typing-text">{title}</span>;
}

if (isMultiLine) {
    // Line 1: line1 (e.g. "BEST LAUNCH", 11 chars)
    // Line 2: line2 (e.g. "PRICE", 5 chars)
    const line1Target = line1.length;
    const line1Count = Math.min(charCount, line1Target);
    // After line1 and the space, count progresses for line2
    const line2Count = Math.max(0, Math.min(charCount - (line1Target + 1), line2.length));

    const displayedLine1 = line1.slice(0, line1Count);
    const displayedLine2 = line2.slice(0, line2Count);
    const isCursorOnLine1 = charCount <= line1Target;

    return (
        <span className="trust-highlights__typing-wrapper trust-highlights__typing-wrapper--multiline">
            <span className="trust-highlights__title-line1">
                {displayedLine1}
                {showCursor && isCursorOnLine1 && (
                    <span className="trust-highlights__cursor" aria-hidden="true">
                        |
                    </span>
                )}
            </span>
            <span className="trust-highlights__break-mobile" />
            {(charCount > line1Target || displayedLine2.length > 0) && (
                <span className="trust-highlights__title-line2">
                    {displayedLine2}
                    {showCursor && !isCursorOnLine1 && (
                        <span className="trust-highlights__cursor" aria-hidden="true">
                            |
                        </span>
                    )}
                </span>
            )}
        </span>
    );
}

return (
    <span className="trust-highlights__typing-wrapper">
        <span className="trust-highlights__typing-text">
            {title.slice(0, charCount)}
        </span>
        {showCursor && (
            <span className="trust-highlights__cursor" aria-hidden="true">
                |
            </span>
        )}
    </span>
);
}

export default function TrustHighlights({ previewData }) {
    const sectionRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    const resolvedItems = Array.isArray(previewData?.items) && previewData.items.length > 0
        ? previewData.items.map((item, idx) => ({
            ...TRUST_ITEMS[idx % TRUST_ITEMS.length],
            ...item,
        }))
        : TRUST_ITEMS;

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
            className={`trust-highlights ${isStarted ? "trust-highlights--visible" : ""}`}
            aria-label="Trust and Benefits"
        >
            <div className="trust-highlights__card">
                {resolvedItems.map((item) => {
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
                                        title={item.title}
                                        line1={item.line1}
                                        line2={item.line2}
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
