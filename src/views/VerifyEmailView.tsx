import React, { useState, useEffect } from 'react';
import { MailCheck, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';

interface VerifyEmailViewProps {
  onNavigate: (path: string) => void;
}

export const VerifyEmailView: React.FC<VerifyEmailViewProps> = ({ onNavigate }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const verifyWithToken = async (t: string) => {
    if (!t.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await api.verifyEmail(t.trim());
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Verification token invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      verifyWithToken(tokenParam);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyWithToken(token);
  };

  return (
    <div className="min-h-[80vh] bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0A2540] text-sky-400 font-mono font-bold text-xl mb-4 shadow-sm">
          C/
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Verify Email Address
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Confirming your identity ensures security across candidate submissions and recruiting pipelines.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10 shadow-sm rounded-xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-3">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Successfully Verified</h3>
              <p className="text-xs text-slate-600">
                Your email address is now verified. You can proceed to your candidate portal.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/candidate/dashboard')}
                className="w-full bg-[#0A2540] hover:bg-[#071D33] text-white font-semibold py-2.5 rounded-lg mt-4"
              >
                Go to Candidate Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Verification Token
                </label>
                <input
                  id="token"
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste email token here"
                  className="mt-1 block w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0047BA] focus:border-transparent"
                />
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
                    <MailCheck className="w-4 h-4" />
                    <span>Verify Account</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cryptographically Signed One-Time Verification Tokens</span>
        </div>
      </div>
    </div>
  );
};
