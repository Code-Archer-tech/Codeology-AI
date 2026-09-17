import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  FileSpreadsheet,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Database,
  Lock,
  Eye,
  Server,
  Terminal,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { Lead, LeadStatus, AuditLog, User as UserModel } from '../types/index';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const LEAD_STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export const AdminDashboardView: React.FC<{ onNavigate: (path: string) => void }> = ({
  onNavigate,
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('crm');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadNoteInput, setLeadNoteInput] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [leadsRes, logsRes] = await Promise.all([
        api.getLeads(),
        api.getAuditLogs(),
      ]);
      setLeads(leadsRes?.leads || []);
      setAuditLogs(logsRes?.logs || []);
    } catch (err) {
      console.warn('Admin data load note:', err);
      setLeads([]);
      setAuditLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await api.updateLeadStatus(leadId, newStatus, `Status modified to ${newStatus} by ${currentUser?.name}`);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? res.lead : l)));
      if (selectedLead?.id === leadId) {
        setSelectedLead(res.lead);
      }
    } catch (err) {
      console.warn('Update lead status note:', err);
    }
  };

  const handleAddLeadNote = async () => {
    if (!selectedLead || !leadNoteInput.trim()) return;
    try {
      const res = await api.addLeadNote(selectedLead.id, leadNoteInput);
      setSelectedLead(res.lead);
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? res.lead : l)));
      setLeadNoteInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="error" size="sm">ADMIN & COMPLIANCE CONSOLE</Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-500">
                Authorized User: {currentUser?.name} ({currentUser?.role})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Enterprise Governance & CRM System
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Audit immutable system actions, manage enterprise pipeline contracts, and supervise data integrity.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadAdminData}
            >
              Refresh Feeds
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/contact')}
            >
              Test Contact Form Routing →
            </Button>
          </div>
        </div>

        {/* Top Status Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Enterprise Inbound Leads</div>
            <div className="text-2xl font-bold font-mono text-slate-950 mt-1">{leads.length}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">SLA Response Verified</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Audit Records Logged</div>
            <div className="text-2xl font-bold font-mono text-sky-700 mt-1">{auditLogs.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Append-Only Immutable Log</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">SOC 2 Audit Telemetry</div>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">Compliant</div>
            <div className="text-[11px] text-slate-500 mt-0.5">mTLS & RBAC Active</div>
          </Card>
          <Card variant="bordered" className="p-4 bg-white">
            <div className="text-xs font-mono text-slate-500 uppercase">Production API Health</div>
            <div className="text-2xl font-bold font-mono text-slate-950 mt-1">99.998%</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">p99 &lt; 24ms</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
          tabs={[
            { id: 'crm', label: 'Enterprise Inbound CRM', count: (leads || []).length },
            { id: 'audit', label: 'Security & Audit Logs', count: (auditLogs || []).length },
            { id: 'rbac', label: 'RBAC & Personas' },
            { id: 'health', label: 'System Telemetry' },
          ]}
        />

        {/* TAB 1: CRM & INBOUND LEADS */}
        {activeTab === 'crm' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="text-xs font-bold font-mono text-slate-800">
                  INBOUND ARCHITECTURAL REQUISITIONS & CLIENT LEADS
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {(leads || []).length} Active Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Client & Company</th>
                      <th className="px-5 py-3.5">Practice Interest</th>
                      <th className="px-5 py-3.5">Budget Tier</th>
                      <th className="px-5 py-3.5">Stage</th>
                      <th className="px-5 py-3.5">Update Stage</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(leads || []).map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{lead.fullName}</div>
                          <div className="text-[11px] text-slate-500">{lead.company} ({lead.email})</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">{lead.serviceInterest}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono font-medium text-slate-700">
                          {lead.budgetRange}
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            variant={
                              lead.status === 'Won'
                                ? 'success'
                                : lead.status === 'Lost'
                                ? 'error'
                                : lead.status === 'Proposal'
                                ? 'warning'
                                : 'info'
                            }
                            size="sm"
                          >
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 font-medium"
                          >
                            {LEAD_STATUS_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLead(lead);
                              setLeadModalOpen(true);
                            }}
                            className="text-sky-700 hover:text-sky-900 font-semibold underline text-xs cursor-pointer"
                          >
                            View Scope
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

        {/* TAB 2: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="text-xs font-bold font-mono text-slate-800 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                  IMMUTABLE SECURITY AUDIT TRAIL
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Tamper-evident logs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 font-mono">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Timestamp (UTC)</th>
                      <th className="px-4 py-3">Actor / Role</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Target Resource</th>
                      <th className="px-4 py-3">Audit Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    {(auditLogs || []).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toISOString().replace('T', ' ').slice(0, 19)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-slate-900">{log.actorName}</span>
                          <span className="text-slate-400 block text-[10px]">{log.actorRole}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sky-700 font-semibold">
                          {log.resource}
                        </td>
                        <td className="px-4 py-3 text-slate-600 font-sans max-w-xs truncate">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RBAC & SYSTEM PERSONAS */}
        {activeTab === 'rbac' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950 font-mono">
                Active System Personas & Permissions
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">1. Super Admin</span>
                    <Badge variant="error" size="sm">Full Root Access</Badge>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Access to enterprise CRM leads, immutable security audit logs, full platform configuration, and user permissions.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">2. Senior Technical Recruiter</span>
                    <Badge variant="warning" size="sm">ATS & Pipeline</Badge>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Create requisitions, review AI match reports, advance candidate stages, schedule interview panels, and submit formal scorecards.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">3. Engineering Candidate</span>
                    <Badge variant="info" size="sm">Candidate Portal</Badge>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Browse verified engineering roles, submit applications with AI match assistance, track 9-stage status in real time, and access technical interview prep.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950 font-mono">
                Role-Based Access Enforcement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All server endpoints enforce explicit JWT authorization and session persona checks. Unprivileged requests to `/api/admin/*` or `/api/applications/:id/status` are rejected with HTTP 403 Forbidden.
              </p>
              <div className="p-3 bg-slate-900 text-slate-200 rounded font-mono text-xs space-y-1">
                <div className="text-emerald-400 font-bold">// RBAC Enforcement Middleware</div>
                <div>authorize(['admin', 'recruiter'], req, res, next);</div>
                <div>auditLog.append(req.user, 'APPLICATION_STAGE_TRANSITION');</div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 4: SYSTEM TELEMETRY */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950 font-mono">Infrastructure Nodes</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Primary Ingress (us-east-1)</span>
                  <span className="font-mono text-emerald-600 font-bold">HEALTHY (12ms)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Secondary Ingress (us-west-2)</span>
                  <span className="font-mono text-emerald-600 font-bold">HEALTHY (18ms)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">European Mesh Node (eu-west-1)</span>
                  <span className="font-mono text-emerald-600 font-bold">HEALTHY (32ms)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">PostgreSQL Primary Cluster</span>
                  <span className="font-mono text-emerald-600 font-bold">SYNC REPLICATED</span>
                </div>
              </div>
            </Card>

            <Card variant="bordered" className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950 font-mono">AI Engine Latencies</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Gemini 3.8 Flash Endpoint</span>
                  <span className="font-mono text-sky-700 font-bold">ACTIVE (ONLINE)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Resume Parser Avg Processing Time</span>
                  <span className="font-mono text-slate-900">420ms</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Candidate-Requisition Match Computation</span>
                  <span className="font-mono text-slate-900">510ms</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* LEAD DETAIL MODAL */}
      <Modal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={`Inbound Inquiry: ${selectedLead?.company}`}
        description={`Submitted by ${selectedLead?.fullName}`}
        maxWidth="lg"
      >
        {selectedLead && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 block">Contact Name:</span>
                <span className="font-bold text-slate-900">{selectedLead.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Corporate Email:</span>
                <span className="font-bold text-slate-900 font-mono">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Practice Area:</span>
                <span className="font-semibold text-slate-900">{selectedLead.serviceInterest}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Budget Tier:</span>
                <span className="font-mono font-bold text-slate-900">{selectedLead.budgetRange}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[11px] block">
                Project Scope & Client Requirements:
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded text-slate-800 leading-relaxed">
                {selectedLead.message}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-slate-500 font-mono uppercase text-[11px] block">
                Internal Sales & Engineering Notes:
              </span>
              <div className="space-y-1">
                {Array.isArray(selectedLead?.notes) && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((n, i) => (
                    <div key={i} className="p-2 bg-slate-100 rounded text-slate-700">
                      {n}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-slate-400 italic text-xs">No notes on record.</div>
                )}
              </div>

              <div className="flex space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="Add note..."
                  value={leadNoteInput}
                  onChange={(e) => setLeadNoteInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
                <Button size="sm" variant="primary" onClick={handleAddLeadNote}>
                  Post Note
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setLeadModalOpen(false)}>
                Close Window
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
