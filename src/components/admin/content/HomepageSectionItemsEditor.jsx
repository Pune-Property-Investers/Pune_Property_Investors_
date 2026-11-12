"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import { featuredPuneProjects } from "../../home/FeaturedProperties";
import { newLaunchProjects } from "../../home/NewLaunchProjects";
import { featuredListings } from "../../home/FeaturedProp";
import { workflowSteps } from "../../home/Workflow";
import { developers as defaultDevelopers } from "../../home/DeveloperLogos";
import { stats as defaultStats } from "../../home/TrustStats";

function extractYtId(url) {
    if (!url) return "";
    const m = String(url).match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : "";
}

function AccordionCard({ title, subtitle, isOpen, onToggle, onRemove, children }) {
    return (
        <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                background: "#f8fafc",
                marginBottom: 8,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    cursor: "pointer",
                    background: isOpen ? "#eff6ff" : "#f8fafc",
                    gap: 8,
                }}
                onClick={onToggle}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {title}
                    </span>
                    {subtitle && (
                        <span style={{ fontSize: 11.5, color: "#64748b", whiteSpace: "nowrap" }}>
                            ({subtitle})
                        </span>
                    )}
                </div>
                {onRemove && (
                    <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        title="Remove item"
                    >
                        <Trash2 size={12} />
                    </button>
                )}
            </div>
            {isOpen && <div style={{ padding: 12, background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>{children}</div>}
        </div>
    );
}

export default function HomepageSectionItemsEditor({ sectionType, sectionData, updateSectionData }) {
    const [openIdx, setOpenIdx] = useState(0);

    // 1. Featured Properties (YouTube Video Tours + Left-Side Below Gallery)
    if (sectionType === "featured-properties") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : featuredPuneProjects;

        const updateSlide = (idx, patch) => {
            const next = items.map((item, i) => (i === idx ? { ...item, ...patch } : item));
            updateSectionData("items", next);
        };

        const addSlide = () => {
            const next = [
                ...items,
                {
                    id: Date.now(),
                    name: "New Featured Project",
                    brandName: "PPI",
                    location: "Pune",
                    youtubeUrl: "https://www.youtube.com/watch?v=v1KcS0G22EQ",
                    youtubeId: "v1KcS0G22EQ",
                    title: "Project Walkthrough Video",
                    tagline: "Describe project highlights.",
                    completion: "Q4 2027",
                    completionSub: "MahaRERA",
                    configurations: "2 & 3 BHK",
                    configSub: "Luxury Residences",
                    carpet: "1,150 SQ.FT",
                    carpetSub: "Spacious Layouts",
                    price: "₹ 1.25 Cr*",
                    priceSub: "Direct Price",
                    badge: "SAMPLE FLAT TOUR",
                    propertySlug: "new-project",
                    thumbnail: "",
                    siteImages: [
                        {
                            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                            label: "Sample Flat Living Room",
                        },
                    ],
                },
            ];
            updateSectionData("items", next);
            setOpenIdx(next.length - 1);
        };

        const removeSlide = (idx) => {
            const next = items.filter((_, i) => i !== idx);
            updateSectionData("items", next);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 10,
                    }}
                >
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                        Video Tour Containers &amp; Below-Left Gallery ({items.length})
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#334155",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={Boolean(sectionData.showAllStacked)}
                                onChange={(e) => updateSectionData("showAllStacked", e.target.checked)}
                            />
                            Show All Stacked
                        </label>
                        <button type="button" className="admin-btn admin-btn--primary admin-btn--sm" onClick={addSlide}>
                            <Plus size={13} /> Add More Container
                        </button>
                    </div>
                </div>

                {items.map((slide, idx) => {
                    const gallery = Array.isArray(slide.siteImages) ? slide.siteImages : [];
                    return (
                        <AccordionCard
                            key={slide.id || idx}
                            title={`${idx + 1}. ${slide.name || "Untitled Slide"}`}
                            subtitle={slide.location}
                            isOpen={openIdx === idx}
                            onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                            onRemove={items.length > 1 ? () => removeSlide(idx) : null}
                        >
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Project Name</label>
                                    <input
                                        className="admin-input"
                                        value={slide.name || ""}
                                        onChange={(e) => updateSlide(idx, { name: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Location</label>
                                    <input
                                        className="admin-input"
                                        value={slide.location || ""}
                                        onChange={(e) => updateSlide(idx, { location: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Top Badge</label>
                                    <input
                                        className="admin-input"
                                        value={slide.badge || ""}
                                        onChange={(e) => updateSlide(idx, { badge: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Watermark Brand</label>
                                    <input
                                        className="admin-input"
                                        value={slide.brandName || ""}
                                        onChange={(e) => updateSlide(idx, { brandName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <VideoUploader
                                label="YouTube Video Link"
                                value={slide.youtubeUrl || ""}
                                onChange={(val) =>
                                    updateSlide(idx, {
                                        youtubeUrl: val,
                                        youtubeId: extractYtId(val) || slide.youtubeId,
                                    })
                                }
                            />

                            <div className="admin-field">
                                <label className="admin-label">Video Headline</label>
                                <input
                                    className="admin-input"
                                    value={slide.title || ""}
                                    onChange={(e) => updateSlide(idx, { title: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Completion</label>
                                    <input
                                        className="admin-input"
                                        value={slide.completion || ""}
                                        onChange={(e) => updateSlide(idx, { completion: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Completion Sub</label>
                                    <input
                                        className="admin-input"
                                        value={slide.completionSub || ""}
                                        onChange={(e) => updateSlide(idx, { completionSub: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Config</label>
                                    <input
                                        className="admin-input"
                                        value={slide.configurations || ""}
                                        onChange={(e) => updateSlide(idx, { configurations: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Config Sub</label>
                                    <input
                                        className="admin-input"
                                        value={slide.configSub || ""}
                                        onChange={(e) => updateSlide(idx, { configSub: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Carpet Area</label>
                                    <input
                                        className="admin-input"
                                        value={slide.carpet || ""}
                                        onChange={(e) => updateSlide(idx, { carpet: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Carpet Sub</label>
                                    <input
                                        className="admin-input"
                                        value={slide.carpetSub || ""}
                                        onChange={(e) => updateSlide(idx, { carpetSub: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Price</label>
                                    <input
                                        className="admin-input"
                                        value={slide.price || ""}
                                        onChange={(e) => updateSlide(idx, { price: e.target.value })}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Price Sub</label>
                                    <input
                                        className="admin-input"
                                        value={slide.priceSub || ""}
                                        onChange={(e) => updateSlide(idx, { priceSub: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: 8,
                                    padding: 10,
                                    borderRadius: 8,
                                    background: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                    <span style={{ fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                                        <ImageIcon size={14} /> Left-Side Below Gallery ({gallery.length})
                                    </span>
                                    <button
                                        type="button"
                                        className="admin-btn admin-btn--outline admin-btn--sm"
                                        onClick={() =>
                                            updateSlide(idx, {
                                                siteImages: [
                                                    ...gallery,
                                                    { url: "", label: `Gallery Photo ${gallery.length + 1}` },
                                                ],
                                            })
                                        }
                                    >
                                        <Plus size={12} /> Add Photo
                                    </button>
                                </div>

                                {gallery.map((img, gIdx) => (
                                    <div
                                        key={gIdx}
                                        style={{
                                            padding: 8,
                                            borderRadius: 6,
                                            background: "#ffffff",
                                            border: "1px solid #e2e8f0",
                                            marginBottom: 8,
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                            <span style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                                                Gallery Image #{gIdx + 1}
                                            </span>
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn--danger admin-btn--sm"
                                                onClick={() =>
                                                    updateSlide(idx, {
                                                        siteImages: gallery.filter((_, i) => i !== gIdx),
                                                    })
                                                }
                                            >
                                                <Trash2 size={11} />
                                            </button>
                                        </div>
                                        <div className="admin-field" style={{ marginBottom: 6 }}>
                                            <input
                                                className="admin-input"
                                                placeholder="Caption (e.g. Sample Flat Living Room)"
                                                value={img.label || ""}
                                                onChange={(e) => {
                                                    const nextGal = gallery.map((g, i) =>
                                                        i === gIdx ? { ...g, label: e.target.value } : g
                                                    );
                                                    updateSlide(idx, { siteImages: nextGal });
                                                }}
                                            />
                                        </div>
                                        <ImageUploader
                                            label="Image URL or Upload"
                                            value={img.url || ""}
                                            onChange={(val) => {
                                                const nextGal = gallery.map((g, i) =>
                                                    i === gIdx ? { ...g, url: val } : g
                                                );
                                                updateSlide(idx, { siteImages: nextGal });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AccordionCard>
                    );
                })}
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addSlide}
                >
                    <Plus size={13} /> Add More Container Like This
                </button>
            </div>
        );
    }

    // 2. New Launch Projects Carousel
    if (sectionType === "new-launches") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : newLaunchProjects;

        const updateItem = (idx, patch) => {
            updateSectionData(
                "items",
                items.map((item, i) => (i === idx ? { ...item, ...patch } : item))
            );
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>New Launch Cards ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => {
                            const next = [
                                ...items,
                                {
                                    id: Date.now(),
                                    title: "New Launch Residence",
                                    propertyType: "Apartment",
                                    typeBadge: "New Launch",
                                    price: "₹1.20 Cr",
                                    rate: "₹7,500/sq.ft",
                                    area: "1,400 sq.ft",
                                    location: "Pune",
                                    images: [""],
                                    isFeatured: true,
                                    link: "/buy",
                                },
                            ];
                            updateSectionData("items", next);
                            setOpenIdx(next.length - 1);
                        }}
                    >
                        <Plus size={13} /> Add Launch Card
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.title || "Launch Card"}`}
                        subtitle={item.price}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            items.length > 1
                                ? () => updateSectionData("items", items.filter((_, i) => i !== idx))
                                : null
                        }
                    >
                        <div className="admin-field">
                            <label className="admin-label">Title</label>
                            <input
                                className="admin-input"
                                value={item.title || ""}
                                onChange={(e) => updateItem(idx, { title: e.target.value })}
                            />
                        </div>
                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Price</label>
                                <input
                                    className="admin-input"
                                    value={item.price || ""}
                                    onChange={(e) => updateItem(idx, { price: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Badge</label>
                                <input
                                    className="admin-input"
                                    value={item.typeBadge || ""}
                                    onChange={(e) => updateItem(idx, { typeBadge: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Area</label>
                                <input
                                    className="admin-input"
                                    value={item.area || ""}
                                    onChange={(e) => updateItem(idx, { area: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Location</label>
                                <input
                                    className="admin-input"
                                    value={item.location || ""}
                                    onChange={(e) => updateItem(idx, { location: e.target.value })}
                                />
                            </div>
                        </div>
                        <ImageUploader
                            label="Cover Image"
                            value={item.images?.[0] || ""}
                            onChange={(val) => updateItem(idx, { images: [val, ...(item.images?.slice(1) || [])] })}
                        />
                    </AccordionCard>
                ))}
            </div>
        );
    }

    // 3. Signature Luxury Spotlight (FeaturedProp)
    if (sectionType === "featured-prop") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : featuredListings;

        const updateItem = (idx, patch) => {
            updateSectionData(
                "items",
                items.map((item, i) => (i === idx ? { ...item, ...patch } : item))
            );
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Luxury Spotlight Properties ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => {
                            const next = [
                                ...items,
                                {
                                    id: Date.now(),
                                    name: "Luxury Residence",
                                    location: "Koregaon Park, Pune",
                                    heroLocation: "Koregaon Park, Pune",
                                    config: "3 & 4 BHK",
                                    area: "1,800 Sq. Ft.",
                                    price: "₹2.10 Cr*",
                                    badge: "Signature Living",
                                    image: "",
                                    developer: "PPI Partner",
                                    tagline: "Bespoke luxury residences.",
                                },
                            ];
                            updateSectionData("items", next);
                            setOpenIdx(next.length - 1);
                        }}
                    >
                        <Plus size={13} /> Add Spotlight
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.name || "Residence"}`}
                        subtitle={item.price}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            items.length > 1
                                ? () => updateSectionData("items", items.filter((_, i) => i !== idx))
                                : null
                        }
                    >
                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Name</label>
                                <input
                                    className="admin-input"
                                    value={item.name || ""}
                                    onChange={(e) => updateItem(idx, { name: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Location</label>
                                <input
                                    className="admin-input"
                                    value={item.location || ""}
                                    onChange={(e) => updateItem(idx, { location: e.target.value, heroLocation: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Config</label>
                                <input
                                    className="admin-input"
                                    value={item.config || ""}
                                    onChange={(e) => updateItem(idx, { config: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Price</label>
                                <input
                                    className="admin-input"
                                    value={item.price || ""}
                                    onChange={(e) => updateItem(idx, { price: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Tagline</label>
                            <input
                                className="admin-input"
                                value={item.tagline || ""}
                                onChange={(e) => updateItem(idx, { tagline: e.target.value })}
                            />
                        </div>
                        <ImageUploader
                            label="Spotlight Image"
                            value={item.image || ""}
                            onChange={(val) => updateItem(idx, { image: val })}
                        />
                    </AccordionCard>
                ))}
            </div>
        );
    }

    // 4. Workflow Steps
    if (sectionType === "workflow") {
        const steps =
            Array.isArray(sectionData.steps) && sectionData.steps.length > 0
                ? sectionData.steps
                : workflowSteps.map(({ title, description }) => ({ title, description }));

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Workflow Steps ({steps.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() =>
                            updateSectionData("steps", [...steps, { title: "New Step", description: "Describe step." }])
                        }
                    >
                        <Plus size={13} /> Add Step
                    </button>
                </div>

                {steps.map((step, idx) => (
                    <AccordionCard
                        key={idx}
                        title={`Step ${idx + 1}: ${step.title || ""}`}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            steps.length > 1
                                ? () => updateSectionData("steps", steps.filter((_, i) => i !== idx))
                                : null
                        }
                    >
                        <div className="admin-field">
                            <label className="admin-label">Step Title</label>
                            <input
                                className="admin-input"
                                value={step.title || ""}
                                onChange={(e) =>
                                    updateSectionData(
                                        "steps",
                                        steps.map((s, i) => (i === idx ? { ...s, title: e.target.value } : s))
                                    )
                                }
                            />
                        </div>
                        <div className="admin-field" style={{ marginBottom: 0 }}>
                            <label className="admin-label">Description</label>
                            <input
                                className="admin-input"
                                value={step.description || ""}
                                onChange={(e) =>
                                    updateSectionData(
                                        "steps",
                                        steps.map((s, i) => (i === idx ? { ...s, description: e.target.value } : s))
                                    )
                                }
                            />
                        </div>
                    </AccordionCard>
                ))}
            </div>
        );
    }

    // 5. Developer Logos
    if (sectionType === "developer-logos") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : defaultDevelopers;

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Developer Logos ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() =>
                            updateSectionData("items", [...items, { name: "New Developer", domain: "example.com", logoUrl: "" }])
                        }
                    >
                        <Plus size={13} /> Add Developer
                    </button>
                </div>

                {items.map((dev, idx) => (
                    <AccordionCard
                        key={idx}
                        title={dev.name || `Developer #${idx + 1}`}
                        subtitle={dev.domain}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            items.length > 1
                                ? () => updateSectionData("items", items.filter((_, i) => i !== idx))
                                : null
                        }
                    >
                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Developer Name</label>
                                <input
                                    className="admin-input"
                                    value={dev.name || ""}
                                    onChange={(e) =>
                                        updateSectionData(
                                            "items",
                                            items.map((d, i) => (i === idx ? { ...d, name: e.target.value } : d))
                                        )
                                    }
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Website Domain</label>
                                <input
                                    className="admin-input"
                                    value={dev.domain || ""}
                                    onChange={(e) =>
                                        updateSectionData(
                                            "items",
                                            items.map((d, i) => (i === idx ? { ...d, domain: e.target.value } : d))
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <ImageUploader
                            label="Custom Logo Override (optional)"
                            value={dev.logoUrl || ""}
                            onChange={(val) =>
                                updateSectionData(
                                    "items",
                                    items.map((d, i) => (i === idx ? { ...d, logoUrl: val } : d))
                                )
                            }
                        />
                    </AccordionCard>
                ))}
            </div>
        );
    }

    // 6. Trust Stats
    if (sectionType === "trust-stats") {
        const statItems =
            Array.isArray(sectionData.stats) && sectionData.stats.length > 0
                ? sectionData.stats
                : defaultStats.map(({ target, suffix, label }) => ({ target, suffix, label }));

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Milestone Counters ({statItems.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() =>
                            updateSectionData("stats", [...statItems, { target: 100, suffix: " +", label: "New Milestone" }])
                        }
                    >
                        <Plus size={13} /> Add Stat
                    </button>
                </div>

                {statItems.map((st, idx) => (
                    <AccordionCard
                        key={idx}
                        title={`${st.target}${st.suffix || ""} ${st.label}`}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            statItems.length > 1
                                ? () => updateSectionData("stats", statItems.filter((_, i) => i !== idx))
                                : null
                        }
                    >
                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Target Number</label>
                                <input
                                    type="number"
                                    className="admin-input"
                                    value={st.target ?? 0}
                                    onChange={(e) =>
                                        updateSectionData(
                                            "stats",
                                            statItems.map((s, i) => (i === idx ? { ...s, target: Number(e.target.value) } : s))
                                        )
                                    }
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Suffix</label>
                                <input
                                    className="admin-input"
                                    value={st.suffix || ""}
                                    onChange={(e) =>
                                        updateSectionData(
                                            "stats",
                                            statItems.map((s, i) => (i === idx ? { ...s, suffix: e.target.value } : s))
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="admin-field" style={{ marginBottom: 0 }}>
                            <label className="admin-label">Label</label>
                            <input
                                className="admin-input"
                                value={st.label || ""}
                                onChange={(e) =>
                                    updateSectionData(
                                        "stats",
                                        statItems.map((s, i) => (i === idx ? { ...s, label: e.target.value } : s))
                                    )
                                }
                            />
                        </div>
                    </AccordionCard>
                ))}
            </div>
        );
    }

    return null;
}

