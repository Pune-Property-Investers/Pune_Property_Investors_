"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Briefcase, FileText, ExternalLink } from "lucide-react";
import { careerService } from "../../../services/career.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";

const EMPTY_JOB = {
    title: "",
    department: "Advisory & Sales",
    location: "Pune",
    type: "Full-time",
    experience: "1–3 Years",
    description: "",
    requirements: "",
    status: "Open",
};

const APP_STATUSES = ["New", "Shortlisted", "Interview", "Hired", "Rejected"];

export default function CareersManager() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("jobs");
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);
    const [jobForm, setJobForm] = useState(EMPTY_JOB);
    const [savingJob, setSavingJob] = useState(false);

    const [resumePreview, setResumePreview] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const [jobList, appList] = await Promise.all([
                careerService.listJobs(),
                careerService.listApplications(),
            ]);
            setJobs(Array.isArray(jobList) ? jobList : []);
            setApplications(Array.isArray(appList) ? appList : []);
        } catch (err) {
            showToast(err.message || "Failed to load careers data", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const filteredJobs = useMemo(() => {
        if (!search.trim()) return jobs;
        const q = search.toLowerCase();
        return jobs.filter((j) =>
            [j.title, j.department, j.location, j.type].filter(Boolean).join(" ").toLowerCase().includes(q)
        );
    }, [jobs, search]);

    const filteredApps = useMemo(() => {
        if (!search.trim()) return applications;
        const q = search.toLowerCase();
        return applications.filter((a) =>
            [a.name, a.email, a.jobTitle, a.status].filter(Boolean).join(" ").toLowerCase().includes(q)
        );
    }, [applications, search]);

    const openNewJob = () => {
        setEditingJobId(null);
        setJobForm({ ...EMPTY_JOB });
        setJobModalOpen(true);
    };

    const openEditJob = (job) => {
        setEditingJobId(job.id);
        setJobForm({ ...EMPTY_JOB, ...job });
        setJobModalOpen(true);
    };

    const handleSaveJob = async (e) => {
        e?.preventDefault();
        if (!jobForm.title.trim()) {
            showToast("Job title is required", "warning");
            return;
        }
        setSavingJob(true);
        try {
            if (editingJobId) {
                const updated = await careerService.updateJob(editingJobId, jobForm);
                setJobs((prev) => prev.map((j) => (String(j.id) === String(editingJobId) ? updated : j)));
                showToast("Job opening updated", "success");
            } else {
                const created = await careerService.createJob(jobForm);
                setJobs((prev) => [created, ...prev]);
                showToast("Job opening posted", "success");
            }
            setJobModalOpen(false);
        } catch (err) {
            showToast(err.message || "Failed to save job opening", "error");
        } finally {
            setSavingJob(false);
        }
    };

    const handleDeleteJob = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await careerService.removeJob(deleteTarget.id);
            setJobs((prev) => prev.filter((j) => String(j.id) !== String(deleteTarget.id)));
            showToast("Job opening removed", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete job", "error");
        } finally {
            setDeleting(false);
        }
    };

    const handleAppStatusChange = async (appId, nextStatus) => {
        try {
            const updated = await careerService.updateApplication(appId, { status: nextStatus });
            setApplications((prev) => prev.map((a) => (String(a.id) === String(appId) ? updated : a)));
            showToast(`Candidate moved to ${nextStatus}`, "success");
        } catch (err) {
            showToast(err.message || "Failed to update candidate status", "error");
        }
    };

    const jobColumns = [
        {
            key: "title",
            label: "Role Title",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        {row.department} • {row.location}
                    </div>
                </div>
            ),
        },
        {
            key: "experience",
            label: "Type & Experience",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.type || "Full-time"}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{row.experience}</div>
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status || "Open"} />,
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => openEditJob(row)}
                    >
                        <Pencil size={13} /> Edit
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setDeleteTarget(row)}
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            ),
        },
    ];

    const applicationColumns = [
        {
            key: "name",
            label: "Candidate",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        {row.email} • {row.phone}
                    </div>
                </div>
            ),
        },
        {
            key: "jobTitle",
            label: "Applied Role",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.jobTitle}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        Exp: {row.experience || "—"} • Applied {row.appliedAt || "—"}
                    </div>
                </div>
            ),
        },
        {
            key: "resume",
            label: "Resume",
            render: (row) => (
                <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={() => setResumePreview(row)}
                >
                    <FileText size={13} /> {row.resumeName || "View Resume"}
                </button>
            ),
        },
        {
            key: "status",
            label: "Hiring Stage",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StatusBadge status={row.status || "New"} />
                    <select
                        className="admin-select"
                        style={{ padding: "4px 8px", fontSize: 12, width: "auto" }}
                        value={row.status || "New"}
                        onChange={(e) => handleAppStatusChange(row.id, e.target.value)}
                    >
                        {APP_STATUSES.map((st) => (
                            <option key={st} value={st}>
                                {st}
                            </option>
                        ))}
                    </select>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Careers &amp; Recruitment</h1>
                    <p className="admin-page-subtitle">
                        Post open real-estate advisory roles, manage candidate applications, and review resumes.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="careers" label="Careers" onRetrieved={load} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openNewJob}>
                        <Plus size={16} /> Post Job Opening
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                <button
                    type="button"
                    className={`admin-tab ${activeTab === "jobs" ? "admin-tab--active" : ""}`}
                    onClick={() => setActiveTab("jobs")}
                >
                    Job Openings ({jobs.length})
                </button>
                <button
                    type="button"
                    className={`admin-tab ${activeTab === "applications" ? "admin-tab--active" : ""}`}
                    onClick={() => setActiveTab("applications")}
                >
                    Applications &amp; Resumes ({applications.length})
                </button>
            </div>

            {activeTab === "jobs" ? (
                <DataTable
                    columns={jobColumns}
                    rows={filteredJobs}
                    loading={loading}
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search job openings..."
                    emptyTitle="No job openings yet"
                    emptyDescription="Post a role to accept applications from the public Careers page."
                    emptyAction={
                        <button type="button" className="admin-btn admin-btn--primary" onClick={openNewJob}>
                            <Briefcase size={15} /> Post Job Opening
                        </button>
                    }
                />
            ) : (
                <DataTable
                    columns={applicationColumns}
                    rows={filteredApps}
                    loading={loading}
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search candidates by name, role, or stage..."
                    emptyTitle="No candidate applications yet"
                    emptyDescription="Incoming applications from the Careers page will appear here."
                />
            )}

            <AdminModal
                open={jobModalOpen}
                onClose={() => setJobModalOpen(false)}
                title={editingJobId ? `Edit Role: ${jobForm.title}` : "Post Job Opening"}
                footer={
                    <>
                        <button type="button" className="admin-btn admin-btn--outline" onClick={() => setJobModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="admin-btn admin-btn--gold" onClick={handleSaveJob} disabled={savingJob}>
                            {savingJob ? "Saving..." : editingJobId ? "Save Role" : "Publish Opening"}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSaveJob}>
                    <div className="admin-form-grid">
                        <div className="admin-field admin-field--full">
                            <label className="admin-label">Role Title *</label>
                            <input
                                className="admin-input"
                                value={jobForm.title}
                                onChange={(e) => setJobForm((p) => ({ ...p, title: e.target.value }))}
                                placeholder="e.g. Senior Property Advisor (East Pune)"
                                required
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Department</label>
                            <input
                                className="admin-input"
                                value={jobForm.department}
                                onChange={(e) => setJobForm((p) => ({ ...p, department: e.target.value }))}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Location</label>
                            <input
                                className="admin-input"
                                value={jobForm.location}
                                onChange={(e) => setJobForm((p) => ({ ...p, location: e.target.value }))}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Employment Type</label>
                            <select
                                className="admin-select"
                                value={jobForm.type}
                                onChange={(e) => setJobForm((p) => ({ ...p, type: e.target.value }))}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Experience</label>
                            <input
                                className="admin-input"
                                value={jobForm.experience}
                                onChange={(e) => setJobForm((p) => ({ ...p, experience: e.target.value }))}
                                placeholder="2–5 Years"
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Status</label>
                            <select
                                className="admin-select"
                                value={jobForm.status}
                                onChange={(e) => setJobForm((p) => ({ ...p, status: e.target.value }))}
                            >
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Role Description</label>
                        <textarea
                            className="admin-textarea"
                            value={jobForm.description}
                            onChange={(e) => setJobForm((p) => ({ ...p, description: e.target.value }))}
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Requirements</label>
                        <textarea
                            className="admin-textarea"
                            value={jobForm.requirements}
                            onChange={(e) => setJobForm((p) => ({ ...p, requirements: e.target.value }))}
                        />
                    </div>
                </form>
            </AdminModal>

            <AdminModal
                open={Boolean(resumePreview)}
                onClose={() => setResumePreview(null)}
                title={resumePreview ? `Candidate Resume: ${resumePreview.name}` : "Resume Preview"}
                footer={
                    <>
                        {resumePreview?.resumeUrl && (
                            <a
                                href={resumePreview.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-btn admin-btn--outline"
                            >
                                <ExternalLink size={14} /> Open Original File
                            </a>
                        )}
                        <button type="button" className="admin-btn admin-btn--primary" onClick={() => setResumePreview(null)}>
                            Close
                        </button>
                    </>
                }
            >
                {resumePreview && (
                    <div style={{ display: "grid", gap: 12 }}>
                        <div style={{ padding: 14, background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                            <div><strong>Candidate:</strong> {resumePreview.name}</div>
                            <div><strong>Role:</strong> {resumePreview.jobTitle}</div>
                            <div><strong>Email:</strong> {resumePreview.email}</div>
                            <div><strong>Phone:</strong> {resumePreview.phone}</div>
                            <div><strong>Experience:</strong> {resumePreview.experience}</div>
                            <div><strong>Resume File:</strong> {resumePreview.resumeName || resumePreview.resumeUrl}</div>
                        </div>
                    </div>
                )}
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteJob}
                loading={deleting}
                title="Delete Job Opening"
                message={`Delete "${deleteTarget?.title}"?`}
                confirmText="Delete Job"
                confirmTone="danger"
            />
        </div>
    );
}

