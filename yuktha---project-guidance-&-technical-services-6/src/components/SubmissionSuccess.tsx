import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, MessageCircle, Mail, ArrowRight, Compass } from 'lucide-react';
import { Proposal } from '../types';
import { getProposalWhatsAppUrl } from '../utils/whatsapp';

interface SubmissionSuccessProps {
  proposal: Proposal;
  onGoToSubmissions: () => void;
  onExploreProjects: () => void;
}

export default function SubmissionSuccess({
  proposal,
  onGoToSubmissions,
  onExploreProjects
}: SubmissionSuccessProps) {
  useEffect(() => {
    // Confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#dc2626', '#ef4444', '#10b981', '#f59e0b', '#3b82f6']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#dc2626', '#ef4444', '#10b981', '#f59e0b', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const whatsappUrl = getProposalWhatsAppUrl(proposal.refId, proposal.title, proposal.studentName);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-6 select-none max-w-md mx-auto relative overflow-hidden">
      {/* Subtle decorative background bursts */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-red-500" />
        <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-emerald-500" />
        <div className="absolute top-1/2 left-16 w-2 h-2 rounded-full bg-amber-400" />
        <div className="absolute bottom-1/3 right-8 w-2.5 h-2.5 rounded-full bg-blue-500" />
      </div>

      <div className="my-auto py-8 flex flex-col items-center text-center relative z-10">
        {/* Large Checkmark Badge (Matches Screenshot 6) */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center animate-bounce-short">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display mb-2">
          Project Proposal Submitted Successfully!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-8">
          Our team will review your proposal and contact you within 1 hour.
        </p>

        {/* WhatsApp Alert Card (Matches Screenshot 6) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200/90 rounded-2xl p-4 text-left flex items-center gap-3.5 shadow-sm transition-all group mb-3.5"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                Chat / Alert Team on WhatsApp
              </h2>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                Instant
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Connect in WhatsApp for fastest review
            </p>
          </div>
        </a>

        {/* Registered Email Card (Matches Screenshot 6) */}
        <div className="w-full bg-red-50/40 border border-red-100 rounded-2xl p-4 text-left flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 leading-snug">
              You will also receive a confirmation message on your registered email.
            </p>
            <p className="text-[11px] font-mono text-red-600 mt-1 font-bold">
              Ref ID: {proposal.refId}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons (Matches Screenshot 6) */}
      <div className="space-y-3 pb-4 relative z-10">
        <button
          onClick={onGoToSubmissions}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-red-600/30 text-sm flex items-center justify-center gap-2 transition-all"
        >
          <span>Go to My Submissions</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onExploreProjects}
          className="w-full bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4 text-slate-500" />
          <span>Explore More Projects</span>
        </button>
      </div>
    </div>
  );
}
