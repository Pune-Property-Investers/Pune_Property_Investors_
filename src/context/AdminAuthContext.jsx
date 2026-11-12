"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { getAuthToken, getStoredUser, clearAuthSession } from "../services/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function hydrate() {
            const token = getAuthToken();
            const storedUser = getStoredUser();
            if (!token || !storedUser) {
                if (mounted) {
                    setUser(null);
                    setLoading(false);
                }
                return;
            }
            if (mounted) setUser(storedUser);
            try {
                const profile = await authService.getProfile();
                if (mounted && profile) setUser(profile);
            } catch {
                if (mounted) setUser(null);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        hydrate();

        const handleExpiry = () => {
            clearAuthSession();
            setUser(null);
            setSessionExpired(true);
            router.replace("/admin/login");
        };

        window.addEventListener("ppi:session-expired", handleExpiry);
        return () => {
            mounted = false;
            window.removeEventListener("ppi:session-expired", handleExpiry);
        };
    }, [router]);

    const login = useCallback(async (credentials) => {
        setSessionExpired(false);
        const result = await authService.login(credentials);
        setUser(result.user);
        return result;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
        router.replace("/admin/login");
    }, [router]);

    return (
        <AdminAuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: Boolean(user),
                sessionExpired,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) {
        throw new Error("useAdminAuth must be used inside AdminAuthProvider");
    }
    return ctx;
}

