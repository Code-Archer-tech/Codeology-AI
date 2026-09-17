import React from 'react';
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
} from 'lucide-react';
import { solutionsContent, SolutionItem } from '../../content/solutions';

interface SolutionsSectionProps {
  onNavigate: (path: string) => void;
}

const iconMap = {
  Server: Server,
  Cloud: Cloud,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
  Users: Users,
  Sparkles: Sparkles,
};

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] border-b border-slate-200" aria-label="Enterprise Solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            CORE PRACTICE AREAS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mt-2">
            Technology built around your business.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            From infrastructure and cybersecurity to software engineering and digital growth, we help organizations build technology that performs in the real world.
          </p>
        </div>

        {/* Asymmetric Bento Grid for 8 Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {solutionsContent.map((sol: SolutionItem, index: number) => {
            const IconComponent = iconMap[sol.iconName] || Server;

            // Varied bento spans to break monotony:
            // Item 0 (IT Infrastructure): 7 cols
            // Item 1 (Cloud & DevOps): 5 cols
            // Item 2 (Cybersecurity): 6 cols
            // Item 3 (Software Engineering): 6 cols
            // Item 4 (Digital Transformation): 4 cols
            // Item 5 (Digital Growth): 4 cols
            // Item 6 (Recruitment & Staffing): 4 cols
            // Item 7 (AI Solutions): 12 cols (wide featured banner)
            let colSpanClass = 'lg:col-span-6';
            if (index === 0) colSpanClass = 'lg:col-span-7';
            else if (index === 1) colSpanClass = 'lg:col-span-5';
            else if (index === 2) colSpanClass = 'lg:col-span-6';
            else if (index === 3) colSpanClass = 'lg:col-span-6';
            else if (index === 4) colSpanClass = 'lg:col-span-4';
            else if (index === 5) colSpanClass = 'lg:col-span-4';
            else if (index === 6) colSpanClass = 'lg:col-span-4';
            else if (index === 7) colSpanClass = 'lg:col-span-12';

            const isDarkCard = index === 0; // Distinct treatment for hero practice
            const isAiBanner = index === 7; // Wide modern AI practice banner

            if (isAiBanner) {
              return (
                <div
                  key={sol.id}
                  onClick={() => onNavigate(`/solutions/${sol.slug}`)}
                  className={`${colSpanClass} rounded-2xl bg-gradient-to-r from-[#0A2540] via-[#0D3156] to-[#0A1D33] p-8 lg:p-10 text-white border border-slate-700 shadow-lg hover:border-sky-400 transition-all cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-8`}
                >
                  <div className="max-w-2xl space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-400 tracking-wider">
                        SOLUTION // {sol.number}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-900/60 text-sky-300 font-mono border border-sky-700">
                        {sol.metricsPreview}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      {sol.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {sol.fullDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {sol.capabilities.map((cap, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono bg-slate-800/80 px-2.5 py-1 rounded text-slate-300 border border-slate-700"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2 text-sm font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span>Explore Enterprise AI Framework</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              );
            }

            if (isDarkCard) {
              return (
                <div
                  key={sol.id}
                  onClick={() => onNavigate(`/solutions/${sol.slug}`)}
                  className={`${colSpanClass} rounded-2xl bg-[#0A1528] p-8 text-white border border-slate-800 shadow-md hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 group-hover:bg-[#0047BA] group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-sky-400 transition-colors">
                        {sol.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                      {sol.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {sol.shortDescription}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                      {sol.capabilities.slice(0, 3).map((cap, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-white transition-colors">
                    <span>View Infrastructure Architecture</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={sol.id}
                onClick={() => onNavigate(`/solutions/${sol.slug}`)}
                className={`${colSpanClass} rounded-2xl bg-white p-7 text-slate-900 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0A2540] group-hover:bg-[#0047BA] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0047BA] transition-colors">
                      {sol.number}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#0047BA] transition-colors">
                      {sol.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {sol.shortDescription}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                    {sol.capabilities.slice(0, 2).map((cap, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0047BA] shrink-0" />
                        <span className="line-clamp-1">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-[#0047BA] transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
