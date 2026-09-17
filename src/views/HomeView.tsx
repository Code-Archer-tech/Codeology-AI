import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustStrip } from '../components/home/TrustStrip';
import { CompanyMetrics } from '../components/home/CompanyMetrics';
import { SolutionsSection } from '../components/home/SolutionsSection';
import { FeaturedCaseStudy } from '../components/home/FeaturedCaseStudy';
import { IndustrySelector } from '../components/home/IndustrySelector';
import { CareerPreview } from '../components/home/CareerPreview';
import { InsightsPreview } from '../components/home/InsightsPreview';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { CTASection } from '../components/home/CTASection';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO SECTION */}
      <Hero onNavigate={onNavigate} />

      {/* 2. TRUST STRIP */}
      <TrustStrip />

      {/* 3. COMPANY METRICS */}
      <CompanyMetrics />

      {/* 4. SOLUTIONS SECTION (8 Practice Areas Bento Grid) */}
      <SolutionsSection onNavigate={onNavigate} />

      {/* 5. FEATURED CASE STUDY (Editorial Architecture Case) */}
      <FeaturedCaseStudy onNavigate={onNavigate} />

      {/* 6. INDUSTRIES (Interactive 8-Sector Architecture Selector) */}
      <IndustrySelector onNavigate={onNavigate} />

      {/* 7. CAREERS PREVIEW */}
      <CareerPreview onNavigate={onNavigate} />

      {/* 8. INSIGHTS PREVIEW (3 CMS Articles) */}
      <InsightsPreview onNavigate={onNavigate} />

      {/* 9. TESTIMONIALS (Editorial Typography & Controls) */}
      <TestimonialSection />

      {/* 10. CTA SECTION */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
