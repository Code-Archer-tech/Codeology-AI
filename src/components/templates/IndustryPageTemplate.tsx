import React, { useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  FileCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { FAQAccordion } from '../ui/FAQAccordion';
import { IndustryItem } from '../../content/industries';

interface IndustryPageTemplateProps {
  industry: IndustryItem;
  onNavigate: (path: string) => void;
}

export const IndustryPageTemplate: React.FC<IndustryPageTemplateProps> = ({
  industry,
  onNavigate,
}) => {
  // Inject SEO metadata and JSON-LD structured data
  useEffect(() => {
    document.title = `${industry.name} Enterprise Solutions | Codeology AI`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', industry.description);
    }

    const scriptId = `industry-jsonld-${industry.slug}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${industry.name} Technology Solutions`,
      serviceType: 'Enterprise IT & Cloud Engineering',
      provider: {
        '@type': 'Corporation',
        name: 'Codeology AI',
        url: 'https://www.codeologyai.com',
      },
      description: industry.description,
      areaServed: 'Global',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${industry.name} Capabilities`,
        itemListElement: industry.keyArchitectures.map((arch) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: arch,
          },
        })),
      },
    };

    scriptElement.textContent = JSON.stringify(schemaData);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [industry]);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Industries', href: '/industries' },
              { label: industry.name },
            ]}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="info" size="sm">
                  INDUSTRY PRACTICE // {industry.name.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-slate-500">
                  ENTERPRISE ARCHITECTURE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {industry.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                {industry.description}
              </p>

              {/* Industry Challenge Callout */}
              <div className="p-4 sm:p-5 rounded-lg border-l-4 border-[#0047BA] bg-slate-50 border border-slate-200 text-sm text-slate-700">
                <strong className="text-slate-950 font-semibold block mb-1">
                  Sector Challenge:
                </strong>
                {industry.industryChallenge}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('/contact')}
                  className="bg-[#0047BA] hover:bg-[#00358a] text-white"
                >
                  Consult {industry.name} Practice Lead <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('/case-studies')}
                >
                  Explore Related Case Studies
                </Button>
              </div>
            </div>

            {/* Proof Metric Card */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                  VERIFIED INDUSTRY BENCHMARK
                </span>
                <div>
                  <div className="text-5xl font-extrabold tracking-tight text-white font-mono">
                    {industry.impactMetric}
                  </div>
                  <div className="text-sm text-slate-300 font-medium mt-1">
                    {industry.impactLabel}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                  Key Sample Deliverable:
                  <p className="text-slate-200 font-mono mt-1 text-xs">
                    {industry.sampleDeliverable}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Challenges & Solutions */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              DOMAIN COMPLEXITY RESOLVED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Sector Challenges & Architectural Solutions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              How Codeology AI systematically resolves the operational bottlenecks holding back {industry.name} enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.challenges.map((ch, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      CHALLENGE 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {ch.problem}
                  </h3>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#0047BA] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ENGINEERED RESOLUTION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ch.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectures & Compliance Frameworks */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                ENGINEERED TOPOLOGIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Architectures & Technical Capabilities.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We engineer scalable, self-healing platforms configured specifically to the regulatory and volumetric requirements of {industry.name}.
              </p>

              <div className="space-y-3 pt-2">
                {industry.keyArchitectures.map((arch, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50"
                  >
                    <Layers className="w-5 h-5 text-[#0047BA] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{arch}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                REGULATORY & SECURITY GOVERNANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Compliance Standards Enforced.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Every environment we construct adheres to verifiable cryptographic controls and automated compliance evidence generation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {industry.complianceStandards.map((std, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center space-x-3"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-800">{std}</span>
                  </div>
                ))}
              </div>

              {/* Technology Ecosystem */}
              <div className="pt-6 border-t border-slate-200">
                <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
                  INTEGRATED TECHNOLOGY ECOSYSTEM
                </span>
                <div className="flex flex-wrap gap-2">
                  {industry.techEcosystem.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study Preview */}
      {industry.caseStudyPreview && (
        <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <Badge variant="info" size="sm">FEATURED INDUSTRY CASE STUDY</Badge>
                <span className="text-xs font-mono text-slate-400 block">
                  {industry.caseStudyPreview.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {industry.caseStudyPreview.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {industry.caseStudyPreview.summary}
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(`/case-studies/${industry.caseStudyPreview?.slug}`)}
                    className="border-slate-700 text-white hover:bg-slate-800"
                  >
                    Read Technical Breakdown <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-xl border border-slate-800 bg-slate-900/80 text-center space-y-2">
                <span className="text-xs font-mono text-sky-400 uppercase">
                  VERIFIED OUTCOME
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                  {industry.caseStudyPreview.metric}
                </div>
                <div className="text-xs text-slate-300">
                  {industry.caseStudyPreview.metricLabel}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Codeology AI for this Industry */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              STRATEGIC DIFFERENTIATORS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Why Enterprise Leaders Choose Codeology AI.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Practicing systems architects who embed directly with your engineering leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.whyCodeology.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0047BA] flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry FAQs */}
      {industry.faqs && industry.faqs.length > 0 && (
        <FAQAccordion
          items={industry.faqs}
          title={`${industry.name} Practice FAQs`}
          subtitle="Specific questions regarding our technical capabilities, compliance verification, and engagement models."
          cmsNotice={industry.cmsNotice}
        />
      )}

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            READY TO ENGAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Schedule an Architectural Review for {industry.name}.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Speak directly with our senior infrastructure architects and compliance specialists under strict confidentiality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Request Practice Discovery <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/solutions')}
            >
              View Full Solutions Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
