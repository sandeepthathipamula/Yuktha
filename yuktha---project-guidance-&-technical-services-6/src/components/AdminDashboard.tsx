import { useState } from 'react';
import { 
  FileText, 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  Clock, 
  Filter, 
  Sparkles, 
  Bell, 
  Menu,
  ShieldCheck,
  MessageCircle,
  FolderCode
} from 'lucide-react';
import { AdminUser, Proposal, ProposalStatus } from '../types';
import { getYukthaWhatsAppUrl, getStudentWhatsAppUrl } from '../utils/whatsapp';

interface AdminDashboardProps {
  currentAdmin: AdminUser;
  proposals: Proposal[];
  onOpenProposal: (proposal: Proposal) => void;
  onViewAllProposals: () => void;
  onViewStudents: () => void;
  onOpenDownloadModal: () => void;
  onOpenPricingModal: () => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  currentAdmin,
  proposals,
  onOpenProposal,
  onViewAllProposals,
  onViewStudents,
  onOpenDownloadModal,
  onOpenPricingModal,
  onLogout
}: AdminDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | ProposalStatus>('All');
  const [pricingNoticeDismissed, setPricingNoticeDismissed] = useState(false);

  // Compute live counts
  const newCount = proposals.filter(p => p.status === 'New').length;
  const contactedCount = proposals.filter(p => p.status === 'Contacted').length;
  const convertedCount = proposals.filter(p => p.status === 'Converted').length;
  const totalStudents = 24 + proposals.length; // 24 legacy + dynamic proposals

  const filteredProposals = proposals.filter(p => {
    if (selectedFilter === 'All') return true;
    return p.status === selectedFilter;
  });

  const getStatusBadge = (status: ProposalStatus) => {
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

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Title & Verified Admin Badge (Matches Screenshot 9) */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student proposals, review requirements & minimal guidance fees.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Verified Admin: {currentAdmin.name}</span>
        </div>
      </section>

      {/* 4 Metric Cards (Matches Screenshot 9) */}
      <section className="grid grid-cols-2 gap-3.5">
        {/* Metric 1: New Proposals */}
        <button
          onClick={() => setSelectedFilter('New')}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/90 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl font-black text-red-600 font-mono">
              {newCount}
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-bold text-slate-800">
              New Proposals
            </h3>
            <span className="text-[11px] font-semibold text-red-600 group-hover:underline inline-flex items-center gap-0.5 mt-0.5">
              <span>Needs review</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Metric 2: Total Students */}
        <button
          onClick={onViewStudents}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/90 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl font-black text-blue-600 font-mono">
              {totalStudents}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-bold text-slate-800">
              Total Students
            </h3>
            <span className="text-[11px] font-semibold text-blue-600 group-hover:underline inline-flex items-center gap-0.5 mt-0.5">
              <span>14 Colleges</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Metric 3: Contacted */}
        <button
          onClick={() => setSelectedFilter('Contacted')}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/90 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl font-black text-amber-500 font-mono">
              {contactedCount}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-bold text-slate-800">
              Contacted
            </h3>
            <span className="text-[11px] font-semibold text-amber-600 group-hover:underline inline-flex items-center gap-0.5 mt-0.5">
              <span>In discussion</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Metric 4: Converted */}
        <button
          onClick={() => setSelectedFilter('Converted')}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/90 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl font-black text-emerald-600 font-mono">
              {convertedCount}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-bold text-slate-800">
              Converted
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 group-hover:underline inline-flex items-center gap-0.5 mt-0.5">
              <span>Guidance active</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </button>
      </section>

      {/* GUIDANCE PRICING STRATEGY Banner (Matches Screenshots 9 & 10) */}
      <section className="bg-red-600 text-white rounded-2xl p-5 shadow-lg shadow-red-600/20 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-white/80 block">
              GUIDANCE PRICING STRATEGY
            </span>
            <h2 className="text-base sm:text-lg font-bold leading-snug">
              Minimal & Affordable Student Rates
            </h2>
            <p className="text-xs text-white/90 leading-relaxed pt-0.5">
              ₹1,499 - ₹2,999 with 1-on-1 viva coaching & complete IEEE report
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenPricingModal}
            className="shrink-0 bg-white/20 hover:bg-white/30 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>Review</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Recent Proposals Section (Matches Screenshots 9 & 10) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Recent Proposals
            </h2>
            {selectedFilter !== 'All' && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-semibold">
                Filter: {selectedFilter}
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedFilter('All')}
            className="text-xs font-semibold text-red-600 hover:text-red-700"
          >
            View All
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-2.5">
          {filteredProposals.slice(0, 6).map(proposal => (
            <div
              key={proposal.id}
              onClick={() => onOpenProposal(proposal)}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-slate-50/50 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Initials Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 border border-red-100">
                  {getInitials(proposal.studentName)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-900 truncate">
                      {proposal.studentName}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {proposal.submittedAt.split('|')[1] || proposal.submittedAt}
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold text-slate-800 truncate mt-0.5 group-hover:text-red-600 transition-colors">
                    {proposal.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {proposal.college}
                  </p>
                </div>
              </div>

              {/* Status Badge & Chevron */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(proposal.status)}`}>
                  {proposal.status}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Source Code & APK Section (Matches Screenshot 10) */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl shadow-slate-950/20 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
              <FolderCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  App Source Code & APK
                </h3>
                <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete React + Node full-stack source code
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenDownloadModal}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 text-xs transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Source Code (.ZIP)</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          Ready for local run (<code className="font-mono text-red-400">npm install && npm run dev</code>) or Android APK compilation.
        </p>
      </section>
    </div>
  );
}
