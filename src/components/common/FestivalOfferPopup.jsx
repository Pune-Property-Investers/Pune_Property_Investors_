"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X, ArrowRight, Tag } from "lucide-react";
import { usePublishedCms } from "../../services/liveContent";
import "./FestivalOfferPopup.css";

function matchesTargetPages(pages, pathname) {
    const path = pathname || "/";
    switch (pages) {
        case "home":
            return path === "/";
        case "properties":
            return (
                path.startsWith("/buy") ||
                path.startsWith("/properties") ||
                path.startsWith("/property") ||
                path.startsWith("/commercial") ||
                path.startsWith("/plots")
            );
        case "projects":
            return path.startsWith("/projects") || path.startsWith("/new-launches");
        case "all":
        default:
            return true;
    }
}

export default function FestivalOfferPopup() {
    const published = usePublishedCms();
    const pathname = usePathname() || "/";
    const popup = published?.festivalPopup;

    const [readyKey, setReadyKey] = useState("");
    const [dismissedKey, setDismissedKey] = useState("");

    const versionKey = popup?.updatedAt || "active";
    const isEnabled = Boolean(popup?.enabled && popup?.title?.trim());
    const matchesPage = matchesTargetPages(popup?.pages, pathname);
    const sessionDismissed =
        Boolean(popup?.showOncePerSession) &&
        typeof window !== "undefined" &&
        sessionStorage.getItem(`ppi_festival_dismissed_${versionKey}`) === "1";

    const isVisible =
        isEnabled &&
        matchesPage &&
        readyKey === versionKey &&
        dismissedKey !== versionKey &&
        !sessionDismissed;

    const handleDismiss = useCallback(() => {
        setDismissedKey(versionKey);
        if (popup?.showOncePerSession && typeof window !== "undefined") {
            sessionStorage.setItem(`ppi_festival_dismissed_${versionKey}`, "1");
        }
    }, [popup?.showOncePerSession, versionKey]);

    useEffect(() => {
        if (!isEnabled || !matchesPage || sessionDismissed || dismissedKey === versionKey) {
            return;
        }

        const delayMs = Math.max(0, Number(popup?.delaySeconds ?? 1)) * 1000;
        const timer = setTimeout(() => setReadyKey(versionKey), delayMs);
        return () => clearTimeout(timer);
    }, [isEnabled, matchesPage, sessionDismissed, dismissedKey, popup?.delaySeconds, versionKey]);

    useEffect(() => {
        if (!isVisible) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                handleDismiss();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isVisible, handleDismiss]);

    if (!isVisible) {
        return null;
    }

    const position = popup.position || "center";
    const isCenter = position === "center";

    const card = (
        <div
            className={`festival-popup festival-popup--${position}`}
            role="dialog"
            aria-modal={isCenter ? "true" : "false"}
            aria-label={popup.title}
        >
            <button
                type="button"
                className="festival-popup__close"
                onClick={handleDismiss}
                aria-label="Close festival offer"
            >
                <X size={16} />
            </button>

            {popup.image && (
                <div className="festival-popup__media">
                    <img src={popup.image} alt={popup.title} />
                </div>
            )}

            <div className="festival-popup__body">
                {popup.badge && (
                    <span className="festival-popup__badge">
                        <Sparkles size={12} />
                        {popup.badge}
                    </span>
                )}

                <h3 className="festival-popup__title">{popup.title}</h3>

                {popup.subtitle && (
                    <p className="festival-popup__subtitle">{popup.subtitle}</p>
                )}

                {popup.description && (
                    <p className="festival-popup__desc">{popup.description}</p>
                )}

                {popup.offerCode && (
                    <div className="festival-popup__code">
                        <Tag size={13} />
                        <span>Code:</span>
                        <strong>{popup.offerCode}</strong>
                    </div>
                )}

                {popup.buttonText && (
                    <Link
                        href={popup.buttonUrl || "/contact"}
                        className="festival-popup__cta"
                        onClick={handleDismiss}
                    >
                        <span>{popup.buttonText}</span>
                        <ArrowRight size={15} />
                    </Link>
                )}
            </div>
        </div>
    );

    if (isCenter) {
        return (
            <div className="festival-popup-backdrop" onClick={handleDismiss}>
                <div onClick={(e) => e.stopPropagation()}>{card}</div>
            </div>
        );
    }

    return card;
}
