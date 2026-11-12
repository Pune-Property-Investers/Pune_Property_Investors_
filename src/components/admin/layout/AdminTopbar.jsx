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
} from "lucide-react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { SIDEBAR_GROUPS } from "./AdminSidebar";

export default function AdminTopbar({ onOpenMobileMenu, notifications = [] }) {
    const { user, logout } = useAdminAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
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
        </header>
    );
}

