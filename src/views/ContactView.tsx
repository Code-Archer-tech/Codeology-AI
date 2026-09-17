import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { api } from '../lib/api';

export const ContactView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '51-200',
    serviceInterest: 'Cloud & DevOps Engineering',
    timeline: '1-3 months',
    budgetRange: '$50K - $100K',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact Codeology AI | Enterprise Technical Consultation';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Let's build something extraordinary together. Connect with Codeology AI infrastructure leads and talent directors. Guaranteed response within 2 business hours."
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('Please consent to the processing of your technical inquiry under NDA.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.submitLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        companySize: formData.companySize,
        serviceInterest: formData.serviceInterest,
        budgetRange: formData.budgetRange,
        message: `[Timeline: ${formData.timeline}] ${formData.message}`,
      });

      const returnedId = (res as any)?.leadId || (res as any)?.lead?.id || `CA-LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedLeadId(returnedId);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFaqs = [
    {
      question: 'How quickly will an architect respond to my inquiry?',
      answer: 'All inbound submissions are reviewed by our senior practice directors. You will receive a direct technical response and meeting invitation within 2 business hours.',
    },
    {
      question: 'Do you execute mutual non-disclosure agreements (NDAs) prior to discovery?',
      answer: 'Yes. All project inquiries and discovery sessions are governed under strict mutual confidentiality. We are happy to execute your corporate NDA or provide our standard enterprise agreement.',
    },
    {
      question: 'What information should I have ready for the initial technical call?',
      answer: 'An overview of your current cloud or infrastructure footprint, target completion timelines, key compliance requirements (e.g., SOC 2, HIPAA), and current engineering team composition.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">ENTERPRISE TECHNICAL DISCOVERY</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Let’s Build Something Extraordinary Together.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tell us about your technical challenge, infrastructure goals, or hiring needs. Our senior team is ready to conduct a thorough architectural discovery under strict mutual NDA.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Form & Sidebar */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              {submittedLeadId ? (
                <div className="p-8 sm:p-10 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-5 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    Inquiry Confirmed & Routed to Practice Lead
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding{' '}
                    <strong>{formData.serviceInterest}</strong> has been authenticated and registered in our enterprise CRM system.
                  </p>

                  <div className="p-4 bg-white rounded-xl border border-emerald-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Official Tracking Reference:</span>
                      <strong className="text-sky-800 text-sm font-bold">{submittedLeadId}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Response SLA Commitment:</span>
                      <span className="text-emerald-700 font-semibold">&lt; 2 Business Hours</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    A calendar invitation and encrypted preliminary questionnaire have been dispatched to{' '}
                    <strong>{formData.email}</strong>.
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmittedLeadId(null);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          company: '',
                          companySize: '51-200',
                          serviceInterest: 'Cloud & DevOps Engineering',
                          timeline: '1-3 months',
                          budgetRange: '$50K - $100K',
                          message: '',
                          consent: false,
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-950">Technical Discovery Request</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct consultation with practicing infrastructure architects and talent directors.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input
                      label="Work Email *"
                      type="email"
                      required
                      placeholder="e.g. alex@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Company / Organization"
                      placeholder="e.g. Meridian Financial Group"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    <Input
                      label="Phone Number (Optional)"
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Primary Practice Interest *"
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      options={[
                        { value: 'IT Infrastructure & Operations', label: 'IT Infrastructure & Operations' },
                        { value: 'Cloud & DevOps Engineering', label: 'Cloud & DevOps Engineering' },
                        { value: 'Enterprise Cybersecurity & Zero Trust', label: 'Enterprise Cybersecurity & Zero Trust' },
                        { value: 'Custom Enterprise Software Engineering', label: 'Custom Enterprise Software Engineering' },
                        { value: 'Enterprise Digital Transformation', label: 'Enterprise Digital Transformation' },
                        { value: 'Digital Marketing & Growth Architecture', label: 'Digital Marketing & Growth Architecture' },
                        { value: 'Technical Recruitment & Staffing', label: 'Technical Recruitment & Staffing' },
                        { value: 'Enterprise AI & Machine Learning Solutions', label: 'Enterprise AI & Machine Learning Solutions' },
                      ]}
                    />

                    <Select
                      label="Organization Size"
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      options={[
                        { value: '1-50', label: '1 - 50 Employees (Early / Growth)' },
                        { value: '51-200', label: '51 - 200 Employees (Mid-Market)' },
                        { value: '201-1000', label: '201 - 1,000 Employees (Enterprise)' },
                        { value: '1000+', label: '1,000+ Employees (Global Scale)' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Target Project Timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      options={[
                        { value: 'Immediate', label: 'Immediate (< 30 Days)' },
                        { value: '1-3 months', label: '1 - 3 Months' },
                        { value: '3-6 months', label: '3 - 6 Months' },
                        { value: 'Exploring', label: 'Exploring / Annual Planning' },
                      ]}
                    />

                    <Select
                      label="Estimated Budget Scope"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      options={[
                        { value: '<$25K', label: 'Under $25,000' },
                        { value: '$25K - $50K', label: '$25,000 - $50,000' },
                        { value: '$50K - $100K', label: '$50,000 - $100,000' },
                        { value: '$100K - $250K', label: '$100,000 - $250,000' },
                        { value: '$250K+', label: '$250,000+ (Multi-Year / Enterprise)' },
                      ]}
                    />
                  </div>

                  <Textarea
                    label="Technical Scope & Challenge Description *"
                    rows={4}
                    required
                    placeholder="Describe your current systems landscape, throughput requirements, cloud providers, or talent requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {/* Consent checkbox */}
                  <label className="flex items-start space-x-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0047BA] focus:ring-[#0047BA]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree that Codeology AI may process my contact details to evaluate this technical inquiry. All submissions are governed under mutual confidentiality and our enterprise privacy policy.
                    </span>
                  </label>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#0047BA] hover:bg-[#00358a] text-white"
                    >
                      {isSubmitting ? 'Authenticating & Submitting Scope...' : 'Submit Technical Scope →'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Response SLA Box */}
              <div className="p-6 rounded-xl border border-sky-200 bg-sky-50/70 space-y-2">
                <div className="flex items-center space-x-2 text-[#0047BA]">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    TWO-HOUR RESPONSE SLA
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Enterprise inquiries are dispatched directly to practicing practice leads. We do not pass you to junior business development reps.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                  DIRECT CONTACT CHANNELS
                </span>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Technical Inquiries:</span>
                      <a
                        href="mailto:contact@codeologyai.com"
                        className="font-mono text-slate-900 font-semibold hover:underline"
                      >
                        contact@codeologyai.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Direct Operations Desk:</span>
                      <a
                        href="tel:+18005550199"
                        className="font-mono text-slate-900 font-semibold hover:underline"
                      >
                        +1 (800) 555-0199
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Security & Responsible Disclosure:</span>
                      <span className="font-mono text-slate-900">security@codeologyai.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                  REGIONAL HUBS
                </span>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>San Francisco (Headquarters)</span>
                      <span className="font-mono text-sky-800">PST</span>
                    </div>
                    <div className="text-slate-500">100 Pine Street, Suite 2400, San Francisco, CA</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>London (EMEA Operations)</span>
                      <span className="font-mono text-sky-800">GMT</span>
                    </div>
                    <div className="text-slate-500">25 Bank Street, Canary Wharf, London, UK</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Zurich (Security Practice)</span>
                      <span className="font-mono text-sky-800">CET</span>
                    </div>
                    <div className="text-slate-500">Bleicherweg 10, 8002 Zürich, Switzerland</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Singapore (APAC NOC)</span>
                      <span className="font-mono text-sky-800">SGT</span>
                    </div>
                    <div className="text-slate-500">1 Marina Boulevard, #28-00, Singapore</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact FAQs */}
      <FAQAccordion
        items={contactFaqs}
        title="Engagement & Discovery FAQs"
        subtitle="Common questions about our preliminary scoping, NDAs, and project kickoffs."
      />
    </div>
  );
};
