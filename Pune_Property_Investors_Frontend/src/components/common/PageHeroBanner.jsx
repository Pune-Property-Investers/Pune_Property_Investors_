"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";

const DEFAULT_BG =
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85";

export default function PageHeroBanner({
    title,
    titleAccent,
    eyebrow = "PUNE PROPERTY INVESTOR",
    description,
    breadcrumbs = [],
    backgroundImage = DEFAULT_BG,
    icon: Icon = Building2,
}) {
    return (
        <section className="page-hero">
            <div
                className="page-hero__background"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="page-hero__overlay" />

            <div className="page-hero__content">
                {eyebrow && (
                    <div className="page-hero__eyebrow">
                        {Icon && <Icon size={16} />}
                        <span>{eyebrow}</span>
                    </div>
                )}

                <h1>
                    {title}
                    {titleAccent && <span> {titleAccent}</span>}
                </h1>

                {description && (
                    <p className="page-hero__description">{description}</p>
                )}

                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav
                        className="page-hero__breadcrumb"
                        aria-label="Breadcrumb"
                    >
                        {breadcrumbs.map((crumb, idx) => {
                            const isLast = idx === breadcrumbs.length - 1;
                            return (
                                <span
                                    key={crumb.label}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    {crumb.href && !isLast ? (
                                        <Link href={crumb.href}>
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="page-hero__breadcrumb-current">
                                            {crumb.label}
                                        </span>
                                    )}
                                    {!isLast && (
                                        <span className="page-hero__breadcrumb-separator">
                                            /
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                )}
            </div>
        </section>
    );
}

