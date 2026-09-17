import React, { useEffect } from 'react';
import {
  Server,
  Cloud,
  ShieldCheck,
  Code2,
  Cpu,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { generalFaqs } from '../content/faqs';
import { solutionsContent } from '../content/solutions';

interface SolutionsViewProps {
  onNavigate: (path: string) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Enterprise Solutions & Technical Practices | Codeology AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Across infrastructure, cloud, security, software, data and talent, we engineer solutions that solve complex technical challenges.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'it-infrastructure':
        return <Server className="w-6 h-6 text-sky-600" />;
      case 'cloud':
      case 'cloud-devops':
        return <Cloud className="w-6 h-6 text-sky-600" />;
      case 'cybersecurity':
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      case 'software-development':
        return <Code2 className="w-6 h-6 text-sky-600" />;
      case 'digital-transformation':
        return <Cpu className="w-6 h-6 text-sky-600" />;
      case 'digital-marketing':
        return <TrendingUp className="w-6 h-6 text-sky-600" />;
      case 'recruitment':
      case 'recruitment-staffing':
        return <Users className="w-6 h-6 text-sky-600" />;
      case 'ai-solutions':
        return <Sparkles className="w-6 h-6 text-sky-600" />;
      default:
        return <Layers className="w-6 h-6 text-sky-600" />;
    }
  };

  const getSolutionHref = (slug: string) => {
    if (slug === 'cloud') return '/solutions/cloud-devops';
    if (slug === 'recruitment') return '/solutions/recruitment-staffing';
    return `/solutions/${slug}`;
  };

  const engagementModels = [
    {
      title: 'Dedicated Engineering Pods',
      subtitle: 'Autonomous technical teams',
      description: 'Cross-functional squads (architects, senior engineers, DevOps, QA) embedded directly to execute your product roadmap.',
      features: ['Dedicated monthly allocation', 'Direct Slack/Jira integration', 'Elastic capacity scaling'],
    },
    {
      title: 'Strategic Architecture Retainer',
      subtitle: 'Fractional CTO & Principal guidance',
      description: 'Continuous advisory for infrastructure governance, security threat audits, and technology evaluation.',
      features: ['Guaranteed priority response SLA', 'Quarterly architecture reviews', 'Executive escalation path'],
    },
    {
      title: 'Milestone-Based Fixed Scope',
      subtitle: 'Deterministic delivery timelines',
      description: 'Fixed-bid engagements with defined deliverables, acceptance tests, and strict production launch milestones.',
      features: ['Fixed budget certainty', 'Clear deliverable criteria', 'Post-launch warranty support'],
    },
    {
      title: 'Embedded Technical RPO',
      subtitle: 'Accelerated talent acquisition',
      description: 'Specialized talent sourcers and practicing engineering interviewers integrated into your hiring funnel.',
      features: ['14-day median time to hire', 'Rigorous technical vetting', 'Pre-screened candidate slate'],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Solutions' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">
              ENTERPRISE PRACTICES & ARCHITECTURES
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Solutions Built for Scale, Resilience and Impact.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Across infrastructure, cloud, security, software, data and talent, we engineer solutions that solve complex technical challenges. Every practice is staffed by senior practitioners with deep production pedigree.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Directory (8 Practices) */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              THE PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Eight Specialized Engineering Practices.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionsContent.map((service, index) => (
              <div
                key={service.slug}
                className="p-8 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        {getServiceIcon(service.slug)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
                          PRACTICE {service.number}
                        </span>
                        <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
                      </div>
                    </div>
                    {service.metricsPreview && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {service.metricsPreview}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-mono text-slate-400 uppercase block">
                      Core Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(getSolutionHref(service.slug))}
                    className="w-full justify-between text-[#0047BA] hover:text-[#00358a] hover:bg-slate-50 border-slate-200"
                  >
                    <span>Explore {service.title} Architecture</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Practice Integrated Architecture Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              SYSTEMIC COHESION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Integrated Practice Architecture.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Our eight practices are designed to interlock. Infrastructure feeds cloud elasticity, security blankets every application boundary, and elastic talent sustains release velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <span className="text-xs font-mono text-sky-400">FOUNDATION</span>
              <h4 className="text-base font-bold text-white">Infrastructure & Cloud</h4>
              <p className="text-xs text-slate-400">Carrier fiber, bare metal compute, multi-cloud Kubernetes, and automated GitOps IaC.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <span className="text-xs font-mono text-sky-400">PERIMETER</span>
              <h4 className="text-base font-bold text-white">Zero Trust Security</h4>
              <p className="text-xs text-slate-400">Hardware MFA, automated host containment, SIEM logging, and SOC 2 / HIPAA compliance.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <span className="text-xs font-mono text-sky-400">EXECUTION</span>
              <h4 className="text-base font-bold text-white">Software & AI</h4>
              <p className="text-xs text-slate-400">High-throughput microservices, edge-rendered web portals, and private VPC vector search.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <span className="text-xs font-mono text-sky-400">ACCELERATION</span>
              <h4 className="text-base font-bold text-white">Growth & Talent</h4>
              <p className="text-xs text-slate-400">Technical SEO pipelines, embedded engineering RPO pods, and executive talent search.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              COLLABORATION FRAMEWORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Flexible Enterprise Engagement Models.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Whether you need an entire autonomous engineering squad or targeted architectural review, we align with your operational cadence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementModels.map((model, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400">MODEL 0{idx + 1}</span>
                  <h3 className="text-base font-bold text-slate-900">{model.title}</h3>
                  <p className="text-xs text-sky-700 font-semibold">{model.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    {model.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-200/80">
                  {model.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <FAQAccordion
        items={generalFaqs}
        title="Solutions Portfolio FAQs"
        subtitle="Frequently asked questions about technical delivery, security agreements, and project kickoff timelines."
      />

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            ENGAGE WITH CODEOLOGY AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Discuss Your Architecture With a Practice Lead.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our directors evaluate system requirements, compliance parameters, and project scopes under strict confidentiality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Initiate Technical Discovery <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/industries')}
            >
              Explore Regulated Industries
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
