import React, { useEffect } from 'react';
import {
  Shield,
  Award,
  Users,
  Globe2,
  CheckCircle2,
  Terminal,
  Cpu,
  ArrowRight,
  MapPin,
  Building,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { aboutLeadership, aboutPrinciples, companyMilestones } from '../content/about';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'About Codeology AI | 25+ Years of Systems Engineering';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Engineering the infrastructure of the future. Built on 25+ years of systems engineering excellence, Codeology AI builds resilient enterprise backbones and embeds the elite technical talent to scale them.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About Us' }]} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-linear-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="info" size="sm">
              ENGINEERING HERITAGE // 25+ YEARS
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Engineering the Infrastructure of the Future.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Codeology AI was founded on a singular premise: world-class infrastructure and world-class engineering talent are inseparable. We build resilient technical backbones and embed the engineers who manage them.
            </p>
          </div>
        </div>
      </section>

      {/* The Story & Origin */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
                ORIGIN & PERSPECTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Built by Practicing Architects, Not Generalist Consultants.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  Most enterprise technology consultancies operate on a pyramid model: senior partners sell the project, then delegate execution to junior recruits with minimal production experience.
                </p>
                <p>
                  Codeology AI was deliberately structured differently. Our leadership consists of practicing systems architects, security specialists, and SRE principals who have spent decades managing high-throughput distributed backplanes under live fire.
                </p>
                <p>
                  Whether we are executing a zero-downtime multi-cloud migration, hardening a hospital network against ransomware, or placing a specialized distributed systems architect, we apply engineering rigor over marketing polish.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">25+</div>
                  <div className="text-xs text-slate-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">99.999%</div>
                  <div className="text-xs text-slate-500">Core Uptime Target</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">100%</div>
                  <div className="text-xs text-slate-500">Client IP Ownership</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-8 rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-xl space-y-6">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                  CORPORATE MILESTONES & PEDIGREE
                </span>
                <div className="space-y-4">
                  {companyMilestones.map((m, idx) => (
                    <div key={idx} className="pb-4 border-b border-slate-800 last:border-0 last:pb-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sky-400 font-bold text-sm">{m.year}</span>
                        <span className="text-xs text-slate-400 font-mono">{m.highlight}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Principles */}
      <section className="py-20 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              THE CODEOLOGY AI CREED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Our Four Technical Principles.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Non-negotiable operational standards that guide every architecture review, code commit, and candidate assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutPrinciples.map((principle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0047BA] font-mono font-bold flex items-center justify-center text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{principle.title}</h3>
                <p className="text-xs text-sky-800 font-semibold">{principle.motto}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Senior Engineering Team */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
              TECHNICAL STEWARDSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Practice Leadership & Senior Architects.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Direct technical oversight on every engagement. No junior bait-and-switch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutLeadership.map((leader, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-sky-800 uppercase block">
                    {leader.domain}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950">{leader.name}</h3>
                  <div className="text-xs font-semibold text-slate-500">{leader.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">{leader.bio}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Pedigree:</span>
                  <span className="text-slate-800 font-semibold">{leader.pedigree}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach & Presence */}
      <section className="py-20 border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
              GLOBAL OPERATING FOOTPRINT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Engineering Centers & Regional Hubs.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Headquartered with distributed architectural delivery hubs across the Americas, Europe, and Asia-Pacific.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <MapPin className="w-6 h-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">San Francisco</h3>
              <p className="text-xs text-slate-400">Global Headquarters & Systems Research Lab</p>
              <div className="text-xs font-mono text-sky-300">PST / UTC-8</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <MapPin className="w-6 h-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">London</h3>
              <p className="text-xs text-slate-400">EMEA Financial Systems & Compliance Office</p>
              <div className="text-xs font-mono text-sky-300">GMT / UTC+0</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <MapPin className="w-6 h-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">Zurich</h3>
              <p className="text-xs text-slate-400">Security Research & Zero-Trust Architecture</p>
              <div className="text-xs font-mono text-sky-300">CET / UTC+1</div>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <MapPin className="w-6 h-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">Singapore</h3>
              <p className="text-xs text-slate-400">APAC Cloud Operations & NOC Hub</p>
              <div className="text-xs font-mono text-sky-300">SGT / UTC+8</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047BA] font-mono">
            COLLABORATE WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Work With Practicing Systems Engineers.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether architecting critical infrastructure or scaling your specialized engineering organization, our senior leaders are ready to assist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="bg-[#0047BA] hover:bg-[#00358a] text-white"
            >
              Contact Our Leadership <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/solutions')}
            >
              Explore Solutions Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
