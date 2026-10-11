import { useState, useRef } from 'react';
import { ArrowLeft, UploadCloud, Info, Check, FileCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { ProjectType, Proposal, StudentUser } from '../types';
import { getYukthaWhatsAppUrl } from '../utils/whatsapp';

interface ProposalFormProps {
  onBack: () => void;
  onSubmitSuccess: (newProposal: Proposal) => void;
  currentUser?: StudentUser | null;
  initialTitle?: string;
  initialTech?: string;
  initialType?: ProjectType;
}

export default function ProposalForm({
  onBack,
  onSubmitSuccess,
  currentUser,
  initialTitle = '',
  initialTech = '',
  initialType = 'Major Project'
}: ProposalFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState(initialTech);
  const [projectType, setProjectType] = useState<ProjectType>(initialType);
  const [expectedDate, setExpectedDate] = useState('');

  // Contact details - start fresh and empty so user enters manually
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');

  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter your project title');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('Please provide your name');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please provide a valid 10-digit WhatsApp number');
      return;
    }

    const randomRefNum = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' | ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      refId: `#${randomRefNum}`,
      studentName: fullName.trim(),
      studentEmail: email.trim() || 'student@yuktha.com',
      studentPhone: phone.trim(),
      college: college.trim() || 'Engineering College',
      title: title.trim(),
      description: description.trim() || 'Full academic project guidance, architecture and IEEE base paper support requested.',
      technologies: technologies.trim() || 'Python / React / Full Stack',
      projectType,
      expectedDate: expectedDate.trim() || 'Flexible / As per schedule',
      submittedAt: formattedDate,
      status: 'New',
      guidanceCharges: projectType === 'Major Project' ? 2499 : 1499,
      reviewWindow: 'Within 1 Hour',
      teamUpdate: 'New student submission. Team Yuktha will review within 1 hour.',
      referenceFiles: uploadedFiles.length > 0 ? uploadedFiles : ['Initial_Abstract_Draft.pdf']
    };

    onSubmitSuccess(newProposal);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      {/* Top Header (Matches Screenshots 4 & 5) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 font-display">
            Submit Project Proposal
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
            Yuktha Fast-Track
          </span>
        </div>
      </header>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-5 max-w-lg mx-auto">
        {/* Contact Admins Directly on WhatsApp if no project idea */}
        <a
          href={getYukthaWhatsAppUrl('we need a new project')}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/80 border border-emerald-200/90 hover:border-emerald-300 rounded-2xl p-3.5 shadow-sm hover:shadow transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  No idea about your project?
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Instant WhatsApp
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Contact directly to the admins for a project
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </a>

        {errorMsg && (
          <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Project Title */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your project title"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your project requirements, modules, or problems to solve..."
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Technologies Required */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Technologies Required
          </label>
          <input
            type="text"
            value={technologies}
            onChange={e => setTechnologies(e.target.value)}
            placeholder="e.g. Python, ML, React, etc."
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2">
            Project Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setProjectType('Major Project')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                projectType === 'Major Project'
                  ? 'border-red-600 bg-red-50/20 text-slate-900 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                projectType === 'Major Project' ? 'border-red-600' : 'border-slate-300'
              }`}>
                {projectType === 'Major Project' && (
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                )}
              </div>
              <span className="text-xs font-semibold">Major Project</span>
            </button>

            <button
              type="button"
              onClick={() => setProjectType('Minor Project')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                projectType === 'Minor Project'
                  ? 'border-red-600 bg-red-50/20 text-slate-900 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                projectType === 'Minor Project' ? 'border-red-600' : 'border-slate-300'
              }`}>
                {projectType === 'Minor Project' && (
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                )}
              </div>
              <span className="text-xs font-semibold">Minor Project</span>
            </button>
          </div>
        </div>

        {/* Expected Submission Date */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Expected Submission Date
          </label>
          <input
            type="text"
            value={expectedDate}
            onChange={e => setExpectedDate(e.target.value)}
            placeholder="DD/MM/YYYY (e.g. 15/11/2026)"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* YOUR CONTACT DETAILS & ADDRESS Card (Matches Screenshot 4 & 5) */}
        <div className="bg-slate-50/50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              YOUR CONTACT DETAILS & ADDRESS
            </span>
            <span className="text-[10px] font-semibold text-red-600">
              for guidance call
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="10-digit number"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                College / Address
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={e => setCollege(e.target.value)}
                placeholder="College or location"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Upload Reference Documents (Matches Screenshot 4 & 5) */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Upload Reference Documents
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-red-300 hover:border-red-500 bg-red-50/10 hover:bg-red-50/20 rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
              <UploadCloud className="w-6 h-6" />
            </div>

            {uploadedFiles.length > 0 ? (
              <div className="space-y-2 w-full max-w-xs" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <FileCheck className="w-4 h-4" />
                  <span>{uploadedFiles.length} file(s) attached</span>
                </div>
                <div className="space-y-1">
                  {uploadedFiles.map((fn, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] text-slate-700">
                      <span className="truncate max-w-[180px]">{fn}</span>
                      <button
                        type="button"
                        onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700 p-0.5 ml-2 cursor-pointer"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] text-red-600 hover:underline font-semibold block mx-auto pt-1 cursor-pointer"
                >
                  + Add more files
                </button>
              </div>
            ) : (
              <div>
                <span className="inline-block text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded mb-1">
                  no files selected
                </span>
                <p className="text-xs font-bold text-slate-800">
                  Choose Files
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  (PDF, DOC, Images)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Minimal & Reasonable Charges Guarantee Notice (Matches Screenshot 5) */}
        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-3.5 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <strong className="font-semibold text-slate-900">Minimal & Reasonable Charges Guarantee: </strong>
            Team Yuktha reviews each proposal individually to quote student-friendly rates with complete source code & viva guidance.
          </p>
        </div>

        {/* Submit Proposal Button (Matches Screenshot 5) */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-red-600/30 text-sm transition-all"
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
}
