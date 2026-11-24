"use client";

import { useState, useMemo } from "react";
import {
    Calculator,
    IndianRupee,
    Calendar,
    Percent,
    TrendingUp,
    Sparkles,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import "./SmartCalculator.css";

const WHATSAPP_NUMBER = "917398174444";

export default function SmartCalculator() {
    // 1. Interactive State
    const [propertyPrice, setPropertyPrice] = useState(8500000); // 85 Lakhs default
    const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
    const [interestRate, setInterestRate] = useState(8.5); // 8.5%
    const [tenureYears, setTenureYears] = useState(20); // 20 Years

    // 2. Calculations
    const {
        downPaymentAmount,
        loanAmount,
        monthlyEmi,
        totalInterest,
        totalPayment,
        estimatedRental,
    } = useMemo(() => {
        const downPayment = Math.round((propertyPrice * downPaymentPercent) / 100);
        const principal = Math.max(0, propertyPrice - downPayment);
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12;

        let emi = 0;
        if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
            emi = Math.round(
                (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1)
            );
        }

        const totalPay = emi * totalMonths;
        const interest = Math.max(0, totalPay - principal);
        // Estimated Pune average rental yield: approx 3.8% annually
        const monthlyRent = Math.round((propertyPrice * 0.038) / 12);

        return {
            downPaymentAmount: downPayment,
            loanAmount: principal,
            monthlyEmi: emi,
            totalInterest: interest,
            totalPayment: totalPay,
            estimatedRental: monthlyRent,
        };
    }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

    // Format Indian Currency
    const formatINR = (val) => {
        if (!val || isNaN(val)) return "₹0";
        if (val >= 10000000) {
            return `₹${(val / 10000000).toFixed(2)} Cr`;
        }
        if (val >= 100000) {
            return `₹${(val / 100000).toFixed(2)} Lac`;
        }
        return `₹${val.toLocaleString("en-IN")}`;
    };

    const handleWhatsAppConsult = () => {
        const text = [
            `*Home Loan & EMI Inquiry via Website*`,
            `*Property Budget:* ${formatINR(propertyPrice)}`,
            `*Down Payment:* ${formatINR(downPaymentAmount)} (${downPaymentPercent}%)`,
            `*Loan Amount:* ${formatINR(loanAmount)}`,
            `*Tenure:* ${tenureYears} Years @ ${interestRate}%`,
            `*Calculated Monthly EMI:* ₹${monthlyEmi.toLocaleString("en-IN")}/mo`,
            `*Expected Rental Yield:* ~₹${estimatedRental.toLocaleString("en-IN")}/mo`,
            `Hello PPI Team, I would like to consult on pre-approved home loan rates and verified properties in this budget.`,
        ].join("\n");

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="smart-calc-section" id="smart-calculator" aria-label="Smart EMI and ROI Calculator">
            <div className="smart-calc-container">
                {/* Header */}
                <div className="smart-calc-header">
                    <div className="smart-calc-eyebrow-wrap">
                        <span className="smart-calc-eyebrow-line" />
                        <span className="smart-calc-eyebrow">
                            <Sparkles size={12} /> SMART FINANCIAL TOOL
                        </span>
                        <span className="smart-calc-eyebrow-line" />
                    </div>
                    <h2 className="smart-calc-title">
                        Plan Your Investment & <span>Monthly EMI</span>
                    </h2>
                    <div className="smart-calc-divider" aria-hidden="true" />
                </div>

                {/* Main Interactive Grid */}
                <div className="smart-calc-card">
                    {/* Left: Input Sliders */}
                    <div className="smart-calc-inputs">
                        {/* 1. Property Price */}
                        <div className="smart-calc-slider-group">
                            <div className="smart-calc-label-row">
                                <span className="smart-calc-label">
                                    <IndianRupee size={14} className="smart-calc-icon" /> Property Budget
                                </span>
                                <span className="smart-calc-val-badge">
                                    {formatINR(propertyPrice)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={3000000}
                                max={50000000}
                                step={500000}
                                value={propertyPrice}
                                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                                className="smart-calc-range"
                            />
                            <div className="smart-calc-range-ticks">
                                <span>₹30 Lac</span>
                                <span>₹1.5 Cr</span>
                                <span>₹3 Cr</span>
                                <span>₹5 Cr</span>
                            </div>
                        </div>

                        {/* 2. Down Payment */}
                        <div className="smart-calc-slider-group">
                            <div className="smart-calc-label-row">
                                <span className="smart-calc-label">
                                    <Percent size={14} className="smart-calc-icon" /> Down Payment ({downPaymentPercent}%)
                                </span>
                                <span className="smart-calc-val-badge">
                                    {formatINR(downPaymentAmount)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={10}
                                max={50}
                                step={5}
                                value={downPaymentPercent}
                                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                className="smart-calc-range"
                            />
                            <div className="smart-calc-range-ticks">
                                <span>10% (Min)</span>
                                <span>20% (Standard)</span>
                                <span>35%</span>
                                <span>50%</span>
                            </div>
                        </div>

                        {/* 3. Interest Rate & Tenure Grid */}
                        <div className="smart-calc-dual-row">
                            {/* Interest Rate */}
                            <div className="smart-calc-slider-group">
                                <div className="smart-calc-label-row">
                                    <span className="smart-calc-label">
                                        <Percent size={14} className="smart-calc-icon" /> Interest Rate
                                    </span>
                                    <span className="smart-calc-val-badge">{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min={7.5}
                                    max={12}
                                    step={0.1}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="smart-calc-range"
                                />
                                <div className="smart-calc-range-ticks">
                                    <span>7.5%</span>
                                    <span>8.5% (SBI/HDFC)</span>
                                    <span>12%</span>
                                </div>
                            </div>

                            {/* Tenure */}
                            <div className="smart-calc-slider-group">
                                <div className="smart-calc-label-row">
                                    <span className="smart-calc-label">
                                        <Calendar size={14} className="smart-calc-icon" /> Loan Tenure
                                    </span>
                                    <span className="smart-calc-val-badge">{tenureYears} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min={5}
                                    max={30}
                                    step={1}
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                    className="smart-calc-range"
                                />
                                <div className="smart-calc-range-ticks">
                                    <span>5 Yrs</span>
                                    <span>15 Yrs</span>
                                    <span>20 Yrs</span>
                                    <span>30 Yrs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Output Breakdown & CTA */}
                    <div className="smart-calc-result-box">
                        <div className="smart-calc-result-header">
                            <span className="smart-calc-result-tag">ESTIMATED MONTHLY COMMITMENT</span>
                            <div className="smart-calc-emi-display">
                                <span className="smart-calc-emi-currency">₹</span>
                                <span className="smart-calc-emi-amount">
                                    {monthlyEmi.toLocaleString("en-IN")}
                                </span>
                                <span className="smart-calc-emi-unit">/ month</span>
                            </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="smart-calc-metrics-grid">
                            <div className="smart-calc-metric-pill">
                                <span className="metric-label">Loan Principal</span>
                                <span className="metric-value">{formatINR(loanAmount)}</span>
                            </div>

                            <div className="smart-calc-metric-pill">
                                <span className="metric-label">Total Interest</span>
                                <span className="metric-value">{formatINR(totalInterest)}</span>
                            </div>

                            <div className="smart-calc-metric-pill">
                                <span className="metric-label">Total Repayment</span>
                                <span className="metric-value">{formatINR(totalPayment)}</span>
                            </div>

                            <div className="smart-calc-metric-pill metric-pill--highlight">
                                <span className="metric-label">
                                    <TrendingUp size={12} /> Expected Pune Rent
                                </span>
                                <span className="metric-value text-gold">
                                    ~₹{estimatedRental.toLocaleString("en-IN")}/mo
                                </span>
                            </div>
                        </div>

                        {/* Features Checkmarks */}
                        <div className="smart-calc-benefits">
                            <span className="benefit-item">
                                <CheckCircle2 size={13} className="benefit-icon" /> Lowest Bank Partner Rates (SBI, HDFC, ICICI)
                            </span>
                            <span className="benefit-item">
                                <CheckCircle2 size={13} className="benefit-icon" /> 0% Processing Fee Consultation with Senior Advisors
                            </span>
                        </div>

                        {/* WhatsApp CTA Button */}
                        <button
                            type="button"
                            onClick={handleWhatsAppConsult}
                            className="smart-calc-cta-btn"
                            aria-label="Consult Home Loan Advisor on WhatsApp"
                        >
                            <FaWhatsapp size={17} />
                            <span>Get Pre-Approved Loan Rates</span>
                            <ArrowRight size={14} className="cta-arrow" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
