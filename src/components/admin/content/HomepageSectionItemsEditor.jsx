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
import locationsData from "../../../data/locationsData";
import { projects as defaultProjects } from "../../../data/projects";
import { testimonials as defaultTestimonials } from "../../../data/testimonials";

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
                            <Plus size={13} /> Add Container
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
                    <Plus size={13} /> Add Container Like This
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

        const addLaunchContainer = () => {
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
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>New Launch Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addLaunchContainer}
                    >
                        <Plus size={13} /> Add Container
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
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addLaunchContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
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

        const addSpotlightContainer = () => {
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
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Luxury Spotlight Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addSpotlightContainer}
                    >
                        <Plus size={13} /> Add Container
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
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addSpotlightContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 4. Workflow Steps
    if (sectionType === "workflow") {
        const steps =
            Array.isArray(sectionData.steps) && sectionData.steps.length > 0
                ? sectionData.steps
                : workflowSteps.map(({ title, description }) => ({ title, description }));

        const addWorkflowContainer = () => {
            const next = [...steps, { title: "New Step", description: "Describe step." }];
            updateSectionData("steps", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Workflow Step Containers ({steps.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addWorkflowContainer}
                    >
                        <Plus size={13} /> Add Container
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
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addWorkflowContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 5. Developer Logos
    if (sectionType === "developer-logos") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : defaultDevelopers;

        const addDeveloperContainer = () => {
            const next = [...items, { name: "New Developer", domain: "example.com", logoUrl: "" }];
            updateSectionData("items", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Developer Partner Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addDeveloperContainer}
                    >
                        <Plus size={13} /> Add Container
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
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addDeveloperContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 6. Trust Stats
    if (sectionType === "trust-stats") {
        const statItems =
            Array.isArray(sectionData.stats) && sectionData.stats.length > 0
                ? sectionData.stats
                : defaultStats.map(({ target, suffix, label }) => ({ target, suffix, label }));

        const addStatContainer = () => {
            const next = [...statItems, { target: 100, suffix: " +", label: "New Milestone" }];
            updateSectionData("stats", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Milestone Counter Containers ({statItems.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addStatContainer}
                    >
                        <Plus size={13} /> Add Container
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
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addStatContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 7. Browse Locations (Locality Containers)
    if (sectionType === "browse-locations") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : locationsData;

        const updateItem = (idx, patch) => {
            updateSectionData(
                "items",
                items.map((item, i) => (i === idx ? { ...item, ...patch } : item))
            );
        };

        const addLocationContainer = () => {
            const next = [
                ...items,
                {
                    id: Date.now(),
                    name: "New Locality",
                    zone: "West Pune",
                    subtitle: "Prime Residential Corridor",
                    description: "High growth, excellent connectivity and infrastructure.",
                    avgRate: "₹8,500 / sq.ft",
                    listingsCount: "10+ Properties",
                    image: "",
                    searchLocation: "Pune",
                },
            ];
            updateSectionData("items", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Locality Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addLocationContainer}
                    >
                        <Plus size={13} /> Add Container
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.name || "Locality"}`}
                        subtitle={item.avgRate}
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
                                <label className="admin-label">Locality Name</label>
                                <input
                                    className="admin-input"
                                    value={item.name || ""}
                                    onChange={(e) => updateItem(idx, { name: e.target.value, searchLocation: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Zone</label>
                                <input
                                    className="admin-input"
                                    value={item.zone || ""}
                                    onChange={(e) => updateItem(idx, { zone: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Average Rate</label>
                                <input
                                    className="admin-input"
                                    value={item.avgRate || ""}
                                    onChange={(e) => updateItem(idx, { avgRate: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Listings Count</label>
                                <input
                                    className="admin-input"
                                    value={item.listingsCount || ""}
                                    onChange={(e) => updateItem(idx, { listingsCount: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Subtitle / Summary</label>
                            <input
                                className="admin-input"
                                value={item.subtitle || item.description || ""}
                                onChange={(e) => updateItem(idx, { subtitle: e.target.value, description: e.target.value })}
                            />
                        </div>
                        <ImageUploader
                            label="Locality Cover Image"
                            value={item.image || ""}
                            onChange={(val) => updateItem(idx, { image: val })}
                        />
                    </AccordionCard>
                ))}

                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addLocationContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 8. Featured Projects (Property Card Containers)
    if (sectionType === "featured-projects") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : defaultProjects;

        const updateItem = (idx, patch) => {
            updateSectionData(
                "items",
                items.map((item, i) => (i === idx ? { ...item, ...patch } : item))
            );
        };

        const addProjectContainer = () => {
            const next = [
                ...items,
                {
                    id: Date.now(),
                    name: "New Landmark Project",
                    developer: "Leading Builder",
                    location: "Pune",
                    price: "₹ 1.25 - 2.80 Cr",
                    configuration: "2, 3 BHK Luxury Residences",
                    subtitle: "2, 3 BHK Luxury Residences, Pune",
                    status: "Under Construction",
                    possession: "2027",
                    reraId: "RERA Approved",
                    badge: "Featured",
                    image: "",
                    logo: "",
                },
            ];
            updateSectionData("items", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Featured Project Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addProjectContainer}
                    >
                        <Plus size={13} /> Add Container
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.name || "Project"}`}
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
                                <label className="admin-label">Project Name</label>
                                <input
                                    className="admin-input"
                                    value={item.name || ""}
                                    onChange={(e) => updateItem(idx, { name: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Developer / Brand</label>
                                <input
                                    className="admin-input"
                                    value={item.developer || ""}
                                    onChange={(e) => updateItem(idx, { developer: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Price Range</label>
                                <input
                                    className="admin-input"
                                    value={item.price || ""}
                                    onChange={(e) => updateItem(idx, { price: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Configuration</label>
                                <input
                                    className="admin-input"
                                    value={item.configuration || ""}
                                    onChange={(e) => updateItem(idx, { configuration: e.target.value })}
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
                            <div className="admin-field">
                                <label className="admin-label">Possession Status</label>
                                <input
                                    className="admin-input"
                                    value={item.possession || item.status || ""}
                                    onChange={(e) => updateItem(idx, { possession: e.target.value, status: e.target.value })}
                                />
                            </div>
                        </div>
                        <ImageUploader
                            label="Project Banner Image"
                            value={item.image || ""}
                            onChange={(val) => updateItem(idx, { image: val })}
                        />
                        <ImageUploader
                            label="Developer Circular Logo (optional)"
                            value={item.logo || ""}
                            onChange={(val) => updateItem(idx, { logo: val })}
                        />
                    </AccordionCard>
                ))}

                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addProjectContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 9. Testimonials (Client Review Containers)
    if (sectionType === "testimonials") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : defaultTestimonials;

        const updateItem = (idx, patch) => {
            updateSectionData(
                "items",
                items.map((item, i) => (i === idx ? { ...item, ...patch } : item))
            );
        };

        const addTestimonialContainer = () => {
            const next = [
                ...items,
                {
                    id: Date.now(),
                    name: "Customer Name",
                    role: "Verified Homebuyer",
                    location: "Pune",
                    rating: 5,
                    text: "Pune Property Investors provided outstanding support throughout our journey to purchase a luxury home.",
                },
            ];
            updateSectionData("items", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Testimonial Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addTestimonialContainer}
                    >
                        <Plus size={13} /> Add Container
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.name || "Testimonial"}`}
                        subtitle={item.role}
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
                                <label className="admin-label">Client Name</label>
                                <input
                                    className="admin-input"
                                    value={item.name || ""}
                                    onChange={(e) => updateItem(idx, { name: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Role / Neighborhood</label>
                                <input
                                    className="admin-input"
                                    value={item.role || item.location || ""}
                                    onChange={(e) => updateItem(idx, { role: e.target.value, location: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Rating (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    className="admin-input"
                                    value={item.rating || 5}
                                    onChange={(e) => updateItem(idx, { rating: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="admin-field" style={{ marginBottom: 0 }}>
                            <label className="admin-label">Review Text</label>
                            <textarea
                                className="admin-textarea"
                                value={item.text || ""}
                                onChange={(e) => updateItem(idx, { text: e.target.value })}
                            />
                        </div>
                    </AccordionCard>
                ))}

                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addTestimonialContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 10. Dedicated Custom Containers Block
    if (sectionType === "custom-containers" || sectionType === "custom-container" || sectionType === "container") {
        const items =
            Array.isArray(sectionData.items) && sectionData.items.length > 0
                ? sectionData.items
                : (Array.isArray(sectionData.containers) ? sectionData.containers : []);

        const updateItem = (idx, patch) => {
            const next = items.map((item, i) => (i === idx ? { ...item, ...patch } : item));
            updateSectionData("items", next);
            updateSectionData("containers", next);
        };

        const addCustomCard = () => {
            const next = [
                ...items,
                {
                    id: Date.now(),
                    badge: "Featured",
                    title: "New Promotional Container",
                    description: "Add details, highlights, or promotions for this card.",
                    buttonText: "Explore More",
                    buttonUrl: "/buy",
                    image: "",
                    videoUrl: "",
                },
            ];
            updateSectionData("items", next);
            updateSectionData("containers", next);
            setOpenIdx(next.length - 1);
        };

        return (
            <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Custom Card Containers ({items.length})</span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={addCustomCard}
                    >
                        <Plus size={13} /> Add Container
                    </button>
                </div>

                {items.map((item, idx) => (
                    <AccordionCard
                        key={item.id || idx}
                        title={`${idx + 1}. ${item.title || "Custom Container"}`}
                        subtitle={item.badge}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        onRemove={
                            items.length > 1
                                ? () => {
                                      const next = items.filter((_, i) => i !== idx);
                                      updateSectionData("items", next);
                                      updateSectionData("containers", next);
                                  }
                                : null
                        }
                    >
                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Container Title</label>
                                <input
                                    className="admin-input"
                                    value={item.title || ""}
                                    onChange={(e) => updateItem(idx, { title: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Badge Pill (e.g. Featured, Hot)</label>
                                <input
                                    className="admin-input"
                                    value={item.badge || ""}
                                    onChange={(e) => updateItem(idx, { badge: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Button Text</label>
                                <input
                                    className="admin-input"
                                    value={item.buttonText || ""}
                                    onChange={(e) => updateItem(idx, { buttonText: e.target.value })}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Button Link URL</label>
                                <input
                                    className="admin-input"
                                    value={item.buttonUrl || ""}
                                    onChange={(e) => updateItem(idx, { buttonUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Description Text</label>
                            <textarea
                                className="admin-textarea"
                                value={item.description || ""}
                                onChange={(e) => updateItem(idx, { description: e.target.value })}
                            />
                        </div>
                        <ImageUploader
                            label="Container Image"
                            value={item.image || ""}
                            onChange={(val) => updateItem(idx, { image: val })}
                        />
                        <VideoUploader
                            label="Or Video URL (YouTube / MP4)"
                            value={item.videoUrl || ""}
                            onChange={(val) => updateItem(idx, { videoUrl: val })}
                        />
                    </AccordionCard>
                ))}

                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                    onClick={addCustomCard}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>
        );
    }

    // 11. Universal Supplementary Containers for ALL Sections
    const customList = Array.isArray(sectionData.customContainers) ? sectionData.customContainers : [];

    const updateCustomContainer = (idx, patch) => {
        updateSectionData(
            "customContainers",
            customList.map((c, i) => (i === idx ? { ...c, ...patch } : c))
        );
    };

    const addUniversalContainer = () => {
        const next = [
            ...customList,
            {
                id: Date.now(),
                badge: "Spotlight",
                title: "New Sub-Container",
                description: "Describe this custom container card.",
                buttonText: "Learn More",
                buttonUrl: "/buy",
                image: "",
                videoUrl: "",
            },
        ];
        updateSectionData("customContainers", next);
        setOpenIdx(next.length - 1);
    };

    return (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px dashed #cbd5e1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", display: "block" }}>
                        Additional Custom Containers ({customList.length})
                    </span>
                    <span style={{ fontSize: 11.5, color: "#64748b" }}>
                        Add supplementary cards or media boxes to this section.
                    </span>
                </div>
                <button
                    type="button"
                    className="admin-btn admin-btn--primary admin-btn--sm"
                    onClick={addUniversalContainer}
                >
                    <Plus size={13} /> Add Container
                </button>
            </div>

            {customList.map((item, idx) => (
                <AccordionCard
                    key={item.id || idx}
                    title={`${idx + 1}. ${item.title || "Custom Container"}`}
                    subtitle={item.badge}
                    isOpen={openIdx === idx}
                    onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                    onRemove={() =>
                        updateSectionData(
                            "customContainers",
                            customList.filter((_, i) => i !== idx)
                        )
                    }
                >
                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label className="admin-label">Title</label>
                            <input
                                className="admin-input"
                                value={item.title || ""}
                                onChange={(e) => updateCustomContainer(idx, { title: e.target.value })}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Badge Pill</label>
                            <input
                                className="admin-input"
                                value={item.badge || ""}
                                onChange={(e) => updateCustomContainer(idx, { badge: e.target.value })}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Button Text</label>
                            <input
                                className="admin-input"
                                value={item.buttonText || ""}
                                onChange={(e) => updateCustomContainer(idx, { buttonText: e.target.value })}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Button URL</label>
                            <input
                                className="admin-input"
                                value={item.buttonUrl || ""}
                                onChange={(e) => updateCustomContainer(idx, { buttonUrl: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Description</label>
                        <textarea
                            className="admin-textarea"
                            value={item.description || ""}
                            onChange={(e) => updateCustomContainer(idx, { description: e.target.value })}
                        />
                    </div>
                    <ImageUploader
                        label="Container Image"
                        value={item.image || ""}
                        onChange={(val) => updateCustomContainer(idx, { image: val })}
                    />
                    <VideoUploader
                        label="Video URL (optional)"
                        value={item.videoUrl || ""}
                        onChange={(val) => updateCustomContainer(idx, { videoUrl: val })}
                    />
                </AccordionCard>
            ))}

            <button
                type="button"
                className="admin-btn admin-btn--outline admin-btn--sm"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                onClick={addUniversalContainer}
            >
                <Plus size={13} /> Add Container
            </button>
        </div>
    );
}

