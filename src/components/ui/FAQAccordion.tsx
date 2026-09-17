import React, { useState, useRef, KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  cmsNotice?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = 'Frequently Answered Questions',
  subtitle = 'Architectural, operational, and engagement details answered directly by our practice directors.',
  cmsNotice = '[CMS CONTENT: FAQ items are managed via the CMS content repository]',
  className = '',
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      buttonsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      buttonsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonsRef.current[items.length - 1]?.focus();
    }
  };

  return (
    <section className={`py-16 border-t border-slate-200 ${className}`} aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            TECHNICAL & OPERATIONAL CLARITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndexes.includes(index);
            const buttonId = `faq-btn-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-150 hover:border-slate-300 shadow-2xs"
              >
                <h3>
                  <button
                    id={buttonId}
                    ref={(el) => (buttonsRef.current[index] = el)}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#0047BA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047BA] focus:ring-inset cursor-pointer"
                  >
                    <span className="text-sm sm:text-base leading-snug font-sans">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0047BA]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  <p className="pt-3">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {cmsNotice && (
          <div className="mt-8 text-center">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
              {cmsNotice}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
