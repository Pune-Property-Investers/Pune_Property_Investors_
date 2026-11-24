"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
    Menu,
    Search,
    Bell,
    ExternalLink,
    LogOut,
    Settings,
    ChevronDown,
    User,
    Rocket,
    RotateCcw,
} from "lucide-react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { useToast } from "../../../context/ToastContext";
import { contentService } from "../../../services/content.service";
import { readPreviousSnapshot } from "../../../services/liveContent";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import { SIDEBAR_GROUPS } from "./AdminSidebar";

export default function AdminTopbar({ onOpenMobileMenu, notifications = [] }) {
    const { user, logout } = useAdminAuth();
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
    const [publishingAll, setPublishingAll] = useState(false);
    const [revertModalOpen, setRevertModalOpen] = useState(false);
    const [reverting, setReverting] = useState(false);
    const [hasPreviousVersion, setHasPreviousVersion] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setNotifOpen(false);
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const quickNavMatches = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return [];
        const flat = SIDEBAR_GROUPS.flatMap((g) =>
            g.items.map((item) => ({ ...item, group: g.title }))
        );
        return flat
            .filter(
                (i) =>
                    i.label.toLowerCase().includes(q) ||
                    i.group.toLowerCase().includes(q)
            )
            .slice(0, 6);
    }, [searchQuery]);

    const initials = (user?.name || "Admin")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="admin-topbar" ref={wrapRef}>
            <div className="admin-topbar__left">
                <button
                    type="button"
                    className="admin-topbar__mobile-menu"
                    onClick={onOpenMobileMenu}
                    aria-label="Open navigation menu"
                >
                    <Menu size={18} />
                </button>

                <div className="admin-topbar__search">
                    <Search size={15} className="admin-topbar__search-icon" />
                    <input
                        type="text"
                        className="admin-topbar__search-input"
                        placeholder="Jump to module (Properties, Homepage, Leads, Media...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {quickNavMatches.length > 0 && (
                        <div className="admin-topbar__search-results">
                            {quickNavMatches.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="admin-topbar__search-item"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <span>{item.label}</span>
                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{item.group}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="admin-topbar__right">
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={() => {
                        setHasPreviousVersion(Boolean(readPreviousSnapshot()));
                        setRevertModalOpen(true);
                    }}
                    disabled={publishingAll || reverting}
                    title="Revert published changes and restore previous or original website state"
                >
                    <RotateCcw size={14} />
                    <span>{reverting ? "Reverting..." : "Revert Changes"}</span>
                </button>

                <button
                    type="button"
                    className="admin-btn admin-btn--gold admin-btn--sm"
                    onClick={() => setPublishConfirmOpen(true)}
                    disabled={publishingAll}
                    title="Publish all current CMS, inventory, and content changes to the live website"
                >
                    <Rocket size={14} />
                    <span>{publishingAll ? "Publishing..." : "Publish to Live Site"}</span>
                </button>

                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    title="Open Public Website"
                >
                    <ExternalLink size={14} />
                    <span>Live Site</span>
                </Link>

                {/* Notifications */}
                <div className="admin-dropdown-wrap">
                    <button
                        type="button"
                        className="admin-icon-btn"
                        onClick={() => {
                            setNotifOpen((p) => !p);
                            setProfileOpen(false);
                        }}
                        aria-label="Notifications"
                    >
                        <Bell size={17} />
                        {notifications.length > 0 && <span className="admin-icon-btn__dot" />}
                    </button>

                    {notifOpen && (
                        <div className="admin-popover">
                            <div className="admin-popover__head">
                                <span>Notifications</span>
                                <span style={{ fontSize: 11, color: "#64748b" }}>
                                    {notifications.length} recent
                                </span>
                            </div>
                            <div style={{ maxHeight: 280, overflowY: "auto" }}>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: 16, fontSize: 13, color: "#64748b" }}>
                                        All caught up!
                                    </div>
                                ) : (
                                    notifications.map((n) => (
                                        <Link
                                            key={n.id}
                                            href={n.href || "/admin/leads"}
                                            className="admin-popover__item"
                                            onClick={() => setNotifOpen(false)}
                                            style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}
                                        >
                                            <span style={{ fontWeight: 600, fontSize: 12.5 }}>{n.title}</span>
                                            <span style={{ fontSize: 11.5, color: "#64748b" }}>{n.meta}</span>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="admin-dropdown-wrap">
                    <button
                        type="button"
                        className="admin-profile-btn"
                        onClick={() => {
                            setProfileOpen((p) => !p);
                            setNotifOpen(false);
                        }}
                    >
                        <span className="admin-avatar">{initials}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                            {user?.name || "Admin"}
                        </span>
                        <ChevronDown size={14} color="#64748b" />
                    </button>

                    {profileOpen && (
                        <div className="admin-popover admin-popover--sm">
                            <div className="admin-popover__head" style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                                <span>{user?.name || "Admin"}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, color: "#64748b" }}>
                                    {user?.email || "admin@punepropertyinvestor.com"}
                                </span>
                            </div>
                            <Link
                                href="/admin/settings"
                                className="admin-popover__item"
                                onClick={() => setProfileOpen(false)}
                            >
                                <User size={15} />
                                <span>Admin Profile</span>
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="admin-popover__item"
                                onClick={() => setProfileOpen(false)}
                            >
                                <Settings size={15} />
                                <span>Website Settings</span>
                            </Link>
                            <button
                                type="button"
                                className="admin-popover__item"
                                style={{ color: "#dc2626", borderTop: "1px solid #f1f5f9" }}
                                onClick={() => {
                                    setProfileOpen(false);
                                    logout();
                                }}
                            >
                                <LogOut size={15} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={publishConfirmOpen}
                onClose={() => setPublishConfirmOpen(false)}
                onConfirm={async () => {
                    setPublishingAll(true);
                    try {
                        await contentService.publishAllToLiveSite();
                        showToast("All changes are now live on the main website!", "success");
                        setPublishConfirmOpen(false);
                    } catch (err) {
                        showToast(err?.message || "Failed to publish changes", "error");
                    } finally {
                        setPublishingAll(false);
                    }
                }}
                loading={publishingAll}
                title="Publish Changes to Live Website"
                message="Push all homepage sections, About Us edits, projects, properties, testimonials, shorts, and advertisements directly to the public website?"
                confirmText="Publish Now"
                confirmTone="gold"
            />

            <AdminModal
                open={revertModalOpen}
                onClose={() => !reverting && setRevertModalOpen(false)}
                title="Revert Website Changes"
                size="sm"
                footer={
                    <>
                        <button
                            type="button"
                            className="admin-btn admin-btn--outline"
                            onClick={() => setRevertModalOpen(false)}
                            disabled={reverting}
                        >
                            Cancel
                        </button>
                        {hasPreviousVersion && (
                            <button
                                type="button"
                                className="admin-btn admin-btn--primary"
                                disabled={reverting}
                                onClick={async () => {
                                    setReverting(true);
                                    try {
                                        await contentService.revertChanges("previous");
                                        showToast("Reverted live website to the previous published version.", "success");
                                        setRevertModalOpen(false);
                                        if (typeof window !== "undefined") window.location.reload();
                                    } catch (err) {
                                        showToast(err?.message || "Failed to revert changes", "error");
                                    } finally {
                                        setReverting(false);
                                    }
                                }}
                            >
                                <RotateCcw size={14} /> Previous Publish
                            </button>
                        )}
                        <button
                            type="button"
                            className="admin-btn admin-btn--danger"
                            disabled={reverting}
                            onClick={async () => {
                                setReverting(true);
                                try {
                                    await contentService.revertChanges("original");
                                    showToast("All changes reverted to the original website.", "success");
                                    setRevertModalOpen(false);
                                    if (typeof window !== "undefined") window.location.reload();
                                } catch (err) {
                                    showToast(err?.message || "Failed to revert to original", "error");
                                } finally {
                                    setReverting(false);
                                }
                            }}
                        >
                            <RotateCcw size={14} /> Restore Original
                        </button>
                    </>
                }
            >
                <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                    {hasPreviousVersion
                        ? "Roll back the last publish to the previous live version, or clear all CMS overrides to restore the original default Pune Property Investors website."
                        : "Discard current admin edits and clear published overrides to restore the original default Pune Property Investors website."}
                </p>
            </AdminModal>
        </header>
    );
}

