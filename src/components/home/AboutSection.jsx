"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, CheckCircle2, ArrowRight } from "lucide-react";
import "./AboutSection.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AboutSection() {
    return (
        <section className="about-ppi-section" id="about-ppi" aria-label="About Pune Property Investors">
            <div className="about-ppi-container">
                {/* Left Column: Team Office Photo with Floating Trust Badge & Gold Accent */}
                <div className="about-ppi-media-wrap">
                    {/* Decorative gold accent frame top-left */}
                    <div className="about-ppi-corner-accent" aria-hidden="true" />

                    <div className="about-ppi-image-frame">
                        <img
                            src={`${basePath}/images/ppi-team-office.jpg`}
                            alt="Pune Property Investors Team at Headquarters"
                            className="about-ppi-image"
                            loading="lazy"
                        />

                        {/* Floating Trust Card (Bottom Left) */}
                        <div className="about-ppi-floating-card">
                            <div className="about-ppi-heart-icon-wrap">
                                <Heart size={20} className="about-ppi-heart-icon" strokeWidth={2} />
                            </div>
                            <div className="about-ppi-floating-text">
                                <strong className="about-ppi-floating-title">Finding the right place</strong>
                                <span className="about-ppi-floating-sub">Guidance for your next property decision</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Editorial Text, Trust Checkpoints & CTA */}
                <div className="about-ppi-content">
                    <span className="about-ppi-eyebrow">
                        ABOUT PUNE PROPERTY INVESTORS
                    </span>

                    <h2 className="about-ppi-title">
                        More Than Property.<br />
                        <span className="about-ppi-title-gold">A Partnership Built on Trust.</span>
                    </h2>

                    <p className="about-ppi-lead">
                        Choosing a property is an important decision. Whether you&apos;re looking for a home or exploring an investment, the right information and guidance can make the journey easier.
                    </p>

                    <p className="about-ppi-body">
                        Pune Property Investors aims to help clients discover property opportunities in Pune based on their needs, preferences, and budget.
                    </p>

                    <ul className="about-ppi-checklist">
                        <li className="about-ppi-check-item">
                            <CheckCircle2 size={19} className="about-ppi-check-icon" strokeWidth={2} />
                            <span>Personalized property guidance</span>
                        </li>
                        <li className="about-ppi-check-item">
                            <CheckCircle2 size={19} className="about-ppi-check-icon" strokeWidth={2} />
                            <span>Residential and investment options</span>
                        </li>
                        <li className="about-ppi-check-item">
                            <CheckCircle2 size={19} className="about-ppi-check-icon" strokeWidth={2} />
                            <span>Support throughout the buying journey</span>
                        </li>
                        <li className="about-ppi-check-item">
                            <CheckCircle2 size={19} className="about-ppi-check-icon" strokeWidth={2} />
                            <span>Clear communication at every step</span>
                        </li>
                    </ul>

                    <div className="about-ppi-action">
                        <Link href="/contact" className="about-ppi-btn">
                            <span>Talk to Our Team</span>
                            <ArrowRight size={17} className="about-ppi-btn-arrow" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

