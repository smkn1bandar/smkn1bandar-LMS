import React, { useState } from 'react';
import { 
  GraduationCap, Users, ShieldCheck, ArrowRight, BookOpen, 
  MapPin, Phone, Mail, School, Check, RotateCw, Database, Zap, 
  Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles, LogIn, 
  ExternalLink, CheckCircle, Lock, KeyRound
} from 'lucide-react';
import { AppSettings, AppView, User } from '../types';
import { db } from '../services/database';

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
  
  // Real users loaded from database/spreadsheet
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => db.getUsers());

  // Refresh users on load
  const refreshUsersList = () => {
    setRegisteredUsers(db.getUsers());
  };

  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Setup Database Modal State
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initSuccess, setInitSuccess] = useState(false);

  // Handle Tab Switch
  const handleSelectRoleTab = (role: 'GURU' | 'SISWA' | 'ADMIN') => {
    setActiveRole(role);
    setErrorMessage(null);
    setSuccessMessage(null);
    setUsername('');
    setPassword('');
  };

  // Filter registered users by active role
  const roleUsers = registeredUsers.filter(u => u.role === activeRole && u.status === 'AKTIF');

  // Submit Login
  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = db.authenticateUser(username, password);

      if (result.success && result.user) {
        setSuccessMessage(`Login Berhasil! Mengalihkan...`);
        onLogin(result.user);

        setTimeout(() => {
          if (result.user?.role === 'ADMIN') {
            onNavigate('admin-dashboard');
          } else if (result.user?.role === 'GURU') {
            onNavigate('guru-dashboard');
          } else {
            onNavigate('materi');
          }
        }, 500);
      } else {
        setErrorMessage(result.message || 'Username atau password salah.');
      }
      setIsLoading(false);
    }, 250);
  };

  // Quick select registered teacher/user helper
  const handleSelectUserAccount = (selectedUser: User) => {
    setActiveRole(selectedUser.role as 'GURU' | 'SISWA' | 'ADMIN');
    setUsername(selectedUser.username || selectedUser.email);
    setPassword(selectedUser.password || (selectedUser.role === 'ADMIN' ? 'admin' : selectedUser.role === 'GURU' ? 'guru123' : 'siswa123'));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Database Setup Action
  const handleRunDatabaseSetup = () => {
    setIsInitializing(true);
    setInitSuccess(false);

    setTimeout(() => {
      db.initDatabase(true);
      setRegisteredUsers(db.getUsers());
      setIsInitializing(false);
      setInitSuccess(true);
      setTimeout(() => {
        setIsSetupModalOpen(false);
        setInitSuccess(false);
      }, 1400);
    }, 700);
  };

  return (
    <div 
      id="portal-landing-fullscreen" 
      className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-sky-50/50 to-slate-200 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased"
    >
      
      {/* 1. TOP HEADER BRANDING */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-2 sm:pt-4 space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 text-sky-800 border border-sky-200/80 shadow-xs backdrop-blur-xs">
          <School className="w-4 h-4 text-sky-600" />
          <span>{settings.school_name}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pusat Pembelajaran Digital &amp; LMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md">
          Portal Autentikasi Tunggal Pendidik Guru, Siswa Peserta Didik, dan Administrator
        </p>
      </div>

      {/* 2. CENTRAL AUTHENTICATION CARD (MATCHING EXACT SCREENSHOT) */}
      <div className="w-full max-w-md mx-auto my-4 sm:my-6">
        <div 
          id="main-login-card" 
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xl shadow-slate-300/60 space-y-5 relative overflow-hidden"
        >
          {/* Subtitle Matching Reference */}
          <div className="text-center">
            <span className="text-sm sm:text-base font-semibold text-slate-700">
              {activeRole === 'GURU' && 'Pembelajaran Guru'}
              {activeRole === 'SISWA' && 'Pembelajaran Siswa'}
              {activeRole === 'ADMIN' && 'Pembelajaran Guru & Admin'}
            </span>
          </div>

          {/* Yellow Setup Database Button (Exact match from screenshot) */}
          <div className="space-y-1.5">
            <button
              type="button"
              id="btn-inisialisasi-database"
              onClick={() => setIsSetupModalOpen(true)}
              className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base border border-amber-400 active:scale-[0.98]"
            >
              <Database className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
              <Zap className="w-4 h-4 fill-amber-800 text-amber-800 shrink-0" />
              <span>Inisialisasi Database (Setup Database)</span>
            </button>
            <p className="text-center text-[11px] text-slate-500 font-normal">
              Klik jika sheet belum ada / ingin mengisi data awal.
            </p>
          </div>

          {/* Role Switcher (Guru, Siswa, Admin) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              PILIH PERAN AKUN MASUK
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                id="tab-role-guru"
                onClick={() => handleSelectRoleTab('GURU')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'GURU'
                    ? 'bg-[#1877F2] text-white shadow-xs'
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
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'SISWA'
                    ? 'bg-emerald-600 text-white shadow-xs'
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
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'ADMIN'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form Username and Password */}
          <form onSubmit={handleSubmitLogin} className="space-y-4">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-bold">{successMessage}</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-1">
              <label 
                htmlFor="input-username" 
                className="block text-xs font-semibold text-slate-500"
              >
                Username atau Email Akun Terdaftar
              </label>
              <input
                id="input-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email sesuai spreadsheet"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-base font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white"
              />
            </div>

            {/* Password Field */}
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
                  placeholder="Password akun Anda"
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

            {/* Big Blue Submit Button ("MASUK KE APLIKASI") */}
            <button
              type="submit"
              id="btn-masuk-aplikasi"
              disabled={isLoading}
              className="w-full bg-[#1877F2] hover:bg-[#1565C0] text-white font-black py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide uppercase active:scale-[0.98] disabled:opacity-75"
            >
              {isLoading ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5 shrink-0" />
              )}
              <span>MASUK KE APLIKASI</span>
            </button>
          </form>

          {/* Quick Select from Registered Teachers & Users from Spreadsheet */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                AKUN {activeRole} TERDAFTAR SPREADSHEET ({roleUsers.length}):
              </span>
              <button
                type="button"
                id="btn-refresh-users-list"
                onClick={() => {
                  db.initDatabase(true);
                  setRegisteredUsers(db.getUsers());
                  setSuccessMessage('Data akun guru & siswa diperbarui!');
                  setTimeout(() => setSuccessMessage(null), 2500);
                }}
                className="text-[10px] text-sky-600 hover:text-sky-800 font-semibold underline"
              >
                Muat Ulang Data
              </button>
            </div>

            {roleUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {roleUsers.map((u) => (
                  <button
                    key={u.id_user}
                    type="button"
                    id={`btn-select-user-${u.id_user}`}
                    onClick={() => handleSelectUserAccount(u)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-left transition-all group flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-slate-800 group-hover:text-sky-800 truncate">
                        {u.nama}
                      </p>
                      <p className="text-[9.5px] text-slate-500 font-mono truncate">
                        User: <strong className="text-slate-700">{u.username || u.email.split('@')[0]}</strong>
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-sky-600 px-1.5 py-0.5 rounded bg-sky-100 shrink-0 ml-1">
                      Pilih
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-[11px] text-slate-500">
                  Belum ada akun {activeRole.toLowerCase()} terdaftar di spreadsheet.
                </p>
              </div>
            )}
          </div>

          {/* Secondary Actions */}
          <div className="pt-2 flex flex-col items-center gap-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-portal-open-google-sso"
              onClick={onOpenAuthModal}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>Masuk dengan Google Belajar.id &rarr;</span>
            </button>

            <button
              type="button"
              id="btn-explore-public-home"
              onClick={() => onNavigate('home')}
              className="text-[11px] text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <BookOpen className="w-3 h-3 text-slate-400" />
              <span>Jelajahi Beranda Publik &amp; Modul Ajar Tanpa Login &rarr;</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM FOOTER WITH SCHOOL DETAILS */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-3 pb-1 border-t border-slate-200/70 gap-2">
        <div className="flex items-center gap-2">
          <School className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">{settings.school_name}</span>
          <span>&bull;</span>
          <span>{settings.school_address}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-emerald-600" />
            +62 812-3456-7890
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-sky-600" />
            info@smknegeri1bandar.sch.id
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. DATABASE INITIALIZATION MODAL */}
      {/* ======================================================== */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#FFC107] p-6 text-slate-950 relative border-b border-amber-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-md">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950 text-amber-300 uppercase tracking-wider mb-1">
                    Database Engine
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-950">Inisialisasi Database</h2>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-900 font-medium leading-relaxed">
                Membuat struktur Google Sheet / database lokal dan mengisi data akun guru, siswa, rombel kelas, serta materi untuk <strong>{settings.school_name}</strong>.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Struktur Sheet yang Dikonfigurasi:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>1. tb_users</strong> (Akun &amp; Pass)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>2. tb_guru</strong> (Daftar Pengajar)</span>
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
                      <span>Menginisialisasi...</span>
                    </>
                  ) : initSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Selesai</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-amber-800 text-amber-800" />
                      <span>Jalankan Inisialisasi</span>
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
