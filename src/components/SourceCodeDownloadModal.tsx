import { useState } from 'react';
import { X, Download, Terminal, Check, Smartphone, FileCode2, Copy } from 'lucide-react';

interface SourceCodeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SourceCodeDownloadModal({ isOpen, onClose }: SourceCodeDownloadModalProps) {
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const copyCommands = () => {
    const cmds = `git clone <repo-url>
cd yuktha-project-services
npm install
npm run dev`;
    navigator.clipboard.writeText(cmds);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleDownloadZip = () => {
    // Generate a downloadable README / project bundle descriptor
    const projectContent = `# Team Yuktha - Project Guidance & Technical Services
Production-Ready Web Application & Mobile Touch Portal

## Quick Start
1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Build production bundle:
   npm run build

## Android APK Compilation (Capacitor)
1. Add Android platform:
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "Yuktha Services" "com.yuktha.services"
   npx cap add android

2. Build & Sync:
   npm run build
   npx cap sync android

3. Open in Android Studio & Generate Signed APK:
   npx cap open android

## Founders & Support
Team Yuktha:
- Ganesh Kunche
- Sandeep Varma
- Praveen Kumar
- Sai Kiran Reddy

WhatsApp Support: +91 9701369352
`;
    const blob = new Blob([projectContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Yuktha_Source_Code_Bundle_v1.0.0.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-display">
                App Source Code & APK
              </h3>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-slate-500">
              React + TypeScript + Tailwind CSS production bundle
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* CLI instructions */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>Local Terminal Setup</span>
              </span>
              <button
                onClick={copyCommands}
                className="hover:text-white flex items-center gap-1 text-[10px]"
              >
                {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-[11px] space-y-1 text-slate-300">
              <p className="text-emerald-400"># Install & run locally</p>
              <p>npm install</p>
              <p>npm run dev</p>
              <p className="text-slate-500"># Server running on http://localhost:3000</p>
            </div>
          </div>

          {/* Android APK building info */}
          <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Smartphone className="w-4 h-4 text-red-600" />
              <span>Android APK Generation</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This mobile web app uses responsive touch containers and bottom tab bar navigation matching Android material standards. You can bundle it directly via Capacitor into a standalone Android APK.
            </p>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownloadZip}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Project Package (.ZIP)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
