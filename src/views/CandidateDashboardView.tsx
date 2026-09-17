import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Bookmark,
  ChevronRight,
  Video,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Application, ApplicationStatus, Job, Interview } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const PIPELINE_STAGES: ApplicationStatus[] = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Assessment',
  'Interview',
  'Final Review',
  'Offer',
  'Hired',
];

export const CandidateDashboardView: React.FC<{ onNavigate: (path: string) => void }> = ({
  onNavigate,
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidateData = async () => {
    setLoading(true);
    try {
      const [appRes, savedRes, intRes] = await Promise.all([
        api.getApplications(),
        api.getSavedJobs(),
        api.getInterviews(),
      ]);
      setApplications(appRes?.applications || []);
      setSavedJobs(savedRes?.jobs || []);
      setInterviews(intRes?.interviews || []);
    } catch (err) {
      console.error(err);
      setApplications([]);
      setSavedJobs([]);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, [currentUser]);

  const getStageIndex = (status: ApplicationStatus) => {
    if (status === 'Rejected') return -1;
    return PIPELINE_STAGES.indexOf(status);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Candidate Dashboard Top Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="info" size="sm">CANDIDATE PORTAL</Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-500">ID: {currentUser?.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-mono">
              Senior Cloud Infrastructure Architect • Elena.Rostova@example.com
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/candidate/profile')}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
              AI Resume & Profile
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/careers')}
            >
              Browse Open Roles →
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
          tabs={[
            { id: 'applications', label: 'My Applications', count: applications.length },
            { id: 'saved', label: 'Saved Jobs', count: savedJobs.length },
            { id: 'interviews', label: 'Scheduled Interviews', count: interviews.length },
          ]}
        />

        {/* Tab 1: Applications with 9-stage pipeline */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {loading ? (
              <div className="p-12 text-center text-slate-500 font-mono text-sm">
                Fetching candidate applications...
              </div>
            ) : (!applications || applications.length === 0) ? (
              <Card variant="bordered" className="p-12 text-center bg-white">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No active applications yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Browse our open enterprise requisitions and submit an application with automated AI match heuristics.
                </p>
                <Button variant="primary" size="sm" onClick={() => onNavigate('/careers')}>
                  Search Technical Requisitions
                </Button>
              </Card>
            ) : (
              (applications || []).map((app) => {
                const currentStageIdx = getStageIndex(app.status);
                const isRejected = app.status === 'Rejected';

                return (
                  <Card key={app.id} variant="bordered" className="p-6 bg-white space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-sky-700 uppercase">
                            APP ID: {app.id.toUpperCase()}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500">
                            Submitted on {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-950 mt-1">
                          {app.jobTitle || 'Technical Requisition Application'}
                        </h2>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            isRejected
                              ? 'error'
                              : app.status === 'Hired'
                              ? 'success'
                              : app.status === 'Offer'
                              ? 'warning'
                              : 'info'
                          }
                          size="md"
                        >
                          Status: {app.status}
                        </Badge>
                      </div>
                    </div>

                    {/* 9-Stage Visual Pipeline Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-500">
                        <span>PIPELINE PROGRESSION</span>
                        <span>
                          STAGE: <strong className="text-slate-900">{app.status}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-8 gap-1.5 pt-1">
                        {PIPELINE_STAGES.map((stage, idx) => {
                          const isPassed = !isRejected && currentStageIdx >= idx;
                          const isCurrent = !isRejected && currentStageIdx === idx;

                          return (
                            <div key={stage} className="flex flex-col space-y-1.5">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  isRejected
                                    ? 'bg-slate-200'
                                    : isCurrent
                                    ? 'bg-sky-600 ring-2 ring-sky-300'
                                    : isPassed
                                    ? 'bg-emerald-500'
                                    : 'bg-slate-200'
                                }`}
                              />
                              <span
                                className={`text-[10px] font-mono truncate ${
                                  isCurrent
                                    ? 'font-bold text-sky-800'
                                    : isPassed
                                    ? 'text-slate-700'
                                    : 'text-slate-400'
                                }`}
                                title={stage}
                              >
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Fit Analysis & Recruiter Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-semibold text-slate-800 flex items-center">
                            <Sparkles className="w-3.5 h-3.5 mr-1 text-sky-600" /> AI MATCH ESTIMATE
                          </span>
                          <span className="font-bold text-sky-700">{app.aiMatchScore}% FIT</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {app.aiMatchRationale ||
                            'High alignment with requisition requirements. Strong cloud infrastructure foundation.'}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                        <span className="font-semibold text-slate-800 font-mono block">
                          RECRUITER AUDIT LOG & NOTES
                        </span>
                        {Array.isArray(app.recruiterNotes) && app.recruiterNotes.length > 0 ? (
                          <div className="space-y-1">
                            {app.recruiterNotes.map((note, i) => (
                              <p key={i} className="text-slate-600 italic">
                                "{note}"
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">
                            Initial application queued for talent partner technical triage.
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Saved Jobs */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {(!savedJobs || savedJobs.length === 0) ? (
              <Card variant="bordered" className="p-12 text-center bg-white">
                <Bookmark className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No saved jobs</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Bookmark roles while browsing careers to review and apply later.
                </p>
                <Button variant="outline" size="sm" onClick={() => onNavigate('/careers')}>
                  Explore Careers
                </Button>
              </Card>
            ) : (
              (savedJobs || []).map((job) => (
                <Card key={job.id} variant="bordered" className="p-5 bg-white flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono text-sky-700 font-semibold uppercase">
                      {job.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mt-0.5">{job.title}</h3>
                    <div className="text-xs text-slate-500 font-mono mt-1">
                      {job.location} • {job.salaryRange} • {job.type}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onNavigate(`/jobs/${job.slug}`)}
                  >
                    View & Apply
                  </Button>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Scheduled Interviews */}
        {activeTab === 'interviews' && (
          <div className="space-y-4">
            {(!interviews || interviews.length === 0) ? (
              <Card variant="bordered" className="p-12 text-center bg-white">
                <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No interviews scheduled yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  When your application advances to the Interview stage, meeting links and technical interview preparation guidelines will appear here.
                </p>
              </Card>
            ) : (
              (interviews || []).map((intv) => (
                <Card key={intv.id} variant="bordered" className="p-6 bg-white space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="info" size="sm">Round: {intv.round}</Badge>
                        <span className="text-xs text-slate-500 font-mono">
                          Duration: {intv.durationMinutes} mins
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 mt-1">
                        Technical Interview with {intv.interviewerName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Interviewer Title: {intv.interviewerTitle}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-slate-900">
                        {new Date(intv.scheduledAt).toLocaleDateString()} at{' '}
                        {new Date(intv.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <Badge variant="success" size="sm" className="mt-1">
                        Status: {intv.status}
                      </Badge>
                    </div>
                  </div>

                  {intv.meetingUrl && (
                    <div className="p-3 bg-sky-50 rounded border border-sky-200 flex items-center justify-between text-xs">
                      <span className="text-sky-900 font-mono font-medium flex items-center">
                        <Video className="w-4 h-4 mr-2 text-sky-700" />
                        Video Conference: {intv.meetingUrl}
                      </span>
                      <a
                        href={intv.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-sky-600 text-white rounded font-semibold hover:bg-sky-700"
                      >
                        Join Call
                      </a>
                    </div>
                  )}

                  {intv.prepNotes && (
                    <div className="p-3 bg-slate-50 rounded text-xs text-slate-700">
                      <strong className="text-slate-900 block font-mono mb-0.5">Preparation Notes:</strong>
                      {intv.prepNotes}
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
