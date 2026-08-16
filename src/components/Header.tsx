import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Video, Award, Users, HelpCircle, 
  LayoutDashboard, ShieldCheck, Code, Globe, LogIn, LogOut, 
  Menu, X, Sparkles, ChevronDown, Check, User as UserIcon
} from 'lucide-react';
import { AppView, User, AppSettings } from '../types';
import { INITIAL_USERS } from '../services/database';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  currentUser: User | null;
  settings: AppSettings;
  onOpenLogin: () => void;
  onLogout: () => void;
  onSwitchUser: (user: User | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentUser,
  settings,
  onOpenLogin,
  onLogout,
  onSwitchUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { label: string; view: AppView; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Dashboard', view: 'home', icon: GraduationCap },
    { label: 'Materi Saya', view: 'materi', icon: BookOpen },
    { label: 'Video Pembelajaran', view: 'video', icon: Video },
    { label: 'Karya Guru', view: 'karya', icon: Award },
    { label: 'Direktori Guru', view: 'guru', icon: Users },
    { label: 'Panduan', view: 'panduan', icon: HelpCircle },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notification Bar / GAS Info */}
      <div id="top-announcement-bar" className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center font-bold text-xs text-white">
              L
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-tight">LMS GURU</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline">&bull; DIGITAL PLATFORM</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-600/20 text-sky-400 border border-sky-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              Google Apps Script Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-nav-blogger-top"
              onClick={() => onNavigate('blogger-embed')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'blogger-embed' 
                  ? 'bg-amber-500 text-white font-bold shadow-xs' 
                  : 'bg-slate-800 text-amber-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Embed Blogger
            </button>
            <button
              id="btn-nav-gas-code-top"
              onClick={() => onNavigate('gas-code')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'gas-code'
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-sky-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Source Code GAS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            id="brand-logo-container" 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-sky-600/30 group-hover:bg-sky-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  {settings.app_name}
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                  Bento LMS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] sm:max-w-[280px]">
                {settings.school_name}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => onNavigate(item.view)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                    isActive
                      ? 'bg-sky-600/10 text-sky-700 font-bold border border-sky-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Auth / Profile Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  id="btn-user-profile-menu"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left bg-white shadow-2xs"
                >
                  <img
                    src={currentUser.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser.nama}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-sky-500/30"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">
                      {currentUser.nama}
                    </div>
                    <div className="text-[10px] font-semibold text-sky-600 flex items-center gap-1">
                      {currentUser.role === 'ADMIN' ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Admin Portal</span>
                        </>
                      ) : (
                        <>
                          <UserIcon className="w-3 h-3 text-sky-600" />
                          <span>Guru Pengajar</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    id="user-dropdown-panel"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80 rounded-t-2xl">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Masuk sebagai:</p>
                      <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{currentUser.nama}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        currentUser.role === 'ADMIN' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        ROLE: {currentUser.role}
                      </span>
                    </div>

                    <div className="p-1.5">
                      {currentUser.role === 'ADMIN' ? (
                        <button
                          id="dropdown-btn-admin-dash"
                          onClick={() => {
                            onNavigate('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-sky-600" />
                          Dashboard Administrator
                        </button>
                      ) : (
                        <button
                          id="dropdown-btn-guru-dash"
                          onClick={() => {
                            onNavigate('guru-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-sky-600" />
                          Dashboard Guru Saya
                        </button>
                      )}
                    </div>

                    {/* Quick Switch Persona */}
                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>Ganti Akun Demo</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </div>
                      <div className="space-y-1">
                        {INITIAL_USERS.slice(0, 4).map((u) => (
                          <button
                            key={u.id_user}
                            id={`btn-switch-user-${u.id_user}`}
                            onClick={() => {
                              onSwitchUser(u);
                              setUserDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-lg transition-colors text-left ${
                              currentUser.id_user === u.id_user 
                                ? 'bg-sky-100 text-sky-900 font-bold' 
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className="truncate">{u.nama} ({u.role})</span>
                            {currentUser.id_user === u.id_user && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-1.5 border-t border-slate-100">
                      <button
                        id="dropdown-btn-logout"
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar Akun
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-header-login"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm shadow-sky-600/20 active:scale-95 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Masuk dengan Google</span>
                <span className="sm:hidden">Masuk</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas / Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`mobile-nav-link-${item.view}`}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser && (
              <button
                id="mobile-btn-dashboard"
                onClick={() => {
                  onNavigate(currentUser.role === 'ADMIN' ? 'admin-dashboard' : 'guru-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs"
              >
                <LayoutDashboard className="w-4 h-4 text-sky-400" />
                Buka {currentUser.role === 'ADMIN' ? 'Dashboard Admin' : 'Dashboard Guru'}
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                id="mobile-btn-blogger"
                onClick={() => {
                  onNavigate('blogger-embed');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                Embed Blogger
              </button>
              <button
                id="mobile-btn-gas"
                onClick={() => {
                  onNavigate('gas-code');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-sky-200 bg-sky-50 text-sky-800 text-xs font-bold"
              >
                <Code className="w-3.5 h-3.5 text-sky-600" />
                Source Code GAS
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
