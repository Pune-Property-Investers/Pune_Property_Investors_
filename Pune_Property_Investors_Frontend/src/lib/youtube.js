/**
 * Extracts a YouTube video ID from a YouTube URL (watch, youtu.be, embed, shorts, live)
 * or returns a valid 11-character raw video ID directly.
 */
export function extractYouTubeVideoId(input) {
    const raw = typeof input === "string" ? input.trim() : "";
    if (!raw) return "";

    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
        return raw;
    }

    try {
        const url = new URL(raw);
        if (url.hostname.includes("youtu.be")) {
            return url.pathname.replace(/^\/+/, "").split("/")[0] || "";
        }

        if (url.hostname.includes("youtube.com")) {
            if (url.pathname === "/watch") {
                return url.searchParams.get("v") || "";
            }

            const match = url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/);
            return match?.[1] || "";
        }
    } catch {
        return "";
    }

    return "";
}

