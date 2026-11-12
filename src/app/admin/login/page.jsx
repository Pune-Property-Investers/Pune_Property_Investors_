"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import "../../../styles/admin/admin.css";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { useToast } from "../../../context/ToastContext";
import { isBackendConfigured } from "../../../services/api";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AdminLoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, sessionExpired } = useAdminAuth();
    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/admin");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!email.trim() || !password) {
            setErrorMsg("Please enter both your admin email and password.");
            return;
        }

        setSubmitting(true);
        try {
            await login({ email: email.trim(), password, remember });
            showToast("Signed in to PPI Admin Dashboard.", "success");
            router.replace("/admin");
        } catch (err) {
            setErrorMsg(err?.message || "Invalid credentials. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-login-page admin-shell" style={{ display: "flex" }}>
            <div className="admin-login-card">
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <img
                        src={`${basePath}/images/logo.png`}
                        alt="Pune Property Investors"
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            objectFit: "cover",
                            margin: "0 auto 12px",
                            display: "block",
                        }}
                    />
                    <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px", color: "#0f172a" }}>
                        PPI Admin Portal
                    </h1>
                    <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                        Authorized access only • Real Estate CMS &amp; CRM
                    </p>
                </div>

                {sessionExpired && (
                    <div
                        style={{
                            padding: "10px 12px",
                            borderRadius: 8,
                            background: "#fffbeb",
                            border: "1px solid #fde68a",
                            color: "#92400e",
                            fontSize: 12.5,
                            marginBottom: 14,
                        }}
                    >
                        Your previous session expired. Please sign in again.
                    </div>
                )}

                {errorMsg && (
                    <div
                        style={{
                            padding: "10px 12px",
                            borderRadius: 8,
                            background: "#fef2f2",
                            border: "1px solid #fecaca",
                            color: "#b91c1c",
                            fontSize: 12.5,
                            marginBottom: 14,
                        }}
                    >
                        {errorMsg}
                    </div>
                )}

                {!isBackendConfigured() && (
                    <div
                        style={{
                            padding: "10px 12px",
                            borderRadius: 8,
                            background: "#f0f9ff",
                            border: "1px solid #bae6fd",
                            color: "#0369a1",
                            fontSize: 12,
                            marginBottom: 16,
                            lineHeight: 1.45,
                        }}
                    >
                        <strong>Local Preview Mode:</strong> Backend API (<code>NEXT_PUBLIC_API_URL</code>) is not connected. Sign in with any valid email &amp; password (6+ chars) to test the CMS locally.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="admin-field">
                        <label htmlFor="admin-email" className="admin-label">
                            Admin Email
                        </label>
                        <div style={{ position: "relative" }}>
                            <Mail
                                size={15}
                                style={{
                                    position: "absolute",
                                    left: 11,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8",
                                }}
                            />
                            <input
                                id="admin-email"
                                type="email"
                                className="admin-input"
                                style={{ paddingLeft: 34 }}
                                placeholder="admin@punepropertyinvestor.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-field">
                        <label htmlFor="admin-password" className="admin-label">
                            Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <Lock
                                size={15}
                                style={{
                                    position: "absolute",
                                    left: 11,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8",
                                }}
                            />
                            <input
                                id="admin-password"
                                type={showPassword ? "text" : "password"}
                                className="admin-input"
                                style={{ paddingLeft: 34, paddingRight: 36 }}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "transparent",
                                    color: "#64748b",
                                    cursor: "pointer",
                                    padding: 2,
                                }}
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 13,
                            color: "#475569",
                            marginBottom: 18,
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        Keep me signed in on this device
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="admin-btn admin-btn--primary"
                        style={{ width: "100%", height: 42 }}
                    >
                        <ShieldCheck size={16} />
                        <span>{submitting ? "Signing in..." : "Sign In to Dashboard"}</span>
                    </button>
                </form>

                <div
                    style={{
                        marginTop: 20,
                        paddingTop: 16,
                        borderTop: "1px solid #f1f5f9",
                        textAlign: "center",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12.5,
                            color: "#64748b",
                            textDecoration: "none",
                        }}
                    >
                        <ArrowLeft size={14} />
                        Back to Pune Property Investors website
                    </Link>
                </div>
            </div>
        </div>
    );
}

