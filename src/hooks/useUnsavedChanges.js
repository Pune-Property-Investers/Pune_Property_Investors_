"use client";

import { useEffect } from "react";

/**
 * Prompts browser navigation confirmation whenever an editor has unsaved changes.
 */
export function useUnsavedChanges(isDirty) {
    useEffect(() => {
        if (!isDirty) return undefined;

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
            return event.returnValue;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);
}

