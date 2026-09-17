import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Activity,
  CreditCard,
  Factory,
  ShoppingBag,
  GraduationCap,
  Cpu,
  Briefcase,
  Rocket,
} from 'lucide-react';
import { industriesContent, IndustryItem } from '../../content/industries';
import { Button } from '../ui/Button';

interface IndustrySelectorProps {
  onNavigate: (path: string) => void;
}

const industryIconMap: Record<string, React.ReactNode> = {
  healthcare: <Activity className="w-4 h-4" />,
  'financial-services': <CreditCard className="w-4 h-4" />,
  manufacturing: <Factory className="w-4 h-4" />,
  'retail-ecommerce': <ShoppingBag className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  technology: <Cpu className="w-4 h-4" />,
  'professional-services': <Briefcase className="w-4 h-4" />,
  'startups-smes': <Rocket className="w-4 h-4" />,
};

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>('healthcare');

  const selectedIndustry =
    industriesContent.find((item) => item.id === selectedId) || industriesContent[0];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] border-b border-slate-200" aria-label="Industries & Sectors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            INDUSTRY EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mt-2">
            Engineered for regulatory complexity and domain scale.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Every sector operates under distinct compliance thresholds, data sovereignty rules, and throughput pressures. Select an industry to inspect our tailored architecture protocols.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of 8 Industries with interactive selector */}
          <div className="lg:col-span-5 space-y-2">
            {industriesContent.map((ind: IndustryItem) => {
              const isSelected = ind.id === selectedId;
              const icon = industryIconMap[ind.id] || <Building2 className="w-4 h-4" />;

              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedId(ind.id)}
                  onMouseEnter={() => setSelectedId(ind.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-150 flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0047BA] shadow-sm text-slate-950'
                      : 'bg-white/60 border-slate-200/80 hover:bg-white text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#0A2540] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {icon}
                    </div>
                    <div>
                      <span className="text-sm font-bold block">{ind.name}</span>
                      <span className="text-xs text-slate-500 line-clamp-1">
                        {ind.tagline}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-all ${
                      isSelected ? 'text-[#0047BA] translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep Dive Card into the Selected Industry */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0047BA]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    {selectedIndustry.name} Architecture Profile
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedIndustry.cmsNotice}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  {selectedIndustry.tagline}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                  {selectedIndustry.description}
                </p>
              </div>

              {/* Architecture Blueprints */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2.5">
                  Tailored Technical Architectures:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedIndustry.keyArchitectures.map((arch, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-800 font-medium flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0047BA] shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Standards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                  Enforced Compliance Frameworks:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.complianceStandards.map((std, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#0A2540] text-white text-xs font-mono font-medium"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Representative Deliverable & Impact Metric */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0047BA] font-bold block">
                    Representative Engagement Deliverable
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-0.5">
                    {selectedIndustry.sampleDeliverable}
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-2xl font-bold font-mono text-[#0A2540]">
                    {selectedIndustry.impactMetric}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {selectedIndustry.impactLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/industries')}
                className="bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold"
              >
                <span>Explore Full {selectedIndustry.name} Practice</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="text-xs font-semibold text-[#0047BA] hover:text-[#0A2540] underline underline-offset-4 cursor-pointer"
              >
                Request Domain Architecture Discovery →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
