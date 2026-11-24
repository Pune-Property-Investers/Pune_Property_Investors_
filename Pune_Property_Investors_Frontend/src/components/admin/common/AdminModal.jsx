"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function AdminModal({
    open,
    onClose,
    title,
    size = "md",
    children,
    footer,
}) {
    useEffect(() => {
        if (!open) return undefined;
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const sizeClass =
        size === "sm" ? "admin-modal--sm" : size === "xl" ? "admin-modal--xl" : "";

    return (
        <div className="admin-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div
                className={`admin-modal ${sizeClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal__header">
                    <h3 className="admin-modal__title">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="admin-icon-btn"
                        aria-label="Close modal"
                    >
                        <X size={16} />
                    </button>
                </div>
                <div className="admin-modal__body">{children}</div>
                {footer && <div className="admin-modal__footer">{footer}</div>}
            </div>
        </div>
    );
}

