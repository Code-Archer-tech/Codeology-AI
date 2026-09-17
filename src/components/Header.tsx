import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  Bell,
  UserCheck,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  Shield,
} from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { Button } from './ui/Button';
import { MegaMenu } from './MegaMenu';
import { MobileNavigation } from './MobileNavigation';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const {
    currentUser,
    switchPersona,
    logout,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAuth();

  const [solutionsMegaOpen, setSolutionsMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const megaMenuContainerRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const notifsRef = useRef<HTMLDivElement>(null);

  // Scroll detection for compact header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside detection for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuContainerRef.current &&
        !megaMenuContainerRef.current.contains(event.target as Node)
      ) {
        setSolutionsMegaOpen(false);
      }
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setPersonaOpen(false);
      }
      if (notifsRef.current && !notifsRef.current.contains(event.target as Node)) {
        setNotifsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90'
            : 'bg-white border-b border-slate-200/60'
        }`}
      >
        {/* Discrete Corporate Telemetry & Persona Bar */}
        <div className="bg-[#0B1528] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800/80 transition-all">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3 sm:space-x-5">
              <span className="flex items-center text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
                Global NOC: <strong className="text-white ml-1 font-mono">99.99% Operational</strong>
              </span>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:inline text-slate-400">
                SOC 2 Type II & ISO 27001 Certified Enterprise Architecture
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Persona Switcher for verification */}
              <div className="relative" ref={personaRef}>
                <button
                  type="button"
                  onClick={() => setPersonaOpen(!personaOpen)}
                  className="flex items-center space-x-1.5 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-2.5 py-0.5 rounded text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Toggle role switch"
                >
                  <UserCheck className="w-3 h-3 text-sky-400" />
                  <span className="hidden sm:inline">Role:</span>
                  <span className="text-sky-300 font-semibold">{currentUser?.name || 'Guest'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {personaOpen && (
                  <div className="absolute right-0 mt-1.5 w-72 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">
                        Switch Active Role Demo
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Test candidate application, recruiter pipeline & admin controls:
                      </p>
                    </div>

                    {DEMO_PERSONAS.map((p) => {
                      const isSelected = currentUser?.id === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            switchPersona(p.id);
                            setPersonaOpen(false);
                            if (p.role === 'candidate') onNavigate('/candidate/dashboard');
                            else if (p.role === 'recruiter') onNavigate('/recruiter');
                            else if (p.role === 'super_admin' || p.role === 'admin') onNavigate('/admin');
                          }}
                          className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-start justify-between text-xs transition-colors cursor-pointer ${
                            isSelected ? 'bg-sky-50/80' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-semibold text-slate-900">{p.name}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
                            </div>
                            <p className="text-[11px] text-slate-500">{p.title}</p>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                            {p.role}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Notification icon */}
              <div className="relative" ref={notifsRef}>
                <button
                  type="button"
                  onClick={() => setNotifsOpen(!notifsOpen)}
                  className="relative p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-3.5 h-3.5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-sky-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-sky-600 hover:text-sky-800 cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {(!notifications || notifications.length === 0) ? (
                        <p className="p-4 text-xs text-slate-500 text-center">No notifications right now.</p>
                      ) : (
                        (notifications || []).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.link) onNavigate(n.link);
                              setNotifsOpen(false);
                            }}
                            className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                              !n.read ? 'bg-sky-50/40' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-900">{n.title}</span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(n.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={megaMenuContainerRef}>
          <div
            className={`flex items-center justify-between transition-all duration-200 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Logo */}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 bg-[#0A2540] rounded flex items-center justify-center text-white border border-[#0A2540] shadow-2xs group-hover:bg-[#0047BA] transition-colors">
                <span className="font-mono font-bold text-base tracking-tighter text-sky-400">C/</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-950 group-hover:text-[#0047BA] transition-colors">
                    CODEOLOGY
                  </span>
                  <span className="text-xs px-1 py-0.2 bg-slate-100 text-[#0047BA] rounded font-mono font-bold border border-slate-200">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">
                  Enterprise Technology
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* Solutions with Mega Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSolutionsMegaOpen(!solutionsMegaOpen)}
                  onMouseEnter={() => setSolutionsMegaOpen(true)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    currentPath.startsWith('/solutions')
                      ? 'text-[#0047BA] bg-blue-50/60'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      solutionsMegaOpen ? 'rotate-180 text-[#0047BA]' : 'text-slate-400'
                    }`}
                  />
                </button>
              </div>

              {/* Industries */}
              <button
                type="button"
                onClick={() => onNavigate('/industries')}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPath === '/industries'
                    ? 'text-[#0047BA] bg-blue-50/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Industries
              </button>

              {/* Case Studies */}
              <button
                type="button"
                onClick={() => onNavigate('/case-studies')}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPath.startsWith('/case-studies')
                    ? 'text-[#0047BA] bg-blue-50/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Case Studies
              </button>

              {/* Company (links to /about) */}
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPath === '/about'
                    ? 'text-[#0047BA] bg-blue-50/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Company
              </button>

              {/* Insights */}
              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPath.startsWith('/insights')
                    ? 'text-[#0047BA] bg-blue-50/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Insights
              </button>

              {/* Careers */}
              <button
                type="button"
                onClick={() => onNavigate('/careers')}
                className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  currentPath.startsWith('/careers')
                    ? 'text-[#0047BA] bg-blue-50/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Careers</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0047BA] font-bold border border-blue-200">
                  8 Open
                </span>
              </button>
            </nav>

            {/* Right Side CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  {/* Role-Specific Portal Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (currentUser.role === 'candidate') onNavigate('/candidate/dashboard');
                      else if (currentUser.role === 'recruiter') onNavigate('/recruiter');
                      else onNavigate('/admin');
                    }}
                    className="bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold text-xs shadow-xs flex items-center space-x-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-sky-400" />
                    <span>
                      {currentUser.role === 'candidate'
                        ? 'Candidate Portal'
                        : currentUser.role === 'recruiter'
                        ? 'Recruiter Workspace'
                        : 'Admin Console'}
                    </span>
                  </Button>

                  {/* Sign Out Button */}
                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      onNavigate('/login');
                    }}
                    title="Sign Out"
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('/login')}
                    className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('/register')}
                    className="bg-[#0047BA] hover:bg-[#003893] text-white font-semibold text-xs shadow-xs"
                  >
                    Register
                  </Button>
                </div>
              )}

              <div className="h-4 w-px bg-slate-200" />

              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 rounded-md transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* MegaMenu Dropdown */}
          <MegaMenu
            isOpen={solutionsMegaOpen}
            onClose={() => setSolutionsMegaOpen(false)}
            onNavigate={onNavigate}
          />
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={onNavigate}
        currentPath={currentPath}
      />
    </>
  );
};

export const Navbar = Header;
