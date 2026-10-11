import { useState } from 'react';
import { X, Check, MessageCircle, Phone, Mail, School, Clock, FileText, ArrowRight } from 'lucide-react';
import { Proposal, ProposalStatus } from '../types';
import { getStudentWhatsAppUrl, getYukthaWhatsAppUrl } from '../utils/whatsapp';

interface AdminProposalModalProps {
  proposal: Proposal | null;
  onClose: () => void;
  onUpdateProposal: (updated: Proposal) => void;
  onDeleteProposal?: (id: string) => void;
}

export default function AdminProposalModal({
  proposal,
  onClose,
  onUpdateProposal,
  onDeleteProposal
}: AdminProposalModalProps) {
  if (!proposal) return null;

  const [status, setStatus] = useState<ProposalStatus>(proposal.status);
  const [fee, setFee] = useState<number>(proposal.guidanceCharges);
  const [teamUpdate, setTeamUpdate] = useState<string>(proposal.teamUpdate);
  const [reviewWindow, setReviewWindow] = useState<string>(proposal.reviewWindow);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated: Proposal = {
      ...proposal,
      status,
      guidanceCharges: Number(fee) || 1499,
      teamUpdate: teamUpdate.trim() || 'Team Yuktha is currently reviewing requirements.',
      reviewWindow: reviewWindow.trim() || 'Within 1 Hour'
    };
    onUpdateProposal(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const statusOptions: ProposalStatus[] = ['New', 'Contacted', 'In Review', 'Converted', 'Completed'];

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

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
            {proposal.projectType}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {proposal.refId}
          </span>
        </div>

        <h2 className="text-lg font-bold text-slate-900 font-display mb-1 pr-6">
          {proposal.title}
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{proposal.submittedAt}</span>
        </div>

        {/* Student Contact Bar */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">{proposal.studentName}</span>
            <span className="text-[11px] text-slate-500">{proposal.college}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {proposal.studentPhone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {proposal.studentEmail}
            </span>
          </div>
        </div>

        {/* Description & Tech */}
        <div className="space-y-3 mb-5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Student Requirement Description
            </label>
            <p className="p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100 leading-relaxed">
              {proposal.description}
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Technologies
            </label>
            <p className="p-2.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-100 font-mono text-[11px]">
              {proposal.technologies}
            </p>
          </div>
        </div>

        {/* Admin Controls: Status & Fee */}
        <div className="p-4 bg-red-50/40 border border-red-100 rounded-2xl space-y-3.5 mb-5 text-xs">
          <h3 className="font-bold text-red-900 uppercase tracking-wider text-[11px]">
            Team Yuktha Action & Pricing
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Proposal Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as ProposalStatus)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 font-semibold text-slate-800"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Quoted Fee (₹)
              </label>
              <input
                type="number"
                value={fee}
                onChange={e => setFee(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 font-mono font-bold text-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Update Note for Student (Visible in Student Submissions)
            </label>
            <textarea
              rows={2}
              value={teamUpdate}
              onChange={e => setTeamUpdate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-slate-800 resize-none text-xs"
            />
          </div>
        </div>

        {/* Direct WhatsApp actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <a
            href={getStudentWhatsAppUrl(proposal.studentPhone, proposal.studentName, proposal.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat with Student</span>
          </a>

          <a
            href={getYukthaWhatsAppUrl(`Admin notice: Reviewing proposal "${proposal.title}" for student ${proposal.studentName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-slate-600" />
            <span>Alert Team (9701369352)</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-red-600/30 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <span>Save Changes & Update Student</span>
            )}
          </button>

          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              type="button"
              onClick={() => {
                const summary = `Proposal: ${proposal.title}\nRef: ${proposal.refId}\nStudent: ${proposal.studentName} (${proposal.studentPhone})\nCollege: ${proposal.college}\nStatus: ${status}\nFee: ₹${fee}`;
                navigator.clipboard.writeText(summary);
                alert('Proposal summary copied to clipboard!');
              }}
              className="text-slate-500 hover:text-slate-800 text-[11px] font-medium cursor-pointer"
            >
              Copy Summary
            </button>

            {onDeleteProposal && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete proposal "${proposal.title}"?`)) {
                    onDeleteProposal(proposal.id);
                    onClose();
                  }
                }}
                className="text-red-500 hover:text-red-700 text-[11px] font-semibold cursor-pointer"
              >
                Delete Proposal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
