"use client";

import { useState } from "react";
import DraftStatus from "./DraftStatus";
import PublishControls from "./PublishControls";
import LivePagePreview from "../preview/LivePagePreview";

/**
 * Reusable Split-Screen Content Editor Shell
 * Left: Form / Section Controls | Right: Real-Time Live Website Preview
 */
export default function ContentEditor({
    title,
    subtitle,
    previewMode = "homepage",
    previewPayload,
    isDirty = false,
    hasUnpublishedChanges = false,
    status = "Published",
    updatedAt,
    saving = false,
    publishing = false,
    onSaveDraft,
    onDiscard,
    onPublish,
    children,
}) {
    const [previewOnly, setPreviewOnly] = useState(false);

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">{title}</h1>
                    {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
                    <div style={{ marginTop: 8 }}>
                        <DraftStatus
                            isDirty={isDirty}
                            hasUnpublishedChanges={hasUnpublishedChanges}
                            status={status}
                            updatedAt={updatedAt}
                        />
                    </div>
                </div>

                <div className="admin-page-actions">
                    <PublishControls
                        isDirty={isDirty}
                        saving={saving}
                        publishing={publishing}
                        previewOnly={previewOnly}
                        onTogglePreviewOnly={() => setPreviewOnly((p) => !p)}
                        onSaveDraft={onSaveDraft}
                        onDiscard={onDiscard}
                        onPublish={onPublish}
                    />
                </div>
            </div>

            <div
                className={`admin-split-editor ${
                    previewOnly ? "admin-split-editor--preview-only" : ""
                }`}
            >
                {!previewOnly && (
                    <div className="admin-editor-pane">
                        <div className="admin-editor-pane__scroll">{children}</div>
                    </div>
                )}

                <LivePagePreview
                    mode={previewMode}
                    payload={previewPayload}
                    previewOnly={previewOnly}
                    onTogglePreviewOnly={() => setPreviewOnly((p) => !p)}
                />
            </div>
        </div>
    );
}

