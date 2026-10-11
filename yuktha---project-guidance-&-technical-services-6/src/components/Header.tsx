import { useState } from 'react';
import { Menu, Bell, X, ShieldCheck, GraduationCap, LogOut, ExternalLink } from 'lucide-react';
import { UserRole, AdminUser, StudentUser } from '../types';

interface HeaderProps {
  role: UserRole | null;
  adminUser?: AdminUser | null;
  studentUser?: StudentUser | null;
  unreadNotificationsCount?: number;
  onSwitchRole: () => void;
  onLogout: () => void;
  onOpenGuidelines?: () => void;
  onOpenProjects?: () => void;
  onOpenSubmissions?: () => void;
}

export default function Header({
  role,
  adminUser,
  studentUser,
  unreadNotificationsCount = 0,
  onSwitchRole,
  onLogout,
  onOpenGuidelines,
  onOpenProjects,
  onOpenSubmissions
}: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      {/* Top Red Bar matching Screenshot 3 & 9 */}
      <header className="sticky top-0 z-40 bg-red-600 text-white shadow-md">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand Mark */}
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-wider uppercase font-display flex items-baseline">
              <span>YUKTH</span>
              <span className="text-amber-300 ml-0.5">A</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-white/80 border-l border-white/20 pl-2">
              Services
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1">
            {role === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-300 ring-2 ring-red-600" />
                  )}
                </button>

                {/* Notifications Popup */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800">
                        Admin Alerts
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {unreadNotificationsCount} New
                      </span>
                    </div>
                    <div className="py-2 space-y-2 text-xs">
                      <p
                        onClick={() => {
                          setNotificationsOpen(false);
                          if (onOpenSubmissions) onOpenSubmissions();
                        }}
                        className="text-slate-600 leading-snug hover:text-red-600 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        {unreadNotificationsCount > 0
                          ? `${unreadNotificationsCount} student proposals require review within 1 hour.`
                          : 'All proposals reviewed and up to date.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        if (onOpenSubmissions) onOpenSubmissions();
                      }}
                      className="w-full text-center text-xs text-red-600 font-semibold pt-1 hover:underline cursor-pointer"
                    >
                      {unreadNotificationsCount > 0 ? 'Review Proposals Now' : 'Close'}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Side Slide-out Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs bg-white text-slate-900 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="font-black text-lg tracking-wider uppercase font-display flex items-baseline text-slate-900">
                  <span>YUKTH</span>
                  <span className="text-red-600 ml-0.5">A</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Identity */}
              <div className="py-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Active Mode
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {role === 'admin' ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                        {adminUser?.avatar || 'AD'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {adminUser?.name || 'Administrator'}
                        </p>
                        <p className="text-[10px] text-emerald-600 font-medium">
                          Verified Team Yuktha Admin
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {studentUser?.name?.charAt(0).toUpperCase() || 'ST'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {studentUser?.name || 'Student Portal'}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {studentUser?.college || 'Academic Batch 2026'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 py-2 border-t border-slate-100 text-xs">
                {onOpenProjects && (
                  <button
                    onClick={() => { setDrawerOpen(false); onOpenProjects(); }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    Projects Catalog & Details
                  </button>
                )}
                {onOpenGuidelines && (
                  <button
                    onClick={() => { setDrawerOpen(false); onOpenGuidelines(); }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    IEEE & Synopsis Guidelines
                  </button>
                )}
                {onOpenSubmissions && (
                  <button
                    onClick={() => { setDrawerOpen(false); onOpenSubmissions(); }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    My Submissions & Status
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <button
                onClick={() => { setDrawerOpen(false); onSwitchRole(); }}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {role === 'admin' ? (
                  <>
                    <GraduationCap className="w-4 h-4 text-red-600" />
                    <span>Switch to Student View</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                    <span>Admin Portal Login</span>
                  </>
                )}
              </button>

              <button
                onClick={() => { setDrawerOpen(false); onLogout(); }}
                className="w-full py-2 px-3 text-slate-500 hover:text-red-600 text-center font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out / Reset View</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
