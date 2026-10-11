import { GraduationCap, ShieldCheck, ChevronRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface RoleSelectProps {
  onSelectStudent: () => void;
  onSelectAdmin: () => void;
  onSignUp: () => void;
}

export default function RoleSelect({ onSelectStudent, onSelectAdmin, onSignUp }: RoleSelectProps) {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between p-6 select-none max-w-md mx-auto">
      {/* Top Brand Mark */}
      <header className="pt-8 flex justify-center">
        <BrandLogo size="lg" variant="dark" showSubtitle={true} />
      </header>

      {/* Main Choice Cards */}
      <main className="my-auto py-8">
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-8 font-display">
          Choose Your Role
        </h1>

        <div className="space-y-4">
          {/* Student Role Card (Red) */}
          <button
            onClick={onSelectStudent}
            className="w-full text-left bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all p-5 rounded-2xl shadow-lg shadow-red-600/20 text-white flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white group-hover:translate-x-0.5 transition-transform">
                Student
              </h2>
              <p className="text-xs text-white/80 mt-0.5 truncate">
                Submit Projects & Get Support
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/90 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Admin / Employee Role Card (White) */}
          <button
            onClick={onSelectAdmin}
            className="w-full text-left bg-white hover:bg-slate-50 active:scale-[0.98] transition-all p-5 rounded-2xl border border-slate-200/90 shadow-sm text-slate-900 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-slate-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-slate-900 group-hover:translate-x-0.5 transition-transform">
                Employe login
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                Manage Proposals & Students
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Bottom Sign Up Link */}
      <footer className="pb-6 text-center text-xs text-slate-500">
        <span>Don't have an account? </span>
        <button
          onClick={onSignUp}
          className="font-bold text-red-600 hover:text-red-700 hover:underline inline-block ml-1"
        >
          Sign Up
        </button>
      </footer>
    </div>
  );
}
