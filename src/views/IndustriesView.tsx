import React, { useEffect } from 'react';
import {
  HeartPulse,
  Building2,
  Factory,
  ShoppingBag,
  GraduationCap,
  Laptop,
  Briefcase,
  Rocket,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { industriesContent } from '../content/industries';

interface IndustriesViewProps {
  onNavigate: (path: string) => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Industry Sectors & Regulatory Engineering | Codeology AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Industry-specific solutions designed for regulatory compliance, security, and mission-critical performance across healthcare, finance, manufacturing, and tech.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getSectorIcon = (slug: string) => {
    switch (slug) {
      case 'healthcare':
        return <HeartPulse className="w-6 h-6 text-sky-600" />;
      case 'financial-services':
        return <Building2 className="w-6 h-6 text-sky-600" />;
      case 'manufacturing':
        return <Factory className="w-6 h-6 text-sky-600" />;
      case 'retail-ecommerce':
        return <ShoppingBag className="w-6 h-6 text-sky-600" />;
      case 'education':
        return <GraduationCap className="w-6 h-6 text-sky-600" />;
      case 'technology':
        return <Laptop className="w-6 h-6 text-sky-600" />;
      case 'professional-services':
        return <Briefcase className="w-6 h-6 text-sky-600" />;
      case 'startups-smes':
        return <Rocket className="w-6 h-6 text-sky-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
    }
  };

  const industryFaqs = [
    {
      question: 'How does Codeology AI ensure regulatory compliance across different sectors?',
      answer: 'We design all architectures against validated compliance frameworks including HIPAA/HITECH, PCI-DSS Level 1, SOC 2 Type II, and ISO 27001, providing automated cryptographic audit logs and continuous policy enforcement.',
    },
    {
      question: 'Can Codeology AI work with air-gapped or on-premise industrial systems?',
      answer: 'Yes. Our systems engineers have extensive experience bridging air-gapped SCADA/PLC factory networks and on-premise clinical hospital infrastructure using secure unidirectional data diodes and authenticated edge brokers.',
    },
    {
      question: 'Do you provide industry-specific service level agreements (SLAs)?',
      answer: 'Yes. For high-volume financial services and healthcare clients, we provide enterprise MSAs guaranteeing sub-15 minute critical incident response and 99.999% availability targets.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Industries' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">
              REGULATED SECTORS & DOMAIN EXPERTISE
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Engineering for the World’s Most Demanding Sectors.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Industry-specific solutions designed for regulatory compliance, security, and mission-critical performance. We align systems architecture directly with the rigorous standards of your vertical.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Matrix (8 Sectors) */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              VERTICAL SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Dedicated Practice Verticals.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industriesContent.map((industry, index) => (
              <div
                key={industry.id}
                className="p-8 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        {getSectorIcon(industry.slug)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
                          SECTOR 0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-slate-950">{industry.name}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {industry.impactMetric} {industry.impactLabel}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <strong className="text-slate-900 block font-semibold">
                      Sector Challenge:
                    </strong>
                    <p>{industry.industryChallenge}</p>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <strong className="text-slate-900 block font-semibold">
                      Sample Deliverable:
                    </strong>
                    <p className="font-mono text-slate-700">{industry.sampleDeliverable}</p>
                  </div>

                  {/* Compliance Standards Badges */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-1.5 uppercase">
                      Compliance Standards Enforced:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.complianceStandards.map((std, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(`/industries/${industry.slug}`)}
                    className="w-full justify-between text-[#0047BA] hover:text-[#00358a] hover:bg-slate-50 border-slate-200"
                  >
                    <span>Explore {industry.name} Architecture</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Impact Numbers */}
      <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              QUANTIFIABLE MEASUREMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Cross-Sector Production Outcomes.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">99.999%</div>
              <div className="text-xs text-slate-400">Core Banking Uptime</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">100%</div>
              <div className="text-xs text-slate-400">HIPAA First-Pass Audits</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">40%+</div>
              <div className="text-xs text-slate-400">Industrial Downtime Cut</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">200k+</div>
              <div className="text-xs text-slate-400">Concurrent Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry FAQs */}
      <FAQAccordion
        items={industryFaqs}
        title="Industry Practices & Compliance FAQs"
        subtitle="Common questions regarding regulatory attestation, data privacy, and custom enterprise deployments."
      />

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Consult With an Industry Practice Lead.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discuss your vertical’s compliance parameters, uptime expectations, and systems architecture with our senior directors.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Request Sector Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/solutions')}
            >
              Explore Solutions Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
