import React from 'react';
import { ArrowRight, Briefcase, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { careersPreviewContent } from '../../content/careersPreview';
import { Button } from '../ui/Button';

interface CareerPreviewProps {
  onNavigate: (path: string) => void;
}

export const CareerPreview: React.FC<CareerPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-label="Careers Preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0A1528] p-8 lg:p-14 text-white border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-mono border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CODEOLOGY TALENT NETWORK // ENGINEERING & OPERATIONS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {careersPreviewContent.headline}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {careersPreviewContent.description}
              </p>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800 font-mono">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {careersPreviewContent.openPositionsCount}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Open Requisitions</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {careersPreviewContent.departmentsCount}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Core Practices</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Transparent Pay</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => onNavigate(careersPreviewContent.ctaPath)}
                  className="px-6 py-3 bg-[#0047BA] hover:bg-[#00368C] text-white font-semibold flex items-center group cursor-pointer"
                >
                  <span>{careersPreviewContent.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('/candidate/dashboard')}
                  className="px-6 py-3 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold cursor-pointer"
                >
                  Candidate Portal & ATS Tracker
                </Button>
              </div>
            </div>

            {/* Right Column: Featured Live Technical Roles */}
            <div className="lg:col-span-5 space-y-3 font-mono text-xs">
              <div className="text-slate-400 pb-2 border-b border-slate-800 flex justify-between items-center text-[11px]">
                <span className="uppercase tracking-wider font-bold">Featured Open Roles</span>
                <span className="text-emerald-400">ACTIVE HIRING</span>
              </div>

              <div className="space-y-3">
                {careersPreviewContent.featuredRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => onNavigate(`/jobs/${role.slug}`)}
                    className="p-4 bg-[#06101E] rounded-xl border border-slate-800 hover:border-sky-500/80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                        {role.title}
                      </h4>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </div>

                    <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                      <span className="text-slate-300">{role.department}</span>
                      <span className="text-emerald-400 font-bold">{role.salaryRange}</span>
                    </div>

                    <div className="text-[10px] text-slate-500 mt-1 flex items-center space-x-1.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{role.location}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('/careers')}
                  className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-4 cursor-pointer"
                >
                  View All 8 Engineering Requisitions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
