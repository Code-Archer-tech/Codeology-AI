import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Server,
  Cloud,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Lock,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#F8F9FB] to-white border-b border-slate-200">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#0047BA] animate-pulse" />
              <span className="font-semibold text-slate-900">ENTERPRISE CLOUD, SECURITY & ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] text-balance">
              Technology that moves <br className="hidden sm:inline" />
              <span className="text-[#0A2540]">business forward.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              We build, secure and scale digital infrastructure and software solutions for businesses ready for what&apos;s next.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Button
                size="lg"
                variant="primary"
                onClick={() => onNavigate('/solutions')}
                className="px-7 py-3.5 text-base font-semibold bg-[#0A2540] hover:bg-[#071D33] text-white shadow-md flex items-center group cursor-pointer"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('/contact?type=consultation')}
                className="px-7 py-3.5 text-base font-semibold border-slate-300 hover:bg-slate-50 text-slate-800 flex items-center group cursor-pointer"
              >
                <span>Talk to an Expert</span>
                <ArrowRight className="w-4 h-4 ml-2 opacity-60 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Subtle verification badges below CTA */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-mono">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0047BA]" />
                <span>99.99% Contractual SLA</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0047BA]" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-[#0047BA]" />
                <span>Zero-Trust Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Technology Visual Composition */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0A1528] p-6 text-slate-200 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Top Bar of Terminal / Architecture Deck */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/90 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  </div>
                  <span className="text-slate-400 ml-2 font-medium">SYS_TOPOLOGY // V4.8</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Architectural Schematic View */}
              <div className="space-y-3 font-mono text-xs">
                {/* Node 1: Multi-Region Ingress & Zero-Trust Mesh */}
                <div className="p-3.5 bg-[#06101E] rounded-lg border border-slate-800 transition-all hover:border-slate-700">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Cloud className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-semibold text-slate-300">MULTI-REGION INGRESS</span>
                    </span>
                    <span className="text-emerald-400 font-bold">0 ms LATENCY DELTA</span>
                  </div>
                  <div className="text-white font-semibold text-sm mt-1.5">
                    Zero-Trust Gateway & Envoy Mesh
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                    <span>AWS us-east-1</span>
                    <span className="text-slate-600">⇄</span>
                    <span>Azure East US</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sky-400">mTLS Verified</span>
                  </div>
                </div>

                {/* Node 2: Distributed Workload Clusters */}
                <div className="p-3.5 bg-[#06101E] rounded-lg border border-slate-800 transition-all hover:border-slate-700">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Server className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-semibold text-slate-300">DISTRIBUTED CLUSTERS</span>
                    </span>
                    <span className="text-slate-400">99.998% RUNTIME</span>
                  </div>
                  <div className="text-white font-semibold text-sm mt-1.5">
                    128 Microservices Pods Active
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ✓ Automated Canary Routing • 0 Unresolved Vulnerabilities
                  </div>
                </div>

                {/* Node 3: Real-Time Telemetry & SOC 2 Continuous Audit */}
                <div className="p-3.5 bg-[#06101E] rounded-lg border border-slate-800 transition-all hover:border-slate-700">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-semibold text-slate-300">CONTINUOUS AUDITING</span>
                    </span>
                    <span className="text-sky-400">SOC 2 / ISO 27001</span>
                  </div>
                  <div className="text-white font-semibold text-sm mt-1.5">
                    MDR Incident Detection & Threat Hunting
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Automated cryptographically signed audit trail logs
                  </div>
                </div>
              </div>

              {/* Bottom Console Status */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span className="flex items-center">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  Health: Operational (Global)
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/solutions')}
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 cursor-pointer"
                >
                  View Full Architecture →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
