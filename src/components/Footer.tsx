import React from 'react';
import { Shield, Award, Lock, Globe2, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../content/siteConfig';
import { solutionsContent } from '../content/solutions';
import { industriesContent } from '../content/industries';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#06101E] text-slate-400 border-t border-slate-900 pt-16 pb-12" aria-label="Enterprise Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: 5 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-900">
          {/* Column 1: CODEOLOGY AI & Description */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-8 h-8 bg-[#0A2540] rounded flex items-center justify-center text-white font-mono font-bold text-sm border border-slate-800 group-hover:bg-[#0047BA] transition-colors">
                <span className="text-sky-400">C/</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                CODEOLOGY <span className="text-[#0047BA]">AI</span>
              </span>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We build, secure and scale mission-critical digital infrastructure and software solutions for enterprises ready for what&apos;s next. Delivering 24/7 NOC resilience, multi-cloud engineering, zero-trust security, and embedded talent pods.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              <span className="inline-flex items-center px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                <Shield className="w-3.5 h-3.5 mr-1 text-sky-400" /> SOC 2 Type II
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                <Lock className="w-3.5 h-3.5 mr-1 text-sky-400" /> ISO 27001
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                <Award className="w-3.5 h-3.5 mr-1 text-sky-400" /> HIPAA / HITECH
              </span>
            </div>
          </div>

          {/* Column 2: Solutions (all 8) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              {solutionsContent.map((sol) => (
                <li key={sol.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/solutions/${sol.slug}`)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {sol.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries (all 8) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">
              Industries
            </h4>
            <ul className="space-y-2 text-xs">
              {industriesContent.map((ind) => (
                <li key={ind.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/industries/${ind.slug}`)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about#leadership')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Leadership
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/careers')}
                  className="hover:text-white transition-colors text-left flex items-center text-sky-400 font-semibold cursor-pointer"
                >
                  <span>Careers</span>
                  <span className="text-[10px] ml-1.5 px-1 bg-sky-950 text-sky-300 rounded font-mono border border-sky-800">
                    8 Open
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact & HQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact?type=security')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Security & Trust Center
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources & Talent Platform */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">
              Resources & ATS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/case-studies')}
                  className="hover:text-white transition-colors text-left flex items-center cursor-pointer"
                >
                  <span>Case Studies</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/insights')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Engineering Insights
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/candidate/dashboard')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Candidate Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/recruiter')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Recruiter Workspace
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Admin Operations
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Operations & Legal Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center text-slate-400">
              <Globe2 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Global Engineering Hubs:
            </span>
            <span>San Francisco (HQ)</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>Austin</span>
            <span>•</span>
            <span>London</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 text-slate-400">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-mono"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Policies & Copyright */}
        <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => onNavigate('/contact')} className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onNavigate('/contact')} className="hover:text-slate-300 cursor-pointer">
              Terms of Service
            </button>
            <button type="button" onClick={() => onNavigate('/contact')} className="hover:text-slate-300 cursor-pointer">
              Cookie Policy
            </button>
            <button type="button" onClick={() => onNavigate('/contact')} className="hover:text-slate-300 cursor-pointer">
              Accessibility Statement
            </button>
          </div>
        </div>

        {/* Ethical AI and Employment compliance note */}
        <div className="mt-6 p-3 bg-slate-900/60 rounded border border-slate-900 text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400 font-mono">Ethical AI & Global Compliance:</strong> Automated resume parsing, candidate scoring, and diagnostic heuristics operate in strict adherence with EEOC, GDPR, and California automated decision-making frameworks. All employment assessments and customer infrastructure modifications remain supervised by certified human engineers.
        </div>
      </div>
    </footer>
  );
};
