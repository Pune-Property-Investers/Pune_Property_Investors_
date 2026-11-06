"use client";

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

export default function TrustHighlights() {
    return (
        <section className="trust-highlights" aria-label="Trust and Benefits">
            <div className="trust-highlights__card">
                {TRUST_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={item.id} className="trust-highlights__item">
                            <div className="trust-highlights__header">
                                <span className="trust-highlights__icon-box">
                                    <IconComponent size={18} strokeWidth={2.2} />
                                </span>
                                <h3 className="trust-highlights__title">{item.title}</h3>
                            </div>
                            <p className="trust-highlights__desc">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

