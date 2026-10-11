import { useState } from 'react';
import { Search, Filter, BookOpen, Check, ArrowRight, Code, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ProjectCatalogItem, ProjectType } from '../types';
import { PROJECT_CATALOG } from '../data/mockData';

interface ProjectsCatalogProps {
  onSelectProjectForGuidance: (project: ProjectCatalogItem) => void;
}

export default function ProjectsCatalog({ onSelectProjectForGuidance }: ProjectsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectCatalogItem | null>(null);

  const categories = ['All', 'AI / ML', 'Python & Data Science', 'Web & Full Stack', 'Cloud & DevOps', 'IoT & Embedded', 'Cyber Security'];

  const filteredProjects = PROJECT_CATALOG.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesType = selectedType === 'All' || project.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Search & Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-900 font-display">
              Projects Catalog
            </h1>
            <p className="text-[10px] text-slate-500">
              Verified Major & Minor IEEE Projects
            </p>
          </div>
          <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
            {filteredProjects.length} Available
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by topic, python, react, ML..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-slate-900"
          />
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <main className="p-4 max-w-lg mx-auto space-y-3.5">
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <p className="text-xs text-slate-500">
              No projects found matching your search. Have a custom project idea?
            </p>
            <button
              onClick={() => onSelectProjectForGuidance({
                id: 'custom-idea',
                title: searchQuery || 'Custom Project Idea',
                category: 'AI / ML',
                type: 'Major Project',
                difficulty: 'Intermediate',
                techStack: ['Python', 'React'],
                abstract: 'Custom project idea submitted by student.',
                features: [],
                ieeeDomain: 'Custom IEEE Domain',
                basePaperAvailable: true,
                codeReady: false,
                recommendedPrice: 2499
              })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              <span>Submit Custom Proposal for Fast Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          filteredProjects.map(project => (
            <article
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {project.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {project.type}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {project.title}
                </h2>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {project.abstract}
                </p>
              </div>

              {/* Tech Stack tags */}
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-600 font-mono">
                    ₹{project.recommendedPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Minimal Guidance Rate
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-red-600 flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))
        )}
      </main>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              {activeProjectModal.category} · {activeProjectModal.type}
            </span>

            <h3 className="text-base font-bold text-slate-900 font-display mb-2 pr-6">
              {activeProjectModal.title}
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Abstract & Overview
                </span>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {activeProjectModal.abstract}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Key Implemented Modules
                </span>
                <ul className="space-y-1 text-slate-700">
                  {activeProjectModal.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-red-50/80 border border-red-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-600 block">
                    All-Inclusive Student Guidance Fee
                  </span>
                  <span className="text-lg font-black text-red-600 font-mono">
                    ₹{activeProjectModal.recommendedPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-red-800 bg-red-100/80 px-2 py-0.5 rounded font-medium">
                  IEEE Paper + Code + PPT
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  const proj = activeProjectModal;
                  setActiveProjectModal(null);
                  onSelectProjectForGuidance(proj);
                }}
                className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span>Request Guidance for This Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
