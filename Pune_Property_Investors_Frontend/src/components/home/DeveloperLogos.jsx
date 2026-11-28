"use client";

import { useState, useEffect, useMemo } from "react";
import { developerService } from "../../services/developer.service";
import "./DeveloperLogos.css";

export const developers = [
    { id: 1, name: "Shapoorji Pallonji", slug: "shapoorji-pallonji", domain: "shapoorjirealestate.com", logoUrl: "/images/logos/shapoorji.svg" },
    { id: 2, name: "Vilas Javdekar", slug: "vilas-javdekar", domain: "vilasjavdekar.com" },
    { id: 3, name: "Pride Purple", slug: "pride-purple", domain: "pridepurpleproperties.com" },
    { id: 4, name: "Kohinoor Group", slug: "kohinoor-group", domain: "kohinoorpune.com", logoUrl: "/images/logos/kohinoor.png" },
    { id: 5, name: "Kolte Patil", slug: "kolte-patil", domain: "koltepatil.com", logoUrl: "/images/logos/kolte-patil.jpg" },
    { id: 6, name: "Gera Developments", slug: "gera-developments", domain: "gera.in" },
    { id: 7, name: "VTP Realty", slug: "vtp-realty", domain: "vtprealty.in", logoUrl: "/images/logos/vtp.png" },
    { id: 8, name: "K Raheja Corp", slug: "k-raheja-corp", domain: "krahejacorp.com", logoUrl: "/images/logos/kraheja.jpg" },
    { id: 9, name: "SS Group", slug: "ss-group", domain: "ssgroupindia.com" },
    { id: 10, name: "Pristine Developers", slug: "pristine-developers", domain: "pristineproperties.com" },
    { id: 11, name: "Lodha", slug: "lodha-group", domain: "lodhagroup.com", logoUrl: "/images/logos/lodha.png" },
    { id: 12, name: "Godrej Properties", slug: "godrej-properties", domain: "godrejproperties.com", logoUrl: "/images/logos/godrej.svg" },
    { id: 13, name: "Mahindra Lifespaces", slug: "mahindra-lifespaces", domain: "mahindralifespaces.com" },
    { id: 14, name: "JP Morgan", slug: "jp-morgan", domain: "jpmorgan.com" },
];

function DeveloperCard({ developer }) {
    const [imageFailed, setImageFailed] = useState(false);

    // Loads custom logo if provided, otherwise website icon from Google's favicon service.
    const imageUrl =
        developer.logoUrl ||
        developer.logo_url ||
        (developer.domain ? `https://www.google.com/s2/favicons?domain=${developer.domain}&sz=128` : "");

    return (
        <div className="developer-logo-card">
            {!imageFailed && imageUrl ? (
                <img
                    className="developer-logo-img"
                    src={imageUrl}
                    alt={`${developer.name} brand logo`}
                    loading="lazy"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <span className="developer-logo-fallback">
                    {developer.name?.charAt(0) || "P"}
                </span>
            )}

            <span className="developer-logo-name">{developer.name}</span>
        </div>
    );
}

function DeveloperTrack({ reverse = false, items = developers }) {
    const repeatedDevelopers = useMemo(() => [...items, ...items], [items]);

    return (
        <div className="developer-track-window">
            <div
                className={`developer-track ${
                    reverse ? "developer-track--reverse" : ""
                }`}
            >
                {repeatedDevelopers.map((developer, index) => (
                    <DeveloperCard
                        key={`${developer.slug || developer.name}-${index}`}
                        developer={developer}
                    />
                ))}
            </div>
        </div>
    );
}

export default function DeveloperLogos({ previewData }) {
    const [fetchedDevelopers, setFetchedDevelopers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const loadDevelopers = async () => {
            try {
                const res = await developerService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setFetchedDevelopers(list);
                }
            } catch (err) {
                console.error("Failed to load developers from DB:", err);
            }
        };
        loadDevelopers();
        return () => {
            isMounted = false;
        };
    }, []);

    const activeDevelopers = useMemo(() => {
        if (Array.isArray(previewData?.items) && previewData.items.length > 0) {
            return previewData.items;
        }
        if (fetchedDevelopers.length > 0) {
            return fetchedDevelopers;
        }
        return developers;
    }, [previewData?.items, fetchedDevelopers]);

    return (
        <section className="developer-logos-section">
            <div className="developer-logos-heading">
                <span className="developer-logos-eyebrow">
                    {previewData?.eyebrow || "OUR TRUSTED NETWORK"}
                </span>

                <h2>
                    {previewData?.heading ? (
                        previewData.heading
                    ) : (
                        <>
                            Leading Real Estate <span>Developers</span>
                        </>
                    )}
                </h2>

                <p>
                    {previewData?.subtitle || "Explore trusted developers and quality properties across Pune."}
                </p>

                <div className="developer-heading-line" />
            </div>

            <div className="developer-logos-rows">
                <DeveloperTrack items={activeDevelopers} />
                <DeveloperTrack reverse items={activeDevelopers} />
            </div>
        </section>
    );
}
