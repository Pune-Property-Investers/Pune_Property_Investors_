"use client";

import { useState } from "react";
import { Save, RotateCcw, Eye, Rocket } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

export default function PublishControls({
    isDirty,
    saving,
    publishing,
    previewOnly,
    onTogglePreviewOnly,
    onSaveDraft,
    onDiscard,
    onPublish,
}) {
    const [confirmPublishOpen, setConfirmPublishOpen] = useState(false);

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={onDiscard}
                    disabled={!isDirty || saving || publishing}
                >
                    <RotateCcw size={14} />
                    <span>Discard</span>
                </button>

                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={onSaveDraft}
                    disabled={saving || publishing}
                >
                    <Save size={14} />
                    <span>{saving ? "Saving..." : "Save Draft"}</span>
                </button>

                {onTogglePreviewOnly && (
                    <button
                        type="button"
                        className={`admin-btn admin-btn--sm ${
                            previewOnly ? "admin-btn--primary" : "admin-btn--outline"
                        }`}
                        onClick={onTogglePreviewOnly}
                    >
                        <Eye size={14} />
                        <span>{previewOnly ? "Exit Preview Only" : "Preview Only"}</span>
                    </button>
                )}

                <button
                    type="button"
                    className="admin-btn admin-btn--gold admin-btn--sm"
                    onClick={() => setConfirmPublishOpen(true)}
                    disabled={saving || publishing}
                >
                    <Rocket size={14} />
                    <span>{publishing ? "Publishing..." : "Publish"}</span>
                </button>
            </div>

            <ConfirmModal
                open={confirmPublishOpen}
                onClose={() => setConfirmPublishOpen(false)}
                onConfirm={async () => {
                    await onPublish?.();
                    setConfirmPublishOpen(false);
                }}
                title="Publish Changes to Live Website"
                message="Your draft changes will become visible to public visitors on the Pune Property Investors website. Continue?"
                confirmText="Publish Now"
                confirmTone="gold"
                loading={publishing}
            />
        </>
    );
}

