import { 
  Home, 
  FolderGit2, 
  Clock, 
  User, 
  LayoutGrid, 
  FileText, 
  Users, 
  LogOut 
} from 'lucide-react';
import { UserRole } from '../types';

interface BottomNavigationProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  submissionsBadge?: number;
  proposalsBadge?: number;
  onLogout?: () => void;
}

export default function BottomNavigation({
  role,
  activeTab,
  onTabChange,
  submissionsBadge = 0,
  proposalsBadge = 0,
  onLogout
}: BottomNavigationProps) {
  if (role === 'student') {
    const tabs = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'projects', label: 'Projects', icon: FolderGit2 },
      { id: 'submissions', label: 'Submissions', icon: Clock, badge: submissionsBadge },
      { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 select-none">
        <div className="max-w-xl mx-auto grid grid-cols-4 items-center h-16 px-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center h-full transition-colors relative ${
                  isActive ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Admin Bottom Navigation (Matches Screenshot 10)
  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'proposals', label: 'Proposals', icon: FileText, badge: proposalsBadge },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderGit2 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 select-none">
      <div className="max-w-xl mx-auto grid grid-cols-5 items-center h-16 px-1">
        {adminTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full transition-colors relative ${
                isActive ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex flex-col items-center justify-center h-full text-slate-400 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5 stroke-2" />
          <span className="text-[10px] tracking-tight mt-1 font-medium">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
