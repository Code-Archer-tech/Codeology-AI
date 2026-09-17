import React, { useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { CaseStudyItem, caseStudiesList } from '../content/caseStudies';

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudyItem;
  onNavigate: (path: string) => void;
}

export const CaseStudyDetailView: React.FC<CaseStudyDetailViewProps> = ({
  caseStudy,
  onNavigate,
}) => {
  useEffect(() => {
    document.title = `${caseStudy.title} | Case Study | Codeology AI`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', caseStudy.summary);
    }

    const scriptId = `casestudy-jsonld-${caseStudy.slug}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: caseStudy.title,
      description: caseStudy.summary,
      author: {
        '@type': 'Organization',
        name: 'Codeology AI Architecture Practice',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Codeology AI',
        url: 'https://www.codeologyai.com',
      },
      articleSection: caseStudy.industry,
    };

    scriptElement.textContent = JSON.stringify(jsonLd);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [caseStudy]);

  const relatedStudies = caseStudy.relatedCaseStudySlugs
    .map((slug) => caseStudiesList.find((c) => c.slug === slug))
    .filter(Boolean) as CaseStudyItem[];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Case Studies', href: '/case-studies' },
              { label: caseStudy.title },
            ]}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="info" size="sm">{caseStudy.badge}</Badge>
              <span className="text-xs font-mono text-slate-500 uppercase">
                {caseStudy.industry} // {caseStudy.service}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400 block">
              {caseStudy.client}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {caseStudy.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {caseStudy.summary}
            </p>

            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {caseStudy.technology.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Primary Outcomes Banner */}
      <section className="py-12 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">
                {caseStudy.outcome.primaryMetric}
              </div>
              <div className="text-xs text-slate-300 font-semibold">
                {caseStudy.outcome.primaryLabel}
              </div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">
                {caseStudy.outcome.secondaryMetric}
              </div>
              <div className="text-xs text-slate-300 font-semibold">
                {caseStudy.outcome.secondaryLabel}
              </div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
              <div className="text-4xl font-extrabold text-white font-mono">
                {caseStudy.outcome.tertiaryMetric}
              </div>
              <div className="text-xs text-slate-300 font-semibold">
                {caseStudy.outcome.tertiaryLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge & Context */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                  THE OPERATIONAL BOTTLENECK
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  The Engineering Challenge & Context.
                </h2>
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-slate-950 block mb-1">Production Challenge:</strong>
                    {caseStudy.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-950 block mb-1">Enterprise Context:</strong>
                    {caseStudy.context}
                  </p>
                </div>
              </div>

              {/* Approach & Engineered Solution */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                  SYSTEMIC ARCHITECTURE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Approach & Engineered Solution.
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {caseStudy.approach}
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>

              {/* Implementation Phases */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                  EXECUTION MILESTONES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Implementation Roadmap.
                </h2>
                <div className="space-y-3">
                  {caseStudy.implementation.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-start space-x-3 shadow-2xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-800 font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Nodes Breakdown */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                  TOPOLOGY BREAKDOWN
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  System Architecture Layers.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {caseStudy.architectureOverview}
                </p>

                <div className="space-y-3">
                  {caseStudy.architectureNodes.map((node, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      <div className="sm:col-span-4 font-mono font-bold text-xs uppercase text-sky-800">
                        {node.layer}
                      </div>
                      <div className="sm:col-span-8 text-xs sm:text-sm text-slate-700">
                        {node.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Production Metrics */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                  VERIFIED OUTCOMES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Documented Telemetry & Metrics.
                </h2>
                <div className="space-y-2.5">
                  {caseStudy.verifiedMetrics.map((met, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-emerald-100 bg-emerald-50/50 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-800 font-medium">{met}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  ENGINEERING RETROSPECTIVE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Key Architectural Lessons.
                </h2>
                <div className="space-y-2.5">
                  {caseStudy.lessons.map((les, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs sm:text-sm text-slate-700"
                    >
                      {les}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Quick Facts & Related Case Studies */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4 sticky top-24">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                  PROJECT SPECIFICATION
                </span>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Industry:</span>
                    <strong className="text-slate-900 text-sm">{caseStudy.industry}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Service:</span>
                    <strong className="text-slate-900 text-sm">{caseStudy.service}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Core Deliverable:</span>
                    <p className="text-slate-700 mt-0.5">{caseStudy.summary}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Key Technologies:</span>
                    <div className="flex flex-wrap gap-1">
                      {caseStudy.technology.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('/contact')}
                    className="w-full bg-[#0047BA] hover:bg-[#00358a] text-white"
                  >
                    Consult Practice Lead <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              {/* Related Studies */}
              {relatedStudies.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                    RELATED ARCHITECTURAL CASE STUDIES
                  </span>
                  <div className="space-y-3">
                    {relatedStudies.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onNavigate(`/case-studies/${rel.slug}`)}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer shadow-2xs space-y-2 group"
                      >
                        <span className="text-[11px] font-mono text-sky-700 uppercase">
                          {rel.industry}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047BA] transition-colors leading-snug">
                          {rel.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                          <span className="font-mono text-emerald-700">
                            {rel.outcome.primaryMetric} {rel.outcome.primaryLabel}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0047BA]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Schedule a Confidential Technical Discovery.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discuss your system requirements, compliance benchmarks, and modernization goals with our senior engineering practice leads.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Request Architectural Review <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/case-studies')}
            >
              All Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
