"use client";

import { AdminAuthProvider } from "../../context/AdminAuthContext";
import { ToastProvider } from "../../context/ToastContext";
import ToastContainer from "../../components/admin/common/ToastContainer";

export default function AdminRootLayout({ children }) {
    return (
        <AdminAuthProvider>
            <ToastProvider>
                {children}
                <ToastContainer />
            </ToastProvider>
        </AdminAuthProvider>
    );
}

