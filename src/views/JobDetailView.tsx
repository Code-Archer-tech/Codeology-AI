import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Share2,
  Sparkles,
  ShieldAlert,
  UserCheck,
  Send,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Textarea, Input } from '../components/ui/Input';
import { Job, CandidateProfile } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface JobDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ slug, onNavigate }) => {
  const { currentUser } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [submittingApp, setSubmittingApp] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [appliedAppResult, setAppliedAppResult] = useState<any>(null);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getJob(slug);
        setJob(res.job);

        if (currentUser?.role === 'candidate') {
          const profileRes = await api.getCandidateProfile();
          setCandidateProfile(profileRes?.profile || null);

          const savedRes = await api.getSavedJobs();
          const savedIds = new Set((savedRes?.savedJobs || []).map((s: any) => s.jobId));
          setIsSaved(res?.job ? savedIds.has(res.job.id) : false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, currentUser]);

  const handleToggleSave = async () => {
    if (!job) return;
    try {
      const res = await api.toggleSaveJob(job.id);
      setIsSaved(res.isSaved);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSubmittingApp(true);
    setAppError(null);

    try {
      const res = await api.applyForJob({
        jobId: job.id,
        coverNote,
        resumeFileName: candidateProfile?.resumeFileName || 'Elena_Rostova_Resume_2026.pdf',
        resumeText: candidateProfile?.resumeText || candidateProfile?.summary || 'Senior Infrastructure & Distributed Systems Engineer',
      });
      setAppliedAppResult(res.application);
      setApplicationSuccess(true);
    } catch (err: any) {
      setAppError(err.message || 'Error submitting application.');
    } finally {
      setSubmittingApp(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-mono text-sm">
        Retrieving job requisition specifications...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Job Opening Not Found</h2>
        <Button onClick={() => onNavigate('/careers')}>Back to Careers</Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-12 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            type="button"
            onClick={() => onNavigate('/careers')}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center font-mono cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO OPEN REQUISITIONS
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-sky-700 uppercase">
                  {job.department}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono">REQ ID: {job.id.toUpperCase()}</span>
                <span className="text-slate-300">•</span>
                <Badge variant={job.type === 'Full-time' ? 'success' : 'info'} size="sm">
                  {job.type}
                </Badge>
                <Badge variant="outline" size="sm">
                  {job.workplaceType}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 font-mono pt-1">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                  {job.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center text-slate-900 font-bold">
                  {job.salaryRange}
                </span>
                <span className="text-slate-300">•</span>
                <span>Experience: {job.experienceLevel}</span>
              </div>
            </div>

            {/* Apply & Save CTAs */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={handleToggleSave}
                className="p-2.5 text-slate-600 hover:text-slate-900 rounded-md border border-slate-300 hover:bg-white transition-colors cursor-pointer"
                title={isSaved ? 'Job Bookmarked' : 'Bookmark Job'}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-sky-600" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>

              <Button
                size="lg"
                variant="primary"
                onClick={() => setApplyModalOpen(true)}
                className="px-6 font-semibold"
              >
                Apply for Requisition
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Responsibilities, Requirements, Benefits */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-950 mb-3 font-mono uppercase tracking-wider text-xs text-sky-800">
                Position Summary
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {job.summary}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-3">Core Responsibilities</h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {(job.responsibilities || []).map((resp, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-3">Technical Qualifications</h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {(job.requirements || []).map((req, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-3">Enterprise Compensation & Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(job.benefits || []).map((b, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mr-2" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Apply trigger */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Ready to present your technical credentials?</p>
                <p className="text-sm font-semibold text-slate-900">Immediate interview loop confirmation</p>
              </div>
              <Button size="md" variant="primary" onClick={() => setApplyModalOpen(true)}>
                Submit Application Now
              </Button>
            </div>
          </div>

          {/* Right: Team & Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="bordered" className="p-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Hiring Practice Information
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Practice Lead / Hiring Manager</span>
                  <span className="font-semibold text-slate-900">{job.hiringManagerName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Primary Recruiter</span>
                  <span className="font-semibold text-slate-900">{job.recruiterName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Expected Interview Velocity</span>
                  <span className="font-mono text-emerald-700 font-semibold">10-14 Days Total Loop</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Requisition Views</span>
                  <span className="font-mono text-slate-700">{job.viewsCount} verified views</span>
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Required Competencies
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {(job.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-mono border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Candidate Advisory Card */}
            <Card variant="bordered" className="p-5 bg-sky-50/40 border-sky-200 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-sky-800 font-bold">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>AI Application Assistant</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                When you submit, Codeology AI compares your profile against the technical requisition requirements, providing instant match scoring and interview preparation tips.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Instant Application Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => {
          setApplyModalOpen(false);
          setApplicationSuccess(false);
        }}
        title={`Apply: ${job.title}`}
        description={`Submit application under ${currentUser?.name || 'Active Candidate'}`}
        maxWidth="xl"
      >
        {applicationSuccess ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Application Successfully Received & Staged</span>
              </div>
              <p className="text-xs text-slate-700">
                Your application has entered the 9-stage review pipeline under status{' '}
                <strong className="text-emerald-800 font-mono">Applied</strong>.
              </p>
            </div>

            {appliedAppResult && (
              <div className="p-4 bg-slate-900 text-white rounded-lg space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-sky-400 font-bold">AI FIT ANALYSIS PREVIEW</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {appliedAppResult.aiMatchScore}% MATCH SCORE
                  </span>
                </div>

                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {appliedAppResult.aiMatchRationale}
                </p>

                {appliedAppResult.aiKeyStrengths && appliedAppResult.aiKeyStrengths.length > 0 && (
                  <div className="pt-2">
                    <span className="text-slate-400 block text-[11px] mb-1">KEY DETECTED STRENGTHS:</span>
                    <ul className="space-y-1 text-slate-200 text-xs font-sans">
                      {appliedAppResult.aiKeyStrengths.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setApplyModalOpen(false);
                  setApplicationSuccess(false);
                }}
              >
                Close Window
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setApplyModalOpen(false);
                  onNavigate('/candidate/dashboard');
                }}
              >
                Track in Candidate Dashboard →
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
            {appError && (
              <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded">
                {appError}
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
              <div className="font-semibold text-slate-900">Applying as:</div>
              <div className="text-slate-600 font-mono">
                {currentUser?.name} • {currentUser?.email}
              </div>
              <div className="text-[11px] text-slate-500">
                Resume on file: <span className="font-mono text-slate-700">{candidateProfile?.resumeFileName || 'Elena_Rostova_Resume_2026.pdf'}</span>
              </div>
            </div>

            <Textarea
              label="Brief Note to Hiring Team / Context"
              rows={4}
              placeholder="Highlight any specific experience with AWS multi-region Kubernetes architectures, Terraform, or related distributed systems..."
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
            />

            <div className="p-3 bg-slate-50 rounded text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Ethical AI Disclosure:</strong> Automated parsing provides an initial fit heuristic to assist recruiters. Human hiring managers review every application.
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={submittingApp}
              >
                <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
