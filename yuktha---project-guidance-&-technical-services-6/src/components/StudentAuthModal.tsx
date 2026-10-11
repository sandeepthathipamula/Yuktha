import { useState } from 'react';
import { X, GraduationCap, ArrowRight } from 'lucide-react';
import { StudentUser } from '../types';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentUser) => void;
}

export default function StudentAuthModal({ isOpen, onClose, onLoginSuccess }: StudentAuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student: StudentUser = {
      id: `student-${Date.now()}`,
      name: name.trim() || 'Student',
      email: email.trim() || 'student@yuktha.com',
      phone: phone.trim() || '9701369352',
      college: college.trim() || 'Engineering College'
    };
    onLoginSuccess(student);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {isSignUp ? 'Student Registration' : 'Student Access'}
            </h3>
            <p className="text-xs text-slate-500">
              Submit proposals & track guidance status
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp / Mobile Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="10-digit number (e.g. 9701369352)"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              College & Branch
            </label>
            <input
              type="text"
              required
              value={college}
              onChange={e => setCollege(e.target.value)}
              placeholder="e.g. CBIT, Hyderabad - CSE"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl shadow-md shadow-red-600/20 flex items-center justify-center gap-2 text-sm transition-all"
          >
            <span>{isSignUp ? 'Create Student Account' : 'Continue to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-600 hover:text-red-600 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'New student? Register here'}
          </button>
        </div>
      </div>
    </div>
  );
}
