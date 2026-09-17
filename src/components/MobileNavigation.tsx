import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronDown,
  ArrowRight,
  Server,
  Cloud,
  ShieldCheck,
  Code2,
  Cpu,
  TrendingUp,
  Users,
  Sparkles,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { solutionsContent } from '../content/solutions';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { Button } from './ui/Button';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const iconMap = {
  Server: Server,
  Cloud: Cloud,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
  Users: Users,
  Sparkles: Sparkles,
};

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPath,
}) => {
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [personaExpanded, setPersonaExpanded] = useState(false);
  const { currentUser, switchPersona } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onNavigate('/');
                onClose();
              }}
              className="flex items-center space-x-2.5 text-left"
            >
              <div className="w-8 h-8 bg-[#0A2540] rounded flex items-center justify-center text-white">
                <span className="font-mono font-bold text-sm tracking-tighter text-sky-400">C/</span>
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-950">
                CODEOLOGY <span className="text-[#0047BA]">AI</span>
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {/* Solutions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setSolutionsExpanded(!solutionsExpanded)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                  currentPath.startsWith('/solutions')
                    ? 'text-[#0047BA] bg-blue-50/50'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    solutionsExpanded ? 'rotate-180 text-[#0047BA]' : ''
                  }`}
                />
              </button>

              {solutionsExpanded && (
                <div className="pl-3 pr-1 py-2 space-y-1 border-l-2 border-slate-200 ml-3 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('/solutions');
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-[#0047BA] hover:underline"
                  >
                    View All Solutions Overview →
                  </button>

                  {solutionsContent.map((sol) => {
                    const IconComponent = iconMap[sol.iconName] || Server;
                    return (
                      <button
                        key={sol.id}
                        type="button"
                        onClick={() => {
                          onNavigate(`/solutions/${sol.slug}`);
                          onClose();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-slate-100 text-left text-xs transition-colors min-h-[44px]"
                      >
                        <div className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{sol.title}</span>
                          <span className="text-[11px] text-slate-500 line-clamp-1">
                            {sol.shortDescription}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other standard nav links */}
            <button
              type="button"
              onClick={() => {
                onNavigate('/industries');
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                currentPath === '/industries'
                  ? 'text-[#0047BA] bg-blue-50/50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Industries
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('/case-studies');
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                currentPath.startsWith('/case-studies')
                  ? 'text-[#0047BA] bg-blue-50/50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Case Studies
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('/about');
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                currentPath === '/about'
                  ? 'text-[#0047BA] bg-blue-50/50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Company
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('/insights');
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                currentPath.startsWith('/insights')
                  ? 'text-[#0047BA] bg-blue-50/50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Insights
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('/careers');
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                currentPath.startsWith('/careers')
                  ? 'text-[#0047BA] bg-blue-50/50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Careers</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-[#0047BA] font-bold font-mono">
                8 Open
              </span>
            </button>
          </nav>
        </div>

        {/* Footer & Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
          {/* Persona Switcher Accordion for Mobile */}
          <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setPersonaExpanded(!personaExpanded)}
              className="w-full flex items-center justify-between p-2.5 text-xs text-slate-700 hover:bg-slate-50 min-h-[44px]"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-900">
                  {currentUser ? `User: ${currentUser.name}` : 'Not Signed In'}
                </span>
                {currentUser && (
                  <span className="text-[10px] px-1 bg-slate-100 rounded text-slate-600 font-mono">
                    {currentUser.role}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  personaExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {personaExpanded && (
              <div className="p-2 border-t border-slate-100 space-y-1 bg-slate-50">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider px-2 py-1">Quick Role Switch</p>
                {DEMO_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      switchPersona(p.id);
                      setPersonaExpanded(false);
                      if (p.role === 'candidate') onNavigate('/candidate/dashboard');
                      else if (p.role === 'recruiter') onNavigate('/recruiter');
                      else if (p.role === 'super_admin' || p.role === 'admin') onNavigate('/admin');
                      onClose();
                    }}
                    className={`w-full text-left p-2 rounded text-xs flex justify-between items-center min-h-[44px] ${
                      currentUser?.id === p.id ? 'bg-blue-50 text-[#0047BA] font-bold' : 'hover:bg-white'
                    }`}
                  >
                    <span>{p.name} ({p.role})</span>
                    {currentUser?.id === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0047BA]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (currentUser.role === 'candidate') onNavigate('/candidate/dashboard');
                  else if (currentUser.role === 'recruiter') onNavigate('/recruiter');
                  else onNavigate('/admin');
                  onClose();
                }}
                className="w-full font-semibold bg-[#0A2540] hover:bg-[#071D33] text-white min-h-[44px]"
              >
                Go to Portal
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={async () => {
                  await (useAuth as any)().logout();
                  onNavigate('/login');
                  onClose();
                }}
                className="w-full font-semibold border-rose-200 text-rose-700 hover:bg-rose-50 min-h-[44px]"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  onNavigate('/login');
                  onClose();
                }}
                className="w-full font-semibold border-slate-300 min-h-[44px]"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onNavigate('/register');
                  onClose();
                }}
                className="w-full font-semibold bg-[#0047BA] hover:bg-[#00358a] text-white min-h-[44px]"
              >
                Register
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                onNavigate('/contact');
                onClose();
              }}
              className="w-full font-semibold border-slate-300 min-h-[44px]"
            >
              Contact Us
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onNavigate('/contact?type=consultation');
                onClose();
              }}
              className="w-full font-semibold bg-[#0A2540] hover:bg-[#071D33] text-white min-h-[44px]"
            >
              Talk to Expert →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
