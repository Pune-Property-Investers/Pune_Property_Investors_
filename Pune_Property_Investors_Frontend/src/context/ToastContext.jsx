"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, type = "success", duration = 3500) => {
            const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
            setToasts((prev) => [...prev, { id, message, type }]);
            if (duration > 0) {
                setTimeout(() => dismissToast(id), duration);
            }
            return id;
        },
        [dismissToast]
    );

    return (
        <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return ctx;
}

