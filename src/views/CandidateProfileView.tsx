import React, { useState, useEffect } from 'react';
import {
  User,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload,
  Plus,
  X,
  ShieldCheck,
  Save,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { CandidateProfile } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const CandidateProfileView: React.FC<{ onNavigate: (path: string) => void }> = ({
  onNavigate,
}) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // AI Resume Assistant State
  const [resumeText, setResumeText] = useState('');
  const [analyzingAi, setAnalyzingAi] = useState(false);
  const [aiResult, setAiResult] = useState<{
    extractedSkills: string[];
    suggestedHeadline: string;
    professionalSummary: string;
    completenessFeedback: string[];
    recommendedImprovements: string[];
  } | null>(null);
  const [newSkillInput, setNewSkillInput] = useState('');

  useEffect(() => {
    api.getCandidateProfile().then((res) => {
      setProfile(res?.profile || null);
      if (res?.profile?.resumeText) {
        setResumeText(res.profile.resumeText);
      }
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const res = await api.updateCandidateProfile(profile);
      setProfile(res.profile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('Profile save note:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAiAnalyzeResume = async () => {
    if (!resumeText.trim()) return;
    setAnalyzingAi(true);
    try {
      const res = await api.uploadResumeText('Elena_Rostova_Cloud_Arch_2026.txt', resumeText);
      setProfile(res.profile);
      setAiResult(res.aiAnalysis);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('AI analysis note:', err);
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!newSkillInput.trim() || !profile) return;
    if (!profile.skills.includes(newSkillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkillInput.trim()],
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  if (loading || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-mono text-sm">
        Loading candidate profile & skill registry...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="info" size="sm">CANDIDATE REGISTRY</Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-500">
                Completeness: {profile.completenessScore}%
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Candidate Profile & AI Resume Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage your engineering credentials, ATS visibility, and AI-assisted skill extraction.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/candidate/dashboard')}
            >
              ← Back to Dashboard
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleProfileSave}
              isLoading={saving}
            >
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
            Profile and skills successfully synchronized with Codeology AI ATS.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: AI Resume Assistant & Skills */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Resume Assistant Box */}
            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-sky-100 flex items-center justify-center text-sky-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">
                      AI Resume Assistant & Skill Extractor
                    </h3>
                    <p className="text-xs text-slate-500">
                      Powered by Gemini server-side AI • Extracts verified skills & recommendations
                    </p>
                  </div>
                </div>
                <Badge variant="info" size="sm">Gemini 3.8 Flash</Badge>
              </div>

              <Textarea
                label="Resume Plaintext Content"
                rows={7}
                placeholder="Paste your engineering resume, career achievements, cloud certifications, or project descriptions here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-slate-500">
                  Ethical AI notice: AI suggestions are advisory to highlight technical strengths.
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAiAnalyzeResume}
                  isLoading={analyzingAi}
                  disabled={!resumeText.trim()}
                  className="w-full sm:w-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                  Extract Skills & Analyze Profile
                </Button>
              </div>

              {/* AI Analysis Feedback Presentation */}
              {aiResult && (
                <div className="mt-4 p-5 bg-slate-900 text-white rounded-lg space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-sky-400 font-bold">GEMINI EXTRACTION REPORT</span>
                    <span className="text-emerald-400">STATUS: PROCESSED</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">SUGGESTED ATS HEADLINE:</span>
                    <p className="text-white font-sans text-xs mt-0.5 font-semibold">
                      {aiResult.suggestedHeadline}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">EXECUTIVE SUMMARY:</span>
                    <p className="text-slate-300 font-sans text-xs mt-0.5 leading-relaxed">
                      {aiResult.professionalSummary}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">EXTRACTED SKILLS ({(aiResult.extractedSkills || []).length}):</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(aiResult.extractedSkills || []).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-800 text-sky-300 rounded border border-slate-700 text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {aiResult.recommendedImprovements && aiResult.recommendedImprovements.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-amber-400 block text-[11px] mb-1">RECOMMENDED PROFILE IMPROVEMENTS:</span>
                      <ul className="space-y-1 text-slate-300 font-sans text-xs">
                        {(aiResult.recommendedImprovements || []).map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-amber-400 mr-1.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Verified Skills Management */}
            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Verified Technical Competencies & Skills
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  These competencies are matched against technical requisition requirements.
                </p>
              </div>

              {/* Add skill input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g., Kubernetes, Terraform, Go, Kafka)..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="flex-1 px-3.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-sky-600"
                />
                <Button size="sm" variant="outline" onClick={handleAddSkill}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(profile.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-mono border border-slate-200"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 text-slate-400 hover:text-rose-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Profile Core Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950 pb-2 border-b border-slate-100">
                General Profile Details
              </h3>

              <div className="space-y-4 text-xs">
                <Input
                  label="Professional ATS Headline"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Primary Location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                  <Input
                    label="Years of Experience"
                    type="number"
                    value={profile.yearsOfExperience}
                    onChange={(e) => setProfile({ ...profile, yearsOfExperience: Number(e.target.value) })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expected Comp (USD)"
                    value={profile.expectedSalary}
                    onChange={(e) => setProfile({ ...profile, expectedSalary: e.target.value })}
                  />
                  <Input
                    label="Notice Period"
                    value={profile.noticePeriod}
                    onChange={(e) => setProfile({ ...profile, noticePeriod: e.target.value })}
                  />
                </div>

                <Select
                  label="Current Availability Status"
                  value={profile.availabilityStatus}
                  onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value as any })}
                  options={[
                    { value: 'Actively Looking', label: 'Actively Looking (Available Now)' },
                    { value: 'Open to Offers', label: 'Open to Offers (Casual)' },
                    { value: 'Interviewing', label: 'Currently In Active Loops' },
                    { value: 'Employed', label: 'Employed / Off Market' },
                  ]}
                />

                <Textarea
                  label="Executive Bio & Systems Background"
                  rows={4}
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                />

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleProfileSave}
                    isLoading={saving}
                  >
                    Save & Update Registry
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
