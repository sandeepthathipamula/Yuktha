import { useState } from 'react';
import { Users, Search, Phone, Mail, School, MessageCircle, FileText } from 'lucide-react';
import { Proposal } from '../types';
import { getStudentWhatsAppUrl } from '../utils/whatsapp';

interface AdminStudentsListProps {
  proposals: Proposal[];
  onOpenProposal: (proposal: Proposal) => void;
}

export default function AdminStudentsList({ proposals, onOpenProposal }: AdminStudentsListProps) {
  const [search, setSearch] = useState('');

  // Extract distinct students from proposals and sample batch
  const studentsMap = new Map<string, {
    name: string;
    email: string;
    phone: string;
    college: string;
    proposals: Proposal[];
  }>();

  proposals.forEach(p => {
    const key = p.studentEmail.toLowerCase();
    if (!studentsMap.has(key)) {
      studentsMap.set(key, {
        name: p.studentName,
        email: p.studentEmail,
        phone: p.studentPhone,
        college: p.college,
        proposals: [p]
      });
    } else {
      studentsMap.get(key)!.proposals.push(p);
    }
  });

  const students = Array.from(studentsMap.values()).filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.college.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-display">
            Student Directory
          </h1>
          <p className="text-xs text-slate-500">
            Registered students & active project guidance
          </p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {students.length} Students
        </span>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search student by name, college, or phone..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
        />
      </div>

      <div className="space-y-3">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {student.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <School className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.college}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {student.proposals.length} Proposals
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {student.phone}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {student.email}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onOpenProposal(student.proposals[0])}
                className="text-xs font-semibold text-slate-700 hover:text-red-600 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Latest Proposal</span>
              </button>

              <a
                href={getStudentWhatsAppUrl(
                  student.phone,
                  student.name,
                  student.proposals[0]?.title || 'Academic Project'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
