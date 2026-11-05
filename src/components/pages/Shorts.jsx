"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
    ThumbsUp,
    ThumbsDown,
    Share2,
    FileText,
    Music,
    MapPin,
    Volume2,
    VolumeX,
    X,
    Send,
    CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { propertyShorts, extractYouTubeId } from "../../data/shortsData";
import Header from "../layouts/Header";
import "./Shorts.css";

export default function Shorts() {
    const containerRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [likedShorts, setLikedShorts] = useState({});
    const [dislikedShorts, setDislikedShorts] = useState({});
    const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
    const [selectedShort, setSelectedShort] = useState(null);
    const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Track scroll snapping to update active index
    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollTop = containerRef.current.scrollTop;
        const height = containerRef.current.clientHeight;
        const index = Math.round(scrollTop / height);
        if (index !== activeIndex && index >= 0 && index < propertyShorts.length) {
            setActiveIndex(index);
        }
    };

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 2400);
    };

    const handleLike = (id) => {
        setLikedShorts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        if (!likedShorts[id]) {
            setDislikedShorts((prev) => ({ ...prev, [id]: false }));
            triggerToast("Added to Liked Videos");
        }
    };

    const handleDislike = (id) => {
        setDislikedShorts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        if (!dislikedShorts[id]) {
            setLikedShorts((prev) => ({ ...prev, [id]: false }));
            triggerToast("Feedback received");
        }
    };

    const handleWhatsApp = (short) => {
        const phone = "917398174444";
        const message = encodeURIComponent(
            `Hi Pune Property Investors, I'm watching "${short.title}" (${short.location}, ${short.price}). Please send me the brochure, price sheet, and floor plans.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    const handleShare = async (short) => {
        const shareData = {
            title: `${short.title} — Pune Property Investors`,
            text: `Check out ${short.title} in ${short.location} (${short.price}) on Pune Property Investors:`,
            url: typeof window !== "undefined" ? window.location.href : "",
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // Cancelled
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            triggerToast("Link copied to clipboard!");
        } else {
            triggerToast("Short ready to share!");
        }
    };

    const openEnquiry = (short) => {
        setSelectedShort(short);
        setSubmitted(false);
        setEnquiryForm({ name: "", phone: "" });
        setEnquiryModalOpen(true);
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        const msg = [
            `*PPI Shorts VIP Enquiry*`,
            `*Project:* ${selectedShort?.title}`,
            `*Configuration:* ${selectedShort?.configurations}`,
            `*Location:* ${selectedShort?.location}`,
            `*Client Name:* ${enquiryForm.name}`,
            `*Contact:* ${enquiryForm.phone}`,
            `*Request:* Send official brochure & schedule site visit.`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setSubmitted(true);
        setTimeout(() => setEnquiryModalOpen(false), 2000);
    };

    return (
        <div className="shorts-page">
            {/* Header provides the 5-tab mobile bottom navigation */}
            <Header />

            {/* Shorts Feed Container */}
            <main
                className="shorts-feed"
                ref={containerRef}
                onScroll={handleScroll}
                aria-label="PPI Shorts Video Feed"
            >
                {propertyShorts.map((short, index) => {
                    const videoId = extractYouTubeId(short.youtubeUrl);
                    const isActive = activeIndex === index;
                    const isLiked = likedShorts[short.id];
                    const isDisliked = dislikedShorts[short.id];

                    return (
                        <section
                            key={short.id}
                            className={`short-slide ${isActive ? "short-slide--active" : ""}`}
                            aria-label={short.title}
                        >
                            {/* TOP BAR: Clean White Building Logo on Solid Black Top */}
                            <header className="short-top-header">
                                <Link href="/" className="short-logo-brand" aria-label="PPI Home">
                                    <svg
                                        width="34"
                                        height="34"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="short-brand-icon"
                                    >
                                        <path
                                            d="M18 3L28 9V32H8V9L18 3Z"
                                            stroke="#ffffff"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13 14H15M21 14H23M13 19H15M21 19H23M13 24H15M21 24H23"
                                            stroke="#ffffff"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M16 32V27C16 25.8954 16.8954 25 18 25C19.1046 25 20 25.8954 20 27V32"
                                            stroke="#ffffff"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 32H32"
                                            stroke="#ffffff"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setIsMuted((prev) => !prev)}
                                    className="short-mute-btn"
                                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                                >
                                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                                </button>
                            </header>

                            {/* FULL-SIZE VIDEO CONTAINER (Plays edge-to-edge without letterboxing) */}
                            <div className="short-video-stage">
                                {isActive && videoId ? (
                                    <iframe
                                        className="short-iframe"
                                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${
                                            isMuted ? 1 : 0
                                        }&loop=1&playlist=${videoId}&playsinline=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
                                        title={short.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div
                                        className="short-poster"
                                        style={{
                                            backgroundImage: videoId
                                                ? `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`
                                                : "none",
                                        }}
                                    />
                                )}

                                {/* Top and Bottom Gradient Vignettes for Overlay Contrast */}
                                <div className="short-top-vignette" />
                                <div className="short-bottom-vignette" />
                            </div>

                            {/* RIGHT ACTION COLUMN (Like, Dislike, WhatsApp, Share, Brochure, PPI Badge) */}
                            <aside className="short-right-actions" aria-label="Interaction buttons">
                                {/* 1. Like */}
                                <button
                                    type="button"
                                    onClick={() => handleLike(short.id)}
                                    className={`short-action-item ${isLiked ? "short-action-item--liked" : ""}`}
                                    aria-label="Like"
                                >
                                    <div className="short-action-circle">
                                        <ThumbsUp
                                            size={20}
                                            strokeWidth={2}
                                            fill={isLiked ? "#ffffff" : "none"}
                                            color="#ffffff"
                                        />
                                    </div>
                                    <span className="short-action-label">
                                        {isLiked ? "Liked" : short.likes || "3.1K"}
                                    </span>
                                </button>

                                {/* 2. Dislike */}
                                <button
                                    type="button"
                                    onClick={() => handleDislike(short.id)}
                                    className={`short-action-item ${isDisliked ? "short-action-item--disliked" : ""}`}
                                    aria-label="Dislike"
                                >
                                    <div className="short-action-circle">
                                        <ThumbsDown
                                            size={20}
                                            strokeWidth={2}
                                            fill={isDisliked ? "#ffffff" : "none"}
                                            color="#ffffff"
                                        />
                                    </div>
                                    <span className="short-action-label">Dislike</span>
                                </button>

                                {/* 3. WhatsApp (Bright Green Circle) */}
                                <button
                                    type="button"
                                    onClick={() => handleWhatsApp(short)}
                                    className="short-action-item short-action-item--wa"
                                    aria-label="WhatsApp"
                                >
                                    <div className="short-action-circle short-action-circle--wa">
                                        <FaWhatsapp size={22} color="#ffffff" />
                                    </div>
                                    <span className="short-action-label">WhatsApp</span>
                                </button>

                                {/* 4. Share */}
                                <button
                                    type="button"
                                    onClick={() => handleShare(short)}
                                    className="short-action-item"
                                    aria-label="Share"
                                >
                                    <div className="short-action-circle">
                                        <Share2 size={20} strokeWidth={2} color="#ffffff" />
                                    </div>
                                    <span className="short-action-label">Share</span>
                                </button>

                                {/* 5. Brochure (Warm Gold Circle) */}
                                <button
                                    type="button"
                                    onClick={() => openEnquiry(short)}
                                    className="short-action-item short-action-item--brochure"
                                    aria-label="Brochure"
                                >
                                    <div className="short-action-circle short-action-circle--brochure">
                                        <FileText size={20} color="#000000" />
                                    </div>
                                    <span className="short-action-label">Brochure</span>
                                </button>

                                {/* 6. Round PPI Logo Badge */}
                                <div className="short-ppi-round-badge" aria-hidden="true">
                                    <span>ppi</span>
                                </div>
                            </aside>

                            {/* BOTTOM INFO: Channel, Title, Meta, Description, Music Ticker */}
                            <div className="short-bottom-content">
                                {/* Top Line: White Avatar + "PPI Shorts 🟡" + Red "Enquire" Button */}
                                <div className="short-channel-row">
                                    <div className="short-channel-avatar" />
                                    <span className="short-channel-name">PPI Shorts</span>
                                    <span className="short-verified-dot" aria-label="Verified" />

                                    <button
                                        type="button"
                                        className="short-red-enquire-btn"
                                        onClick={() => openEnquiry(short)}
                                    >
                                        Enquire
                                    </button>
                                </div>

                                {/* Headline: Project Name & BHK */}
                                <h2 className="short-project-headline">
                                    {short.title} — {short.configurations}
                                </h2>

                                {/* Sub-row: Location & Price */}
                                <p className="short-project-meta">
                                    <MapPin size={13} className="short-meta-pin" />
                                    <span>{short.location} • {short.price}</span>
                                </p>

                                {/* 2-line Description */}
                                <p className="short-project-desc">
                                    {short.description}
                                </p>

                                {/* Running Audio Walkthrough Ticker */}
                                <div className="short-audio-ticker">
                                    <Music size={12} className="short-audio-icon" />
                                    <div className="short-audio-marquee-wrap">
                                        <span className="short-audio-marquee-text">
                                            {short.audioTitle || `Pune Property Investors • ${short.title} Sample Flat Walkthrough`} • {short.title} •
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </main>

            {/* Quick Toast Notification */}
            {toastMessage && (
                <div className="short-toast" role="status">
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Quick VIP Enquiry Modal */}
            {enquiryModalOpen && selectedShort && (
                <div
                    className="short-modal-backdrop"
                    onClick={() => setEnquiryModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="short-modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="short-modal-close"
                            onClick={() => setEnquiryModalOpen(false)}
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        <div className="short-modal-head">
                            <span className="short-modal-kicker">INSTANT BROCHURE & PRICING</span>
                            <h3 className="short-modal-title">
                                {selectedShort.title} — {selectedShort.configurations}
                            </h3>
                            <p className="short-modal-loc">
                                <MapPin size={13} /> {selectedShort.location} • {selectedShort.price}
                            </p>
                        </div>

                        {submitted ? (
                            <div className="short-modal-success">
                                <CheckCircle2 size={44} color="#16a34a" />
                                <h4>Brochure Dispatched!</h4>
                                <p>Opening WhatsApp to deliver price sheet and floor plan.</p>
                            </div>
                        ) : (
                            <form className="short-modal-form" onSubmit={handleModalSubmit}>
                                <div className="short-modal-field">
                                    <label htmlFor="modal-name">Full Name</label>
                                    <input
                                        id="modal-name"
                                        type="text"
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        value={enquiryForm.name}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                    />
                                </div>

                                <div className="short-modal-field">
                                    <label htmlFor="modal-phone">WhatsApp / Mobile Number</label>
                                    <input
                                        id="modal-phone"
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={enquiryForm.phone}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="short-modal-submit-btn">
                                    <span>Get Floor Plan & Brochure</span>
                                    <Send size={15} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
