import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

interface LoginViewProps {
  onNavigate: (path: string) => void;
  redirectUrl?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, redirectUrl }) => {
  const { login, switchPersona } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setError('Please enter your work or candidate email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email.trim(), password, rememberMe);
      setSuccessMsg(`Welcome back, ${res.user.name}. Redirecting to your portal...`);

      const target = redirectUrl || res.redirectUrl || (
        res.user.role === 'candidate'
          ? '/candidate/dashboard'
          : res.user.role === 'recruiter'
          ? '/recruiter'
          : res.user.role === 'hr_manager' || res.user.role === 'admin' || res.user.role === 'super_admin'
          ? '/admin'
          : '/careers'
      );

      setTimeout(() => {
        onNavigate(target);
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoEmail: string, demoRole: string) => {
    setEmail(demoEmail);
    setPassword('Codeology2026!#Secure');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0A2540] text-sky-400 font-mono font-bold text-xl mb-4 shadow-sm">
          C/
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Enterprise Portal Sign In
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Single gateway for candidates, recruiters, and engineering leaders
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10 shadow-sm rounded-xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-3 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Authentication Error</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Work or Registered Email
              </label>
              <div className="mt-1.5 relative rounded-md shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com or candidate@domain.com"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0047BA] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Security Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('/forgot-password')}
                  className="text-xs font-medium text-[#0047BA] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-1.5 relative rounded-md shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0047BA] focus:border-transparent transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#0047BA] focus:ring-[#0047BA] border-slate-300 rounded cursor-pointer"
                />
                <span className="ml-2 text-xs text-slate-600">Keep me authenticated (30 days)</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Credentials Switcher for Reviewers */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>1-Click Verified Role Pre-fills</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('elena.rostova@cloudscale.io', 'candidate')}
                className="p-2 text-left text-xs bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-md transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 block">Elena Rostova</span>
                <span className="text-[10px] text-slate-500 font-mono">Candidate</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('marcus.vance@codeologyai.com', 'recruiter')}
                className="p-2 text-left text-xs bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-md transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 block">Marcus Vance</span>
                <span className="text-[10px] text-slate-500 font-mono">Recruiter</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('sarah.jenkins@codeologyai.com', 'hr_manager')}
                className="p-2 text-left text-xs bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-md transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 block">Sarah Jenkins</span>
                <span className="text-[10px] text-slate-500 font-mono">HR Manager</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('admin@codeologyai.com', 'super_admin')}
                className="p-2 text-left text-xs bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-md transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 block">David Sterling</span>
                <span className="text-[10px] text-slate-500 font-mono">Super Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            Don't have a candidate account yet?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/register')}
              className="font-bold text-[#0047BA] hover:underline"
            >
              Register as a Candidate
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>FIPS 140-2 Salted Hashing & SOC 2 Compliant Session Storage</span>
        </div>
      </div>
    </div>
  );
};
