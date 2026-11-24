"use client";

import { X } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

export default function ToastContainer() {
    const { toasts, dismissToast } = useToast();
    if (!toasts.length) return null;

    return (
        <div className="admin-toast-stack" role="status" aria-live="polite">
            {toasts.map((toast) => (
                <div key={toast.id} className={`admin-toast admin-toast--${toast.type}`}>
                    <span>{toast.message}</span>
                    <button
                        type="button"
                        onClick={() => dismissToast(toast.id)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#ffffff",
                            cursor: "pointer",
                            display: "grid",
                            placeItems: "center",
                            padding: 2,
                        }}
                        aria-label="Dismiss notification"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}

