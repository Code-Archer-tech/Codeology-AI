import React from 'react';
import { ArrowRight, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface CTASectionProps {
  onNavigate: (path: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#0A2540] text-white relative overflow-hidden" aria-label="Start Engagement">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 text-sky-300 text-xs font-mono border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            <span>TECHNICAL DISCOVERY // 48-HOUR SCOPE DELIVERY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s build what&apos;s next.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Tell us what you&apos;re trying to solve. We&apos;ll help you find the right technology path.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 items-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onNavigate('/contact?type=consultation')}
              className="px-8 py-4 text-base font-semibold bg-white text-[#0A2540] hover:bg-slate-100 shadow-xl flex items-center group cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('/solutions')}
              className="px-8 py-4 text-base font-semibold bg-transparent border-slate-600 hover:bg-slate-800 text-white flex items-center group cursor-pointer"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Quick contact channels */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>contact@codeologyai.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-sky-400" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Enterprise SLA Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
