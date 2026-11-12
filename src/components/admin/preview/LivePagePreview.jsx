"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PreviewToolbar from "./PreviewToolbar";
import ResponsivePreview from "./ResponsivePreview";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Isolated Iframe Live Preview Engine.
 * Streams real-time draft payloads to `/admin/preview/` via postMessage so public CSS
 * breakpoints (@media max-width: 768px / 1024px) render authentically without affecting Admin UI.
 */
export default function LivePagePreview({
    mode = "homepage",
    payload,
    previewOnly = false,
    onTogglePreviewOnly,
    title = "Live Page Preview",
}) {
    const iframeRef = useRef(null);
    const [device, setDevice] = useState("desktop");
    const [iframeReady, setIframeReady] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const postPreviewPayload = useCallback(() => {
        const win = iframeRef.current?.contentWindow;
        if (!win) return;
        win.postMessage(
            {
                type: "PPI_LIVE_PREVIEW_UPDATE",
                mode,
                payload,
            },
            "*"
        );
    }, [mode, payload]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "PPI_PREVIEW_READY") {
                setIframeReady(true);
                postPreviewPayload();
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [postPreviewPayload]);

    useEffect(() => {
        if (iframeReady) {
            postPreviewPayload();
        }
    }, [iframeReady, postPreviewPayload]);

    const previewSrc = `${basePath}/admin/preview/?mode=${encodeURIComponent(mode)}`;

    return (
        <div className="admin-preview-pane">
            <PreviewToolbar
                device={device}
                onDeviceChange={setDevice}
                previewOnly={previewOnly}
                onTogglePreviewOnly={onTogglePreviewOnly}
                onRefresh={() => {
                    setIframeReady(false);
                    setReloadKey((k) => k + 1);
                }}
                title={title}
            />

            <ResponsivePreview device={device}>
                <iframe
                    key={reloadKey}
                    ref={iframeRef}
                    src={previewSrc}
                    title="Live Public Website Preview"
                    className="admin-preview-iframe"
                    onLoad={() => {
                        setIframeReady(true);
                        postPreviewPayload();
                    }}
                />
            </ResponsivePreview>
        </div>
    );
}

