"use client";

import { useState, useCallback, useMemo } from "react";
import { useUnsavedChanges } from "./useUnsavedChanges";

/**
 * Reusable Draft / Preview / Publish state manager for visual CMS editors.
 * Keeps original saved state, draft edits, and live published snapshots distinct.
 */
export function useDraftEditor({ initialDraft, initialPublished, onSaveDraft, onPublish }) {
    const [originalSaved, setOriginalSaved] = useState(initialDraft);
    const [draft, setDraft] = useState(initialDraft);
    const [published, setPublished] = useState(initialPublished || initialDraft);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const isDirty = useMemo(() => {
        return JSON.stringify(draft) !== JSON.stringify(originalSaved);
    }, [draft, originalSaved]);

    const hasUnpublishedChanges = useMemo(() => {
        return JSON.stringify(draft) !== JSON.stringify(published);
    }, [draft, published]);

    useUnsavedChanges(isDirty);

    const hydrate = useCallback((nextDraft, nextPublished) => {
        setOriginalSaved(nextDraft);
        setDraft(nextDraft);
        if (nextPublished) setPublished(nextPublished);
    }, []);

    const updateDraft = useCallback((updater) => {
        setDraft((prev) => (typeof updater === "function" ? updater(prev) : updater));
    }, []);

    const discardChanges = useCallback(() => {
        setDraft(originalSaved);
    }, [originalSaved]);

    const saveDraft = useCallback(async () => {
        if (!onSaveDraft) return draft;
        setSaving(true);
        try {
            const saved = await onSaveDraft(draft);
            const resolved = saved || draft;
            setOriginalSaved(resolved);
            setDraft(resolved);
            return resolved;
        } finally {
            setSaving(false);
        }
    }, [draft, onSaveDraft]);

    const publishChanges = useCallback(async () => {
        if (!onPublish) return draft;
        setPublishing(true);
        try {
            const pub = await onPublish(draft);
            const resolved = pub || draft;
            setOriginalSaved(resolved);
            setDraft(resolved);
            setPublished(resolved);
            return resolved;
        } finally {
            setPublishing(false);
        }
    }, [draft, onPublish]);

    return {
        originalSaved,
        draft,
        published,
        isDirty,
        hasUnpublishedChanges,
        saving,
        publishing,
        hydrate,
        updateDraft,
        discardChanges,
        saveDraft,
        publishChanges,
    };
}

