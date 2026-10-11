import { useState } from 'react';
import { ArrowLeft, Plus, Clock, FileText, ChevronRight, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Proposal, StudentUser } from '../types';

interface MySubmissionsProps {
  proposals: Proposal[];
  currentUser?: StudentUser | null;
  onBack: () => void;
  onNewProposal: () => void;
}

export default function MySubmissions({
  proposals,
  currentUser,
  onBack,
  onNewProposal
}: MySubmissionsProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'New':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Contacted':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'In Review':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Converted':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Completed':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const copyRefId = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopiedRef(refId);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const studentName = currentUser?.name || (proposals.length > 0 ? proposals[0].studentName : 'Student Account');
  const studentCollege = currentUser?.college || (proposals.length > 0 ? proposals[0].college : 'Academic Batch 2026');

  const filtered = proposals.filter(p => statusFilter === 'All' || p.status === statusFilter);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Top Header (Matches Screenshot 7) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 font-display">
            My Submissions
          </h1>
        </div>
        <button
          onClick={onNewProposal}
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </header>

      <main className="p-4 sm:p-5 max-w-lg mx-auto space-y-4">
        {/* STUDENT ACCOUNT Card (Matches Screenshot 7) */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              STUDENT ACCOUNT
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {studentName}
            </h2>
            <p className="text-xs text-slate-500">
              {studentCollege}
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full">
            {proposals.length} Proposals
          </span>
        </section>

        {/* Filter Pills */}
        {proposals.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['All', 'New', 'Contacted', 'In Review', 'Converted', 'Completed'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}

        {/* Proposals List (Matches Screenshot 7) */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No Proposals in this Filter
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Submit your academic project requirements to get IEEE guidance and source code walkthrough from Team Yuktha.
            </p>
            <button
              onClick={onNewProposal}
              className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all hover:bg-red-700 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Project Proposal</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(proposal => (
              <article
                key={proposal.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 hover:border-slate-300 transition-colors"
              >
                {/* Header row: Project Type + Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {proposal.projectType.toUpperCase()}
                    </span>
                    <button
                      onClick={() => copyRefId(proposal.refId)}
                      className="text-[10px] font-mono text-slate-500 hover:text-red-600 bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer"
                      title="Copy Reference ID"
                    >
                      {copiedRef === proposal.refId ? 'Copied!' : proposal.refId}
                    </button>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {proposal.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Submitted: {proposal.submittedAt}</span>
                  </div>
                </div>

                {/* 2-column info block: Guidance Charges & Review Window */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      Guidance Charges
                    </span>
                    <span className="text-base font-extrabold text-red-600 font-mono">
                      ₹{proposal.guidanceCharges.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      Review Window
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {proposal.reviewWindow}
                    </span>
                  </div>
                </div>

                {/* Yuktha Team Update callout (Matches Screenshot 7) */}
                <div className="bg-red-50/50 border border-red-100/90 rounded-xl p-3 text-xs leading-relaxed">
                  <span className="font-bold text-red-700">
                    Yuktha Team Update:
                  </span>{' '}
                  <span className="text-slate-700">
                    {proposal.teamUpdate}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProposal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pr-8 mb-4">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(selectedProposal.status)}`}>
                {selectedProposal.status}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedProposal.refId}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              {selectedProposal.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Submitted: {selectedProposal.submittedAt}
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Project Description:
                </span>
                <p className="bg-slate-50 p-3 rounded-xl text-slate-700 border border-slate-100 leading-relaxed">
                  {selectedProposal.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Required Technologies:
                </span>
                <p className="bg-slate-50 p-2.5 rounded-xl text-slate-800 border border-slate-100 font-mono text-[11px]">
                  {selectedProposal.technologies}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Project Category</span>
                  <span className="font-bold text-slate-800">{selectedProposal.projectType}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Expected Date</span>
                  <span className="font-bold text-slate-800">{selectedProposal.expectedDate}</span>
                </div>
              </div>

              <div className="bg-red-50/70 border border-red-100 rounded-xl p-3">
                <span className="font-bold text-red-700 block text-xs mb-1">
                  Team Yuktha Guidance Quote:
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-red-600 font-mono">
                    ₹{selectedProposal.guidanceCharges.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Includes: IEEE Paper + Code + PPT + Viva
                  </span>
                </div>
              </div>

              {selectedProposal.referenceFiles && selectedProposal.referenceFiles.length > 0 && (
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Attached Files:
                  </span>
                  <div className="space-y-1">
                    {selectedProposal.referenceFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-[11px] text-slate-700">
                        <FileText className="w-3.5 h-3.5 text-red-500" />
                        <span className="truncate">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedProposal(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-center text-xs transition-all cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
