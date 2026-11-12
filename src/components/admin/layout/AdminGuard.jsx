"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function AdminGuard({ children }) {
    const { isAuthenticated, loading } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/admin/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    background: "#f4f6f9",
                    color: "#475569",
                    fontSize: 14,
                    fontWeight: 500,
                }}
            >
                Verifying admin session...
            </div>
        );
    }

    return children;
}

