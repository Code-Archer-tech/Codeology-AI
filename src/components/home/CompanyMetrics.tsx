import React, { useState, useEffect, useRef } from 'react';
import { companyMetrics, MetricItem } from '../../content/metrics';

export const CompanyMetrics: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="py-16 bg-white border-b border-slate-200"
      aria-label="Company Performance Metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            VERIFIED ENTERPRISE TRACK RECORD
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1.5 tracking-tight">
            Engineered for precision. Proven in production.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyMetrics.map((metric: MetricItem) => (
            <div
              key={metric.id}
              className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/80 text-left flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#0A2540] tracking-tight">
                  {hasAnimated ? metric.value : '0'}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-2 font-sans">
                  {metric.label}
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {metric.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <span className="text-[10px] font-mono text-slate-400">
                  {metric.cmsNotice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
