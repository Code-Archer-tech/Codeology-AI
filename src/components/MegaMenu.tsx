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
  ExternalLink,
} from 'lucide-react';
import { solutionsContent, SolutionItem } from '../content/solutions';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
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

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      role="region"
      aria-label="Solutions Mega Menu"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Header strip inside mega menu */}
        <div className="bg-slate-50/80 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0047BA]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Enterprise Practice Areas // 8 Specialized Solutions
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('/solutions');
              onClose();
            }}
            className="text-xs font-semibold text-[#0047BA] hover:text-[#0A2540] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>Browse Full Solutions Directory</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* 8 Solutions Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutionsContent.map((sol: SolutionItem) => {
            const IconComponent = iconMap[sol.iconName] || Server;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => {
                  onNavigate(`/solutions/${sol.slug}`);
                  onClose();
                }}
                className="text-left p-3.5 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50/90 transition-all duration-150 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded bg-[#F0F4F8] group-hover:bg-[#0A2540] group-hover:text-white text-[#0A2540] flex items-center justify-center transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#0047BA] transition-colors">
                      {sol.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0047BA] transition-colors line-clamp-1">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {sol.shortDescription}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600 group-hover:text-[#0047BA] transition-colors">
                  <span>Explore Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Bar: Quick Architecture Discovery */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-[10px] uppercase font-bold border border-slate-700">
              ARCHITECTURE BRIEFING
            </span>
            <span className="text-slate-300">
              Need a custom multi-practice infrastructure or hybrid engineering pod assessment?
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('/contact');
              onClose();
            }}
            className="shrink-0 text-white font-semibold hover:text-sky-300 flex items-center space-x-1 transition-colors cursor-pointer underline underline-offset-4"
          >
            <span>Request Architecture Review →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
