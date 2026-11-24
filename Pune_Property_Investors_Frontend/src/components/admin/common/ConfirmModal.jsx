"use client";

import AdminModal from "./AdminModal";

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    confirmTone = "primary",
    loading = false,
}) {
    return (
        <AdminModal
            open={open}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <button type="button" className="admin-btn admin-btn--outline" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        className={`admin-btn ${
                            confirmTone === "danger"
                                ? "admin-btn--danger"
                                : confirmTone === "gold"
                                    ? "admin-btn--gold"
                                    : "admin-btn--primary"
                        }`}
                        onClick={onConfirm}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>
                </>
            }
        >
            <p style={{ margin: 0, fontSize: 14, color: "#334155", lineHeight: 1.55 }}>{message}</p>
        </AdminModal>
    );
}

