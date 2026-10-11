import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { ADMIN_CREDENTIALS } from '../data/mockData';
import { AdminUser } from '../types';

interface AdminLoginProps {
  onBack: () => void;
  onLoginSuccess: (admin: AdminUser) => void;
  onGoToStudentPortal: () => void;
}

export default function AdminLogin({ onBack, onLoginSuccess, onGoToStudentPortal }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const matched = ADMIN_CREDENTIALS.find(
      cred =>
        (cred.user.username.toLowerCase() === inputUser || cred.user.name.toLowerCase() === inputUser) &&
        cred.pass === inputPass
    );

    if (matched) {
      onLoginSuccess(matched.user);
    } else {
      setErrorMessage('Invalid username or password. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between p-6 select-none max-w-md mx-auto">
      {/* Top Navigation */}
      <header className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          YUKTHA PORTAL
        </span>
      </header>

      {/* Main Login Form Area */}
      <main className="my-auto py-6">
        <div className="flex justify-center mb-6">
          <BrandLogo size="lg" variant="dark" showSubtitle={true} />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Login
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in with your credentials to continue
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username or Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username or email"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                rememberMe ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span
              onClick={() => setRememberMe(!rememberMe)}
              className="text-xs text-slate-600 cursor-pointer select-none"
            >
              Remember me
            </span>
          </div>

          {/* Login Button (Matches Screenshot 8) */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-red-600/30 text-sm flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </main>

      {/* Footer Link (Matches Screenshot 8) */}
      <footer className="pb-4 text-center text-xs text-slate-500">
        <span>Looking for Student Portal? </span>
        <button
          onClick={onGoToStudentPortal}
          className="font-bold text-red-600 hover:text-red-700 hover:underline inline-block ml-1"
        >
          Go here
        </button>
      </footer>
    </div>
  );
}
