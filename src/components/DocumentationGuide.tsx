import { useState } from 'react';
import { ArrowLeft, BookOpen, FileCheck, CheckCircle2, Download, HelpCircle } from 'lucide-react';
import { VIVA_QUESTIONS_LIST } from '../data/mockData';

interface DocumentationGuideProps {
  onBack: () => void;
  onRequestAssistance: () => void;
}

export default function DocumentationGuide({ onBack, onRequestAssistance }: DocumentationGuideProps) {
  const [activeTab, setActiveTab] = useState<'ieee' | 'synopsis' | 'viva'>('ieee');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 font-display">
              Documentation Guidelines
            </h1>
            <p className="text-[10px] text-slate-500">
              IEEE Standards, Synopsis & Viva Coaching
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
          2026 Batch
        </span>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('ieee')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
            activeTab === 'ieee'
              ? 'bg-red-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          IEEE Paper Format
        </button>
        <button
          onClick={() => setActiveTab('synopsis')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
            activeTab === 'synopsis'
              ? 'bg-red-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Synopsis & SRS Guide
        </button>
        <button
          onClick={() => setActiveTab('viva')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
            activeTab === 'viva'
              ? 'bg-red-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Viva Defense Prep
        </button>
      </div>

      <main className="p-4 sm:p-5 max-w-lg mx-auto space-y-4">
        {activeTab === 'ieee' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Standard IEEE 2-Column Structure</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Team Yuktha prepares your publication-ready IEEE conference/journal documentation matching university guidelines:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">01.</span>
                  <div>
                    <strong>Abstract & Keywords:</strong> Concise 150-250 word technical summary stating problem, model architecture, and quantified results.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">02.</span>
                  <div>
                    <strong>Introduction & Literature Survey:</strong> Critical analysis of minimum 5-8 verified base papers with comparative tables.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">03.</span>
                  <div>
                    <strong>Proposed System Architecture:</strong> High-res vector flowcharts, DFD level 0/1/2, and UML sequence diagrams.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">04.</span>
                  <div>
                    <strong>Algorithm & Mathematical Model:</strong> Step-by-step pseudo-code, equations, loss curves, and data transformations.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">05.</span>
                  <div>
                    <strong>Experimental Results & Metrics:</strong> Accuracy, Precision, Recall, F1-Score, Confusion Matrix, and GUI screenshots.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600">06.</span>
                  <div>
                    <strong>Conclusion & References:</strong> APA/IEEE style citation formatting.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Zero Plagiarism Guarantee
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Every IEEE document and college report prepared by Team Yuktha is guaranteed under 10% similarity on Turnitin/DrillBit.
                </p>
              </div>
            </div>

            {/* Real Download Action */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                Download Standard Templates
              </h4>
              <button
                onClick={() => {
                  const content = `TITLE OF THE IEEE CONFERENCE PAPER
First Author, Second Author, Third Author
Department of Computer Science & Engineering, College Name

ABSTRACT
In recent years, intelligent automation and predictive frameworks have revolutionized software systems. This paper presents an optimized methodology solving latency and throughput bottlenecks. Our empirical results demonstrate a 98.2% accuracy on validation benchmarks.

I. INTRODUCTION
Academic projects require clear formulation of problem boundaries and existing limitations...

II. LITERATURE SURVEY
A comprehensive review of 8 IEEE base papers published between 2023-2026...

III. SYSTEM ARCHITECTURE & METHODOLOGY
The system consists of data acquisition, normalization, feature extraction, and predictive inference...

IV. EXPERIMENTAL RESULTS
Comparative evaluation against baseline models...

V. CONCLUSION & REFERENCES
[1] IEEE Transactions on Neural Networks, 2026.
[2] ACM Computing Surveys, 2025.
`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Yuktha_IEEE_Paper_Template_2026.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-red-600" />
                <span>Download IEEE 2-Column Format (.TXT / .DOC)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'synopsis' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                College Synopsis & Approval Checklist
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before your college project committee approves your project, your 4-6 page synopsis must contain these core items:
              </p>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">1. Project Title & Domain</span>
                  <span className="text-slate-600 text-[11px]">Clear, unambiguous title without buzzwords. (e.g. "Vision Transformer based Crop Disease Classification")</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">2. Problem Statement & Existing System Drawbacks</span>
                  <span className="text-slate-600 text-[11px]">Why existing manual or legacy systems fail, citing accuracy limits or computational latency.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">3. Proposed System Advantages</span>
                  <span className="text-slate-600 text-[11px]">Key novel feature or performance improvement you provide.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">4. Hardware & Software Requirements</span>
                  <span className="text-slate-600 text-[11px]">OS, RAM, GPU, IDE (VS Code/PyCharm), Frameworks, Database, and Python/Node versions.</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const content = `COLLEGE ACADEMIC PROJECT SYNOPSIS
Academic Year: 2025-2026

1. PROJECT TITLE:
   [Enter Approved Title Here]

2. DOMAIN & TECH STACK:
   Domain: Artificial Intelligence / Full Stack Web / Cloud
   Technologies: Python, React, PostgreSQL, Docker

3. ABSTRACT:
   Brief 200-word overview of project motivation and deliverables...

4. HARDWARE REQUIREMENTS:
   - Processor: Intel Core i5 / AMD Ryzen 5 or above
   - RAM: 8GB minimum
   - Storage: 256GB SSD

5. SOFTWARE REQUIREMENTS:
   - Operating System: Windows 11 / Ubuntu 22.04 LTS
   - IDE: Visual Studio Code
   - Runtime: Python 3.11 / Node.js 20

6. MODULE DESCRIPTION:
   - Module 1: Data ingestion & preprocessing
   - Module 2: Core analytical pipeline
   - Module 3: User interface & reporting

Submitted by: [Student Name] | Roll Number: [Roll No]
Under the Guidance of: Team Yuktha (+91 9701369352)
`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Yuktha_College_Synopsis_Template.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-red-600" />
                <span>Download College Synopsis Draft (.TXT)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'viva' && (
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Viva Voce Questions</span>
                </div>
                <button
                  onClick={() => {
                    const content = `TEAM YUKTHA - TOP VIVA VOCE QUESTIONS & DEFENSE CHECKLIST

1. Why this technology stack?
   Explain scalability, low-latency, modular component reusability, and why legacy stacks were insufficient.

2. What is your contribution over the base IEEE paper?
   Highlight architecture tuning, real-world custom dataset integration, hyperparameter tuning, and intuitive web UI.

3. How did you validate accuracy and handle edge cases?
   Describe train-test split, cross-validation, confusion matrix metrics (precision/recall), and error handling middleware.

4. Explain the project architecture step-by-step.
   Be ready to trace a request from Frontend -> API -> Processing Module -> Database.

Direct Viva Mock Session: WhatsApp +91 9701369352
`;
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Yuktha_Viva_Voce_Defense_Guide.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guide</span>
                </button>
              </div>
              <div className="space-y-3">
                {VIVA_QUESTIONS_LIST.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <p className="font-bold text-slate-900 mb-1">
                      Q{idx + 1}: {item.q}
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      💡 <span className="font-medium text-slate-800">Best Strategy:</span> {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onRequestAssistance}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            <span>Submit Proposal for Fast-Track Documentation</span>
          </button>
        </div>
      </main>
    </div>
  );
}
