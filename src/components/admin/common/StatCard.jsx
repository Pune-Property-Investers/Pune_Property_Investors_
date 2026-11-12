"use client";

export default function StatCard({ label, value, meta, icon: Icon }) {
    return (
        <div className="admin-stat-card">
            <div>
                <div className="admin-stat-card__label">{label}</div>
                <div className="admin-stat-card__value">{value}</div>
                {meta && <div className="admin-stat-card__meta">{meta}</div>}
            </div>
            {Icon && (
                <div className="admin-stat-card__icon">
                    <Icon size={20} />
                </div>
            )}
        </div>
    );
}

