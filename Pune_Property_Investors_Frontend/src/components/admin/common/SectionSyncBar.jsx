"use client";

import { useState } from "react";
import { Save, Rocket, RotateCcw } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { getStore, saveStore } from "../../../services/mockStore";
import { hasPreviousSectionSnapshot } from "../../../services/liveContent";
import { useToast } from "../../../context/ToastContext";
import AdminModal from "./AdminModal";
import ConfirmModal from "./ConfirmModal";

export default function SectionSyncBar({
    sectionKey,
    label,
    onSave,
    onPublished,
    onRetrieved,
}) {
    const { showToast } = useToast();
    const [saving, setSaving] = useState(false);
    const [publishOpen, setPublishOpen] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const [retrieveOpen, setRetrieveOpen] = useState(false);
    const [retrieving, setRetrieving] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            if (typeof onSave === "function") {
                await onSave();
            } else {
                const store = getStore();
                saveStore(store);
                showToast(`Saved ${label} changes!`, "success");
            }
        } catch (err) {
            showToast(err?.message || `Failed to save ${label}`, "error");
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        setPublishing(true);
        try {
            await contentService.publishSection(sectionKey);
            showToast(`Published ${label} changes to the live website!`, "success");
            setPublishOpen(false);
            await onPublished?.();
        } catch (err) {
            showToast(err?.message || `Failed to publish ${label}`, "error");
        } finally {
            setPublishing(false);
        }
    };

    const handleRetrieve = async (mode) => {
        setRetrieving(true);
        try {
            await contentService.retrieveSection(sectionKey, mode);
            showToast(
                mode === "previous"
                    ? `Retrieved previous published ${label} version.`
                    : `Retrieved original ${label} defaults.`,
                "success"
            );
            setRetrieveOpen(false);
            await onRetrieved?.();
        } catch (err) {
            showToast(err?.message || `Failed to retrieve ${label}`, "error");
        } finally {
            setRetrieving(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className="admin-btn admin-btn--outline"
                onClick={handleSave}
                disabled={saving || publishing || retrieving}
                title={`Save ${label} changes`}
            >
                <Save size={15} />
                <span>{saving ? "Saving..." : "Save"}</span>
            </button>

            <button
                type="button"
                className="admin-btn admin-btn--outline"
                onClick={() => {
                    setHasPrev(hasPreviousSectionSnapshot(sectionKey));
                    setRetrieveOpen(true);
                }}
                disabled={saving || publishing || retrieving}
                title={`Retrieve previous or original ${label} state`}
            >
                <RotateCcw size={15} />
                <span>Retrieve</span>
            </button>

            <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={() => setPublishOpen(true)}
                disabled={saving || publishing || retrieving}
                title={`Publish only ${label} changes to the live website`}
            >
                <Rocket size={15} />
                <span>{publishing ? "Publishing..." : `Publish ${label}`}</span>
            </button>

            <ConfirmModal
                open={publishOpen}
                onClose={() => !publishing && setPublishOpen(false)}
                onConfirm={handlePublish}
                loading={publishing}
                title={`Publish ${label}`}
                message={`Publish your ${label} changes to the live public website without affecting other pages?`}
                confirmText={`Publish ${label}`}
                confirmTone="gold"
            />

            <AdminModal
                open={retrieveOpen}
                onClose={() => !retrieving && setRetrieveOpen(false)}
                title={`Retrieve ${label}`}
                size="sm"
                footer={
                    <>
                        <button
                            type="button"
                            className="admin-btn admin-btn--outline"
                            onClick={() => setRetrieveOpen(false)}
                            disabled={retrieving}
                        >
                            Cancel
                        </button>
                        {hasPrev && (
                            <button
                                type="button"
                                className="admin-btn admin-btn--primary"
                                disabled={retrieving}
                                onClick={() => handleRetrieve("previous")}
                            >
                                <RotateCcw size={14} /> Previous Publish
                            </button>
                        )}
                        <button
                            type="button"
                            className="admin-btn admin-btn--danger"
                            disabled={retrieving}
                            onClick={() => handleRetrieve("original")}
                        >
                            <RotateCcw size={14} /> Retrieve Original
                        </button>
                    </>
                }
            >
                <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                    {hasPrev
                        ? `Roll back only ${label} to the version before your last publish, or retrieve the original default ${label} data without touching other pages.`
                        : `Retrieve the original default ${label} data and clear published overrides for ${label} only.`}
                </p>
            </AdminModal>
        </>
    );
}

