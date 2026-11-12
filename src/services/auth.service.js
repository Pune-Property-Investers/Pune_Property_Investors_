import {
    apiRequest,
    withMockFallback,
    setAuthSession,
    clearAuthSession,
    getStoredUser,
    getAuthToken,
    ApiError,
} from "./api";
import { getStore } from "./mockStore";

export const authService = {
    async login({ email, password, remember = true }) {
        if (!email || !password) {
            throw new ApiError("Email and password are required.", 400);
        }

        const result = await withMockFallback(
            () =>
                apiRequest("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                }),
            () => {
                if (password.length < 6) {
                    throw new ApiError("Password must be at least 6 characters.", 400);
                }
                const store = getStore();
                const user = {
                    id: 1,
                    name: store.settings?.profile?.name || "PPI Admin",
                    email: email.trim(),
                    role: "SUPER_ADMIN",
                };
                return {
                    token: `demo_jwt_${Date.now()}`,
                    user,
                };
            }
        );

        setAuthSession(result.token, result.user, remember);
        return result;
    },

    async logout() {
        try {
            await withMockFallback(
                () => apiRequest("/auth/logout", { method: "POST" }),
                () => ({ success: true })
            );
        } finally {
            clearAuthSession();
        }
    },

    async getProfile() {
        const stored = getStoredUser();
        if (!getAuthToken()) return null;

        return withMockFallback(
            () => apiRequest("/auth/me"),
            () => stored
        );
    },

    async changePassword({ currentPassword, newPassword }) {
        if (!currentPassword || !newPassword || newPassword.length < 8) {
            throw new ApiError("New password must be at least 8 characters.", 400);
        }

        return withMockFallback(
            () =>
                apiRequest("/auth/change-password", {
                    method: "POST",
                    body: JSON.stringify({ currentPassword, newPassword }),
                }),
            () => ({ success: true, message: "Password updated (demo mode)." })
        );
    },
};

