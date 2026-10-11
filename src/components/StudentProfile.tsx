import { useState } from 'react';
import { User, Phone, Mail, School, ShieldCheck, LogOut, Edit3, Check, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { StudentUser } from '../types';

interface StudentProfileProps {
  student: StudentUser | null;
  onUpdateStudent?: (updated: StudentUser) => void;
  onLogout: () => void;
  onSwitchToAdmin: () => void;
}

export default function StudentProfile({ student, onUpdateStudent, onLogout, onSwitchToAdmin }: StudentProfileProps) {
  const currentStudent = student || {
    id: '',
    name: '',
    email: '',
    phone: '',
    college: ''
  };

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student?.name || '');
  const [email, setEmail] = useState(student?.email || '');
  const [phone, setPhone] = useState(student?.phone || '');
  const [college, setCollege] = useState(student?.college || '');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateStudent) {
      onUpdateStudent({
        id: currentStudent.id || `student-${Date.now()}`,
        name: name.trim() || 'Student',
        email: email.trim() || '',
        phone: phone.trim() || '',
        college: college.trim() || ''
      });
    }
    setIsEditing(false);
  };

  const faqs = [
    {
      q: 'How does Team Yuktha project guidance work?',
      a: 'Once you submit your project idea, we analyze the problem statement, provide an IEEE base paper, build clean modular source code, and schedule a 1-on-1 code walkthrough + viva defense preparation session.'
    },
    {
      q: 'Why are our charges minimal and student-friendly?',
      a: 'We are four independent software engineers, not a commercial training institute. We keep minimal overhead and quote affordable student rates between ₹1,499 and ₹2,499.'
    },
    {
      q: 'What if my college guide asks for changes?',
      a: 'All project modifications requested by your internal college guide or external reviewer are fully supported until your final university submission.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between">
        <h1 className="text-base font-bold text-slate-900 font-display">
          Student Profile
        </h1>
        <button
          onClick={onLogout}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-semibold cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </header>

      <main className="p-4 sm:p-5 max-w-lg mx-auto space-y-4">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-lg font-display shadow-md shadow-red-600/20">
                {currentStudent.name ? currentStudent.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {currentStudent.name || 'Student Account'}
                </h2>
                <p className="text-xs text-slate-500">
                  {currentStudent.college || 'Academic Batch 2026'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-red-600 hover:bg-red-50 p-2 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">College & Branch</label>
                <input
                  type="text"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  placeholder="e.g. CBIT - CSE"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 placeholder:text-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </form>
          ) : (
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className={currentStudent.phone ? 'text-slate-700' : 'text-slate-400 italic'}>
                  {currentStudent.phone || 'Phone not set (Click Edit to add)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className={currentStudent.email ? 'text-slate-700' : 'text-slate-400 italic'}>
                  {currentStudent.email || 'Email not set (Click Edit to add)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-slate-400" />
                <span className={currentStudent.college ? 'text-slate-700' : 'text-slate-400 italic'}>
                  {currentStudent.college || 'College not set (Click Edit to add)'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Academic Mentorship Notice (No WhatsApp button on main screen) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <School className="w-4 h-4 text-red-600" />
            <span>Academic Batch 2026 Mentorship</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Personalized project guidance, IEEE documentation review, and viva coaching are activated directly once your proposal is submitted.
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full text-left p-3 text-xs font-semibold text-slate-800 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === i ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                </button>
                {expandedFaq === i && (
                  <div className="px-3 pb-3 text-[11px] text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Switch to Admin Portal Button */}
        <div className="pt-2">
          <button
            onClick={onSwitchToAdmin}
            className="w-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span>Switch to Team Yuktha Admin Portal</span>
          </button>
        </div>
      </main>
    </div>
  );
}
