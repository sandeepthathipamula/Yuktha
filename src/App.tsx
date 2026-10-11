import { useState, useEffect } from 'react';
import { 
  UserRole, 
  AdminUser, 
  StudentUser, 
  Proposal, 
  ProjectCatalogItem 
} from './types';
import { 
  ADMIN_CREDENTIALS, 
  INITIAL_PROPOSALS, 
  PROJECT_CATALOG 
} from './data/mockData';
import Onboarding from './components/Onboarding';
import RoleSelect from './components/RoleSelect';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import StudentHome from './components/StudentHome';
import ProposalForm from './components/ProposalForm';
import SubmissionSuccess from './components/SubmissionSuccess';
import MySubmissions from './components/MySubmissions';
import DocumentationGuide from './components/DocumentationGuide';
import ProjectsCatalog from './components/ProjectsCatalog';
import StudentProfile from './components/StudentProfile';
import StudentAuthModal from './components/StudentAuthModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProposalModal from './components/AdminProposalModal';
import AdminStudentsList from './components/AdminStudentsList';
import SourceCodeDownloadModal from './components/SourceCodeDownloadModal';
import PricingModal from './components/PricingModal';
import { Smartphone, Monitor } from 'lucide-react';
import {
  fetchProposalsFromApi,
  createProposalInApi,
  updateProposalInApi,
  deleteProposalInApi,
  syncStudentUserInApi,
  checkDbHealth
} from './utils/api';

export default function App() {
  // Navigation & User State
  const [currentScreen, setCurrentScreen] = useState<
    'onboarding' | 'role_select' | 'admin_login' | 'student_portal' | 'admin_portal' | 'proposal_form' | 'submission_success' | 'guidelines'
  >('onboarding');

  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [studentUser, setStudentUser] = useState<StudentUser | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Active Tabs
  const [studentTab, setStudentTab] = useState<'home' | 'projects' | 'submissions' | 'profile'>('home');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'proposals' | 'students' | 'projects'>('dashboard');

  // Proposal State (persisted in MySQL and cached in localStorage)
  const [proposals, setProposals] = useState<Proposal[]>(() => {
    try {
      const saved = localStorage.getItem('yuktha_proposals');
      return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
    } catch {
      return INITIAL_PROPOSALS;
    }
  });

  const [lastSubmittedProposal, setLastSubmittedProposal] = useState<Proposal | null>(null);
  const [activeAdminProposal, setActiveAdminProposal] = useState<Proposal | null>(null);
  const [proposalPrefillProject, setProposalPrefillProject] = useState<ProjectCatalogItem | null>(null);

  // Modals
  const [isStudentAuthOpen, setIsStudentAuthOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<'mobile' | 'wide'>('mobile');
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: ''
  });

  // Synchronize proposals from MySQL database
  const syncFromDb = async () => {
    try {
      const res = await fetchProposalsFromApi();
      if (res.fromDb && Array.isArray(res.proposals) && res.proposals.length > 0) {
        setProposals(res.proposals);
        setDbStatus({ connected: true, message: 'MySQL Connected' });
      } else {
        const health = await checkDbHealth();
        setDbStatus({ connected: health.connected, message: health.message });
      }
    } catch (e) {
      console.error('Failed to sync from MySQL:', e);
    }
  };

  useEffect(() => {
    syncFromDb();
    // Refresh periodically so student mobile submissions and admin updates sync automatically
    const interval = setInterval(syncFromDb, 8000);
    return () => clearInterval(interval);
  }, []);

  // Sync to localStorage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem('yuktha_proposals', JSON.stringify(proposals));
    } catch (e) {
      console.error('Failed to cache proposals', e);
    }
  }, [proposals]);

  // Handlers
  const handleOnboardingComplete = () => {
    setCurrentScreen('role_select');
  };

  const handleSelectStudent = () => {
    setActiveRole('student');
    setCurrentScreen('student_portal');
    setStudentTab('home');
  };

  const handleSelectAdmin = () => {
    setCurrentScreen('admin_login');
  };

  const handleAdminLoginSuccess = (admin: AdminUser) => {
    setAdminUser(admin);
    setActiveRole('admin');
    setCurrentScreen('admin_portal');
    setAdminTab('dashboard');
    syncFromDb();
  };

  const handleStudentLoginSuccess = (student: StudentUser) => {
    setStudentUser(student);
    setActiveRole('student');
    setIsStudentAuthOpen(false);
    setCurrentScreen('student_portal');
    syncStudentUserInApi(student).catch(() => {});
    syncFromDb();
  };

  const handleNewProposalSubmit = async (newProposal: Proposal) => {
    if (!studentUser) {
      const newStudent: StudentUser = {
        id: `student-${Date.now()}`,
        name: newProposal.studentName,
        email: newProposal.studentEmail,
        phone: newProposal.studentPhone,
        college: newProposal.college
      };
      setStudentUser(newStudent);
      syncStudentUserInApi(newStudent).catch(() => {});
    }

    // Persist to MySQL database
    let createdProposal = newProposal;
    try {
      const res = await createProposalInApi(newProposal);
      if (res.fromDb) {
        createdProposal = res.proposal;
      }
    } catch (e) {
      console.error('Failed to save proposal to MySQL:', e);
    }

    setProposals(prev => [createdProposal, ...prev.filter(p => p.id !== createdProposal.id)]);
    setLastSubmittedProposal(createdProposal);
    setProposalPrefillProject(null);
    setCurrentScreen('submission_success');
  };

  const handleUpdateProposal = async (updated: Proposal) => {
    setProposals(prev => prev.map(p => p.id === updated.id ? updated : p));
    // Persist update to MySQL database
    try {
      const res = await updateProposalInApi(updated);
      if (res.fromDb) {
        setProposals(prev => prev.map(p => p.id === res.proposal.id ? res.proposal : p));
      }
    } catch (e) {
      console.error('Failed to update proposal in MySQL:', e);
    }
  };

  const handleDeleteProposal = async (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    // Persist deletion to MySQL database
    try {
      await deleteProposalInApi(id);
    } catch (e) {
      console.error('Failed to delete proposal in MySQL:', e);
    }
  };

  const handleSelectProjectForGuidance = (project: ProjectCatalogItem) => {
    setProposalPrefillProject(project);
    setCurrentScreen('proposal_form');
  };

  const handleLogout = () => {
    setActiveRole(null);
    setAdminUser(null);
    setCurrentScreen('role_select');
  };

  // Calculations
  const newProposalsCount = proposals.filter(p => p.status === 'New').length;
  const userProposals = proposals.filter(p => 
    studentUser ? (p.studentEmail === studentUser.email || p.studentName === studentUser.name) : false
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Desktop Helper Bar (Only visible on wide desktop viewports) */}
      <div className="hidden lg:flex w-full bg-slate-900 text-slate-300 text-xs px-6 py-2 items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-wider uppercase">
            Team Yuktha Services
          </span>
          <span className="text-slate-500">·</span>
          <span>Project Guidance & Technical Services · <strong className="text-white font-medium">Batch 2026</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">View Mode:</span>
          <button
            onClick={() => setDeviceFrameMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors ${
              deviceFrameMode === 'mobile' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Browser (Default)</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode('wide')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors ${
              deviceFrameMode === 'wide' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Expanded Wide</span>
          </button>
        </div>
      </div>

      {/* Main Responsive App Container */}
      <div
        className={`w-full min-h-screen bg-white transition-all shadow-2xl relative ${
          deviceFrameMode === 'mobile'
            ? 'max-w-md sm:max-w-lg md:border-x border-slate-200'
            : 'max-w-4xl border-x border-slate-200'
        }`}
      >
        {/* Render Screen Based on State */}

        {/* 1. Onboarding Screen (Screenshot 1) */}
        {currentScreen === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {/* 2. Role Selection Screen (Screenshot 2) */}
        {currentScreen === 'role_select' && (
          <RoleSelect
            onSelectStudent={handleSelectStudent}
            onSelectAdmin={handleSelectAdmin}
            onSignUp={() => setIsStudentAuthOpen(true)}
          />
        )}

        {/* 3. Admin Login Screen (Screenshot 8) */}
        {currentScreen === 'admin_login' && (
          <AdminLogin
            onBack={() => setCurrentScreen('role_select')}
            onLoginSuccess={handleAdminLoginSuccess}
            onGoToStudentPortal={() => {
              setActiveRole('student');
              setCurrentScreen('student_portal');
            }}
          />
        )}

        {/* 4. Proposal Form Screen (Screenshots 4 & 5) */}
        {currentScreen === 'proposal_form' && (
          <ProposalForm
            onBack={() => setCurrentScreen('student_portal')}
            onSubmitSuccess={handleNewProposalSubmit}
            currentUser={studentUser}
            initialTitle={proposalPrefillProject?.title || ''}
            initialTech={proposalPrefillProject?.techStack.join(', ') || ''}
            initialType={proposalPrefillProject?.type || 'Major Project'}
          />
        )}

        {/* 5. Submission Success Screen (Screenshot 6) */}
        {currentScreen === 'submission_success' && lastSubmittedProposal && (
          <SubmissionSuccess
            proposal={lastSubmittedProposal}
            onGoToSubmissions={() => {
              setCurrentScreen('student_portal');
              setStudentTab('submissions');
            }}
            onExploreProjects={() => {
              setCurrentScreen('student_portal');
              setStudentTab('projects');
            }}
          />
        )}

        {/* 6. Documentation Guidelines Screen */}
        {currentScreen === 'guidelines' && (
          <DocumentationGuide
            onBack={() => setCurrentScreen('student_portal')}
            onRequestAssistance={() => {
              setProposalPrefillProject(null);
              setCurrentScreen('proposal_form');
            }}
          />
        )}

        {/* 7. Student Portal Screen with Top Bar and Bottom Navigation (Screenshot 3 & 7) */}
        {currentScreen === 'student_portal' && (
          <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            {/* Red Top Bar matching Screenshot 3 */}
            <Header
              role="student"
              studentUser={studentUser}
              onSwitchRole={() => setCurrentScreen('admin_login')}
              onLogout={handleLogout}
              onOpenProjects={() => setStudentTab('projects')}
              onOpenGuidelines={() => setCurrentScreen('guidelines')}
              onOpenSubmissions={() => setStudentTab('submissions')}
            />

            {/* Tab Views */}
            <main className="flex-1 p-4 sm:p-5">
              {studentTab === 'home' && (
                <StudentHome
                  onNavigateToProjects={() => setStudentTab('projects')}
                  onNavigateToGuidelines={() => setCurrentScreen('guidelines')}
                  onNavigateToProposalForm={() => {
                    setProposalPrefillProject(null);
                    setCurrentScreen('proposal_form');
                  }}
                  onNavigateToSubmissions={() => setStudentTab('submissions')}
                  onOpenPricingModal={() => setIsPricingModalOpen(true)}
                  userProposalsCount={userProposals.length}
                />
              )}

              {studentTab === 'projects' && (
                <ProjectsCatalog
                  onSelectProjectForGuidance={handleSelectProjectForGuidance}
                />
              )}

              {studentTab === 'submissions' && (
                <MySubmissions
                  proposals={userProposals}
                  currentUser={studentUser}
                  onBack={() => setStudentTab('home')}
                  onNewProposal={() => {
                    setProposalPrefillProject(null);
                    setCurrentScreen('proposal_form');
                  }}
                />
              )}

              {studentTab === 'profile' && (
                <StudentProfile
                  student={studentUser}
                  onUpdateStudent={updated => setStudentUser(updated)}
                  onLogout={handleLogout}
                  onSwitchToAdmin={() => setCurrentScreen('admin_login')}
                />
              )}
            </main>

            {/* Bottom Navigation for Student (Matches Screenshot 3) */}
            <BottomNavigation
              role="student"
              activeTab={studentTab}
              onTabChange={tab => setStudentTab(tab as any)}
              submissionsBadge={userProposals.length}
            />
          </div>
        )}

        {/* 8. Admin Portal Screen with Top Bar and Bottom Navigation (Screenshots 9 & 10) */}
        {currentScreen === 'admin_portal' && adminUser && (
          <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            {/* Red Top Bar with Bell icon and Menu */}
            <Header
              role="admin"
              adminUser={adminUser}
              unreadNotificationsCount={newProposalsCount}
              onSwitchRole={() => {
                setActiveRole('student');
                setCurrentScreen('student_portal');
              }}
              onLogout={handleLogout}
              onOpenProjects={() => setAdminTab('projects')}
              onOpenSubmissions={() => setAdminTab('proposals')}
            />

            {/* Admin Tabs */}
            <main className="flex-1 p-4 sm:p-5">
              {adminTab === 'dashboard' && (
                <AdminDashboard
                  currentAdmin={adminUser}
                  proposals={proposals}
                  onOpenProposal={prop => setActiveAdminProposal(prop)}
                  onViewAllProposals={() => setAdminTab('proposals')}
                  onViewStudents={() => setAdminTab('students')}
                  onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
                  onOpenPricingModal={() => setIsPricingModalOpen(true)}
                  onLogout={handleLogout}
                />
              )}

              {adminTab === 'proposals' && (
                <div className="space-y-4 pb-24">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 font-display">
                        All Student Proposals
                      </h1>
                      <p className="text-xs text-slate-500">
                        Review submissions and assign minimal rates
                      </p>
                    </div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                      {proposals.length} Total
                    </span>
                  </div>

                  <div className="space-y-3">
                    {proposals.map(proposal => (
                      <div
                        key={proposal.id}
                        onClick={() => setActiveAdminProposal(proposal)}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">
                            {proposal.studentName} · {proposal.college}
                          </span>
                          <span className="font-mono text-slate-400">
                            {proposal.refId}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">
                          {proposal.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {proposal.description}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <span className="font-bold text-red-600 font-mono">
                            ₹{proposal.guidanceCharges}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            Status: {proposal.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'students' && (
                <AdminStudentsList
                  proposals={proposals}
                  onOpenProposal={prop => setActiveAdminProposal(prop)}
                />
              )}

              {adminTab === 'projects' && (
                <ProjectsCatalog
                  onSelectProjectForGuidance={handleSelectProjectForGuidance}
                />
              )}
            </main>

            {/* Bottom Navigation for Admin (Matches Screenshot 10) */}
            <BottomNavigation
              role="admin"
              activeTab={adminTab}
              onTabChange={tab => setAdminTab(tab as any)}
              proposalsBadge={newProposalsCount}
              onLogout={handleLogout}
            />
          </div>
        )}

        {/* Global Modals */}
        <StudentAuthModal
          isOpen={isStudentAuthOpen}
          onClose={() => setIsStudentAuthOpen(false)}
          onLoginSuccess={handleStudentLoginSuccess}
        />

        <AdminProposalModal
          proposal={activeAdminProposal}
          onClose={() => setActiveAdminProposal(null)}
          onUpdateProposal={handleUpdateProposal}
          onDeleteProposal={handleDeleteProposal}
        />

        <SourceCodeDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />

        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          isAdmin={activeRole === 'admin'}
          onSelectPlan={() => {
            setProposalPrefillProject(null);
            setCurrentScreen('proposal_form');
          }}
        />
      </div>
    </div>
  );
}
