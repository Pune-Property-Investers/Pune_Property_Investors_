"use client";

import { useState, useEffect, useMemo } from "react";
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
    Camera,
    PhoneCall,
    ShieldCheck,
    X,
    Building2,
    Calendar,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import CareersHero from "../careers/CareersHero";
import { careerService } from "../../services/career.service";
import { DEFAULT_JOBS } from "../../services/mockStore";
import "./Career.css";

const WHATSAPP_NUMBER = "917398174444";

const PERKS = [
    {
        icon: TrendingUp,
        title: "Uncapped Earning Potential",
        description:
            "Industry-leading commission slabs, milestone bonuses, and regular performance incentives on top of competitive fixed salaries.",
    },
    {
        icon: Award,
        title: "Executive Mentorship",
        description:
            "Work directly with senior real estate leaders possessing over 15+ years of transaction leadership across Pune's prime corridors.",
    },
    {
        icon: Users,
        title: "Empowering Culture",
        description:
            "Transparent working environment, equal opportunity, fast-track promotions, and collaborative celebrations for team milestones.",
    },
    {
        icon: HeartHandshake,
        title: "Tier-1 Builder Mandates",
        description:
            "Exclusive project mandates with Pune's premier developers (Godrej, Lodha, Panchshil, VTP, Kohinoor, Mantra) across luxury micro-markets.",
    },
];

export default function Career() {
    const [jobs, setJobs] = useState(DEFAULT_JOBS);
    const [loading, setLoading] = useState(true);

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

    const handleViewDetails = (job) => {
        if (job.department) {
            if (job.department.toLowerCase().includes("admin") || job.department.toLowerCase().includes("operations")) {
                setSelectedDepartment("Admin");
            } else if (job.department.toLowerCase().includes("sales") || job.department.toLowerCase().includes("advisory")) {
                setSelectedDepartment("Sales");
            } else {
                setSelectedDepartment("All");
            }
        }
        setSearchQuery(job.title || "");
        handleExplore();
    };

    return (
        <div className="career-page">
            <Header transparentAtTop={true} />

            <main>
                {/* Cinematic Laptop Recruitment Showcase */}
                <CareersHero
                    jobs={jobs}
                    onApply={openApplyModal}
                    onViewDetails={handleViewDetails}
                    onExplore={handleExplore}
                />

                <div className="container career-page__content">
                    {/* Why Choose Us */}
                    <section className="career-why-section">
                        <div className="career-section-header">
                            <span className="career-eyebrow-tag">
                                WHY PUNE PROPERTY INVESTORS
                            </span>
                            <h2 className="career-section-title">
                                Grow Your Professional Journey With Pune's Trusted Real Estate Firm
                            </h2>
                            <p className="career-section-subtitle">
                                We provide institutional-grade training, builder partnerships, high incentives, and modern corporate work environments across Pune.
                            </p>
                        </div>

                        <div className="career-perks-grid">
                            {PERKS.map((perk) => {
                                const IconComponent = perk.icon;
                                return (
                                    <div
                                        key={perk.title}
                                        className="career-perk-card"
                                    >
                                        <div className="career-perk-icon">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="career-perk-title">
                                            {perk.title}
                                        </h3>
                                        <p className="career-perk-desc">
                                            {perk.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Open Roles Section */}
                    <section className="career-openings-section" id="open-roles">
                        <div className="career-openings-header">
                            <div>
                                <span className="career-eyebrow-tag">
                                    CURRENT VACANCIES ({filteredJobs.length})
                                </span>
                                <h2 className="career-openings-title">
                                    Explore Immediate Open Positions
                                </h2>
                                <p className="career-openings-sub">
                                    All roles are editable and managed via our live recruitment desk.
                                </p>
                            </div>

                            <a
                                href="mailto:careers@punepropertyinvestors.com"
                                className="career-email-link"
                            >
                                <Mail size={16} />
                                Send CV directly via Email
                            </a>
                        </div>

                        {/* Interactive Filter Matrix */}
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
                                        { id: "Kharadi", label: "📍 Kharadi" },
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
                                        placeholder="Search by role, keyword, or branch..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="career-search-input"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            className="career-search-clear"
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
                                <p>Try selecting "All Openings" or clear your search keyword.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDepartment("All");
                                        setSelectedLocation("All");
                                        setSearchQuery("");
                                    }}
                                    className="career-reset-btn"
                                >
                                    View All Positions
                                </button>
                            </div>
                        ) : (
                            <div className="career-roles-grid">
                                {filteredJobs.map((role) => (
                                    <article key={role.id} className="career-role-card">
                                        {/* Card Media Header */}
                                        <div className="career-role-media-wrap">
                                            {role.image ? (
                                                <img
                                                    src={role.image}
                                                    alt={role.title}
                                                    className="career-role-thumb"
                                                />
                                            ) : (
                                                <div className="career-role-thumb-placeholder">
                                                    <Building2 size={36} />
                                                </div>
                                            )}
                                            <span className="career-role-hiring-badge">
                                                Actively Hiring
                                            </span>
                                        </div>

                                        <div className="career-role-body">
                                            {/* Department & Employment Type */}
                                            <div className="career-role-top">
                                                <span className="career-role-dept">
                                                    {role.department || "Advisory"}
                                                </span>
                                                <span className="career-role-type">
                                                    {role.type || "Full Time"}
                                                </span>
                                            </div>

                                            {/* Role Title */}
                                            <h3 className="career-role-title">
                                                {role.title}
                                            </h3>

                                            {/* Metadata chips: Location & Experience */}
                                            <div className="career-role-meta">
                                                <span className="career-role-meta-item location-chip">
                                                    <MapPin size={14} />
                                                    {role.location}
                                                </span>
                                                <span className="career-role-meta-item exp-chip">
                                                    <Briefcase size={14} />
                                                    {role.experience || "1–3 Years"}
                                                </span>
                                            </div>

                                            {/* Gender / Eligibility Criteria Highlight */}
                                            {role.genderCriteria && (
                                                <div
                                                    className={`career-gender-badge ${role.genderCriteria.toLowerCase().includes("female")
                                                        ? "female-specific"
                                                        : "open-criteria"
                                                        }`}
                                                >
                                                    <Sparkles size={13} />
                                                    <span>{role.genderCriteria}</span>
                                                </div>
                                            )}

                                            {/* Salary info if provided */}
                                            {role.salary && (
                                                <div className="career-salary-tag">
                                                    <span>Compensation:</span> {role.salary}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="career-role-desc">
                                                {role.description}
                                            </p>

                                            {/* Key Requirements */}
                                            {role.requirements && (
                                                <div className="career-role-reqs-box">
                                                    <strong>Key Criteria:</strong>
                                                    <p>{role.requirements}</p>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="career-role-actions-row">
                                                <a
                                                    href={getWhatsAppApplyUrl(role)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="career-whatsapp-apply-btn"
                                                >
                                                    <FaWhatsapp size={16} />
                                                    Apply via WhatsApp
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => openApplyModal(role)}
                                                    className="career-online-apply-btn"
                                                >
                                                    Apply Online
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* Open Application Desk Form */}
                        <div className="career-form-card">
                            <div className="career-form-header">
                                <span className="career-eyebrow-tag">OPEN TALENT POOL</span>
                                <h3 className="career-form-title">
                                    Can't Find Your Exact Profile?
                                </h3>
                                <p className="career-form-desc">
                                    Submit your resume directly to our talent acquisition team. When matching positions open at Kharadi, Dighi, or Katraj, we will contact you immediately.
                                </p>
                            </div>

                            {submittedSuccess && !activeJobForModal ? (
                                <div className="career-success-box">
                                    <CheckCircle2 size={38} className="career-success-icon" />
                                    <h4 className="career-success-title">
                                        Application Submitted!
                                    </h4>
                                    <p className="career-success-desc">
                                        Thank you for your interest. Our Human Resources recruitment desk has received your profile and will review it shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitApplication} className="career-form">
                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Your Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={applicantName}
                                                onChange={(e) => setApplicantName(e.target.value)}
                                                placeholder="e.g. Aditi Kulkarni / Rahul Shinde"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">Phone / WhatsApp Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicantPhone}
                                                onChange={(e) => setApplicantPhone(e.target.value)}
                                                placeholder="e.g. +91 98765 43210"
                                                className="career-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={applicantEmail}
                                                onChange={(e) => setApplicantEmail(e.target.value)}
                                                placeholder="e.g. aditi@example.com"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">Total Experience</label>
                                            <input
                                                type="text"
                                                value={applicantExp}
                                                onChange={(e) => setApplicantExp(e.target.value)}
                                                placeholder="e.g. Fresher / 2.5 Years in Sales"
                                                className="career-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Preferred Branch</label>
                                            <select
                                                value={applicantBranch}
                                                onChange={(e) => setApplicantBranch(e.target.value)}
                                                className="career-select"
                                            >
                                                <option value="Kharadi">Kharadi Branch (Admin, HR, Marketing, Sales, Support)</option>
                                                <option value="Dighi">Dighi Branch (Sales & Advisory)</option>
                                                <option value="Katraj">Katraj Branch (Sales & Advisory)</option>
                                                <option value="Any Location">Any Location in Pune</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="career-label">Gender (for location-specific roles)</label>
                                            <select
                                                value={applicantGender}
                                                onChange={(e) => setApplicantGender(e.target.value)}
                                                className="career-select"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="career-label">
                                            Brief Profile / Key Skills / Portfolio Link
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={applicantNote}
                                            onChange={(e) => setApplicantNote(e.target.value)}
                                            placeholder="Mention your previous companies, real estate projects handled, or portfolio link..."
                                            className="career-textarea"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="primary-button career-submit-btn"
                                    >
                                        {submitting ? "Submitting..." : "Submit Profile to HR Desk"}
                                        <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                </div>

                {/* Modal for Quick Application on Specific Role */}
                {activeJobForModal && (
                    <div
                        className="career-modal-backdrop"
                        onClick={() => setActiveJobForModal(null)}
                    >
                        <div
                            className="career-modal-dialog"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="career-modal-close"
                                onClick={() => setActiveJobForModal(null)}
                            >
                                <X size={18} />
                            </button>

                            <div className="career-modal-header">
                                <span className="career-eyebrow-tag">
                                    APPLYING FOR POSITION
                                </span>
                                <h3 className="career-modal-title">
                                    {activeJobForModal.title}
                                </h3>
                                <div className="career-modal-loc">
                                    <span>📍 {activeJobForModal.location}</span>
                                    <span>•</span>
                                    <span>{activeJobForModal.department}</span>
                                </div>
                                {activeJobForModal.genderCriteria && (
                                    <div className="career-modal-gender-pill">
                                        <Sparkles size={13} />
                                        {activeJobForModal.genderCriteria}
                                    </div>
                                )}
                            </div>

                            {submittedSuccess ? (
                                <div className="career-modal-success">
                                    <CheckCircle2 size={44} className="career-success-icon" />
                                    <h4>Application Received!</h4>
                                    <p>
                                        Our recruitment team has received your application for{" "}
                                        <strong>{activeJobForModal.title}</strong>. We will get in touch shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitApplication} className="career-modal-form">
                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={applicantName}
                                                onChange={(e) => setApplicantName(e.target.value)}
                                                placeholder="e.g. Sunita Jagtap"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">WhatsApp / Phone *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicantPhone}
                                                onChange={(e) => setApplicantPhone(e.target.value)}
                                                placeholder="+91 98765 43210"
                                                className="career-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={applicantEmail}
                                                onChange={(e) => setApplicantEmail(e.target.value)}
                                                placeholder="sunita@example.com"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">Relevant Experience</label>
                                            <input
                                                type="text"
                                                value={applicantExp}
                                                onChange={(e) => setApplicantExp(e.target.value)}
                                                placeholder="e.g. 2 Years"
                                                className="career-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">Preferred Branch</label>
                                            <select
                                                value={applicantBranch}
                                                onChange={(e) => setApplicantBranch(e.target.value)}
                                                className="career-select"
                                            >
                                                <option value="Kharadi">Kharadi Branch</option>
                                                <option value="Dighi">Dighi Branch</option>
                                                <option value="Katraj">Katraj Branch</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="career-label">Gender (as per role criteria)</label>
                                            <select
                                                value={applicantGender}
                                                onChange={(e) => setApplicantGender(e.target.value)}
                                                className="career-select"
                                            >
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="career-label">Brief Note or Portfolio Link</label>
                                        <textarea
                                            rows={2}
                                            value={applicantNote}
                                            onChange={(e) => setApplicantNote(e.target.value)}
                                            placeholder="Previous roles, achievements, or LinkedIn / portfolio URL..."
                                            className="career-textarea"
                                        />
                                    </div>

                                    <div className="career-modal-actions">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="primary-button career-modal-submit-btn"
                                        >
                                            {submitting ? "Submitting..." : "Submit Application"}
                                            <Send size={15} />
                                        </button>
                                        <a
                                            href={getWhatsAppApplyUrl(activeJobForModal)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="career-modal-wa-btn"
                                        >
                                            <FaWhatsapp size={16} />
                                            Apply via WhatsApp
                                        </a>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
