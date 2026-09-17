import React from 'react';
import { ArrowRight, Clock, User, BookOpen } from 'lucide-react';
import { insightsPreviewContent, InsightArticle } from '../../content/insights';

interface InsightsPreviewProps {
  onNavigate: (path: string) => void;
}

export const InsightsPreview: React.FC<InsightsPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] border-b border-slate-200" aria-label="Engineering Insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              PERSPECTIVES & PLAYBOOKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mt-2">
              {insightsPreviewContent.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl">
              {insightsPreviewContent.subheadline}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(insightsPreviewContent.ctaPath)}
            className="mt-4 md:mt-0 text-sm font-semibold text-[#0047BA] hover:text-[#0A2540] flex items-center group cursor-pointer"
          >
            <span>{insightsPreviewContent.ctaText}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 CMS-driven Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsPreviewContent.articles.map((article: InsightArticle) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/insights/${article.slug}`)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header / Graphic Placeholder */}
                <div className="h-44 bg-[#0A1528] p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 font-bold">
                      {article.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readingTime}
                    </span>
                  </div>

                  <div className="z-10">
                    <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#0047BA] transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {article.author.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {article.author.role} • {article.publishedDate}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0047BA] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
