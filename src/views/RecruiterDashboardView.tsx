import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Calendar,
  Sparkles,
  Plus,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ExternalLink,
  Video,
  FileText,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Application, ApplicationStatus, Job, Interview, InterviewFeedback } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const STAGE_OPTIONS: ApplicationStatus[] = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Assessment',
  'Interview',
  'Final Review',
  'Offer',
  'Hired',
  'Rejected',
];

export const RecruiterDashboardView: React.FC<{ onNavigate: (path: string) => void }> = ({
  onNavigate,
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [reports, setReports] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedJobFilter, setSelectedJobFilter] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('');

  // Selected candidate drawer/modal
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [recruiterNoteText, setRecruiterNoteText] = useState('');
  const [statusAdvancing, setStatusAdvancing] = useState(false);

  // New Job Requisition Modal
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: '',
    department: 'Cloud & Infrastructure',
    type: 'Full-time',
    location: 'Remote (US/Canada)',
    salaryRange: '$180,000 - $220,000',
    experienceLevel: 'Senior / Staff',
    summary: '',
    responsibilities: 'Architect distributed systems\nLead technical design reviews\nEnsure 99.99% infrastructure uptime',
    requirements: '7+ years production cloud engineering\nDeep experience with AWS/K8s\nProficiency in Go or TypeScript',
    skills: 'AWS, Kubernetes, Terraform, Go, CI/CD',
  });

  // Schedule Interview Modal
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    candidateName: '',
    candidateId: '',
    applicationId: '',
    jobId: '',
    jobTitle: '',
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
    durationMinutes: 60,
    round: 'Technical Deep Dive',
    interviewerName: currentUser?.name || 'David Sterling',
    interviewerTitle: 'Chief Technology Officer',
    meetingUrl: 'https://meet.codeologyai.com/tech-interview-' + Math.floor(Math.random() * 9000 + 1000),
    prepNotes: 'Focus on distributed consensus, Kubernetes failure modes, and past scale experiences.',
  });

  // Scorecard Modal
  const [scorecardModalOpen, setScorecardModalOpen] = useState(false);
  const [activeInterviewForScorecard, setActiveInterviewForScorecard] = useState<Interview | null>(null);
  const [scorecardData, setScorecardData] = useState({
    technicalRating: 5,
    communicationRating: 4,
    problemSolvingRating: 5,
    culturalFitRating: 5,
    overallRecommendation: 'Strong Hire',
    strengths: 'Deep understanding of active-active failover and etcd clustering.',
    areasOfConcern: 'None identified during system architecture drill.',
    detailedComments: 'Excellent candidate, demonstrated clear production battle-testing.',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [appRes, jobRes, intRes, repRes] = await Promise.all([
        api.getApplications(),
        api.getJobs(),
        api.getInterviews(),
        api.getAdminReports(),
      ]);
      setApplications(appRes?.applications || []);
      setJobs(jobRes?.jobs || []);
      setInterviews(intRes?.interviews || []);
      setReports(repRes || null);
    } catch (err) {
      console.warn('Recruiter load data note:', err);
      setApplications([]);
      setJobs([]);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdvanceStatus = async (appId: string, newStatus: ApplicationStatus) => {
    setStatusAdvancing(true);
    try {
      const res = await api.updateApplicationStatus(appId, newStatus, `Advanced by ${currentUser?.name}`);
      setApplications((prev) => prev.map((a) => (a.id === appId ? res.application : a)));
      if (selectedApp?.id === appId) {
        setSelectedApp(res.application);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusAdvancing(false);
    }
  };

  const handleAddNote = async () => {
    if (!selectedApp || !recruiterNoteText.trim()) return;
    try {
      const res = await api.addRecruiterNote(selectedApp.id, recruiterNoteText);
      setSelectedApp(res.application);
      setApplications((prev) => prev.map((a) => (a.id === selectedApp.id ? res.application : a)));
      setRecruiterNoteText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createJob({
        title: newJobData.title,
        department: newJobData.department,
        type: newJobData.type,
        location: newJobData.location,
        workplaceType: 'Remote',
        salaryRange: newJobData.salaryRange,
        experienceLevel: newJobData.experienceLevel,
        summary: newJobData.summary,
        responsibilities: newJobData.responsibilities.split('\n').filter(Boolean),
        requirements: newJobData.requirements.split('\n').filter(Boolean),
        skills: newJobData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        benefits: ['401(k) 5% Match', 'Comprehensive Health/Dental', 'Annual Hardware Stipend', 'Unlimited PTO'],
        status: 'published',
      });
      setJobs((prev) => [created.job, ...prev]);
      setNewJobModalOpen(false);
      setNewJobData({
        title: '',
        department: 'Cloud & Infrastructure',
        type: 'Full-time',
        location: 'Remote (US/Canada)',
        salaryRange: '$180,000 - $220,000',
        experienceLevel: 'Senior / Staff',
        summary: '',
        responsibilities: 'Architect distributed systems\nLead technical design reviews',
        requirements: '7+ years production cloud engineering\nDeep experience with AWS/K8s',
        skills: 'AWS, Kubernetes, Terraform, Go',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.scheduleInterview(scheduleData);
      setInterviews((prev) => [res.interview, ...prev]);
      setScheduleModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScorecardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInterviewForScorecard) return;
    try {
      await api.submitInterviewFeedback(activeInterviewForScorecard.id, scorecardData as any);
      setScorecardModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    if (selectedJobFilter && app.jobId !== selectedJobFilter) return false;
    if (selectedStageFilter && app.status !== selectedStageFilter) return false;
    return true;
  });

  const openScheduleForApp = (app: Application) => {
    setScheduleData({
      candidateName: app.candidateName,
      candidateId: app.candidateId,
      applicationId: app.id,
      jobId: app.jobId,
      jobTitle: app.jobTitle || 'Technical Role',
      scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
      durationMinutes: 60,
      round: 'Technical Deep Dive',
      interviewerName: currentUser?.name || 'David Sterling',
      interviewerTitle: 'CTO / Engineering Lead',
      meetingUrl: 'https://meet.codeologyai.com/interview-' + Math.floor(Math.random() * 9000 + 1000),
      prepNotes: 'Evaluate system design and operational war stories.',
    });
    setScheduleModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Recruiter Workspace Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="warning" size="sm">RECRUITER ATS WORKSPACE</Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-500">
                Active Recruiter: {currentUser?.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Talent Pipeline & Candidate Screening
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage requisitions, evaluate AI fit heuristics, stage candidates across the 9-stage pipeline, and schedule technical rounds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewJobModalOpen(true)}
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Post New Requisition
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('pipeline')}
            >
              View Active Pipelines ({(applications || []).length})
            </Button>
          </div>
        </div>

        {/* Metric Quick Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Active Requisitions</div>
            <div className="text-2xl font-bold font-mono text-slate-950 mt-1">{(jobs || []).length}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">8 Published Globally</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Total In Pipeline</div>
            <div className="text-2xl font-bold font-mono text-sky-700 mt-1">{(applications || []).length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Across 9 Verified Stages</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Scheduled Interviews</div>
            <div className="text-2xl font-bold font-mono text-slate-950 mt-1">{(interviews || []).length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Upcoming technical loops</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Median Time to Hire</div>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">14 Days</div>
            <div className="text-[11px] text-slate-500 mt-0.5">94% Offer Acceptance</div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
          tabs={[
            { id: 'pipeline', label: 'Candidate Pipeline', count: applications.length },
            { id: 'requisitions', label: 'Active Requisitions', count: jobs.length },
            { id: 'interviews', label: 'Interviews & Scorecards', count: interviews.length },
            { id: 'analytics', label: 'Pipeline Analytics' },
          ]}
        />

        {/* TAB 1: CANDIDATE PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-700 font-mono">FILTERS:</span>
                <select
                  value={selectedJobFilter}
                  onChange={(e) => setSelectedJobFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md"
                >
                  <option value="">All Requisitions</option>
                  {(jobs || []).map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStageFilter}
                  onChange={(e) => setSelectedStageFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md"
                >
                  <option value="">All Pipeline Stages</option>
                  {(STAGE_OPTIONS || []).map((st) => (
                    <option key={st} value={st}>
                      Stage: {st}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-slate-500 font-mono">
                Showing {(filteredApplications || []).length} candidates
              </span>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Candidate</th>
                      <th className="px-5 py-3.5">Requisition</th>
                      <th className="px-5 py-3.5">AI Fit Score</th>
                      <th className="px-5 py-3.5">Current Stage</th>
                      <th className="px-5 py-3.5">Quick Advance</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(filteredApplications || []).map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{app.candidateName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{app.candidateEmail}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">{app.jobTitle}</div>
                          <div className="text-[11px] text-slate-400 font-mono">ID: {app.jobId}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold font-mono text-sky-700">
                              {app.aiMatchScore}%
                            </span>
                            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                          </div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                            {app.aiMatchRationale}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            variant={
                              app.status === 'Hired'
                                ? 'success'
                                : app.status === 'Rejected'
                                ? 'error'
                                : app.status === 'Interview'
                                ? 'info'
                                : 'default'
                            }
                            size="sm"
                          >
                            {app.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleAdvanceStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 font-medium focus:ring-1 focus:ring-sky-600"
                          >
                            {STAGE_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedApp(app);
                              setAppModalOpen(true);
                            }}
                            className="text-sky-700 hover:text-sky-900 font-semibold text-xs underline cursor-pointer"
                          >
                            Dossier
                          </button>
                          <button
                            type="button"
                            onClick={() => openScheduleForApp(app)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold cursor-pointer"
                          >
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE REQUISITIONS */}
        {activeTab === 'requisitions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Manage Open Requisitions</h3>
              <Button size="sm" variant="primary" onClick={() => setNewJobModalOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Create Requisition
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(jobs || []).map((job) => (
                <Card key={job.id} variant="bordered" className="p-5 bg-white space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
                        {job.department}
                      </span>
                      <h4 className="text-base font-bold text-slate-950 mt-0.5">{job.title}</h4>
                      <div className="text-xs text-slate-500 font-mono mt-1">
                        {job.location} • {job.salaryRange}
                      </div>
                    </div>
                    <Badge variant={job.status === 'published' ? 'success' : 'neutral'} size="sm">
                      {job.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{job.summary}</p>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono">{job.viewsCount} candidate views</span>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/jobs/${job.slug}`)}
                      className="text-sky-700 hover:underline font-semibold flex items-center"
                    >
                      View Live Posting <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEWS & SCORECARDS */}
        {activeTab === 'interviews' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-950">Technical Interviews & Panels</h3>
              <Button size="sm" variant="primary" onClick={() => setScheduleModalOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Schedule New Round
              </Button>
            </div>

            <div className="space-y-4">
              {(interviews || []).map((intv) => (
                <Card key={intv.id} variant="bordered" className="p-6 bg-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <Badge variant="info" size="sm">Round: {intv.round}</Badge>
                        <span className="text-slate-500">Candidate: <strong className="text-slate-900">{intv.candidateName}</strong></span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-950 mt-1">
                        {intv.jobTitle}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Interviewer: {intv.interviewerName} ({intv.interviewerTitle})
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-sm font-bold font-mono text-slate-900">
                        {new Date(intv.scheduledAt).toLocaleDateString()} at{' '}
                        {new Date(intv.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <Badge variant={intv.status === 'Completed' ? 'neutral' : 'success'} size="sm">
                        {intv.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-sky-800 font-mono flex items-center">
                      <Video className="w-4 h-4 mr-1.5 text-sky-600" />
                      {intv.meetingUrl}
                    </span>

                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActiveInterviewForScorecard(intv);
                          setScorecardModalOpen(true);
                        }}
                      >
                        <Award className="w-3.5 h-3.5 mr-1 text-sky-600" /> Submit Interview Scorecard
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECRUITMENT PIPELINE ANALYTICS */}
        {activeTab === 'analytics' && reports && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Funnel conversion bar chart */}
              <Card variant="bordered" className="p-6 bg-white space-y-4">
                <h3 className="text-base font-bold text-slate-950">Candidate Pipeline Funnel</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reports.funnelData}>
                      <XAxis dataKey="stage" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Requisitions by Department */}
              <Card variant="bordered" className="p-6 bg-white space-y-4">
                <h3 className="text-base font-bold text-slate-950">Requisitions by Practice</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reports.departmentData} layout="vertical">
                      <XAxis type="number" stroke="#64748b" fontSize={11} />
                      <YAxis dataKey="name" type="category" width={140} stroke="#64748b" fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0f172a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* CANDIDATE DOSSIER MODAL */}
      <Modal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        title={`Candidate Dossier: ${selectedApp?.candidateName}`}
        description={`Application for ${selectedApp?.jobTitle}`}
        maxWidth="2xl"
      >
        {selectedApp && (
          <div className="space-y-6 text-xs text-slate-800">
            {/* Quick Status Bar */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-slate-500 font-mono">Current Stage:</span>
                <span className="font-bold text-slate-900 ml-1.5 text-sm">{selectedApp.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-500 font-mono">Advance:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleAdvanceStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold text-xs"
                >
                  {STAGE_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Fit Analysis Box */}
            <div className="p-5 bg-slate-900 text-white rounded-lg space-y-3 font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-sky-400 font-bold">AI HEURISTIC FIT ANALYSIS</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {selectedApp.aiMatchScore}% FIT
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {selectedApp.aiMatchRationale}
              </p>

              {selectedApp?.aiKeyStrengths && Array.isArray(selectedApp.aiKeyStrengths) && selectedApp.aiKeyStrengths.length > 0 && (
                <div className="pt-1">
                  <span className="text-slate-400 block text-[11px] mb-1">KEY STRENGTHS:</span>
                  <ul className="space-y-1 text-slate-200 font-sans text-xs">
                    {(selectedApp.aiKeyStrengths || []).map((s, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Candidate Cover Note & Resume */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 font-mono uppercase tracking-wider">
                Candidate Statement
              </h4>
              <div className="p-4 bg-slate-50 rounded border border-slate-200 text-slate-700 italic">
                "{selectedApp?.coverNote || 'No custom statement provided.'}"
              </div>
            </div>

            {/* Recruiter Notes & History */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 font-mono uppercase tracking-wider">
                Recruiter Internal Notes
              </h4>
              <div className="space-y-2">
                {Array.isArray(selectedApp?.recruiterNotes) && selectedApp.recruiterNotes.length > 0 ? (
                  selectedApp.recruiterNotes.map((note, i) => (
                    <div key={i} className="p-2.5 bg-slate-100 rounded text-xs text-slate-700">
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="p-2.5 text-xs text-slate-400 italic">No notes posted yet.</div>
                )}
              </div>

              <div className="flex space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="Add evaluation note..."
                  value={recruiterNoteText}
                  onChange={(e) => setRecruiterNoteText(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
                <Button size="sm" variant="primary" onClick={handleAddNote}>
                  Post Note
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAppModalOpen(false)}
              >
                Close Dossier
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setAppModalOpen(false);
                  openScheduleForApp(selectedApp);
                }}
              >
                Schedule Technical Interview Round →
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* SCHEDULE INTERVIEW MODAL */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Technical Interview"
        description="Book interview slot, assign interviewer, and create calendar invite"
        maxWidth="lg"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
          <Input
            label="Candidate Name"
            value={scheduleData.candidateName}
            onChange={(e) => setScheduleData({ ...scheduleData, candidateName: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Interview Round"
              value={scheduleData.round}
              onChange={(e) => setScheduleData({ ...scheduleData, round: e.target.value })}
            />
            <Input
              label="Duration (Minutes)"
              type="number"
              value={scheduleData.durationMinutes}
              onChange={(e) => setScheduleData({ ...scheduleData, durationMinutes: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Scheduled Date & Time"
              type="datetime-local"
              value={scheduleData.scheduledAt}
              onChange={(e) => setScheduleData({ ...scheduleData, scheduledAt: e.target.value })}
              required
            />
            <Input
              label="Assigned Interviewer"
              value={scheduleData.interviewerName}
              onChange={(e) => setScheduleData({ ...scheduleData, interviewerName: e.target.value })}
              required
            />
          </div>

          <Input
            label="Video Conference URL"
            value={scheduleData.meetingUrl}
            onChange={(e) => setScheduleData({ ...scheduleData, meetingUrl: e.target.value })}
          />

          <Textarea
            label="Preparation & Panel Notes"
            rows={3}
            value={scheduleData.prepNotes}
            onChange={(e) => setScheduleData({ ...scheduleData, prepNotes: e.target.value })}
          />

          <div className="pt-2 flex justify-end space-x-3">
            <Button variant="outline" size="sm" onClick={() => setScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm & Dispatch Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* POST NEW REQUISITION MODAL */}
      <Modal
        isOpen={newJobModalOpen}
        onClose={() => setNewJobModalOpen(false)}
        title="Create New Technical Requisition"
        description="Publish a verified engineering role to Codeology AI ATS"
        maxWidth="xl"
      >
        <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
          <Input
            label="Job Title"
            required
            placeholder="e.g. Senior Site Reliability Engineer (K8s)"
            value={newJobData.title}
            onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Department Practice"
              value={newJobData.department}
              onChange={(e) => setNewJobData({ ...newJobData, department: e.target.value })}
              options={[
                { value: 'Cloud & Infrastructure', label: 'Cloud & Infrastructure' },
                { value: 'Cybersecurity', label: 'Cybersecurity & Zero Trust' },
                { value: 'Software Engineering', label: 'Software Engineering' },
                { value: 'Data & AI Systems', label: 'Data & AI Systems' },
                { value: 'Managed Services', label: 'Managed Services & NOC' },
              ]}
            />
            <Select
              label="Employment Type"
              value={newJobData.type}
              onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value })}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Contract', label: 'Contract (Pod)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Salary Band / Comp (USD)"
              required
              placeholder="$180,000 - $220,000"
              value={newJobData.salaryRange}
              onChange={(e) => setNewJobData({ ...newJobData, salaryRange: e.target.value })}
            />
            <Input
              label="Experience Level"
              placeholder="Senior / Staff (6+ years)"
              value={newJobData.experienceLevel}
              onChange={(e) => setNewJobData({ ...newJobData, experienceLevel: e.target.value })}
            />
          </div>

          <Textarea
            label="Position Summary"
            required
            rows={2}
            value={newJobData.summary}
            onChange={(e) => setNewJobData({ ...newJobData, summary: e.target.value })}
          />

          <Textarea
            label="Responsibilities (One per line)"
            rows={3}
            value={newJobData.responsibilities}
            onChange={(e) => setNewJobData({ ...newJobData, responsibilities: e.target.value })}
          />

          <Textarea
            label="Technical Requirements (One per line)"
            rows={3}
            value={newJobData.requirements}
            onChange={(e) => setNewJobData({ ...newJobData, requirements: e.target.value })}
          />

          <Input
            label="Skills & Technologies (Comma-separated)"
            placeholder="AWS, Kubernetes, Terraform, Go"
            value={newJobData.skills}
            onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
          />

          <div className="pt-2 flex justify-end space-x-3">
            <Button variant="outline" size="sm" onClick={() => setNewJobModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Requisition to ATS
            </Button>
          </div>
        </form>
      </Modal>

      {/* INTERVIEW SCORECARD MODAL */}
      <Modal
        isOpen={scorecardModalOpen}
        onClose={() => setScorecardModalOpen(false)}
        title="Submit Interview Scorecard & Feedback"
        description={`Evaluation for ${activeInterviewForScorecard?.candidateName}`}
        maxWidth="lg"
      >
        <form onSubmit={handleScorecardSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input
              label="Technical (1-5)"
              type="number"
              min="1"
              max="5"
              value={scorecardData.technicalRating}
              onChange={(e) => setScorecardData({ ...scorecardData, technicalRating: Number(e.target.value) })}
            />
            <Input
              label="Problem Solving"
              type="number"
              min="1"
              max="5"
              value={scorecardData.problemSolvingRating}
              onChange={(e) => setScorecardData({ ...scorecardData, problemSolvingRating: Number(e.target.value) })}
            />
            <Input
              label="Communication"
              type="number"
              min="1"
              max="5"
              value={scorecardData.communicationRating}
              onChange={(e) => setScorecardData({ ...scorecardData, communicationRating: Number(e.target.value) })}
            />
            <Input
              label="Cultural Fit"
              type="number"
              min="1"
              max="5"
              value={scorecardData.culturalFitRating}
              onChange={(e) => setScorecardData({ ...scorecardData, culturalFitRating: Number(e.target.value) })}
            />
          </div>

          <Select
            label="Overall Recommendation"
            value={scorecardData.overallRecommendation}
            onChange={(e) => setScorecardData({ ...scorecardData, overallRecommendation: e.target.value })}
            options={[
              { value: 'Strong Hire', label: 'Strong Hire (Exceptional match)' },
              { value: 'Hire', label: 'Hire (Meets all technical bars)' },
              { value: 'Hold', label: 'Hold (Consider for other roles)' },
              { value: 'No Hire', label: 'No Hire' },
            ]}
          />

          <Textarea
            label="Candidate Strengths"
            rows={2}
            value={scorecardData.strengths}
            onChange={(e) => setScorecardData({ ...scorecardData, strengths: e.target.value })}
          />

          <Textarea
            label="Areas of Concern / Probes"
            rows={2}
            value={scorecardData.areasOfConcern}
            onChange={(e) => setScorecardData({ ...scorecardData, areasOfConcern: e.target.value })}
          />

          <Textarea
            label="Detailed Interviewer Comments"
            rows={3}
            value={scorecardData.detailedComments}
            onChange={(e) => setScorecardData({ ...scorecardData, detailedComments: e.target.value })}
          />

          <div className="pt-2 flex justify-end space-x-3">
            <Button variant="outline" size="sm" onClick={() => setScorecardModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Record Formal Scorecard
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
