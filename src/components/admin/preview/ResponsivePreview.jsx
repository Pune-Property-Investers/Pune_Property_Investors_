"use client";

import { PREVIEW_DEVICES } from "./PreviewToolbar";

export default function ResponsivePreview({ device = "desktop", children }) {
    const selected = PREVIEW_DEVICES.find((d) => d.key === device) || PREVIEW_DEVICES[0];

    return (
        <div className="admin-preview-stage">
            <div
                className="admin-preview-frame-wrap"
                style={{
                    width: selected.width,
                    maxWidth: "100%",
                }}
            >
                {children}
            </div>
        </div>
    );
}

