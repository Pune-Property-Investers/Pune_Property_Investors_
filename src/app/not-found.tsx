import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import "./not-found.css";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <Header />
            <main className="not-found-main">
                <div className="not-found-card">
                    <div className="not-found-icon-wrap">
                        <Home size={36} />
                    </div>
                    <span className="not-found-badge">
                        404 ERROR
                    </span>
                    <h1 className="not-found-title">
                        Page Not Found
                    </h1>
                    <p className="not-found-desc">
                        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                    </p>
                    <div className="not-found-actions">
                        <Link
                            href="/buy"
                            className="primary-button"
                        >
                            <ArrowLeft size={16} />
                            Explore Properties
                        </Link>
                        <Link
                            href="/"
                            className="not-found-home-btn"
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
