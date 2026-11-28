import { query, isDBConnected } from "../config/db.js";

const fallbackSettings = {
    id: 1,
    isEnabled: true,
    delaySeconds: 3,
    autoMute: true,
    sourceType: "shorts",
    pinnedVideoId: null,
    pinnedTitle: "Featured Property Reel",
    pinnedLink: "/shorts",
};

let memorySettings = { ...fallbackSettings };

function formatSettings(row) {
    if (!row) return null;
    return {
        id: row.id,
        isEnabled: Boolean(row.is_enabled ?? true),
        delaySeconds: Number(row.delay_seconds ?? 3),
        autoMute: Boolean(row.auto_mute ?? true),
        sourceType: row.source_type || "shorts",
        pinnedVideoId: row.pinned_video_id || null,
        pinnedTitle: row.pinned_title || "Featured Property Reel",
        pinnedLink: row.pinned_link || "/shorts",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export class AdvertisementPopupModel {
    static async getSettings() {
        if (!isDBConnected()) {
            return { ...memorySettings };
        }
        try {
            const rows = await query("SELECT * FROM advertisement_popup_settings ORDER BY id ASC LIMIT 1");
            if (rows.length > 0) {
                return formatSettings(rows[0]);
            }
            return { ...memorySettings };
        } catch (err) {
            console.error("AdvertisementPopupModel.getSettings error:", err);
            return { ...memorySettings };
        }
    }

    static async updateSettings(data) {
        if (!isDBConnected()) {
            memorySettings = {
                ...memorySettings,
                ...data,
                updatedAt: new Date().toISOString(),
            };
            return { ...memorySettings };
        }

        try {
            const current = await this.getSettings();
            const isEnabled = data.isEnabled !== undefined ? (data.isEnabled ? 1 : 0) : (current.isEnabled ? 1 : 0);
            const delaySeconds = data.delaySeconds !== undefined ? Number(data.delaySeconds) : current.delaySeconds;
            const autoMute = data.autoMute !== undefined ? (data.autoMute ? 1 : 0) : (current.autoMute ? 1 : 0);
            const sourceType = data.sourceType !== undefined ? data.sourceType : current.sourceType;
            const pinnedVideoId = data.pinnedVideoId !== undefined ? data.pinnedVideoId : current.pinnedVideoId;
            const pinnedTitle = data.pinnedTitle !== undefined ? data.pinnedTitle : current.pinnedTitle;
            const pinnedLink = data.pinnedLink !== undefined ? data.pinnedLink : current.pinnedLink;

            const [existing] = await query("SELECT id FROM advertisement_popup_settings LIMIT 1");
            if (existing) {
                await query(
                    `UPDATE advertisement_popup_settings
                     SET is_enabled = ?, delay_seconds = ?, auto_mute = ?, source_type = ?,
                         pinned_video_id = ?, pinned_title = ?, pinned_link = ?
                     WHERE id = ?`,
                    [
                        isEnabled,
                        delaySeconds,
                        autoMute,
                        sourceType,
                        pinnedVideoId,
                        pinnedTitle,
                        pinnedLink,
                        existing.id,
                    ]
                );
            } else {
                await query(
                    `INSERT INTO advertisement_popup_settings (
                        id, is_enabled, delay_seconds, auto_mute, source_type,
                        pinned_video_id, pinned_title, pinned_link
                    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        isEnabled,
                        delaySeconds,
                        autoMute,
                        sourceType,
                        pinnedVideoId,
                        pinnedTitle,
                        pinnedLink,
                    ]
                );
            }

            return await this.getSettings();
        } catch (err) {
            console.error("AdvertisementPopupModel.updateSettings error:", err);
            throw err;
        }
    }
}
