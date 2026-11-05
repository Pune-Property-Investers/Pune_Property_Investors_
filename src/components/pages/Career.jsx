"use client";

import { useState } from "react";
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
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import "./Career.css";

const openRoles = [
    {
        id: 1,
        title: "Senior Property Advisory Consultant",
        department: "Residential Sales",
        location: "Kharadi & Baner, Pune",
        type: "Full Time",
        experience: "2–5 Years",
        salary: "Competitive + Uncapped Incentives",
        description:
            "Lead end-to-end client consultation for newly launched luxury apartments and gated communities across Pune. Guide buyers through requirements, builder comparisons, site visits, and closure.",
        requirements: [
            "Experience in Pune primary residential real estate sales.",
            "Excellent spoken Hindi, Marathi, and English communication.",
            "Strong negotiation and customer relationship skills.",
        ],
    },
    {
        id: 2,
        title: "Relationship Manager – Commercial Real Estate",
        department: "Commercial & Retail Leasing",
        location: "Kharadi, Pune",
        type: "Full Time",
        experience: "3–6 Years",
        salary: "Attractive Package + High Commission",
        description:
            "Partner with corporate clients, SMEs, and investors looking for Grade-A office spaces, IT park tech suites, and high-street retail showrooms in Kharadi and Hinjewadi.",
        requirements: [
            "Proven track record in commercial office sales or leasing.",
            "Strong understanding of lease structures, cap rates, and ROI.",
            "Strong corporate networking and presentation skills.",
        ],
    },
    {
        id: 3,
        title: "Digital Marketing & Growth Specialist",
        department: "Marketing & Strategy",
        location: "Pune (Hybrid)",
        type: "Full Time",
        experience: "2–4 Years",
        salary: "Best in Industry",
        description:
            "Drive qualified homebuyer acquisition through Meta Ads, Google Performance Max campaigns, hyper-local SEO, and conversion optimization across Pune micro-markets.",
        requirements: [
            "Hands-on experience running real estate lead generation campaigns.",
            "Proficiency in GA4, Meta Ads Manager, and landing page testing.",
            "Analytical approach to lowering CPL and increasing show-up ratios.",
        ],
    },
    {
        id: 4,
        title: "Site Visit & Relationship Coordinator",
        department: "Client Operations",
        location: "Wakad & Balewadi, Pune",
        type: "Full Time",
        experience: "1–3 Years",
        salary: "Competitive + Visit Incentives",
        description:
            "Coordinate and conduct on-ground property viewings for prospective buyers. Provide firsthand insights on project amenities, master layout plans, and neighborhood infrastructure.",
        requirements: [
            "Valid two-wheeler license and familiarity with Pune routes.",
            "Punctual, professional demeanor and customer-first attitude.",
            "Basic understanding of Pune residential projects.",
        ],
    },
];

const perks = [
    {
        icon: TrendingUp,
        title: "Uncapped Earning Potential",
        description:
            "Industry-leading commission slabs and performance bonuses on top of competitive fixed compensation.",
    },
    {
        icon: Award,
        title: "Career Growth & Mentorship",
        description:
            "Learn from senior real estate leaders with over a decade of transaction experience across Pune.",
    },
    {
        icon: Users,
        title: "High-Trust Team Culture",
        description:
            "Transparent working environment, zero internal politics, and collaborative celebrations for team milestones.",
    },
    {
        icon: HeartHandshake,
        title: "Builder Direct Portfolio",
        description:
            "Work with Pune's top tier-1 developers (Godrej, VTP, Kumar, Lodha, Panchshil) with exclusive project mandates.",
    },
];

export default function Career() {
    const [applicantName, setApplicantName] = useState("");
    const [applicantPhone, setApplicantPhone] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [applicantRole, setApplicantRole] = useState(
        "Senior Property Advisory Consultant"
    );
    const [submitted, setSubmitted] = useState(false);

    const handleApply = (e) => {
        e.preventDefault();
        const msg = [
            `*Job Application via Pune Property Investors Website*`,
            `Role: ${applicantRole}`,
            `Name: ${applicantName}`,
            `Phone: ${applicantPhone}`,
            `Email: ${applicantEmail}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setSubmitted(true);
    };

    return (
        <div className="career-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title="Build Your Career"
                    titleAccent="With Industry Leaders."
                    eyebrow="CAREERS AT PUNE PROPERTY INVESTOR"
                    description="Join our growing team of passionate real estate advisors, digital marketers, and client relationship champions shaping the future of Pune real estate."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Career" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=85"
                    icon={Users}
                />

                <div className="container career-page__content">
                    {/* Why Join Us */}
                    <section className="career-why-section">
                        <div className="career-section-header">
                            <span className="career-eyebrow-tag">
                                WHY CHOOSE US
                            </span>
                            <h2 className="career-section-title">
                                Grow Your Real Estate Career With Pune's Trusted Advisory
                            </h2>
                            <p className="career-section-subtitle">
                                We provide the resources, builder relationships, and training you need to excel in the real estate consulting landscape.
                            </p>
                        </div>

                        <div className="career-perks-grid">
                            {perks.map((perk) => {
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

                    {/* Open Roles & Quick Apply Form */}
                    <section>
                        <div className="career-openings-header">
                            <div>
                                <span className="career-eyebrow-tag">
                                    CURRENT OPENINGS
                                </span>
                                <h2 className="career-openings-title">
                                    Explore Available Positions
                                </h2>
                            </div>

                            <a
                                href="mailto:careers@punepropertyinvestor.com"
                                className="career-email-link"
                            >
                                <Mail size={16} />
                                Send CV directly via email
                            </a>
                        </div>

                        <div className="career-roles-grid">
                            {openRoles.map((role) => (
                                <article
                                    key={role.id}
                                    className="career-role-card"
                                >
                                    <div className="career-role-top">
                                        <span className="career-role-dept">
                                            {role.department}
                                        </span>
                                        <span className="career-role-type">
                                            {role.type}
                                        </span>
                                    </div>

                                    <h3 className="career-role-title">
                                        {role.title}
                                    </h3>

                                    <div className="career-role-meta">
                                        <span className="career-role-meta-item">
                                            <MapPin size={15} />
                                            {role.location}
                                        </span>
                                        <span className="career-role-meta-item">
                                            <Briefcase size={15} />
                                            {role.experience}
                                        </span>
                                    </div>

                                    <p className="career-role-desc">
                                        {role.description}
                                    </p>

                                    <div className="career-role-action">
                                        <a
                                            href={`https://wa.me/917398174444?text=${encodeURIComponent(
                                                `Hello, I want to apply for the ${role.title} role at Pune Property Investors.`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="primary-button career-apply-btn"
                                        >
                                            Apply via WhatsApp
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Quick Resume Upload Form */}
                        <div className="career-form-card">
                            <div className="career-form-header">
                                <h3 className="career-form-title">
                                    Can't Find Your Exact Role?
                                </h3>
                                <p className="career-form-desc">
                                    Submit your contact details and our talent acquisition team will get in touch when a matching opening arises.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="career-success-box">
                                    <CheckCircle2 size={36} className="career-success-icon" />
                                    <h4 className="career-success-title">
                                        Application Initiated!
                                    </h4>
                                    <p className="career-success-desc">
                                        Our recruitment team has received your application. Thank you for your interest in joining Pune Property Investors.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleApply} className="career-form">
                                    <div className="career-form-row">
                                        <div>
                                            <label className="career-label">
                                                Your Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicantName}
                                                onChange={(e) => setApplicantName(e.target.value)}
                                                placeholder="e.g. Rahul Sharma"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">
                                                Phone Number *
                                            </label>
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
                                            <label className="career-label">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicantEmail}
                                                onChange={(e) => setApplicantEmail(e.target.value)}
                                                placeholder="e.g. rahul@example.com"
                                                className="career-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="career-label">
                                                Position of Interest
                                            </label>
                                            <select
                                                value={applicantRole}
                                                onChange={(e) => setApplicantRole(e.target.value)}
                                                className="career-select"
                                            >
                                                <option value="Senior Property Advisory Consultant">Senior Property Advisory Consultant</option>
                                                <option value="Relationship Manager - Commercial">Relationship Manager - Commercial</option>
                                                <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
                                                <option value="Site Visit Coordinator">Site Visit Coordinator</option>
                                                <option value="Other / General Application">Other / General Application</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="primary-button career-submit-btn"
                                    >
                                        Submit Application via HR Desk
                                        <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
