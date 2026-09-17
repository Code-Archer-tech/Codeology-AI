import React, { useState, useEffect } from 'react';
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Job } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const CareersView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [type, setType] = useState('');
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.getJobs({
        search: search || undefined,
        department: department || undefined,
        type: type || undefined,
      });
      setJobs(res?.jobs || []);

      if (currentUser?.role === 'candidate') {
        const savedRes = await api.getSavedJobs();
        const ids = new Set((savedRes?.savedJobs || []).map((s: any) => s.jobId));
        setSavedJobIds(ids);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [department, type]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleToggleSave = async (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    try {
      const res = await api.toggleSaveJob(jobId);
      setSavedJobIds((prev) => {
        const next = new Set(prev);
        if (res.isSaved) next.add(jobId);
        else next.delete(jobId);
        return next;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Cloud & Infrastructure', label: 'Cloud & Infrastructure' },
    { value: 'Cybersecurity', label: 'Cybersecurity & Zero Trust' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Data & AI Systems', label: 'Data & AI Systems' },
    { value: 'Managed Services', label: 'Managed Services & NOC' },
    { value: 'Talent & Operations', label: 'Talent & Operations' },
  ];

  return (
    <div className="bg-white">
      {/* Careers Banner */}
      <section className="py-16 lg:py-20 border-b border-slate-200 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950 border border-sky-800 text-xs font-mono text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT TALENT NETWORK // ZERO AGENCY THIRD-PARTY MARKUPS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Technical Requisitions & Engineering Careers.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Explore verified engineering roles at Codeology AI and embedded client teams. Every requisition features transparent salary bands, direct hiring manager visibility, and interview feedback guarantees.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 p-6 rounded-xl border border-slate-700 space-y-3 font-mono text-xs">
              <div className="text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-700">
                CANDIDATE ADVANTAGES
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                  <span>Transparent Salary Bands Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                  <span>Real-Time 9-Stage Application Pipeline</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                  <span>AI Resume Assistant & Skill Extraction</span>
                </div>
              </div>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-slate-900 border-slate-600 text-slate-200 hover:bg-slate-750"
                  onClick={() => onNavigate('/candidate/profile')}
                >
                  Optimize Resume with AI Assistant →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search job title, skills (e.g. AWS, Kubernetes, TypeScript)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-sky-600"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-sky-600"
              >
                {departments.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-sky-600"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="primary" className="w-full">
                Filter Requisitions
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-slate-700 font-mono">
              Showing {jobs.length} Verified Position{jobs.length === 1 ? '' : 's'}
            </span>
            <button
              onClick={() => onNavigate('/candidate/dashboard')}
              className="text-xs text-sky-700 hover:text-sky-900 font-semibold underline"
            >
              Go to My Candidate Dashboard ({currentUser?.name}) →
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500 font-mono text-sm">
              Loading active requisitions from ATS...
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-16 text-center bg-slate-50 rounded-lg border border-slate-200">
              <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold">No positions matched your criteria.</p>
              <p className="text-xs text-slate-500 mt-1">Try broadening your search query or department filter.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch('');
                  setDepartment('');
                  setType('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {(jobs || []).map((job) => {
                const isSaved = savedJobIds.has(job.id);
                return (
                  <Card
                    key={job.id}
                    variant="bordered"
                    className="p-6 hover:border-slate-400 transition-all cursor-pointer group"
                    onClick={() => onNavigate(`/jobs/${job.slug}`)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Role Details */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono font-semibold text-sky-700 uppercase">
                            {job.department}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 font-mono">{job.experienceLevel}</span>
                          <span className="text-slate-300">•</span>
                          <Badge variant={job.type === 'Full-time' ? 'success' : 'info'} size="sm">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" size="sm">
                            {job.workplaceType}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-slate-950 group-hover:text-sky-700 transition-colors">
                          {job.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 max-w-3xl">
                          {job.summary}
                        </p>

                        {/* Skills Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(job.skills || []).slice(0, 5).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono border border-slate-200/80"
                            >
                              {skill}
                            </span>
                          ))}
                          {(job.skills || []).length > 5 && (
                            <span className="text-[11px] text-slate-400 font-mono self-center">
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Compensation & Apply CTA */}
                      <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 shrink-0 gap-3">
                        <div className="text-left lg:text-right">
                          <div className="text-base font-bold font-mono text-slate-950">
                            {job.salaryRange}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center lg:justify-end mt-0.5">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={(e) => handleToggleSave(e, job.id)}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
                            aria-label={isSaved ? 'Unsave job' : 'Save job'}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 text-sky-600" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          <Button
                            size="sm"
                            variant="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(`/jobs/${job.slug}`);
                            }}
                          >
                            View & Apply <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
