"use client";

import { useState } from "react";
import {
    Sparkles,
    MapPin,
    Calendar,
    ShieldCheck,
    Volume2,
    VolumeX,
    Maximize2,
    ArrowUpRight,
    MessageCircle,
    Building2,
    Bed,
    Tag,
    X,
    Send,
    CheckCircle2,
    Play,
    PhoneCall,
} from "lucide-react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import { leadService } from "../../services/lead.service";
import "./UpcomingProjects.css";

const youtubeUrl = "https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s";
const videoId = "yTzvQko2gYo";
const startSeconds = 14;

export default function UpcomingProjects({ previewData }) {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bhk, setBhk] = useState("3 BHK");
    const [submitted, setSubmitted] = useState(false);

    const activeYoutubeUrl = previewData?.youtubeUrl || youtubeUrl;
    const matchId = activeYoutubeUrl.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    const activeVideoId = matchId ? matchId[1] : videoId;

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await leadService.create({
                type: "property",
                name,
                phone,
                propertyTitle: "VTP Aurelia (New Kharadi)",
                locality: "New Kharadi",
                budget: bhk,
                message:
                    "Pre-launch EOI privileges, inaugural price sheet, and early unit layouts.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }
        const msg = [
            `*Upcoming Project Pre-Registration*`,
            `*Project:* VTP Aurelia (New Kharadi)`,
            `*Developer:* VTP Realty`,
            `*Configuration Interested:* ${bhk}`,
            `*Name:* ${name}`,
            `*Phone:* ${phone}`,
            `*Request:* Pre-launch EOI privileges, inaugural price sheet, and early unit layouts.`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setSubmitted(true);
        setTimeout(() => {
            setModalOpen(false);
            setSubmitted(false);
            setName("");
            setPhone("");
        }, 1800);
    };

    return (
        <section
            className="upcoming-projects-section"
            id="upcoming-projects"
            aria-label="Upcoming Project Showcase"
        >
            <div className="upcoming-projects-container">
                {/* SECTION HEADER */}
                <div className="upcoming-header-row">
                    <div className="upcoming-header-text">
                        <div className="upcoming-eyebrow-wrap">
                            <span className="upcoming-eyebrow-line" />
                            <span className="upcoming-eyebrow">
                                <Sparkles size={13} /> {previewData?.eyebrow ?? "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027"}
                            </span>
                        </div>

                        <h2 className="upcoming-title">
                            {previewData?.heading ? (
                                previewData.heading
                            ) : (
                                <>
                                    Upcoming <span>Project Showcase</span>
                                </>
                            )}
                        </h2>

                        <p className="upcoming-subtitle">
                            {previewData?.subtitle ??
                                "Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi. Lock in inaugural pre-registration privileges before public release."}
                        </p>
                    </div>

                    {/* YouTube Channel & Direct Link CTA */}
                    <div className="upcoming-header-actions">
                        <a
                            href={activeYoutubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="upcoming-yt-btn"
                            aria-label="Watch on YouTube"
                        >
                            <FaYoutube size={17} color="#ff0000" />
                            <span>Watch Full Walkthrough</span>
                            <ArrowUpRight size={15} />
                        </a>
                    </div>
                </div>

                {/* BIG CINEMATIC VIDEO THEATER STAGE */}
                <div className="upcoming-theater">
                    <div className="upcoming-theater__frame">
                        {/* Video Player */}
                        {isPlaying ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&mute=${
                                    isMuted ? 1 : 0
                                }&loop=1&playlist=${activeVideoId}&controls=1&modestbranding=1&rel=0&playsinline=1&start=${startSeconds}`}
                                title="Grand Launch Event of VTP Aurelia | New Kharadi"
                                className="upcoming-theater__iframe"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="upcoming-theater__poster">
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                    alt="VTP Aurelia Grand Launch"
                                    className="upcoming-theater__poster-img"
                                />
                                <button
                                    type="button"
                                    className="upcoming-theater__play-btn"
                                    onClick={() => setIsPlaying(true)}
                                    aria-label="Play Launch Video"
                                >
                                    <Play size={32} fill="#ffffff" color="#ffffff" />
                                </button>
                            </div>
                        )}

                        {/* Top Floating Badges Bar */}
                        <div className="upcoming-theater__top-bar">
                            <div className="upcoming-theater__badges">
                                <span className="upcoming-theater__badge upcoming-theater__badge--gold">
                                    <Sparkles size={12} /> GRAND PRE-LAUNCH
                                </span>
                                <span className="upcoming-theater__badge upcoming-theater__badge--dark">
                                    <MapPin size={12} /> New Kharadi, Pune
                                </span>
                                <span className="upcoming-theater__badge upcoming-theater__badge--rera">
                                    <ShieldCheck size={12} /> MahaRERA Applied
                                </span>
                            </div>

                            {/* Sound Toggle Control */}
                            <button
                                type="button"
                                className="upcoming-theater__sound-btn"
                                onClick={() => setIsMuted(!isMuted)}
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                                title={isMuted ? "Click to Unmute" : "Click to Mute"}
                            >
                                {isMuted ? (
                                    <>
                                        <VolumeX size={15} />
                                        <span>Unmute</span>
                                    </>
                                ) : (
                                    <>
                                        <Volume2 size={15} />
                                        <span>Muted</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* SHOWCASE INFO & PRE-REGISTRATION STRIP */}
                    <div className="upcoming-showcase-bar">
                        {/* Left: Project Identity */}
                        <div className="upcoming-showcase-bar__left">
                            <div className="upcoming-showcase-brand">
                                <Building2 size={15} className="upcoming-showcase-icon" />
                                <span>VTP REALTY • TOWNSHIP CODENAME PEGASUS</span>
                            </div>
                            <h3 className="upcoming-showcase-title">
                                VTP Aurelia
                            </h3>
                            <p className="upcoming-showcase-loc">
                                <MapPin size={13} />
                                <span>New Kharadi - Riverside Corridor, Pune</span>
                            </p>
                        </div>

                        {/* Middle: Key Project Pillars */}
                        <div className="upcoming-showcase-bar__metrics">
                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Bed size={13} /> Configurations
                                </span>
                                <strong className="upcoming-metric-val">
                                    2, 3 & 4.5 BHK
                                </strong>
                                <span className="upcoming-metric-sub">Forest & River Views</span>
                            </div>

                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Tag size={13} /> Inaugural Pricing
                                </span>
                                <strong className="upcoming-metric-val">
                                    Starting ₹ 85 Lacs*
                                </strong>
                                <span className="upcoming-metric-sub">Zero Floor Rise in EOI</span>
                            </div>

                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Calendar size={13} /> Launch Timeline
                                </span>
                                <strong className="upcoming-metric-val">
                                    Pre-Launch 2026–2027
                                </strong>
                                <span className="upcoming-metric-sub">Early Bird Window</span>
                            </div>
                        </div>

                        {/* Right: Instant Pre-Register & WhatsApp CTAs */}
                        <div className="upcoming-showcase-bar__actions">
                            <button
                                type="button"
                                className="upcoming-cta-btn upcoming-cta-btn--primary"
                                onClick={() => setModalOpen(true)}
                            >
                                <Sparkles size={15} />
                                <span>Pre-Register for Privileges</span>
                            </button>

                            <a
                                href="https://wa.me/917398174444?text=Hi%20Pune%20Property%20Investors,%20I%20am%20interested%20in%20pre-registering%20for%20VTP%20Aurelia%20New%20Kharadi."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="upcoming-cta-btn upcoming-cta-btn--whatsapp"
                                aria-label="Direct WhatsApp inquiry"
                            >
                                <FaWhatsapp size={16} />
                                <span>WhatsApp VIP EOI</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIP PRE-REGISTRATION MODAL */}
            {modalOpen && (
                <div
                    className="upcoming-modal-backdrop"
                    onClick={() => setModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="upcoming-modal-title"
                >
                    <div
                        className="upcoming-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="upcoming-modal__close"
                            onClick={() => setModalOpen(false)}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="upcoming-modal__head">
                            <span className="upcoming-modal__kicker">
                                EXCLUSIVE PRE-LAUNCH INAUGURAL PRIVILEGES
                            </span>
                            <h3 id="upcoming-modal-title" className="upcoming-modal__title">
                                Pre-Register for VTP Aurelia
                            </h3>
                            <p className="upcoming-modal__desc">
                                Lock in inaugural pricing, zero floor-rise, and early unit selection ahead of the public launch in New Kharadi.
                            </p>
                        </div>

                        {submitted ? (
                            <div className="upcoming-modal__success">
                                <CheckCircle2 size={46} color="#16a34a" />
                                <h4>EOI Request Generated!</h4>
                                <p>Redirecting to WhatsApp to deliver brochure and early allotment token details...</p>
                            </div>
                        ) : (
                            <form className="upcoming-modal__form" onSubmit={handleRegisterSubmit}>
                                <div className="upcoming-modal__field">
                                    <label htmlFor="modal-name">Full Name</label>
                                    <input
                                        id="modal-name"
                                        type="text"
                                        required
                                        placeholder="e.g. Anand Deshmukh"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="upcoming-modal__field">
                                    <label htmlFor="modal-phone">WhatsApp / Contact Number</label>
                                    <input
                                        id="modal-phone"
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="upcoming-modal__field">
                                    <label htmlFor="modal-bhk">Preferred Configuration</label>
                                    <select
                                        id="modal-bhk"
                                        value={bhk}
                                        onChange={(e) => setBhk(e.target.value)}
                                        className="upcoming-modal__select"
                                    >
                                        <option value="2 BHK Luxury">2 BHK Luxury Suite</option>
                                        <option value="3 BHK Premium">3 BHK Premium Suite</option>
                                        <option value="4.5 BHK Royal Penthouse">4.5 BHK Royal Penthouse</option>
                                    </select>
                                </div>

                                <button type="submit" className="upcoming-modal__submit-btn">
                                    <span>Lock Pre-Launch EOI Privileges</span>
                                    <Send size={15} />
                                </button>

                                <div className="upcoming-modal__guarantee">
                                    <ShieldCheck size={14} />
                                    <span>100% Confidential • 0% Brokerage Direct Developer Allotment</span>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
