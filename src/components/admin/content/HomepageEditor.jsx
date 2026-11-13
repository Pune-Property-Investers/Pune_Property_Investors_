"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layers, Sliders, FileText, Globe, Plus, Trash2, RotateCcw, ExternalLink, Save } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { createInitialStore } from "../../../services/mockStore";
import { useToast } from "../../../context/ToastContext";
import { useDraftEditor } from "../../../hooks/useDraftEditor";
import { useUnsavedChanges } from "../../../hooks/useUnsavedChanges";
import ContentEditor from "./ContentEditor";
import SectionManager from "./SectionManager";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import RichTextEditor from "./RichTextEditor";
import SEOEditor from "./SEOEditor";
import SectionSyncBar from "../common/SectionSyncBar";
import HomepageSectionItemsEditor from "./HomepageSectionItemsEditor";

const SECTION_MANAGER_LINKS = {
    "featured-properties": { href: "/admin/properties", text: "Manage Properties Inventory" },
    "new-launches": { href: "/admin/projects", text: "Manage New Launch Projects" },
    "browse-locations": { href: "/admin/locations", text: "Manage Localities & Rates" },
    "featured-projects": { href: "/admin/projects", text: "Manage Featured Projects" },
    "developer-logos": { href: "/admin/developers", text: "Manage Developer Partners" },
    testimonials: { href: "/admin/testimonials", text: "Manage Client Testimonials" },
    advertisements: { href: "/admin/advertisements", text: "Manage Sidebar Advertisements" },
};

const EDITOR_TABS = [
    { key: "sections", label: "Sections & Order", icon: Layers },
    { key: "content", label: "Edit Section", icon: Sliders },
    { key: "about", label: "About Us Page", icon: FileText },
    { key: "seo", label: "SEO", icon: Globe },
];

export default function HomepageEditor({ forcedSectionId = null }) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("content");
    const [activeSectionId, setActiveSectionId] = useState(forcedSectionId || "hero");
    const [previewSelectedOnly, setPreviewSelectedOnly] = useState(true);

    const {
        draft,
        isDirty,
        hasUnpublishedChanges,
        saving,
        publishing,
        hydrate,
        updateDraft,
        discardChanges,
        saveDraft,
        publishChanges,
    } = useDraftEditor({
        onSaveDraft: async (payload) => {
            const saved = await contentService.saveHomepageDraft(payload);
            showToast("Draft saved", "success");
            return saved;
        },
        onPublish: async (payload) => {
            const pub = await contentService.publishHomepage(payload);
            showToast("Homepage & About changes published to live site", "success");
            return pub;
        },
    });

    useUnsavedChanges(isDirty);

    async function loadHomepage() {
        setLoading(true);
        try {
            const res = await contentService.getHomepage();
            hydrate(res.draft, res.published);
            const urlSection =
                forcedSectionId ||
                (typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("section")
                    : null);
            const hasUrlSection = urlSection && res.draft?.sections?.some((s) => s.id === urlSection);
            const firstSec = hasUrlSection ? urlSection : res.draft?.sections?.[0]?.id;
            if (firstSec) setActiveSectionId(firstSec);
        } catch (err) {
            showToast(err.message || "Failed to load homepage CMS data", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadHomepage();
        const handleSectionEvent = (e) => {
            const nextId =
                e?.detail ||
                (typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("section")
                    : null);
            if (nextId) {
                setActiveSectionId(nextId);
                setActiveTab("content");
            }
        };
        window.addEventListener("ppi-home-section-change", handleSectionEvent);
        return () => window.removeEventListener("ppi-home-section-change", handleSectionEvent);
    }, []);

    if (loading || !draft) {
        return (
            <div className="admin-card">
                <div className="admin-card__body" style={{ color: "#64748b", padding: 36 }}>
                    Loading Homepage &amp; About Visual Editor...
                </div>
            </div>
        );
    }

    const sections = Array.isArray(draft.sections) ? draft.sections : [];
    const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];

    const handleToggleVisibility = (id) => {
        updateDraft((prev) => ({
            ...prev,
            sections: prev.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
        }));
    };

    const handleMoveSection = (id, direction) => {
        updateDraft((prev) => {
            const sorted = [...prev.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
            const idx = sorted.findIndex((s) => s.id === id);
            if (idx === -1) return prev;
            const targetIdx = direction === "up" ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= sorted.length) return prev;
            const swapped = [...sorted];
            const temp = swapped[idx];
            swapped[idx] = swapped[targetIdx];
            swapped[targetIdx] = temp;
            return {
                ...prev,
                sections: swapped.map((s, i) => ({ ...s, order: i + 1 })),
            };
        });
    };

    const updateSectionData = (key, value) => {
        if (!activeSection) return;
        updateDraft((prev) => ({
            ...prev,
            sections: prev.sections.map((s) =>
                s.id === activeSection.id
                    ? { ...s, data: { ...(s.data || {}), [key]: value } }
                    : s
            ),
        }));
    };

    const updateTrustItem = (idx, key, val) => {
        const currentItems = Array.isArray(activeSection?.data?.items) ? activeSection.data.items : [];
        const nextItems = currentItems.map((it, i) => (i === idx ? { ...it, [key]: val } : it));
        updateSectionData("items", nextItems);
    };

    const addTrustItem = () => {
        const currentItems = Array.isArray(activeSection?.data?.items) ? activeSection.data.items : [];
        updateSectionData("items", [
            ...currentItems,
            { id: `item-${Date.now()}`, title: "NEW HIGHLIGHT", desc: "Describe value proposition." },
        ]);
    };

    const removeTrustItem = (idx) => {
        const currentItems = Array.isArray(activeSection?.data?.items) ? activeSection.data.items : [];
        updateSectionData(
            "items",
            currentItems.filter((_, i) => i !== idx)
        );
    };

    const updateAbout = (key, value) => {
        updateDraft((prev) => ({
            ...prev,
            about: { ...(prev.about || {}), [key]: value },
        }));
    };

    const resetSingleSection = (sectionId) => {
        const defaults = createInitialStore()?.homepage?.draft?.sections || [];
        const defaultSection = defaults.find((s) => s.id === sectionId);
        if (!defaultSection) return;
        updateDraft((prev) => ({
            ...prev,
            sections: (prev.sections || []).map((sec) =>
                sec.id === sectionId
                    ? { ...sec, enabled: defaultSection.enabled, data: { ...defaultSection.data } }
                    : sec
            ),
        }));
        showToast(`Reset "${defaultSection.label}" to default options`, "success");
    };

    const isAboutMode = activeTab === "about";
    const previewMode = isAboutMode ? "about" : "homepage";
    const previewPayload = isAboutMode
        ? draft.about || {}
        : {
              ...draft,
              focusedSectionId:
                  activeTab === "content" && previewSelectedOnly ? activeSection?.id : null,
          };

    const sectionData = activeSection?.data || {};

    return (
        <ContentEditor
            title={
                forcedSectionId && activeSection
                    ? `${activeSection.label} — Component Editor`
                    : isAboutMode
                      ? "About Us Live Page Editor"
                      : "Homepage Visual CMS & Live Preview"
            }
            subtitle={
                forcedSectionId
                    ? "Edit this homepage component's content, media, and options with isolated live preview."
                    : "Edit copy, media, section order, and visibility while watching real public components update live."
            }
            previewMode={previewMode}
            previewPayload={previewPayload}
            isDirty={isDirty}
            hasUnpublishedChanges={hasUnpublishedChanges}
            status={draft.status || "Published"}
            updatedAt={draft.updatedAt}
            saving={saving}
            publishing={publishing}
            onSaveDraft={async () => {
                try {
                    await saveDraft();
                } catch (err) {
                    showToast(err.message || "Failed to save draft", "error");
                }
            }}
            onDiscard={() => {
                discardChanges();
                showToast("Unsaved edits discarded", "warning");
            }}
            onPublish={async () => {
                try {
                    await publishChanges();
                } catch (err) {
                    showToast(err.message || "Failed to publish homepage", "error");
                }
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: "1px solid #e2e8f0",
                }}
            >
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                    Scoped sync ({isAboutMode ? "About Us page only" : "Homepage only"}):
                </span>
                <SectionSyncBar
                    sectionKey={isAboutMode ? "about" : "homepage"}
                    label={isAboutMode ? "About Us" : "Homepage"}
                    onSave={saveDraft}
                    onRetrieved={loadHomepage}
                />
            </div>

            {!forcedSectionId && (
                <div className="admin-tabs" style={{ marginBottom: 14 }}>
                    {EDITOR_TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                className={`admin-tab ${activeTab === tab.key ? "admin-tab--active" : ""}`}
                                onClick={() => setActiveTab(tab.key)}
                                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 10px", fontSize: 12.5 }}
                            >
                                <Icon size={14} /> {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {activeTab === "sections" && (
                <div>
                    <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 0, marginBottom: 12 }}>
                        Toggle sections on/off or reorder them. Click any section to jump directly to its content fields.
                    </p>
                    <SectionManager
                        sections={sections}
                        activeSectionId={activeSection?.id}
                        onSelectSection={(id) => {
                            setActiveSectionId(id);
                            setActiveTab("content");
                        }}
                        onToggleVisibility={handleToggleVisibility}
                        onMoveSection={handleMoveSection}
                    />
                </div>
            )}

            {activeTab === "content" && activeSection && (
                <div>
                    {!forcedSectionId && (
                        <div className="admin-field">
                            <label className="admin-label">Editing Section</label>
                            <select
                                className="admin-select"
                                value={activeSection.id}
                                onChange={(e) => setActiveSectionId(e.target.value)}
                            >
                                {sections
                                    .slice()
                                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                                    .map((sec) => (
                                        <option key={sec.id} value={sec.id}>
                                            {sec.order}. {sec.label} ({sec.enabled ? "Visible" : "Hidden"})
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    <div
                        style={{
                            padding: "10px 12px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: 8,
                            marginBottom: 14,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={Boolean(activeSection.enabled)}
                                onChange={() => handleToggleVisibility(activeSection.id)}
                            />
                            Show &ldquo;{activeSection.label}&rdquo; on Homepage
                        </label>
                        <button
                            type="button"
                            className={`admin-btn admin-btn--sm ${
                                previewSelectedOnly ? "admin-btn--primary" : "admin-btn--outline"
                            }`}
                            onClick={() => setPreviewSelectedOnly((v) => !v)}
                            title="Toggle between previewing only this component or the full homepage"
                        >
                            {previewSelectedOnly ? "Previewing: This Component Only" : "Previewing: Full Homepage"}
                        </button>
                        <button
                            type="button"
                            className="admin-btn admin-btn--outline admin-btn--sm"
                            onClick={() => resetSingleSection(activeSection.id)}
                            title="Restore this section's fields to default"
                        >
                            <RotateCcw size={13} /> Reset Section
                        </button>
                    </div>

                    {activeSection.type === "hero" && (
                        <>
                            <div className="admin-field">
                                <label className="admin-label">Eyebrow Tagline</label>
                                <input
                                    className="admin-input"
                                    value={sectionData.eyebrow || ""}
                                    onChange={(e) => updateSectionData("eyebrow", e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Heading Line 1</label>
                                <input
                                    className="admin-input"
                                    value={sectionData.headingLine1 || ""}
                                    onChange={(e) => updateSectionData("headingLine1", e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Heading Line 2 (Accent)</label>
                                <input
                                    className="admin-input"
                                    value={sectionData.headingLine2 || ""}
                                    onChange={(e) => updateSectionData("headingLine2", e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Subtitle</label>
                                <textarea
                                    className="admin-textarea"
                                    value={sectionData.subtitle || ""}
                                    onChange={(e) => updateSectionData("subtitle", e.target.value)}
                                />
                            </div>
                            <VideoUploader
                                label="Hero Background Video (Gumlet / YouTube / MP4)"
                                value={sectionData.videoUrl || ""}
                                onChange={(val) => updateSectionData("videoUrl", val)}
                            />
                            <ImageUploader
                                label="Fallback / Override Background Image"
                                value={sectionData.backgroundImage || ""}
                                onChange={(val) => updateSectionData("backgroundImage", val)}
                            />
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Button Text</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.primaryCtaText || ""}
                                        onChange={(e) => updateSectionData("primaryCtaText", e.target.value)}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Button URL</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.primaryCtaUrl || ""}
                                        onChange={(e) => updateSectionData("primaryCtaUrl", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600 }}>
                                    <input
                                        type="checkbox"
                                        checked={sectionData.showCategoryTabs !== false}
                                        onChange={(e) => updateSectionData("showCategoryTabs", e.target.checked)}
                                    />
                                    Show Category Tabs
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600 }}>
                                    <input
                                        type="checkbox"
                                        checked={sectionData.showSearchCard !== false}
                                        onChange={(e) => updateSectionData("showSearchCard", e.target.checked)}
                                    />
                                    Show Search Card
                                </label>
                            </div>
                        </>
                    )}

                    {activeSection.type === "trust-highlights" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>Highlight Badges</span>
                                <button type="button" className="admin-btn admin-btn--outline admin-btn--sm" onClick={addTrustItem}>
                                    <Plus size={13} /> Add Item
                                </button>
                            </div>
                            {(sectionData.items || []).map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    style={{
                                        border: "1px solid #e2e8f0",
                                        borderRadius: 10,
                                        padding: 12,
                                        marginBottom: 10,
                                        background: "#f8fafc",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <strong style={{ fontSize: 12.5 }}>Highlight #{idx + 1}</strong>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--danger admin-btn--sm"
                                            onClick={() => removeTrustItem(idx)}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div className="admin-field" style={{ marginBottom: 8 }}>
                                        <input
                                            className="admin-input"
                                            value={item.title || ""}
                                            onChange={(e) => updateTrustItem(idx, "title", e.target.value)}
                                            placeholder="Title (e.g. ZERO BROKERAGE)"
                                        />
                                    </div>
                                    <div className="admin-field" style={{ marginBottom: 0 }}>
                                        <input
                                            className="admin-input"
                                            value={item.desc || ""}
                                            onChange={(e) => updateTrustItem(idx, "desc", e.target.value)}
                                            placeholder="Description"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection.type !== "hero" && activeSection.type !== "trust-highlights" && (
                        <>
                            {"eyebrow" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Eyebrow Label</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.eyebrow || ""}
                                        onChange={(e) => updateSectionData("eyebrow", e.target.value)}
                                    />
                                </div>
                            )}
                            {"heading" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Section Heading</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.heading || ""}
                                        onChange={(e) => updateSectionData("heading", e.target.value)}
                                    />
                                </div>
                            )}
                            {"headingText" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Section Heading</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.headingText || ""}
                                        onChange={(e) => updateSectionData("headingText", e.target.value)}
                                    />
                                </div>
                            )}
                            {"subtitle" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Subtitle / Description</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={sectionData.subtitle || ""}
                                        onChange={(e) => updateSectionData("subtitle", e.target.value)}
                                    />
                                </div>
                            )}
                            {"youtubeUrl" in sectionData && (
                                <VideoUploader
                                    label="Showcase Video URL"
                                    value={sectionData.youtubeUrl || ""}
                                    onChange={(val) => updateSectionData("youtubeUrl", val)}
                                />
                            )}
                            {"projectName" in sectionData && (
                                <div className="admin-form-grid">
                                    <div className="admin-field">
                                        <label className="admin-label">Featured Project Name</label>
                                        <input
                                            className="admin-input"
                                            value={sectionData.projectName || ""}
                                            onChange={(e) => updateSectionData("projectName", e.target.value)}
                                        />
                                    </div>
                                    {"developer" in sectionData && (
                                        <div className="admin-field">
                                            <label className="admin-label">Developer</label>
                                            <input
                                                className="admin-input"
                                                value={sectionData.developer || ""}
                                                onChange={(e) => updateSectionData("developer", e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            {"location" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Location</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.location || ""}
                                        onChange={(e) => updateSectionData("location", e.target.value)}
                                    />
                                </div>
                            )}
                            {"showSidebar" in sectionData && (
                                <div className="admin-field">
                                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={sectionData.showSidebar !== false}
                                            onChange={(e) => updateSectionData("showSidebar", e.target.checked)}
                                        />
                                        Enable Right Advertisement Sidebar on Homepage
                                    </label>
                                </div>
                            )}
                            {SECTION_MANAGER_LINKS[activeSection.type] && (
                                <div
                                    style={{
                                        marginTop: 10,
                                        padding: "10px 12px",
                                        borderRadius: 8,
                                        background: "#f8fafc",
                                        border: "1px solid #e2e8f0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 8,
                                    }}
                                >
                                    <span style={{ fontSize: 12.5, color: "#475569" }}>
                                        Want to edit the items inside this section?
                                    </span>
                                    <Link
                                        href={SECTION_MANAGER_LINKS[activeSection.type].href}
                                        className="admin-btn admin-btn--outline admin-btn--sm"
                                    >
                                        <ExternalLink size={13} /> {SECTION_MANAGER_LINKS[activeSection.type].text}
                                    </Link>
                                </div>
                            )}

                            <HomepageSectionItemsEditor
                                sectionType={activeSection.type}
                                sectionData={sectionData}
                                updateSectionData={updateSectionData}
                            />
                            {"ctaText" in sectionData && (
                                <div className="admin-form-grid">
                                    <div className="admin-field">
                                        <label className="admin-label">Button Text</label>
                                        <input
                                            className="admin-input"
                                            value={sectionData.ctaText || ""}
                                            onChange={(e) => updateSectionData("ctaText", e.target.value)}
                                        />
                                    </div>
                                    {"ctaUrl" in sectionData && (
                                        <div className="admin-field">
                                            <label className="admin-label">Button URL</label>
                                            <input
                                                className="admin-input"
                                                value={sectionData.ctaUrl || ""}
                                                onChange={(e) => updateSectionData("ctaUrl", e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            {"buttonText" in sectionData && (
                                <div className="admin-field">
                                    <label className="admin-label">Action Button Text</label>
                                    <input
                                        className="admin-input"
                                        value={sectionData.buttonText || ""}
                                        onChange={(e) => updateSectionData("buttonText", e.target.value)}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <div
                        style={{
                            marginTop: 18,
                            paddingTop: 14,
                            borderTop: "1px solid #e2e8f0",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 8,
                        }}
                    >
                        <button
                            type="button"
                            className="admin-btn admin-btn--primary"
                            disabled={saving || publishing}
                            onClick={async () => {
                                try {
                                    await saveDraft();
                                } catch (err) {
                                    showToast(err.message || "Failed to save changes", "error");
                                }
                            }}
                        >
                            <Save size={15} />
                            <span>{saving ? "Saving..." : "Save Component Changes"}</span>
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "about" && (
                <div>
                    <div className="admin-field">
                        <label className="admin-label">Hero Eyebrow</label>
                        <input
                            className="admin-input"
                            value={draft.about?.eyebrow || ""}
                            onChange={(e) => updateAbout("eyebrow", e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Hero Headline</label>
                        <input
                            className="admin-input"
                            value={draft.about?.title || ""}
                            onChange={(e) => updateAbout("title", e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Headline Accent</label>
                        <input
                            className="admin-input"
                            value={draft.about?.titleAccent || ""}
                            onChange={(e) => updateAbout("titleAccent", e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Hero Description</label>
                        <textarea
                            className="admin-textarea"
                            value={draft.about?.description || ""}
                            onChange={(e) => updateAbout("description", e.target.value)}
                        />
                    </div>
                    <ImageUploader
                        label="About Banner Image"
                        value={draft.about?.backgroundImage || ""}
                        onChange={(val) => updateAbout("backgroundImage", val)}
                    />
                    <div className="admin-field">
                        <label className="admin-label">Company Story Title</label>
                        <input
                            className="admin-input"
                            value={draft.about?.storyTitle || ""}
                            onChange={(e) => updateAbout("storyTitle", e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Story Narrative</label>
                        <RichTextEditor
                            value={draft.about?.storyContent || ""}
                            onChange={(val) => updateAbout("storyContent", val)}
                        />
                    </div>
                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label className="admin-label">CTA Button Text</label>
                            <input
                                className="admin-input"
                                value={draft.about?.ctaText || ""}
                                onChange={(e) => updateAbout("ctaText", e.target.value)}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">CTA Button URL</label>
                            <input
                                className="admin-input"
                                value={draft.about?.ctaUrl || ""}
                                onChange={(e) => updateAbout("ctaUrl", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "seo" && (
                <SEOEditor
                    seo={draft.seo || {}}
                    onChange={(nextSeo) => updateDraft((prev) => ({ ...prev, seo: nextSeo }))}
                    sourceTitle="Pune Property Investors"
                />
            )}
        </ContentEditor>
    );
}

