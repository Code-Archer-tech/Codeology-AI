import React from 'react';
import { ShieldAlert, Lock, ArrowRight, RefreshCw, UserCheck } from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { User } from '../types';
import { Button } from './ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<User['role']>;
  requiredPermission?: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  currentPath,
  onNavigate,
}) => {
  const { currentUser, loading, hasPermission, switchPersona, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#0A2540]/20 border-t-[#0A2540] rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-mono tracking-wider">VERIFYING ENTERPRISE CLEARANCE...</p>
      </div>
    );
  }

  // If unauthenticated, prompt or redirect to login
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-4 shadow-2xs">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Authentication Required</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          This portal requires active user credentials. Please sign in to access candidate profiles, interview loops, or corporate requisitions.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate(`/login?redirect=${encodeURIComponent(currentPath)}`)}
            className="bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold flex items-center space-x-2"
          >
            <span>Sign In to Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('/careers')}
          >
            Browse Public Careers
          </Button>
        </div>
      </div>
    );
  }

  // Check Role-Based Access
  const roleAllowed = !allowedRoles || allowedRoles.includes(currentUser.role) || currentUser.role === 'super_admin';
  const permAllowed = !requiredPermission || hasPermission(requiredPermission);

  if (!roleAllowed || !permAllowed) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 shadow-2xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-mono font-semibold mb-2">
          <span>HTTP 403 FORBIDDEN</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Access Restricted</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          Your current role (<strong className="text-slate-800 font-mono uppercase">{currentUser.role}</strong>) does not have authorization to view this workspace.
        </p>

        {allowedRoles && (
          <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-mono">
            Required role(s): {allowedRoles.map((r) => r.toUpperCase()).join(' or ')}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              if (currentUser.role === 'candidate') onNavigate('/candidate/dashboard');
              else if (currentUser.role === 'recruiter') onNavigate('/recruiter');
              else onNavigate('/admin');
            }}
            className="bg-[#0A2540] hover:bg-[#071D33] text-white"
          >
            Go to My Dashboard
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={async () => {
              await logout();
              onNavigate('/login');
            }}
          >
            Sign In with Different Account
          </Button>
        </div>

        {/* Demo switcher helper on 403 */}
        <div className="mt-8 pt-6 border-t border-slate-200 max-w-md w-full">
          <p className="text-xs text-slate-500 mb-2">Reviewer quick-switch to an authorized role:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {DEMO_PERSONAS.map((p) => {
              if (allowedRoles && !allowedRoles.includes(p.role) && p.role !== 'super_admin') return null;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => switchPersona(p.id)}
                  className="px-2.5 py-1 text-xs bg-white hover:bg-sky-50 border border-slate-300 rounded font-mono text-slate-700 hover:text-sky-800 cursor-pointer transition-colors"
                >
                  Switch to {p.name} ({p.role})
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
