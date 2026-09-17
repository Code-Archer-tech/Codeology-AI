import React, { useEffect, useState } from 'react';
import {
  Clock,
  ArrowRight,
  User,
  Calendar,
  CheckCircle2,
  Share2,
  Copy,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { InsightArticle, insightsList } from '../content/insights';

interface InsightDetailViewProps {
  insight: InsightArticle;
  onNavigate: (path: string) => void;
}

export const InsightDetailView: React.FC<InsightDetailViewProps> = ({
  insight,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `${insight.title} | Codeology AI Insights`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', insight.excerpt);
    }

    const scriptId = `insight-jsonld-${insight.slug}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: insight.title,
      description: insight.excerpt,
      author: {
        '@type': 'Person',
        name: insight.author.name,
        jobTitle: insight.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Codeology AI',
        url: 'https://www.codeologyai.com',
      },
      datePublished: insight.date,
      articleSection: insight.category,
    };

    scriptElement.textContent = JSON.stringify(jsonLd);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [insight]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = insight.relatedInsightSlugs
    .map((slug) => insightsList.find((i) => i.slug === slug))
    .filter(Boolean) as InsightArticle[];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/insights' },
              { label: insight.title },
            ]}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="info" size="sm">{insight.category}</Badge>
            <span className="text-xs font-mono text-slate-500 uppercase">
              TECHNICAL WHITEPAPER
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {insight.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            {insight.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center text-slate-900 font-semibold">
                <User className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
                {insight.author.name} ({insight.author.role})
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {insight.date}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {insight.readTime}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>URL Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents Sticky Sidebar */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24 space-y-4 p-5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  TABLE OF CONTENTS
                </span>
                <nav className="space-y-2 text-xs">
                  {insight.tableOfContents.map((toc, idx) => (
                    <a
                      key={idx}
                      href={`#${toc.id}`}
                      className="block text-slate-600 hover:text-[#0047BA] hover:underline leading-relaxed"
                    >
                      {toc.title}
                    </a>
                  ))}
                  <a
                    href="#key-takeaways"
                    className="block text-[#0047BA] font-semibold hover:underline pt-2 border-t border-slate-200"
                  >
                    Architectural Takeaways
                  </a>
                </nav>
              </div>
            </div>

            {/* Article Body */}
            <div className="lg:col-span-9 max-w-3xl space-y-12">
              {/* Sections */}
              {insight.sections.map((sec, idx) => (
                <div key={idx} id={sec.id} className="space-y-4 scroll-mt-24">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {sec.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>

                  {/* Code snippet if present */}
                  {sec.codeSnippet && (
                    <div className="my-6 rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto shadow-md">
                      <div className="text-[11px] font-mono text-slate-400 mb-2 pb-2 border-b border-slate-800">
                        {sec.codeSnippet.language.toUpperCase()} SNIPPET
                      </div>
                      <pre className="text-xs font-mono text-sky-300 leading-relaxed">
                        <code>{sec.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}

              {/* Key Takeaways Box */}
              <div
                id="key-takeaways"
                className="p-8 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-4 scroll-mt-24 shadow-2xs"
              >
                <div className="flex items-center space-x-2 text-[#0047BA]">
                  <Bookmark className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    EXECUTIVE ARCHITECTURAL TAKEAWAYS
                  </span>
                </div>

                <div className="space-y-3">
                  {insight.takeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                  ABOUT THE AUTHOR
                </span>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-mono font-bold text-slate-700 shrink-0">
                    {insight.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-950">{insight.author.name}</h3>
                    <div className="text-xs text-sky-800 font-semibold">{insight.author.role}</div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {insight.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="pt-8 border-t border-slate-200 space-y-6">
                  <h3 className="text-xl font-bold text-slate-950">Related Architectural Papers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onNavigate(`/insights/${rel.slug}`)}
                        className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer shadow-2xs space-y-2 group"
                      >
                        <span className="text-[11px] font-mono text-sky-800 uppercase">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0047BA] transition-colors leading-snug">
                          {rel.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                          <span>{rel.readingTime}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0047BA]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            ENGAGE WITH CODEOLOGY AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Schedule an Architectural Review With Our Practice.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discuss production failure modes, cloud migrations, and security hardening under confidential advisory.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Consult an Architect <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/insights')}
            >
              Browse All Insights
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
