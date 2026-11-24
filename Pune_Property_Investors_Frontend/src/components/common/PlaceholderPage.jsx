import Link from "next/link";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "./PlaceholderPage.css";

export default function PlaceholderPage({ title, description }) {
    return (
        <>
            <Header />
            <main className="container section placeholder-main">
                <div className="placeholder-card">
                    <span className="placeholder-tag">
                        Pune Property Investor
                    </span>
                    <h1 className="placeholder-title">
                        {title}
                    </h1>
                    <p className="placeholder-desc">
                        {description ||
                            "This page is currently being updated with fresh listings and verified Pune real estate information. Please check back soon or browse our available properties."}
                    </p>
                    <div className="placeholder-actions">
                        <Link
                            href="/buy"
                            className="placeholder-btn-primary"
                        >
                            Explore Properties
                        </Link>
                        <Link
                            href="/"
                            className="placeholder-btn-secondary"
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
