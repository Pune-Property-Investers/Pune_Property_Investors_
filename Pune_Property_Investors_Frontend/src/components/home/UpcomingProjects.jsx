"use client";

import { useState, useEffect, useMemo } from "react";
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
import { upcomingProjectService } from "../../services/upcomingProject.service";
import "./UpcomingProjects.css";

const DEFAULT_PROJECT = {
    id: 1,
    slug: "vtp-aurelia-new-kharadi",
    title: "VTP Aurelia",
    brandSubtext: "VTP REALTY • TOWNSHIP CODENAME PEGASUS",
    developer: "VTP Realty",
    location: "New Kharadi - Riverside Corridor, Pune",
    locality: "New Kharadi",
    badgeText: "GRAND PRE-LAUNCH",
    reraStatus: "MahaRERA Applied",
    youtubeUrl: "https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s",
    youtubeId: "yTzvQko2gYo",
    videoStartSeconds: 14,
    configurations: "2, 3 & 4.5 BHK",
    configurationsSub: "Forest & River Views",
    price: "Starting ₹ 85 Lacs*",
    priceSub: "Zero Floor Rise in EOI",
    launchTimeline: "Pre-Launch 2026–2027",
    launchTimelineSub: "Early Bird Window",
    eyebrow: "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
    heading: "Upcoming Project Showcase",
    subtitle: "Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi. Lock in inaugural pre-registration privileges before public release.",
    whatsappNumber: "917398174444",
};

export default function UpcomingProjects({ previewData }) {
    const [fetchedProjects, setFetchedProjects] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bhk, setBhk] = useState("3 BHK");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadProjects = async () => {
            try {
                const res = await upcomingProjectService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setFetchedProjects(list);
                }
            } catch (err) {
                console.error("Failed to load upcoming projects from DB:", err);
            }
        };
        loadProjects();
        return () => {
            isMounted = false;
        };
    }, []);

    // Active project selection
    const projectsList = fetchedProjects.length > 0 ? fetchedProjects : [DEFAULT_PROJECT];
    const currentProject = projectsList[activeIndex] || projectsList[0] || DEFAULT_PROJECT;

    const activeYoutubeUrl = previewData?.youtubeUrl || currentProject.youtubeUrl || DEFAULT_PROJECT.youtubeUrl;
    const matchId = activeYoutubeUrl.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    const activeVideoId = currentProject.youtubeId || (matchId ? matchId[1] : DEFAULT_PROJECT.youtubeId);
    const startSeconds = currentProject.videoStartSeconds ?? 14;

    const eyebrowText = previewData?.eyebrow || currentProject.eyebrow || DEFAULT_PROJECT.eyebrow;
    const headingText = previewData?.heading || currentProject.heading || DEFAULT_PROJECT.heading;
    const subtitleText = previewData?.subtitle || currentProject.subtitle || DEFAULT_PROJECT.subtitle;

    const whatsappNumber = currentProject.whatsappNumber || "917398174444";

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await leadService.create({
                type: "property",
                name,
                phone,
                propertyTitle: `${currentProject.title} (${currentProject.locality || "Pune"})`,
                locality: currentProject.locality || "Pune",
                budget: bhk,
                message:
                    "Pre-launch EOI privileges, inaugural price sheet, and early unit layouts.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }
        const msg = [
            `*Upcoming Project Pre-Registration*`,
            `*Project:* ${currentProject.title} (${currentProject.locality || "Pune"})`,
            `*Developer:* ${currentProject.developer || "Developer Partner"}`,
            `*Configuration Interested:* ${bhk}`,
            `*Name:* ${name}`,
            `*Phone:* ${phone}`,
            `*Request:* Pre-launch EOI privileges, inaugural price sheet, and early unit layouts.`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
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
                                <Sparkles size={13} /> {eyebrowText}
                            </span>
                        </div>

                        <h2 className="upcoming-title">
                            {previewData?.heading ? (
                                previewData.heading
                            ) : (
                                <>
                                    {headingText.includes("Showcase") ? (
                                        <>
                                            {headingText.replace("Showcase", "").trim()}{" "}
                                            <span>Showcase</span>
                                        </>
                                    ) : (
                                        headingText
                                    )}
                                </>
                            )}
                        </h2>

                        <p className="upcoming-subtitle">
                            {subtitleText}
                        </p>
                    </div>

                    {/* YouTube Channel & Direct Link CTA + Multiple Projects Switcher */}
                    <div className="upcoming-header-actions">
                        {projectsList.length > 1 && (
                            <div className="upcoming-project-pills" role="tablist" aria-label="Select Upcoming Project">
                                {projectsList.map((proj, idx) => (
                                    <button
                                        key={proj.id || proj.slug}
                                        type="button"
                                        role="tab"
                                        aria-selected={idx === activeIndex}
                                        className={`upcoming-project-pill ${
                                            idx === activeIndex ? "upcoming-project-pill--active" : ""
                                        }`}
                                        onClick={() => {
                                            setActiveIndex(idx);
                                            setIsPlaying(true);
                                        }}
                                    >
                                        <span>{proj.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}

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
                                key={`${currentProject.id}-${activeVideoId}`}
                                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&mute=${
                                    isMuted ? 1 : 0
                                }&loop=1&playlist=${activeVideoId}&controls=1&modestbranding=1&rel=0&playsinline=1&start=${startSeconds}`}
                                title={`Grand Launch Event of ${currentProject.title}`}
                                className="upcoming-theater__iframe"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="upcoming-theater__poster">
                                <img
                                    src={`https://img.youtube.com/vi/${activeVideoId}/maxresdefault.jpg`}
                                    alt={`${currentProject.title} Grand Launch`}
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
                                    <Sparkles size={12} /> {currentProject.badgeText || "GRAND PRE-LAUNCH"}
                                </span>
                                <span className="upcoming-theater__badge upcoming-theater__badge--dark">
                                    <MapPin size={12} /> {currentProject.locality ? `${currentProject.locality}, Pune` : currentProject.location}
                                </span>
                                <span className="upcoming-theater__badge upcoming-theater__badge--rera">
                                    <ShieldCheck size={12} /> {currentProject.reraStatus || "MahaRERA Applied"}
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
                                <span>{currentProject.brandSubtext || `${currentProject.developer || "PPI"} • PRE-LAUNCH`}</span>
                            </div>
                            <h3 className="upcoming-showcase-title">
                                {currentProject.title}
                            </h3>
                            <p className="upcoming-showcase-loc">
                                <MapPin size={13} />
                                <span>{currentProject.location}</span>
                            </p>
                        </div>

                        {/* Middle: Key Project Pillars */}
                        <div className="upcoming-showcase-bar__metrics">
                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Bed size={13} /> Configurations
                                </span>
                                <strong className="upcoming-metric-val">
                                    {currentProject.configurations || "2 & 3 BHK"}
                                </strong>
                                <span className="upcoming-metric-sub">{currentProject.configurationsSub || "Luxury Views"}</span>
                            </div>

                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Tag size={13} /> Inaugural Pricing
                                </span>
                                <strong className="upcoming-metric-val">
                                    {currentProject.price || "Contact for Price"}
                                </strong>
                                <span className="upcoming-metric-sub">{currentProject.priceSub || "Early Bird Token"}</span>
                            </div>

                            <div className="upcoming-metric-item">
                                <span className="upcoming-metric-label">
                                    <Calendar size={13} /> Launch Timeline
                                </span>
                                <strong className="upcoming-metric-val">
                                    {currentProject.launchTimeline || "Pre-Launch"}
                                </strong>
                                <span className="upcoming-metric-sub">{currentProject.launchTimelineSub || "Early Bird Window"}</span>
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
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                                    `Hi Pune Property Investors, I am interested in pre-registering for ${currentProject.title} (${currentProject.location}).`
                                )}`}
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
                                Pre-Register for {currentProject.title}
                            </h3>
                            <p className="upcoming-modal__desc">
                                Lock in inaugural pricing, zero floor-rise, and early unit selection ahead of the public launch in {currentProject.locality || currentProject.location}.
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
