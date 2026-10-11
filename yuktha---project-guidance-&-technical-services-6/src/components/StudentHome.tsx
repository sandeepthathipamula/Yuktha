import { Sparkles, BookOpen, FileText, FolderOpen, Send, Clock, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { Proposal } from '../types';

interface StudentHomeProps {
  onNavigateToProjects: () => void;
  onNavigateToGuidelines: () => void;
  onNavigateToProposalForm: () => void;
  onNavigateToSubmissions: () => void;
  onOpenPricingModal: () => void;
  userProposalsCount: number;
}

export default function StudentHome({
  onNavigateToProjects,
  onNavigateToGuidelines,
  onNavigateToProposalForm,
  onNavigateToSubmissions,
  onOpenPricingModal,
  userProposalsCount
}: StudentHomeProps) {
  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Greeting */}
      <section className="pt-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
          Hello buddy, you are in right place!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore, Submit and Track Your Projects with Team Yuktha.
        </p>
      </section>

      {/* Hero Card (Matches Screenshot 3) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-5 sm:p-6 text-white shadow-xl shadow-slate-950/20">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1 max-w-[70%]">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2026 Academic Batch</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white mb-4">
              Turn Your Ideas into Successful Projects
            </h2>

            <button
              onClick={onNavigateToProjects}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-red-900/50 transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right badge card (Clickable to open Viva / Code guidelines) */}
          <button
            onClick={onNavigateToGuidelines}
            title="Open Code & Viva Guidelines"
            className="shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md p-3 text-center shadow-inner cursor-pointer transition-all active:scale-95 group"
          >
            <BookOpen className="w-8 h-8 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium tracking-tight text-white/90">
              code · viva
            </span>
          </button>
        </div>
      </section>

      {/* 4 Action Cards Grid (Matches Screenshot 3) */}
      <section className="grid grid-cols-2 gap-3.5">
        {/* Card 1: Project Details */}
        <button
          onClick={onNavigateToProjects}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/80 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between min-h-[110px]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mt-3">
              Project Details
            </h3>
            <p className="text-[11px] text-slate-500">
              Explore catalog
            </p>
          </div>
        </button>

        {/* Card 2: Documentation Guidelines */}
        <button
          onClick={onNavigateToGuidelines}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/80 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between min-h-[110px]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <FolderOpen className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mt-3">
              Documentation Guidelines
            </h3>
            <p className="text-[11px] text-slate-500">
              IEEE & Synopsis
            </p>
          </div>
        </button>

        {/* Card 3: Submit Project Proposal */}
        <button
          onClick={onNavigateToProposalForm}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/80 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between min-h-[110px]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mt-3">
              Submit Project Proposal
            </h3>
            <p className="text-[11px] text-slate-500">
              Get guidance quote
            </p>
          </div>
        </button>

        {/* Card 4: My Submissions */}
        <button
          onClick={onNavigateToSubmissions}
          className="text-left bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/80 rounded-2xl p-4 shadow-sm transition-all group flex flex-col justify-between min-h-[110px] relative"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              {userProposalsCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">
                  {userProposalsCount}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mt-3">
              My Submissions
            </h3>
            <p className="text-[11px] text-slate-500">
              Track status
            </p>
          </div>
        </button>
      </section>

      {/* Minimal & Reasonable Charges Callout (Matches Screenshot 3 - Clickable to open full breakdown) */}
      <section
        onClick={onOpenPricingModal}
        className="bg-red-50/70 hover:bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start justify-between gap-3.5 cursor-pointer transition-all active:scale-[0.99] group shadow-xs"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Minimal & Reasonable Charges
              </h4>
              <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2 py-0.5 rounded">
                View Rates
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
              Complete support with code walkthrough, presentation & viva guidance.
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
      </section>

      {/* What Team Yuktha Delivers */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-4.5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Complete Academic Guidance Bundle
          </h3>
          <span className="text-[10px] text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded-md">
            All-Inclusive
          </span>
        </div>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            <span>IEEE Standard Paper & College Synopsis with base citations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            <span>Clean, documented source code with local & cloud setup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            <span>PowerPoint PPT presentation deck + Architecture diagrams</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            <span>1-on-1 viva defense mock session by founders</span>
          </div>
        </div>
      </section>
    </div>
  );
}
