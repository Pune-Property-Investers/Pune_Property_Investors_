"use client";

import { useState } from "react";
import "./DeveloperLogos.css";

const developers = [
    { name: "Shapoorji Pallonji", domain: "shapoorjirealestate.com" },
    { name: "Vilas Javdekar", domain: "vilasjavdekar.com" },
    { name: "Pride Purple", domain: "pridepurpleproperties.com" },
    { name: "Kohinoor Group", domain: "kohinoorpune.com" },
    { name: "Kolte Patil", domain: "koltepatil.com" },
    { name: "Gera Developments", domain: "gera.in" },
    { name: "VTP Realty", domain: "vtprealty.in" },
    { name: "K Raheja Corp", domain: "kraheja.com" },
    { name: "SS Group", domain: "ssgroupindia.com" },
    { name: "Pristine Developers", domain: "pristineproperties.com" },
    { name: "Lodha", domain: "lodhagroup.com" },
    { name: "Godrej Properties", domain: "godrejproperties.com" },
    { name: "Mahindra Lifespaces", domain: "mahindralifespaces.com" },
];

function DeveloperCard({ developer }) {
    const [imageFailed, setImageFailed] = useState(false);

    // Loads the website icon directly from Google's favicon service.
    const imageUrl = `https://www.google.com/s2/favicons?domain=${developer.domain}&sz=128`;

    return (
        <div className="developer-logo-card">
            {!imageFailed ? (
                <img
                    className="developer-logo-img"
                    src={imageUrl}
                    alt={`${developer.name} website icon`}
                    loading="lazy"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <span className="developer-logo-fallback">
                    {developer.name.charAt(0)}
                </span>
            )}

            <span className="developer-logo-name">{developer.name}</span>
        </div>
    );
}

function DeveloperTrack({ reverse = false }) {
    const repeatedDevelopers = [...developers, ...developers];

    return (
        <div className="developer-track-window">
            <div
                className={`developer-track ${
                    reverse ? "developer-track--reverse" : ""
                }`}
            >
                {repeatedDevelopers.map((developer, index) => (
                    <DeveloperCard
                        key={`${developer.name}-${index}`}
                        developer={developer}
                    />
                ))}
            </div>
        </div>
    );
}

export default function DeveloperLogos() {
    return (
        <section className="developer-logos-section">
            <div className="developer-logos-heading">
                <span className="developer-logos-eyebrow">
                    OUR TRUSTED NETWORK
                </span>

                <h2>
                    Leading Real Estate <span>Developers</span>
                </h2>

                <p>
                    Explore trusted developers and quality properties across Pune.
                </p>

                <div className="developer-heading-line" />
            </div>

            <div className="developer-logos-rows">
                <DeveloperTrack />
                <DeveloperTrack reverse />
            </div>
        </section>
    );
}
