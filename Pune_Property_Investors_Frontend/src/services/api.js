/**
 * Centralized API Client for Pune Property Investors Admin CMS
 * Connects to the separate Node.js + Express + Prisma REST API when NEXT_PUBLIC_API_URL is set,
 * and falls back gracefully to the local mock service layer during frontend-only development.
 */

const TOKEN_KEY = "ppi_admin_token";
const USER_KEY = "ppi_admin_user";

export function getApiBaseUrl() {
    const url = process.env.NEXT_PUBLIC_API_URL || "";
    return url.replace(/\/+$/, "");
}

export function isBackendConfigured() {
    return Boolean(getApiBaseUrl());
}

export function getAuthToken() {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

export function setAuthSession(token, user, remember = true) {
    if (typeof window === "undefined") return;
    try {
        const primary = remember ? localStorage : sessionStorage;
        const secondary = remember ? sessionStorage : localStorage;
        secondary.removeItem(TOKEN_KEY);
        secondary.removeItem(USER_KEY);
        if (token) primary.setItem(TOKEN_KEY, token);
        if (user) primary.setItem(USER_KEY, JSON.stringify(user));
    } catch {
        // Ignore storage quota errors
    }
}

export function clearAuthSession() {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
    } catch {
        // Ignore
    }
}

export function getStoredUser() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export class ApiError extends Error {
    constructor(message, status = 500, data = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

/**
 * Core fetch wrapper with JSON parsing, Bearer auth, and session-expiry event dispatch.
 */
export async function apiRequest(endpoint, options = {}) {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        throw new ApiError("Backend API URL is not configured (NEXT_PUBLIC_API_URL).", 503);
    }

    const token = getAuthToken();
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        clearAuthSession();
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("ppi:session-expired"));
        }
        throw new ApiError("Your session has expired. Please log in again.", 401);
    }

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => null);

    if (!response.ok) {
        const msg =
            (payload && typeof payload === "object" && (payload.message || payload.error)) ||
            `Request failed with status ${response.status}`;
        throw new ApiError(msg, response.status, payload);
    }

    return payload?.data !== undefined ? payload.data : payload;
}

/**
 * Helper that calls the live Express API when NEXT_PUBLIC_API_URL is configured,
 * and falls back to the mock handler only when no backend URL is configured (or on network failure in demo mode).
 */
export async function withMockFallback(apiCall, mockCall) {
    if (!isBackendConfigured()) {
        await new Promise((resolve) => setTimeout(resolve, 120));
        return mockCall();
    }

    try {
        return await apiCall();
    } catch (error) {
        // Re-throw genuine auth or validation errors from a live backend
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            throw error;
        }
        // If backend server is offline locally, allow seamless demo fallback
        if (typeof window !== "undefined" && window.location.hostname === "localhost") {
            return mockCall();
        }
        throw error;
    }
}

