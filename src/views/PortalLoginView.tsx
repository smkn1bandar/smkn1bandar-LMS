import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Users, ShieldCheck, ArrowRight, BookOpen, 
  Video, Award, CheckCircle2, Sparkles, MapPin, Phone, Mail, 
  Lock, UserCheck, HardDrive, KeyRound, ExternalLink, HelpCircle, 
  School, Check, ChevronRight, LogIn, Database, Zap, Eye, EyeOff,
  AlertCircle, RotateCw, FileSpreadsheet, Layers, ShieldAlert, CheckCircle
} from 'lucide-react';
import { AppSettings, AppView, User } from '../types';
import { INITIAL_USERS, db } from '../services/database';

interface PortalLoginViewProps {
  settings: AppSettings;
  currentUser: User | null;
  onNavigate: (view: AppView) => void;
  onLogin: (user: User) => void;
  onOpenAuthModal: () => void;
}

export const PortalLoginView: React.FC<PortalLoginViewProps> = ({
  settings,
  currentUser,
  onNavigate,
  onLogin,
  onOpenAuthModal,
}) => {
  // Active Role Tab: 'GURU' | 'SISWA' | 'ADMIN'
  const [activeRole, setActiveRole] = useState<'GURU' | 'SISWA' | 'ADMIN'>('GURU');
  
  // Credentials Form State
  const [username, setUsername] = useState('guru');
  const [password, setPassword] = useState('guru');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Setup Database Modal State
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initSuccess, setInitSuccess] = useState(false);

  // Synchronize default credentials when role tab changes
  const handleSelectRoleTab = (role: 'GURU' | 'SISWA' | 'ADMIN') => {
    setActiveRole(role);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (role === 'GURU') {
      setUsername('guru');
      setPassword('guru');
    } else if (role === 'SISWA') {
      setUsername('siswa');
      setPassword('siswa');
    } else {
      setUsername('admin');
      setPassword('admin');
    }
  };

  // Submit Login Form
  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = db.authenticateUser(username, password);

      if (result.success && result.user) {
        setSuccessMessage(`Login Berhasil! Selamat datang, ${result.user.nama}`);
        onLogin(result.user);

        // Redirect based on role
        setTimeout(() => {
          if (result.user?.role === 'ADMIN') {
            onNavigate('admin-dashboard');
          } else if (result.user?.role === 'GURU') {
            onNavigate('guru-dashboard');
          } else {
            onNavigate('materi');
          }
        }, 600);
      } else {
        setErrorMessage(result.message || 'Username atau password tidak sesuai.');
      }
      setIsLoading(false);
    }, 300);
  };

  // Quick Preset Helper
  const handleQuickFill = (userRole: 'GURU' | 'SISWA' | 'ADMIN', userUser: string, userPass: string) => {
    setActiveRole(userRole);
    setUsername(userUser);
    setPassword(userPass);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Initialize / Reset Database Action
  const handleRunDatabaseSetup = () => {
    setIsInitializing(true);
    setInitSuccess(false);

    setTimeout(() => {
      db.initDatabase(true);
      setIsInitializing(false);
      setInitSuccess(true);
      setTimeout(() => {
        setIsSetupModalOpen(false);
        setInitSuccess(false);
      }, 1500);
    }, 800);
  };

  return (
    <div id="portal-login-view" className="space-y-10 pb-20">
      
      {/* 1. TOP HEADER & IDENTITY */}
      <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
          <School className="w-4 h-4 text-sky-700" />
          <span>{settings.school_name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pusat Pembelajaran Digital &amp; LMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Portal autentikasi terpadu untuk Guru Pengajar, Siswa Peserta Didik, dan Administrator Sekolah.
        </p>
      </div>

      {/* 2. THE EXACT LOGIN CARD FROM SCREENSHOT (CENTRAL FORM) */}
      <div className="max-w-md mx-auto w-full">
        <div 
          id="main-login-card" 
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden"
        >
          {/* Top Subtitle */}
          <div className="text-center">
            <span className="text-sm font-bold text-slate-700">
              {activeRole === 'GURU' && 'Pembelajaran Guru'}
              {activeRole === 'SISWA' && 'Pembelajaran Siswa'}
              {activeRole === 'ADMIN' && 'Administrator Panel'}
            </span>
          </div>

          {/* Golden / Yellow Setup Database Button (Exact match from screenshot) */}
          <div className="space-y-1.5">
            <button
              type="button"
              id="btn-inisialisasi-database"
              onClick={() => setIsSetupModalOpen(true)}
              className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-slate-950 font-extrabold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base border border-amber-400 active:scale-98"
            >
              <Database className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
              <Zap className="w-4 h-4 fill-amber-700 text-amber-800 shrink-0" />
              <span>Inisialisasi Database (Setup Database)</span>
            </button>
            <p className="text-center text-[11px] text-slate-500">
              Klik jika sheet belum ada / ingin mengisi data awal.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
              Pilih Peran Akun Masuk
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                id="tab-role-guru"
                onClick={() => handleSelectRoleTab('GURU')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'GURU'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Guru</span>
              </button>

              <button
                type="button"
                id="tab-role-siswa"
                onClick={() => handleSelectRoleTab('SISWA')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'SISWA'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Siswa</span>
              </button>

              <button
                type="button"
                id="tab-role-admin"
                onClick={() => handleSelectRoleTab('ADMIN')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'ADMIN'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form Fields for Username and Password */}
          <form onSubmit={handleSubmitLogin} className="space-y-4 pt-1">
            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Success Message Banner */}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-bold">{successMessage}</span>
              </div>
            )}

            {/* Username Input Box (Exact style from screenshot) */}
            <div className="space-y-1">
              <label 
                htmlFor="input-username" 
                className="block text-xs font-semibold text-slate-500"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="input-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin / guru / siswa"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-base font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white"
                />
              </div>
            </div>

            {/* Password Input Box (Exact style from screenshot with password dots) */}
            <div className="space-y-1">
              <label 
                htmlFor="input-password" 
                className="block text-xs font-semibold text-slate-500"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 text-slate-900 text-base font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white"
                />
                <button
                  type="button"
                  id="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Prominent Blue Button (Exact style from screenshot: "MASUK KE APLIKASI") */}
            <button
              type="submit"
              id="btn-masuk-aplikasi"
              disabled={isLoading}
              className="w-full bg-[#1877F2] hover:bg-[#1565C0] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide uppercase active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5 shrink-0" />
              )}
              <span>MASUK KE APLIKASI</span>
            </button>
          </form>

          {/* Quick Demo Fill Presets */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Akun Demo Cepat (1-Klik Isi)
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                id="btn-quick-fill-guru"
                onClick={() => handleQuickFill('GURU', 'guru', 'guru')}
                className="px-2 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-sky-800">Guru</p>
                <p className="text-[9px] text-sky-600 font-mono">guru / guru</p>
              </button>

              <button
                type="button"
                id="btn-quick-fill-siswa"
                onClick={() => handleQuickFill('SISWA', 'siswa', 'siswa')}
                className="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-emerald-800">Siswa</p>
                <p className="text-[9px] text-emerald-600 font-mono">siswa / siswa</p>
              </button>

              <button
                type="button"
                id="btn-quick-fill-admin"
                onClick={() => handleQuickFill('ADMIN', 'admin', 'admin')}
                className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-slate-800">Admin</p>
                <p className="text-[9px] text-slate-600 font-mono">admin / admin</p>
              </button>
            </div>
          </div>

          {/* Google SSO Fallback */}
          <div className="pt-2 text-center">
            <button
              type="button"
              id="btn-portal-open-google-sso"
              onClick={onOpenAuthModal}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Atau masuk dengan Akun Google Belajar.id &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. BENTO THREE ROLE FEATURE CARDS */}
      <section id="bento-three-portals" className="space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Akses Fitur Berdasarkan Peran Pengguna
          </h2>
          <p className="text-xs text-slate-500">
            Hak akses dan kapabilitas modul pembelajaran terintegrasi {settings.school_name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GURU CARD */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
                <GraduationCap className="w-3.5 h-3.5" />
                ROLE: GURU
              </span>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded">
                Pendidik
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Ruang Pendidik &amp; Guru</h3>
              <p className="text-xs text-slate-500 mt-1">
                Upload materi PDF/Drive, publikasi video praktikum YouTube, dan kirim karya inovasi guru.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Upload Modul Ajar (Drive, PDF, PPTX)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Streaming Video Tutorial YouTube</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Kirim Portofolio Karya Guru Inovatif</span>
              </div>
            </div>

            <button
              onClick={() => handleQuickFill('GURU', 'guru', 'guru')}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Pilih Role Guru &amp; Masuk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SISWA CARD */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Users className="w-3.5 h-3.5" />
                ROLE: SISWA
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                Peserta Didik
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Ruang Belajar Siswa</h3>
              <p className="text-xs text-slate-500 mt-1">
                Akses materi pelajaran SMK, tonton video praktikum lab, unduh LKPD dan simpan bookmark.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Akses Modul Belajar Kelas X, XI, XII</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tonton Praktikum &amp; Laboratorium Mandiri</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Simpan Bookmark Materi Favorit</span>
              </div>
            </div>

            <button
              onClick={() => handleQuickFill('SISWA', 'siswa', 'siswa')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Pilih Role Siswa &amp; Masuk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ADMIN CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-amber-300 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ROLE: ADMIN
              </span>
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                Control Panel
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Administrator Sekolah</h3>
              <p className="text-xs text-slate-500 mt-1">
                Verifikasi materi &amp; karya guru, kelola data master siswa/guru, dan sinkronisasi Google Sheets.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verifikasi &amp; Moderasi Konten Guru</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Manajemen Data Guru &amp; Kelas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Integrasi Google Apps Script &amp; Sheets</span>
              </div>
            </div>

            <button
              onClick={() => handleQuickFill('ADMIN', 'admin', 'admin')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Pilih Role Admin &amp; Masuk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. SCHOOL FOOTPRINT CARD */}
      <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
            Alamat &amp; Kontak Resmi Sekolah
          </span>
          <h3 className="text-xl font-bold text-white">
            {settings.school_name}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {settings.school_address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              +62 812-3456-7890
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              info@smknegeri1bandar.sch.id
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="bg-white hover:bg-sky-50 text-slate-900 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>Lihat Beranda Publik LMS</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 5. DATABASE SETUP & INITIALIZATION MODAL */}
      {/* ======================================================== */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#FFC107] p-6 text-slate-950 relative border-b border-amber-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-md">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950 text-amber-300 uppercase tracking-wider mb-1">
                    Database Setup Engine
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-950">Inisialisasi Database</h2>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-900 font-medium leading-relaxed">
                Fitur ini akan membuat struktur sheet lengkap, mengisi data awal guru, siswa, kelas, modul materi, dan video pembelajaran untuk <strong>{settings.school_name}</strong>.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Daftar Sheet yang Diinisialisasi:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>1. tb_users</strong> (Akun &amp; Password)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>2. tb_guru</strong> (Data Pengajar)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>3. tb_kelas</strong> (Rombel SMK)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>4. tb_materi</strong> (Modul Drive/PDF)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>5. tb_youtube</strong> (Video Praktikum)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>6. tb_karya</strong> (Best Practice Guru)</span>
                  </div>
                </div>
              </div>

              {/* Success Notification inside modal */}
              {initSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Database berhasil diinisialisasi &amp; disinkronkan dengan data awal!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSetupModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  id="btn-execute-database-setup"
                  onClick={handleRunDatabaseSetup}
                  disabled={isInitializing || initSuccess}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#FFC107] hover:bg-[#FFB300] text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                  {isInitializing ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Sedang Menginisialisasi...</span>
                    </>
                  ) : initSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Selesai</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-amber-800 text-amber-800" />
                      <span>Jalankan Inisialisasi Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
              SMK Negeri 1 Bandar &bull; Google Apps Script &amp; Sheets Engine
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
