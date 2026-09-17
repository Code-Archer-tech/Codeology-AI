import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Filter, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { caseStudiesList, featuredCaseStudy } from '../content/caseStudies';

interface CaseStudiesViewProps {
  onNavigate: (path: string) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({ onNavigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<string>('All');

  useEffect(() => {
    document.title = 'Enterprise Case Studies & Architectural Outcomes | Codeology AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Proven results across industries. Real-world documentation of production workloads migrated, cloud architectures hardened, and engineering platforms scaled by Codeology AI.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const industriesList = useMemo(() => {
    const set = new Set<string>();
    caseStudiesList.forEach((c) => set.add(c.industry));
    return ['All', ...Array.from(set)];
  }, []);

  const servicesList = useMemo(() => {
    const set = new Set<string>();
    caseStudiesList.forEach((c) => set.add(c.service));
    return ['All', ...Array.from(set)];
  }, []);

  const technologiesList = useMemo(() => {
    const set = new Set<string>();
    caseStudiesList.forEach((c) => c.technology.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 8)];
  }, []);

  const filteredCaseStudies = useMemo(() => {
    return caseStudiesList.filter((item) => {
      const matchInd = selectedIndustry === 'All' || item.industry === selectedIndustry;
      const matchServ = selectedService === 'All' || item.service === selectedService;
      const matchTech =
        selectedTechnology === 'All' || item.technology.includes(selectedTechnology);
      return matchInd && matchServ && matchTech;
    });
  }, [selectedIndustry, selectedService, selectedTechnology]);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Case Studies' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">
              PRODUCTION ARCHITECTURAL AUDIT
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Proven Results Across Industries.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Real-world documentation of production workloads migrated, cloud architectures hardened, and engineering platforms scaled by Codeology AI. We measure success strictly by production reliability and business leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Study Hero Banner */}
      <section className="py-16 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="info" size="sm">{featuredCaseStudy.badge}</Badge>
                <span className="text-xs font-mono text-slate-400">
                  {featuredCaseStudy.industry} // {featuredCaseStudy.service}
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 block">
                {featuredCaseStudy.client}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {featuredCaseStudy.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {featuredCaseStudy.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredCaseStudy.technology.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate(`/case-studies/${featuredCaseStudy.slug}`)}
                  className="bg-[#0047BA] hover:bg-[#00358a] text-white"
                >
                  Read Technical Breakdown <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-6">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                KEY VERIFIED METRICS
              </span>
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-extrabold text-white font-mono">
                    {featuredCaseStudy.outcome.primaryMetric}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">
                    {featuredCaseStudy.outcome.primaryLabel}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {featuredCaseStudy.outcome.secondaryMetric}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">
                    {featuredCaseStudy.outcome.secondaryLabel}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {featuredCaseStudy.outcome.tertiaryMetric}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">
                    {featuredCaseStudy.outcome.tertiaryLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Bar */}
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/80 space-y-4 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-600 uppercase">
              <Filter className="w-4 h-4 text-[#0047BA]" />
              <span>Filter Architectural Studies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  By Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047BA]"
                >
                  {industriesList.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  By Technical Practice
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047BA]"
                >
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  By Core Technology
                </label>
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047BA]"
                >
                  {technologiesList.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(selectedIndustry !== 'All' || selectedService !== 'All' || selectedTechnology !== 'All') && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Showing {filteredCaseStudies.length} of {caseStudiesList.length} studies
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndustry('All');
                    setSelectedService('All');
                    setSelectedTechnology('All');
                  }}
                  className="text-xs text-[#0047BA] hover:underline font-mono"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Grid of Results */}
          {filteredCaseStudies.length === 0 ? (
            <div className="py-20 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-200 rounded-xl">
              No case studies match the selected filters. Please adjust your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="p-8 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
                        {cs.industry} // {cs.service}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {cs.outcome.primaryMetric} {cs.outcome.primaryLabel}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-400 block">
                      {cs.client}
                    </span>

                    <h3 className="text-xl font-bold text-slate-950 leading-snug">
                      {cs.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cs.summary}
                    </p>

                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <strong className="text-slate-900 block font-semibold mb-1">
                        Challenge Solved:
                      </strong>
                      <p>{cs.challenge}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
                        Technologies Deployed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cs.technology.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(`/case-studies/${cs.slug}`)}
                      className="w-full justify-between text-[#0047BA] hover:text-[#00358a] hover:bg-slate-50 border-slate-200"
                    >
                      <span>Read Technical Case Study</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            BENCHMARK YOUR ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Ready to Achieve Measurable Engineering Impact?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Review your systems with our senior practice directors. We scope architecture modernizations, security overhauls, and staffing pods under strict NDA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Request Architectural Discovery <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/solutions')}
            >
              Explore Practice Areas
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
