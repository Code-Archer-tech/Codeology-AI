import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsContent, TestimonialItem } from '../../content/testimonials';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsContent.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsContent.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial: TestimonialItem = testimonialsContent[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-label="Client Testimonials">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            EXECUTIVE ENDORSEMENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1.5">
            Trusted in mission-critical environments
          </h2>
        </div>

        {/* Editorial High-End Quote Card */}
        <div className="relative rounded-3xl bg-[#F8F9FB] border border-slate-200 p-8 sm:p-12 lg:p-16 shadow-sm">
          <Quote className="w-12 h-12 text-slate-300 mb-6" />

          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 leading-relaxed tracking-tight">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold font-mono text-sm">
                {currentTestimonial.initials}
              </div>
              <div>
                <div className="text-base font-bold text-slate-950">
                  {currentTestimonial.clientName}
                </div>
                <div className="text-xs text-slate-600">
                  {currentTestimonial.role} • <span className="font-mono">{currentTestimonial.company}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-600 font-semibold mt-0.5">
                  ✓ {currentTestimonial.verifiedTag}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-slate-400 mr-2">
                0{currentIndex + 1} / 0{testimonialsContent.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center sm:text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {currentTestimonial.cmsNotice}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
