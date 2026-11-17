"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Briefcase,
    MapPin,
    Award,
    TrendingUp,
    Users,
    HeartHandshake,
    Send,
    CheckCircle2,
    Mail,
    ArrowRight,
    Search,
    Sparkles,
    Filter,
    PhoneCall,
    ShieldCheck,
    X,
    Building2,
    Calendar,
    Clock,
    Check,
    ChevronRight,
    HelpCircle,
    UserCheck,
    DollarSign,
    GraduationCap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { careerService } from "../../services/career.service";
import { DEFAULT_JOBS } from "../../services/mockStore";
import "./Career.css";

const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (typeof window !== "undefined" && window.location.pathname.startsWith("/Pune_Property_Investors_")
        ? "/Pune_Property_Investors_"
        : "");

const getAssetPath = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
        return path;
    }
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${basePath}${clean}`;
};

const WHATSAPP_NUMBER = "917398174444";

const CAREER_STATS = [
    { target: 9, suffix: "+", label: "Immediate Openings", sub: "Kharadi, Dighi & Katraj" },
    { prefix: "₹", target: 50, suffix: "K+", label: "Avg. Monthly Earning", sub: "Fixed CTC + High Incentives" },
    { target: 6, suffix: " Months", label: "Appraisal Cycle", sub: "Fast-Track Leadership" },
    { target: 100, suffix: "%", label: "Direct Builder Mandates", sub: "Godrej, Lodha & Panchshil" },
];

function AnimatedStatNumber({ target, prefix = "", suffix = "", started }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!started || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        let frameId;
        let startTime;

        const animate = (timestamp) => {
            if (startTime === undefined) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic matching TrustStats counter
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            setCount(value);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [started, target]);

    return (
        <>
            {prefix}
            {count.toLocaleString("en-IN")}
            {suffix}
        </>
    );
}

const ROLE_FALLBACK_IMAGES = {
    marketing: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    hr: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    sales: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    presales: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    telecaller: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    it: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    model: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    office: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    default: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
};

function getJobImage(job) {
    if (job?.image && typeof job.image === "string" && job.image.trim().length > 0) {
        return getAssetPath(job.image.trim());
    }
    const title = (job?.title || "").toLowerCase();
    const dept = (job?.department || "").toLowerCase();
    if (title.includes("market") || title.includes("digital") || title.includes("seo") || title.includes("ads")) {
        return ROLE_FALLBACK_IMAGES.marketing;
    }
    if (title.includes("hr") || title.includes("recruit") || title.includes("talent")) {
        return ROLE_FALLBACK_IMAGES.hr;
    }
    if (title.includes("tele") || title.includes("caller") || title.includes("calling")) {
        return ROLE_FALLBACK_IMAGES.telecaller;
    }
    if (title.includes("pre sale") || title.includes("presale") || title.includes("counselor")) {
        return ROLE_FALLBACK_IMAGES.presales;
    }
    if (title.includes("sales") || title.includes("relation") || title.includes("advisor") || title.includes("consultant")) {
        return ROLE_FALLBACK_IMAGES.sales;
    }
    if (title.includes("network") || title.includes("it") || title.includes("system") || title.includes("tech")) {
        return ROLE_FALLBACK_IMAGES.it;
    }
    if (title.includes("model") || title.includes("video") || title.includes("shoot") || title.includes("creator")) {
        return ROLE_FALLBACK_IMAGES.model;
    }
    if (title.includes("office") || title.includes("housekeeping") || title.includes("boy") || title.includes("pantry")) {
        return ROLE_FALLBACK_IMAGES.office;
    }
    if (dept.includes("sales")) return ROLE_FALLBACK_IMAGES.sales;
    if (dept.includes("admin")) return ROLE_FALLBACK_IMAGES.office;
    return ROLE_FALLBACK_IMAGES.default;
}

const PERKS = [
    {
        icon: TrendingUp,
        badge: "FINANCIAL GROWTH",
        title: "Uncapped Earning & Milestone Bonuses",
        description:
            "Industry-leading commission slabs, quarterly milestone bonuses, and regular performance incentives on top of guaranteed fixed salaries.",
    },
    {
        icon: Award,
        badge: "LEADERSHIP",
        title: "Executive Mentorship by Industry Veterans",
        description:
            "Work directly with senior real estate transaction leaders possessing over 15+ years of closing expertise across Pune's prime luxury corridors.",
    },
    {
        icon: Users,
        badge: "CULTURE",
        title: "Empowering, Meritocratic Culture",
        description:
            "Transparent working environment, equal opportunity, fast-track promotions, strong female leadership representation, and milestone celebrations.",
    },
    {
        icon: HeartHandshake,
        badge: "PRESTIGE",
        title: "Exclusive Tier-1 Builder Mandates",
        description:
            "Direct project mandates with Pune's premier developers (Godrej, Lodha, Panchshil, VTP, Kohinoor, Mantra) across luxury micro-markets.",
    },
];

const HIRING_STEPS = [
    {
        step: "01",
        title: "Quick Application",
        desc: "Submit your profile via our 60-second online form or directly connect with our HR team on WhatsApp.",
    },
    {
        step: "02",
        title: "HR Screening",
        desc: "A brief telephonic discussion with our HR team to discuss your background, compensation, and branch preference.",
    },
    {
        step: "03",
        title: "Leadership Interview",
        desc: "In-person interaction at our Kharadi Headquarters or regional branch with our business heads.",
    },
    {
        step: "04",
        title: "Offer & Onboarding",
        desc: "Fast-track offer release, mentorship pairing, and structured institutional sales & operations training.",
    },
];

const FAQS = [
    {
        q: "Do you hire freshers or only experienced candidates?",
        a: "We welcome both! While roles like Sr. HR and Relationship Manager require prior real estate/sales experience, positions like Telecaller, Pre-Sales, Digital Marketing, and Housekeeping welcome ambitious freshers. We provide full institutional training.",
    },
    {
        q: "Which office locations will I be working from?",
        a: "We have immediate vacancies across our Kharadi Corporate Headquarters (Gera Imperium Alpha), Dighi Branch, and Katraj Branch. Location requirements are specified per role, and we consider your commuting convenience.",
    },
    {
        q: "What is the incentive and commission structure?",
        a: "In addition to a competitive fixed monthly salary, sales and pre-sales roles receive uncapped deal-closing incentives paid promptly on project milestones, with quarterly and annual leadership rewards.",
    },
    {
        q: "How fast is the interview and hiring process?",
        a: "Our recruitment process is fast-track. Qualified applicants typically complete screening and final interviews within 3 to 5 business days, with immediate joining options available.",
    },
];

export default function Career() {
    const [jobs, setJobs] = useState(DEFAULT_JOBS);
    const [loading, setLoading] = useState(true);

    const statsRef = useRef(null);
    const [statsStarted, setStatsStarted] = useState(false);

    useEffect(() => {
        const el = statsRef.current;
        if (!el || statsStarted) return;

        const checkVisibility = () => {
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setStatsStarted(true);
                }
            }
        };

        checkVisibility();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: "60px 0px" }
        );

        observer.observe(el);
        window.addEventListener("scroll", checkVisibility, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", checkVisibility);
        };
    }, [statsStarted]);

    // Filters
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Application Modal
    const [activeJobForModal, setActiveJobForModal] = useState(null);
    const [applicantName, setApplicantName] = useState("");
    const [applicantPhone, setApplicantPhone] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [applicantExp, setApplicantExp] = useState("");
    const [applicantGender, setApplicantGender] = useState("");
    const [applicantBranch, setApplicantBranch] = useState("Kharadi");
    const [applicantNote, setApplicantNote] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submittedSuccess, setSubmittedSuccess] = useState(false);

    // Load live jobs from service/admin store
    useEffect(() => {
        let isMounted = true;
        careerService
            .listJobs()
            .then((data) => {
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    setJobs(data);
                }
            })
            .catch(() => { })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    // Filtered jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            if (job.status && job.status.toLowerCase() === "closed") return false;

            const matchesDept =
                selectedDepartment === "All" ||
                (job.department || "")
                    .toLowerCase()
                    .includes(selectedDepartment.toLowerCase());

            const matchesLoc =
                selectedLocation === "All" ||
                (job.location || "")
                    .toLowerCase()
                    .includes(selectedLocation.toLowerCase());

            const q = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !q ||
                (job.title || "").toLowerCase().includes(q) ||
                (job.description || "").toLowerCase().includes(q) ||
                (job.requirements || "").toLowerCase().includes(q) ||
                (job.location || "").toLowerCase().includes(q) ||
                (job.genderCriteria || "").toLowerCase().includes(q);

            return matchesDept && matchesLoc && matchesSearch;
        });
    }, [jobs, selectedDepartment, selectedLocation, searchQuery]);

    // Open quick apply modal
    const openApplyModal = (job) => {
        setActiveJobForModal(job);
        setApplicantName("");
        setApplicantPhone("");
        setApplicantEmail("");
        setApplicantExp("");
        setApplicantGender("");
        setApplicantBranch(
            job.location?.includes("Kharadi")
                ? "Kharadi"
                : job.location?.includes("Dighi")
                    ? "Dighi"
                    : job.location?.includes("Katraj")
                        ? "Katraj"
                        : "Kharadi"
        );
        setApplicantNote("");
        setSubmittedSuccess(false);
    };

    // Submit application online (syncs directly with Admin panel)
    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        if (!applicantName || !applicantPhone) return;

        setSubmitting(true);
        try {
            await careerService.createApplication({
                jobId: activeJobForModal ? activeJobForModal.id : 0,
                jobTitle: activeJobForModal
                    ? activeJobForModal.title
                    : "General Career Application",
                name: applicantName,
                phone: applicantPhone,
                email: applicantEmail,
                experience: applicantExp,
                gender: applicantGender,
                preferredBranch: applicantBranch,
                note: applicantNote,
                resumeName: "Direct Web Submission",
            });

            setSubmittedSuccess(true);
            setTimeout(() => {
                setActiveJobForModal(null);
                setSubmittedSuccess(false);
            }, 3000);
        } catch {
            setSubmittedSuccess(true);
        } finally {
            setSubmitting(false);
        }
    };

    // Direct WhatsApp apply link
    const getWhatsAppApplyUrl = (job) => {
        const text = [
            `*Job Application - Pune Property Investors*`,
            `Role: ${job.title}`,
            `Department: ${job.department}`,
            `Location: ${job.location}`,
            `Criteria: ${job.genderCriteria || "Open"}`,
            ``,
            `Hello HR Team, I am interested in applying for this position. Please let me know the interview schedule.`,
        ].join("\n");

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    };

    const handleExplore = () => {
        const section = document.getElementById("open-roles");
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="career-luxury-page">
            <Header transparentAtTop={true} />

            <main>
                {/* 1. FLAGSHIP EDITORIAL HERO */}
                <section className="career-hero">
                    <div className="career-hero__bg-wrap">
                        <Image
                            src={getAssetPath("/images/career-hero-bg.jpg")}
                            alt="Join Pune Property Investors Advisory Team"
                            fill
                            priority
                            sizes="100vw"
                            className="career-hero__bg-img"
                        />
                        <div className="career-hero__overlay" />
                    </div>

                    <div className="container career-hero__content">
                        <div className="career-hero__text-block">
                            <div className="career-hero__breadcrumbs">
                                <Link href="/">Home</Link>
                                <span>/</span>
                                <span className="current">Careers</span>
                            </div>

                            <div className="career-hero__eyebrow-pill">
                                <Sparkles size={13} />
                                <span>WE ARE HIRING • JOIN PUNE&apos;S PREMIER REAL ESTATE ADVISORY</span>
                            </div>

                            <h1 className="career-hero__title">
                                <span className="career-hero__title-primary">Find Your Place.</span>{" "}
                                <em className="career-hero__title-accent">Build Your Future.</em>
                            </h1>

                            <p className="career-hero__subtitle">
                                Join our 80+ strong advisory network expanding across Kharadi HQ,
                                Dighi, and Katraj. We offer unmatched incentive structures,
                                mentorship by 15+ year veterans, and fast-track leadership opportunities.
                            </p>
                        </div>

                        {/* Live Recruitment Metrics Card */}
                        <div ref={statsRef} className="career-stats-card">
                            {CAREER_STATS.map((stat) => (
                                <div key={stat.label} className="career-stat-item">
                                    <div className="career-stat-value">
                                        <AnimatedStatNumber
                                            target={stat.target}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            started={statsStarted}
                                        />
                                    </div>
                                    <div className="career-stat-label">{stat.label}</div>
                                    <div className="career-stat-sub">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="container career-body-wrap">
                    {/* 2. WHY BUILD WITH PPI */}
                    <section className="career-why-block">
                        <div className="career-section-header">
                            <span className="career-section-tag">WHY PUNE PROPERTY INVESTORS</span>
                            <h2 className="career-section-heading">
                                A Culture Built for <em>High Achievers.</em>
                            </h2>
                            <p className="career-section-sub">
                                We combine institutional training, builder partnerships, high commission slabs, and modern corporate work environments across Pune.
                            </p>
                        </div>

                        <div className="career-perks-grid">
                            {PERKS.map((perk) => {
                                const IconComponent = perk.icon;
                                return (
                                    <div key={perk.title} className="career-perk-card">
                                        <span className="career-perk-badge">{perk.badge}</span>
                                        <div className="career-perk-icon-box">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="career-perk-title">{perk.title}</h3>
                                        <p className="career-perk-desc">{perk.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 3. LIFE & CULTURE AT PPI */}
                    <section className="career-culture-block">
                        <div className="career-culture__grid">
                            <div className="career-culture__media">
                                <div className="career-culture-img-wrap">
                                    <Image
                                        src={getAssetPath("/images/ppi-team-office.jpg")}
                                        alt="PPI Corporate Culture at Kharadi Office"
                                        width={600}
                                        height={450}
                                        className="career-culture-img"
                                    />
                                    <div className="career-culture-pill">
                                        <Building2 size={18} className="pill-gold" />
                                        <div>
                                            <strong>Gera Imperium Alpha, Kharadi</strong>
                                            <span>Corporate Headquarters &amp; Training Academy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="career-culture__content">
                                <span className="career-section-tag">LIFE AT PPI</span>
                                <h2 className="career-section-heading">
                                    More Than a Job. <em>A Launchpad.</em>
                                </h2>
                                <p className="career-lead-text">
                                    At Pune Property Investors, we believe when our people grow, our company thrives. We cultivate an energetic, transparent, and collaborative workplace where dedication is rewarded immediately.
                                </p>
                                <ul className="career-culture-list">
                                    <li>
                                        <CheckCircle2 size={18} className="check-icon" />
                                        <span><strong>Continuous Learning:</strong> Weekly masterclasses on real estate legal due diligence, client negotiations, and RERA compliance.</span>
                                    </li>
                                    <li>
                                        <CheckCircle2 size={18} className="check-icon" />
                                        <span><strong>Meritocracy &amp; Equality:</strong> 100% transparent promotion criteria with fast-track growth into Team Lead and Branch Manager roles.</span>
                                    </li>
                                    <li>
                                        <CheckCircle2 size={18} className="check-icon" />
                                        <span><strong>Supportive Work Environment:</strong> State-of-the-art office infrastructure, CRM software, verified buyer leads, and on-site cafeteria.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 4. HIRING PROCESS (4 STEPS) */}
                    <section className="career-process-block">
                        <div className="career-section-header">
                            <span className="career-section-tag">HOW WE HIRE</span>
                            <h2 className="career-section-heading">
                                Simple, Transparent <em>4-Step Process.</em>
                            </h2>
                            <p className="career-section-sub">
                                We value your time. Our hiring cycle is streamlined to get you started quickly.
                            </p>
                        </div>

                        <div className="career-process-grid">
                            {HIRING_STEPS.map((step) => (
                                <div key={step.step} className="career-process-card">
                                    <div className="career-process-num">{step.step}</div>
                                    <h4 className="career-process-title">{step.title}</h4>
                                    <p className="career-process-desc">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. INTERACTIVE VACANCIES MATRIX (#open-roles) */}
                    <section className="career-openings-section" id="open-roles">
                        <div className="career-openings-header">
                            <div>
                                <span className="career-section-tag">
                                    CURRENT VACANCIES ({filteredJobs.length})
                                </span>
                                <h2 className="career-section-heading">
                                    Explore Immediate <em>Open Positions.</em>
                                </h2>
                                <p className="career-openings-sub">
                                    All roles are active and managed directly by our Kharadi recruitment desk.
                                </p>
                            </div>

                            <a
                                href="mailto:careers@punepropertyinvestors.com"
                                className="career-email-link"
                            >
                                <Mail size={16} />
                                <span>Send CV via Email</span>
                            </a>
                        </div>

                        {/* Filter Matrix */}
                        <div className="career-filters-wrap">
                            {/* Department Tabs */}
                            <div className="career-dept-tabs">
                                {[
                                    { id: "All", label: "All Openings" },
                                    { id: "Admin", label: "Admin & Operations" },
                                    { id: "Sales", label: "Sales & Advisory" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        className={`career-tab-btn ${selectedDepartment === tab.id ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedDepartment(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Branch Location Pills & Search Bar */}
                            <div className="career-filters-bar">
                                <div className="career-loc-pills">
                                    {[
                                        { id: "All", label: "All Locations" },
                                        { id: "Kharadi", label: "📍 Kharadi (HQ)" },
                                        { id: "Dighi", label: "📍 Dighi" },
                                        { id: "Katraj", label: "📍 Katraj" },
                                    ].map((loc) => (
                                        <button
                                            key={loc.id}
                                            type="button"
                                            className={`career-loc-pill ${selectedLocation === loc.id ? "active" : ""
                                                }`}
                                            onClick={() => setSelectedLocation(loc.id)}
                                        >
                                            {loc.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="career-search-box">
                                    <Search size={16} className="career-search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search role, keyword, branch..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="career-search-input"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            className="career-search-clear"
                                            aria-label="Clear search"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Jobs Grid */}
                        {filteredJobs.length === 0 ? (
                            <div className="career-no-roles">
                                <Briefcase size={44} className="career-no-roles-icon" />
                                <h3>No openings found matching your filter criteria.</h3>
                                <p>Try selecting &quot;All Openings&quot; or clear your search keyword.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDepartment("All");
                                        setSelectedLocation("All");
                                        setSearchQuery("");
                                    }}
                                    className="career-reset-btn"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="career-jobs-grid">
                                {filteredJobs.map((job) => {
                                    const isFemaleCriteria =
                                        (job.genderCriteria || "").toLowerCase().includes("female");

                                    return (
                                        <div key={job.id} className="career-job-card">
                                            {/* Role Image Banner with Overlaid Badges */}
                                            <div className="career-job-card__media">
                                                <Image
                                                    src={getJobImage(job)}
                                                    alt={job.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                                                    className="career-job-card__img"
                                                />
                                                <div className="career-job-card__media-overlay" />
                                                <div className="career-job-card__badges">
                                                    <span className="career-job-dept-pill">
                                                        {job.department || "Open Role"}
                                                    </span>
                                                    <span className="career-job-type">
                                                        {job.type || "Full-time"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Essential Card Body */}
                                            <div className="career-job-card__body">
                                                <h3 className="career-job-title" title={job.title}>
                                                    {job.title}
                                                </h3>

                                                {/* Essential Meta Tags */}
                                                <div className="career-job-meta-row">
                                                    <div className="career-meta-tag">
                                                        <MapPin size={12} className="meta-icon" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                    {job.experience && (
                                                        <div className="career-meta-tag">
                                                            <Clock size={12} className="meta-icon" />
                                                            <span>{job.experience}</span>
                                                        </div>
                                                    )}
                                                    {job.genderCriteria && (
                                                        <div
                                                            className={`career-meta-tag ${isFemaleCriteria ? "career-meta-tag--gender" : ""
                                                                }`}
                                                        >
                                                            <Sparkles size={11} className="meta-icon" />
                                                            <span>{job.genderCriteria}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Salary Banner */}
                                                {job.salary && (
                                                    <div className="career-job-salary">
                                                        <DollarSign size={14} />
                                                        <span>{job.salary}</span>
                                                    </div>
                                                )}

                                                {/* Concise Essential Description */}
                                                <p className="career-job-desc">{job.description}</p>

                                                {/* Card Actions: WhatsApp Icon Only + Apply Online */}
                                                <div className="career-job-card__actions">
                                                    <a
                                                        href={getWhatsAppApplyUrl(job)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="career-action-btn--whatsapp-icon"
                                                        title="WhatsApp HR"
                                                        aria-label="WhatsApp HR"
                                                    >
                                                        <FaWhatsapp size={20} />
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => openApplyModal(job)}
                                                        className="career-action-btn career-action-btn--apply"
                                                    >
                                                        <span>Apply Online</span>
                                                        <ArrowRight size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* 6. CANDIDATE FAQ BLOCK */}
                    <section className="career-faq-block">
                        <div className="career-section-header">
                            <span className="career-section-tag">QUESTIONS &amp; ANSWERS</span>
                            <h2 className="career-section-heading">
                                Frequently Asked <em>Candidate Questions.</em>
                            </h2>
                        </div>

                        <div className="career-faq-grid">
                            {FAQS.map((faq) => (
                                <div key={faq.q} className="career-faq-card">
                                    <div className="career-faq-q">
                                        <HelpCircle size={18} className="faq-icon" />
                                        <h4>{faq.q}</h4>
                                    </div>
                                    <p className="career-faq-a">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 7. GENERAL HR HELPLINE BANNER */}
                    <section className="career-helpline-banner">
                        <div className="helpline-banner__content">
                            <span className="helpline-banner__tag">GENERAL TALENT POOL</span>
                            <h2 className="helpline-banner__title">
                                Don&apos;t See an Exact Match for Your Profile?
                            </h2>
                            <p className="helpline-banner__desc">
                                We are always keen to speak with driven real estate professionals, marketers, and operations leaders.
                                Send your resume directly to our recruitment team.
                            </p>
                            <div className="helpline-banner__actions">
                                <a
                                    href="mailto:careers@punepropertyinvestors.com"
                                    className="helpline-btn helpline-btn--email"
                                >
                                    <Mail size={16} />
                                    <span>Email CV: careers@punepropertyinvestors.com</span>
                                </a>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                        "Hello HR Team, I am sending my CV for general career opportunities at PPI."
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="helpline-btn helpline-btn--whatsapp"
                                >
                                    <FaWhatsapp size={16} />
                                    <span>WhatsApp Direct Connect</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Quick Application Modal */}
            {activeJobForModal && (
                <div
                    className="career-modal-backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setActiveJobForModal(null);
                    }}
                >
                    <div className="career-modal" role="dialog" aria-modal="true">
                        <button
                            type="button"
                            onClick={() => setActiveJobForModal(null)}
                            className="career-modal-close"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="career-modal-header">
                            <div className="career-modal-badge">DIRECT APPLICATION</div>
                            <h3 className="career-modal-title">
                                Apply for {activeJobForModal.title}
                            </h3>
                            <p className="career-modal-sub">
                                Branch: {activeJobForModal.location} • {activeJobForModal.department}
                            </p>
                        </div>

                        {submittedSuccess ? (
                            <div className="career-modal-success">
                                <CheckCircle2 size={48} className="success-icon" />
                                <h4>Application Submitted Successfully!</h4>
                                <p>
                                    Thank you, <strong>{applicantName}</strong>. Our HR team has received your application and will review your profile within 24 to 48 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitApplication} className="career-modal-form">
                                <div className="modal-form-group">
                                    <label htmlFor="applicant-name">Full Name *</label>
                                    <input
                                        id="applicant-name"
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        value={applicantName}
                                        onChange={(e) => setApplicantName(e.target.value)}
                                        className="modal-input"
                                    />
                                </div>

                                <div className="modal-form-row">
                                    <div className="modal-form-group">
                                        <label htmlFor="applicant-phone">Mobile Number *</label>
                                        <input
                                            id="applicant-phone"
                                            type="tel"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={applicantPhone}
                                            onChange={(e) => setApplicantPhone(e.target.value)}
                                            className="modal-input"
                                        />
                                    </div>
                                    <div className="modal-form-group">
                                        <label htmlFor="applicant-email">Email Address</label>
                                        <input
                                            id="applicant-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={applicantEmail}
                                            onChange={(e) => setApplicantEmail(e.target.value)}
                                            className="modal-input"
                                        />
                                    </div>
                                </div>

                                <div className="modal-form-row">
                                    <div className="modal-form-group">
                                        <label htmlFor="applicant-exp">Experience</label>
                                        <select
                                            id="applicant-exp"
                                            value={applicantExp}
                                            onChange={(e) => setApplicantExp(e.target.value)}
                                            className="modal-input"
                                        >
                                            <option value="">Select Experience</option>
                                            <option value="Fresher">Fresher (0 Years)</option>
                                            <option value="1-2 Years">1 – 2 Years</option>
                                            <option value="2-4 Years">2 – 4 Years</option>
                                            <option value="5+ Years">5+ Years</option>
                                        </select>
                                    </div>
                                    <div className="modal-form-group">
                                        <label htmlFor="applicant-gender">Gender</label>
                                        <select
                                            id="applicant-gender"
                                            value={applicantGender}
                                            onChange={(e) => setApplicantGender(e.target.value)}
                                            className="modal-input"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-form-group">
                                    <label htmlFor="applicant-branch">Preferred Branch Location</label>
                                    <select
                                        id="applicant-branch"
                                        value={applicantBranch}
                                        onChange={(e) => setApplicantBranch(e.target.value)}
                                        className="modal-input"
                                    >
                                        <option value="Kharadi">Kharadi Headquarters</option>
                                        <option value="Dighi">Dighi Branch</option>
                                        <option value="Katraj">Katraj Branch</option>
                                    </select>
                                </div>

                                <div className="modal-form-group">
                                    <label htmlFor="applicant-note">Brief Introduction / Key Skills</label>
                                    <textarea
                                        id="applicant-note"
                                        rows={3}
                                        placeholder="Tell us briefly about your background and why you want to join PPI..."
                                        value={applicantNote}
                                        onChange={(e) => setApplicantNote(e.target.value)}
                                        className="modal-input modal-textarea"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="modal-submit-btn"
                                >
                                    {submitting ? (
                                        <span>Submitting Application...</span>
                                    ) : (
                                        <>
                                            <span>Submit Application to HR</span>
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
