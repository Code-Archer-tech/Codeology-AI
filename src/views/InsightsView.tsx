import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Mail,
  User,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { insightsList, featuredInsight } from '../content/insights';

interface InsightsViewProps {
  onNavigate: (path: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [digestEmail, setDigestEmail] = useState('');
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  useEffect(() => {
    document.title = 'Technical Insights & Systems Architecture | Codeology AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Perspectives on technology, architecture and leadership. Rigorous whitepapers, systems teardowns, and engineering management strategies from Codeology AI practitioners.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'All',
    'Architecture',
    'Cloud & DevOps',
    'Security',
    'Engineering Leadership',
    'AI & Data',
  ];

  const filteredInsights = useMemo(() => {
    if (selectedCategory === 'All') return insightsList;
    return insightsList.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleDigestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!digestEmail || !digestEmail.includes('@')) return;
    setDigestSubscribed(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Insights' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">
              ENGINEERING WHITEPAPERS & RESEARCH
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Perspectives on Technology, Architecture and Leadership.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              In-depth research from Codeology AI infrastructure leads and technical directors exploring distributed systems, multi-cloud cost modeling, Zero Trust security, and engineering talent velocity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Insight Hero Banner */}
      <section className="py-16 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="info" size="sm">FEATURED ARCHITECTURAL ESSAY</Badge>
              <span className="text-xs font-mono text-slate-400">
                {featuredInsight.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {featuredInsight.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {featuredInsight.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-sky-400" />
                {featuredInsight.author.name}, {featuredInsight.author.role}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-sky-400" />
                {featuredInsight.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-sky-400" />
                {featuredInsight.readingTime}
              </span>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate(`/insights/${featuredInsight.slug}`)}
                className="bg-[#0047BA] hover:bg-[#00358a] text-white"
              >
                Read Architectural Whitepaper <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Browse By Domain:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0047BA] text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-sky-800 font-semibold uppercase">
                      {insight.category}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {insight.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 leading-snug">
                    {insight.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {insight.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200">
                      {insight.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200">
                      #{insight.category.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    {insight.author.name}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(`/insights/${insight.slug}`)}
                    className="text-[#0047BA] hover:text-[#00358a] p-0 font-mono text-xs"
                  >
                    Read Paper →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Digest Newsletter Box */}
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-slate-50/80 shadow-2xs mt-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono font-bold text-[#0047BA] uppercase tracking-wider block">
                TECHNICAL DIGEST SUBSCRIPTION
              </span>
              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                Receive Quarterly Systems Architecture Teardowns.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct insights on Kubernetes failure modes, multi-cloud FinOps benchmarks, and Zero Trust engineering. No marketing fluff, strictly production lessons.
              </p>

              {digestSubscribed ? (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs sm:text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Thank you. You have been added to the Codeology AI Technical Digest distribution list.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleDigestSubmit} className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
                  <input
                    type="email"
                    required
                    value={digestEmail}
                    onChange={(e) => setDigestEmail(e.target.value)}
                    placeholder="architect@enterprise.com"
                    className="w-full sm:w-80 px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0047BA]"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="bg-[#0047BA] hover:bg-[#00358a] text-white shrink-0"
                  >
                    Subscribe to Digest <Mail className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            COLLABORATE WITH AUTHORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Discuss Your System Challenges With Our Architects.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our published engineers provide direct technical consulting, architectural auditing, and customized talent pods.
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
              onClick={() => onNavigate('/solutions')}
            >
              Explore Practices
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
