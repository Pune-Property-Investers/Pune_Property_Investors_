import { query, isDBConnected } from "../config/db.js";

const fallbackHeroSettings = {
    id: 1,
    eyebrow: "YOUR PROPERTY PARTNER IN PUNE",
    headingLine1: "Find Your Dream Home.",
    headingLine2: "Invest in Your Future",
    subtitle: null,
    videoUrl: "https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true",
    backgroundImage: null,
    primaryCtaText: null,
    primaryCtaUrl: "/buy",
    showCategoryTabs: true,
    showSearchCard: true,
    isActive: true,
};

const fallbackBadges = [
    { id: 1, badgeKey: "establishment", strongText: "Since 2022", labelText: "in Pune", iconName: "ShieldCheck", displayOrder: 1, isActive: true },
    { id: 2, badgeKey: "rating", strongText: "4.9/5", labelText: "Client Rating", iconName: "Star", displayOrder: 2, isActive: true },
    { id: 3, badgeKey: "brokerage", strongText: "0%", labelText: "Brokerage", iconName: "CirclePercent", displayOrder: 3, isActive: true },
    { id: 4, badgeKey: "happy-families", strongText: "20,000+", labelText: "Happy Families", iconName: "Users", displayOrder: 4, isActive: true },
    { id: 5, badgeKey: "team-size", strongText: "200+", labelText: "Team Size", iconName: "Building2", displayOrder: 5, isActive: true },
    { id: 6, badgeKey: "localities", strongText: "30+", labelText: "Pune Localities", iconName: "MapPin", displayOrder: 6, isActive: true },
];

let memoryHero = { ...fallbackHeroSettings };
let memoryBadges = [...fallbackBadges];

function formatHero(row) {
    if (!row) return null;
    return {
        id: row.id,
        eyebrow: row.eyebrow || "YOUR PROPERTY PARTNER IN PUNE",
        headingLine1: row.heading_line1 || "Find Your Dream Home.",
        headingLine2: row.heading_line2 || "Invest in Your Future",
        subtitle: row.subtitle || "",
        videoUrl: row.video_url || "",
        backgroundImage: row.background_image || null,
        primaryCtaText: row.primary_cta_text || "Explore Verified Properties",
        primaryCtaUrl: row.primary_cta_url || "/buy",
        showCategoryTabs: Boolean(row.show_category_tabs ?? true),
        showSearchCard: Boolean(row.show_search_card ?? true),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function formatBadge(row) {
    if (!row) return null;
    return {
        id: row.id,
        badgeKey: row.badge_key || "",
        strongText: row.strong_text || "",
        labelText: row.label_text || "",
        iconName: row.icon_name || "ShieldCheck",
        displayOrder: Number(row.display_order ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const HeroSettingModel = {
    async getSettings() {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM hero_settings ORDER BY id ASC LIMIT 1");
                if (rows && rows.length > 0) {
                    return formatHero(rows[0]);
                }
            } catch (err) {
                console.error("HeroSettingModel.getSettings DB error:", err.message);
            }
        }
        return { ...memoryHero };
    },

    async updateSettings(payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.eyebrow !== undefined) {
                    fields.push("eyebrow = ?");
                    params.push(payload.eyebrow);
                }
                if (payload.headingLine1 !== undefined || payload.heading_line1 !== undefined) {
                    fields.push("heading_line1 = ?");
                    params.push(payload.headingLine1 ?? payload.heading_line1);
                }
                if (payload.headingLine2 !== undefined || payload.heading_line2 !== undefined) {
                    fields.push("heading_line2 = ?");
                    params.push(payload.headingLine2 ?? payload.heading_line2);
                }
                if (payload.subtitle !== undefined) {
                    fields.push("subtitle = ?");
                    params.push(payload.subtitle);
                }
                if (payload.videoUrl !== undefined || payload.video_url !== undefined) {
                    fields.push("video_url = ?");
                    params.push(payload.videoUrl ?? payload.video_url);
                }
                if (payload.backgroundImage !== undefined || payload.background_image !== undefined) {
                    fields.push("background_image = ?");
                    params.push(payload.backgroundImage ?? payload.background_image);
                }
                if (payload.primaryCtaText !== undefined || payload.primary_cta_text !== undefined) {
                    fields.push("primary_cta_text = ?");
                    params.push(payload.primaryCtaText ?? payload.primary_cta_text);
                }
                if (payload.primaryCtaUrl !== undefined || payload.primary_cta_url !== undefined) {
                    fields.push("primary_cta_url = ?");
                    params.push(payload.primaryCtaUrl ?? payload.primary_cta_url);
                }
                if (payload.showCategoryTabs !== undefined || payload.show_category_tabs !== undefined) {
                    fields.push("show_category_tabs = ?");
                    params.push((payload.showCategoryTabs ?? payload.show_category_tabs) ? 1 : 0);
                }
                if (payload.showSearchCard !== undefined || payload.show_search_card !== undefined) {
                    fields.push("show_search_card = ?");
                    params.push((payload.showSearchCard ?? payload.show_search_card) ? 1 : 0);
                }
                if (payload.isActive !== undefined || payload.is_active !== undefined) {
                    fields.push("is_active = ?");
                    params.push((payload.isActive ?? payload.is_active) ? 1 : 0);
                }

                if (fields.length > 0) {
                    params.push(1);
                    await query(`UPDATE hero_settings SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getSettings();
            } catch (err) {
                console.error("HeroSettingModel.updateSettings DB error:", err.message);
            }
        }
        memoryHero = { ...memoryHero, ...payload, updatedAt: new Date().toISOString() };
        return { ...memoryHero };
    },

    async listBadges(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM hero_trust_badges WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, id ASC";
                const rows = await query(sql, params);
                return (rows || []).map(formatBadge);
            } catch (err) {
                console.error("HeroSettingModel.listBadges DB error:", err.message);
            }
        }
        let list = [...memoryBadges];
        if (filters.isActive !== undefined) {
            list = list.filter((b) => b.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter((b) => b.isActive !== false);
        }
        return list;
    },

    async getBadgeById(id) {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM hero_trust_badges WHERE id = ?", [id]);
                return rows && rows.length > 0 ? formatBadge(rows[0]) : null;
            } catch (err) {
                console.error("HeroSettingModel.getBadgeById DB error:", err.message);
            }
        }
        return memoryBadges.find((b) => String(b.id) === String(id)) || null;
    },

    async createBadge(payload) {
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO hero_trust_badges (badge_key, strong_text, label_text, icon_name, display_order, is_active)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    payload.badgeKey || payload.badge_key || `badge-${Date.now()}`,
                    payload.strongText || payload.strong_text || "",
                    payload.labelText || payload.label_text || "",
                    payload.iconName || payload.icon_name || "ShieldCheck",
                    Number(payload.displayOrder ?? payload.display_order ?? 0),
                    payload.isActive !== false ? 1 : 0,
                ];
                const result = await query(sql, params);
                return this.getBadgeById(result.insertId);
            } catch (err) {
                console.error("HeroSettingModel.createBadge DB error:", err.message);
            }
        }
        const newId = memoryBadges.length ? Math.max(...memoryBadges.map((b) => b.id)) + 1 : 1;
        const record = {
            id: newId,
            badgeKey: payload.badgeKey || payload.badge_key || `badge-${Date.now()}`,
            strongText: payload.strongText || payload.strong_text || "",
            labelText: payload.labelText || payload.label_text || "",
            iconName: payload.iconName || payload.icon_name || "ShieldCheck",
            displayOrder: Number(payload.displayOrder ?? payload.display_order ?? 0),
            isActive: payload.isActive !== false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        memoryBadges.push(record);
        return record;
    },

    async updateBadge(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.strongText !== undefined || payload.strong_text !== undefined) {
                    fields.push("strong_text = ?");
                    params.push(payload.strongText ?? payload.strong_text);
                }
                if (payload.labelText !== undefined || payload.label_text !== undefined) {
                    fields.push("label_text = ?");
                    params.push(payload.labelText ?? payload.label_text);
                }
                if (payload.iconName !== undefined || payload.icon_name !== undefined) {
                    fields.push("icon_name = ?");
                    params.push(payload.iconName ?? payload.icon_name);
                }
                if (payload.displayOrder !== undefined || payload.display_order !== undefined) {
                    fields.push("display_order = ?");
                    params.push(Number(payload.displayOrder ?? payload.display_order));
                }
                if (payload.isActive !== undefined || payload.is_active !== undefined) {
                    fields.push("is_active = ?");
                    params.push((payload.isActive ?? payload.is_active) ? 1 : 0);
                }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE hero_trust_badges SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getBadgeById(id);
            } catch (err) {
                console.error("HeroSettingModel.updateBadge DB error:", err.message);
            }
        }
        const index = memoryBadges.findIndex((b) => String(b.id) === String(id));
        if (index !== -1) {
            memoryBadges[index] = { ...memoryBadges[index], ...payload, updatedAt: new Date().toISOString() };
            return memoryBadges[index];
        }
        return null;
    },

    async deleteBadge(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM hero_trust_badges WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("HeroSettingModel.deleteBadge DB error:", err.message);
            }
        }
        const index = memoryBadges.findIndex((b) => String(b.id) === String(id));
        if (index !== -1) {
            memoryBadges.splice(index, 1);
            return true;
        }
        return false;
    },

    async getFullHero() {
        const settings = await this.getSettings();
        const badges = await this.listBadges({ isActive: true });
        return {
            ...settings,
            trustBadges: badges,
        };
    },
};
