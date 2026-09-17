import React, { useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  ShieldCheck,
  Cpu,
  Server,
  Cloud,
  Code2,
  TrendingUp,
  Users,
  Sparkles,
  ChevronRight,
  Info,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { FAQAccordion } from '../ui/FAQAccordion';
import { SolutionDetailData } from '../../content/solutionDetails';
import { practiceFaqs } from '../../content/faqs';
import { caseStudiesList } from '../../content/caseStudies';

interface SolutionPageTemplateProps {
  solution: SolutionDetailData;
  onNavigate: (path: string) => void;
}

export const SolutionPageTemplate: React.FC<SolutionPageTemplateProps> = ({
  solution,
  onNavigate,
}) => {
  useEffect(() => {
    document.title = `${solution.title} | Codeology AI`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', solution.shortDescription);
    }

    const scriptId = `solution-jsonld-${solution.slug}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: solution.title,
      serviceType: 'Enterprise Technology Practice',
      provider: {
        '@type': 'Corporation',
        name: 'Codeology AI',
        url: 'https://www.codeologyai.com',
      },
      description: solution.shortDescription,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${solution.title} Capabilities`,
        itemListElement: solution.strategicPillars.map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: p.title,
            description: p.description,
          },
        })),
      },
    };

    scriptElement.textContent = JSON.stringify(jsonLd);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [solution]);

  const caseStudy = solution.caseStudySlug
    ? caseStudiesList.find((c) => c.slug === solution.caseStudySlug)
    : undefined;

  const faqs = practiceFaqs[solution.faqKey] || [];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Solutions', href: '/solutions' },
              { label: solution.title },
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
                  PRACTICE {solution.number} // {solution.title.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-slate-500">
                  PRODUCTION-GRADE ENGINEERING
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {solution.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                {solution.longOverview}
              </p>

              {/* Special Ethical/Security Notice if applicable */}
              {solution.specialNotice && (
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/60 text-xs sm:text-sm text-amber-900 flex items-start space-x-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p>{solution.specialNotice}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {solution.slug === 'recruitment-staffing' || solution.slug === 'recruitment' ? (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onNavigate('/contact')}
                      className="bg-[#0047BA] hover:bg-[#00358a] text-white"
                    >
                      Find Talent <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => onNavigate('/careers')}
                    >
                      View Careers <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onNavigate('/contact')}
                      className="bg-[#0047BA] hover:bg-[#00358a] text-white"
                    >
                      Consult Practice Lead <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => onNavigate('/case-studies')}
                    >
                      View Technical Case Studies
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Impact Highlights Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-8 rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-xl space-y-6">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                  KEY PERFORMANCE BENCHMARKS
                </span>
                <div className="space-y-4">
                  {solution.keyBenefits.map((b, idx) => (
                    <div key={idx} className="pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                      <div className="text-3xl font-extrabold text-white font-mono">{b.metric}</div>
                      <div className="text-xs font-semibold text-slate-300">{b.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{b.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Grid */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              COMPREHENSIVE PRACTICE SCOPE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Strategic Practice Pillars.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every dimension of {solution.title} executed with institutional rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.strategicPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400">
                  <span>PILLAR 0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Visualization Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              ENGINEERED TOPOLOGY VISUALIZATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              {solution.title} Reference Architecture.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              How Codeology AI structures production-ready layers to guarantee resilience, security, and low-latency performance.
            </p>
          </div>

          {/* Architecture Layers Display */}
          <div className="space-y-4">
            {solution.architectureLayers.map((layer, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-sky-400">
                      LAYER 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{layer.name}</h4>
                  <p className="text-xs text-slate-400">{layer.tagline}</p>
                </div>

                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {layer.components.map((comp, cIdx) => (
                    <div
                      key={cIdx}
                      className="px-3.5 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-slate-200 flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Process Stages */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              METHODOLOGY & EXECUTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              {solution.processTitle || 'The Structured Delivery Lifecycle.'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Predictable, milestone-driven execution ensuring transparency from initial discovery to continuous production scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.processStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#0047BA] flex items-center justify-center font-mono font-bold text-base">
                  {stage.step}
                </div>
                <h3 className="text-base font-bold text-slate-950">{stage.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Capabilities Categories */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              DEEP TECHNICAL RIGOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Detailed Capabilities & Deliverables.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Specific artifacts, standards, and engineering practices applied on every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solution.capabilitiesCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Ecosystem Stack */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              TOOLING & INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Technology Stack Ecosystem.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Industry-standard tools and platforms certified and maintained by our practicing engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.techStackCategories.map((group, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study if available */}
      {caseStudy && (
        <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <Badge variant="info" size="sm">FEATURED TECHNICAL CASE STUDY</Badge>
                <span className="text-xs font-mono text-slate-400 block">{caseStudy.client}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {caseStudy.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {caseStudy.summary}
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(`/case-studies/${caseStudy.slug}`)}
                    className="border-slate-700 text-white hover:bg-slate-800"
                  >
                    Read Technical Breakdown <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-xl border border-slate-800 bg-slate-900 text-center space-y-2">
                <span className="text-xs font-mono text-sky-400 uppercase">MEASURED OUTCOME</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                  {caseStudy.outcome.primaryMetric}
                </div>
                <div className="text-xs text-slate-300">
                  {caseStudy.outcome.primaryLabel}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Practice FAQs */}
      {faqs.length > 0 && (
        <FAQAccordion
          items={faqs}
          title={`${solution.title} FAQs`}
          subtitle="Specific questions regarding our technical capabilities, compliance verification, and engagement models."
        />
      )}

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            ENGAGE WITH CODEOLOGY AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Schedule a Technical Discovery for {solution.title}.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect directly with our senior infrastructure architects and practice directors under strict NDA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Request Practice Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/solutions')}
            >
              Explore Other Practices
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
