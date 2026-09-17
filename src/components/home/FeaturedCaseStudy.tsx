import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Layers, Server } from 'lucide-react';
import { featuredCaseStudy } from '../../content/caseStudies';
import { Button } from '../ui/Button';

interface FeaturedCaseStudyProps {
  onNavigate: (path: string) => void;
}

export const FeaturedCaseStudy: React.FC<FeaturedCaseStudyProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-label="Featured Engineering Case Study">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              PRODUCTION ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Featured Case Study
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/case-studies')}
            className="mt-4 md:mt-0 text-sm font-semibold text-[#0047BA] hover:text-[#0A2540] flex items-center group cursor-pointer"
          >
            <span>View All Engineering Case Studies</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Layout: Large Visual / Topology Area + Rich Content Area */}
        <div className="rounded-2xl border border-slate-200 bg-[#F8F9FB] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Column: Visual Architecture / Topology Diagram */}
          <div className="lg:col-span-5 bg-[#0A1528] p-8 lg:p-10 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-slate-800 text-[11px] font-mono text-sky-400 border border-slate-700 mb-6">
                <span>{featuredCaseStudy.badge}</span>
              </div>

              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">
                    Client Organization
                  </span>
                  <span className="text-base font-semibold text-white font-mono mt-0.5 block">
                    {featuredCaseStudy.client}
                  </span>
                </div>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">
                    Industry Domain
                  </span>
                  <span className="text-sm font-medium text-slate-200 mt-0.5 block">
                    {featuredCaseStudy.industry}
                  </span>
                </div>

                {/* Architectural Schematic Preview */}
                <div className="p-4 bg-[#06101E] rounded-lg border border-slate-800 text-xs font-mono space-y-2 mt-4">
                  <div className="text-sky-400 font-bold flex items-center justify-between">
                    <span>TOPOLOGY SPECS</span>
                    <span className="text-emerald-400">ACTIVE-ACTIVE</span>
                  </div>
                  <div className="text-slate-300">
                    • AWS us-east-1 + us-west-2 Ingress
                  </div>
                  <div className="text-slate-300">
                    • Multi-Cluster Kubernetes (EKS) Mesh
                  </div>
                  <div className="text-slate-300">
                    • Sub-5ms Asynchronous DB Replication
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">
                {featuredCaseStudy.cmsNotice}
              </span>
            </div>
          </div>

          {/* Right Column: Narrative, Tech Stack & Outcomes */}
          <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
                {featuredCaseStudy.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-1">
                    The Challenge:
                  </h4>
                  <p>{featuredCaseStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-1">
                    The Engineering Solution:
                  </h4>
                  <p>{featuredCaseStudy.solution}</p>
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {featuredCaseStudy.technology.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-mono font-medium border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcome Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold font-mono text-[#0A2540]">
                    {featuredCaseStudy.outcome.primaryMetric}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {featuredCaseStudy.outcome.primaryLabel}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-[#0A2540]">
                    {featuredCaseStudy.outcome.secondaryMetric}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {featuredCaseStudy.outcome.secondaryLabel}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-[#0A2540]">
                    {featuredCaseStudy.outcome.tertiaryMetric}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {featuredCaseStudy.outcome.tertiaryLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate(`/case-studies/${featuredCaseStudy.slug}`)}
                className="bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold"
              >
                <span>{featuredCaseStudy.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <span className="text-xs font-mono text-slate-500">
                DOCUMENT ID: CS-2026-081
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
