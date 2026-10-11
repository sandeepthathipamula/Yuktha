import { X, Check, ShieldCheck, Zap, BookOpen, Code, GraduationCap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  onSelectPlan?: (planTitle: string, price: number) => void;
}

export default function PricingModal({ isOpen, onClose, isAdmin = false, onSelectPlan }: PricingModalProps) {
  if (!isOpen) return null;

  const tiers = [
    {
      title: 'Academic Minor Project',
      price: 1499,
      subtitle: '3rd Year / Mini Project Guidance',
      badge: 'Student Friendly',
      features: [
        'Complete executable source code',
        'College synopsis (4-6 pages) in Word format',
        'Step-by-step local setup and execution guide',
        'Basic viva Q&A defense document',
        'Review window within 1 hour'
      ]
    },
    {
      title: 'Final Year Major Project',
      price: 2499,
      subtitle: 'Final Year B.Tech / MCA / Degree',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Complete source code with clean architecture',
        'Publication-ready IEEE 2-column paper report',
        'UML diagrams, flowcharts & system design',
        'PPT presentation deck (15-20 slides)',
        '1-on-1 viva defense coaching with founders',
        'Direct WhatsApp support till final external viva'
      ]
    },
    {
      title: 'Fast-Track IEEE Documentation',
      price: 1999,
      subtitle: 'Documentation & Base Paper Focus',
      badge: 'Express 24h',
      features: [
        'IEEE standard double-column conference format',
        'Turnitin plagiarism check (<10% similarity)',
        'Literature survey with minimum 8 base citations',
        'System architecture & mathematical model',
        'PPT presentation deck & examiner talking points'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full inline-block mb-2">
            Team Yuktha Guarantee
          </span>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Minimal & Reasonable Student Rates
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Zero hidden charges. Transparent pricing designed specifically for engineering and degree college students.
          </p>
        </div>

        <div className="space-y-3.5 mb-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                tier.popular
                  ? 'border-red-600 bg-red-50/20 shadow-md ring-1 ring-red-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {tier.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tier.popular ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-red-600 font-mono">
                    ₹{tier.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    All-inclusive
                  </span>
                </div>
              </div>

              <ul className="mt-3 space-y-1.5 pt-3 border-t border-slate-100/80 text-xs text-slate-600">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {onSelectPlan && (
                <button
                  onClick={() => {
                    onSelectPlan(tier.title, tier.price);
                    onClose();
                  }}
                  className={`w-full mt-3 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    tier.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Choose {tier.title}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Transparent Pricing Note (No WhatsApp on main screen) */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All prices include complete source code, college synopsis, PPT presentation, and 1-on-1 viva defense coaching.
          </p>
        </div>
      </div>
    </div>
  );
}
