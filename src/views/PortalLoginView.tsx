import React, { useState } from 'react';
import { 
  GraduationCap, Users, ShieldCheck, ArrowRight, BookOpen, 
  Video, Award, CheckCircle2, Sparkles, MapPin, Phone, Mail, 
  Lock, UserCheck, HardDrive, KeyRound, ExternalLink, HelpCircle, 
  School, Check, ChevronRight, LogIn
} from 'lucide-react';
import { AppSettings, AppView, User } from '../types';
import { INITIAL_USERS } from '../services/database';

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
  const [selectedRoleTab, setSelectedRoleTab] = useState<'all' | 'guru' | 'siswa' | 'admin'>('all');

  // Filter users by role
  const teacherUsers = INITIAL_USERS.filter(u => u.role === 'GURU');
  const studentUsers = INITIAL_USERS.filter(u => u.role === 'SISWA');
  const adminUsers = INITIAL_USERS.filter(u => u.role === 'ADMIN');

  const handleQuickLoginAs = (user: User, redirectView: AppView) => {
    onLogin(user);
    onNavigate(redirectView);
  };

  return (
    <div id="portal-login-view" className="space-y-8 pb-16">
      
      {/* 1. HERO BENTO BANNER - IDENTITY & PORTAL ENTRANCE */}
      <section id="portal-hero-banner" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-sky-100/50 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-widest bg-sky-100 text-sky-800 border border-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                Portal Akses Terpadu LMS
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700">
                <School className="w-3.5 h-3.5 text-slate-500" />
                {settings.school_name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pintu Masuk Digital: Guru, Siswa &amp; Administrator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Selamat datang di portal pembelajaran digital resmi <strong className="text-slate-900">{settings.school_name}</strong>. 
              Silakan pilih pintu masuk sesuai peran Anda untuk mengelola materi, mengakses modul ajar, praktikum laboratorium, dan administrasi sekolah.
            </p>

            {/* School Contact & Location Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="font-semibold text-slate-800">{settings.school_address}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">+62 812-3456-7890</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="font-semibold text-slate-800">info@smknegeri1bandar.sch.id</span>
              </div>
            </div>
          </div>

          {/* Quick SSO Login trigger */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Single Sign-On Google
            </span>
            <button
              id="btn-portal-open-sso"
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 active:scale-95 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Akun Google Belajar.id</span>
            </button>
            <span className="text-[10px] text-slate-500">
              Otomatis terhubung ke Google Drive &amp; Sheets
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE 3 CORE BENTO ACCESS PORTAL CARDS */}
      <section id="bento-three-portals" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Pilih Portal Akses Anda
            </h2>
            <p className="text-xs text-slate-500">
              Pilih gerbang masuk yang sesuai dengan hak akses Anda di {settings.school_name}
            </p>
          </div>

          {/* Tab Filter */}
          <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedRoleTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Portal
            </button>
            <button
              onClick={() => setSelectedRoleTab('guru')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'guru' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Guru
            </button>
            <button
              onClick={() => setSelectedRoleTab('siswa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'siswa' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Siswa
            </button>
            <button
              onClick={() => setSelectedRoleTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ==================== 1. PORTAL GURU ==================== */}
          {(selectedRoleTab === 'all' || selectedRoleTab === 'guru') && (
            <div 
              id="portal-card-guru" 
              className="bg-white rounded-3xl border-2 border-sky-100 hover:border-sky-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
                    <GraduationCap className="w-3.5 h-3.5" />
                    PORTAL GURU
                  </span>
                  <span className="text-[11px] font-bold text-sky-600 bg-sky-100/50 px-2 py-0.5 rounded">
                    Pendidik &amp; Pengajar
                  </span>
                </div>

                {/* Portal Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 transition-transform shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Ruang Kerja Guru
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Platform publikasi modul ajar, video praktikum laboratorium, dan karya inovasi Kurikulum Merdeka.
                    </p>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Upload Modul Ajar (Google Drive, PDF, PPT, DOCX)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Streaming Video Praktikum &amp; Tutorial YouTube</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Kirim LKPD &amp; Karya Inovasi Guru ke Kurator</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Dashboard Statistik &amp; Analitik Pembelajaran Saya</span>
                  </div>
                </div>

                {/* 1-Click Fast Guru Personas */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Masuk Cepat Sebagai Guru (Demo)
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="space-y-1.5">
                    {teacherUsers.slice(0, 3).map((teacher) => (
                      <button
                        key={teacher.id_user}
                        id={`btn-quick-login-guru-${teacher.id_user}`}
                        onClick={() => handleQuickLoginAs(teacher, 'guru-dashboard')}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-left border border-slate-100 hover:border-sky-200 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={teacher.foto} 
                            alt={teacher.nama} 
                            className="w-7 h-7 rounded-lg object-cover ring-1 ring-sky-500/20" 
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-800 truncate">{teacher.nama}</p>
                            <p className="text-[10px] text-slate-500 truncate">{teacher.mata_pelajaran}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-100 shrink-0">
                          Masuk &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="p-6 bg-sky-50/50 border-t border-sky-100">
                <button
                  id="btn-enter-portal-guru"
                  onClick={() => {
                    if (currentUser && currentUser.role === 'GURU') {
                      onNavigate('guru-dashboard');
                    } else if (teacherUsers[0]) {
                      handleQuickLoginAs(teacherUsers[0], 'guru-dashboard');
                    } else {
                      onOpenAuthModal();
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Buka Portal Guru Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 2. PORTAL SISWA ==================== */}
          {(selectedRoleTab === 'all' || selectedRoleTab === 'siswa') && (
            <div 
              id="portal-card-siswa" 
              className="bg-white rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Users className="w-3.5 h-3.5" />
                    PORTAL SISWA
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                    Peserta Didik SMK
                  </span>
                </div>

                {/* Portal Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Ruang Belajar Siswa
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Akses materi ajar, unduh lembar kerja, tonton praktikum laboratorium, dan belajar mandiri.
                    </p>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Akses Modul Ajar Kelas X, XI, dan XII SMK</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Streaming Video Praktikum &amp; Eksperimen Interaktif</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unduh LKPD, Rangkuman &amp; Panduan Belajar Mandiri</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Simpan Materi Favorit / Bookmark Pembelajaran</span>
                  </div>
                </div>

                {/* 1-Click Fast Siswa Personas */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Masuk Cepat Sebagai Siswa (Demo)
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    {studentUsers.slice(0, 3).map((student) => (
                      <button
                        key={student.id_user}
                        id={`btn-quick-login-siswa-${student.id_user}`}
                        onClick={() => handleQuickLoginAs(student, 'materi')}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-left border border-slate-100 hover:border-emerald-200 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={student.foto} 
                            alt={student.nama} 
                            className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/20" 
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-800 truncate">{student.nama}</p>
                            <p className="text-[10px] text-slate-500 truncate">{student.mata_pelajaran}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-100 shrink-0">
                          Belajar &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="p-6 bg-emerald-50/50 border-t border-emerald-100">
                <button
                  id="btn-enter-portal-siswa"
                  onClick={() => {
                    if (studentUsers[0]) {
                      handleQuickLoginAs(studentUsers[0], 'materi');
                    } else {
                      onNavigate('materi');
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Jelajahi Ruang Belajar Siswa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 3. PORTAL ADMIN ==================== */}
          {(selectedRoleTab === 'all' || selectedRoleTab === 'admin') && (
            <div 
              id="portal-card-admin" 
              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-amber-300 border border-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    PORTAL ADMINISTRATOR
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    Operator &amp; Lab
                  </span>
                </div>

                {/* Portal Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center shadow-lg shadow-slate-900/30 group-hover:scale-105 transition-transform shrink-0">
                    <ShieldCheck className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Control Panel Admin
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Manajemen verifikasi konten, basis data guru &amp; kelas, integrasi Google Apps Script, dan backup.
                    </p>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verifikasi &amp; Moderasi Karya Guru &amp; Materi Masuk</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Manajemen Data Induk Guru, Pengguna &amp; Kelas</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Konfigurasi Google Apps Script &amp; Embed Blogger</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Export/Import Backup Database JSON Sekolah</span>
                  </div>
                </div>

                {/* 1-Click Fast Admin Persona */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Masuk Cepat Sebagai Admin (Demo)
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="space-y-1.5">
                    {adminUsers.map((admin) => (
                      <button
                        key={admin.id_user}
                        id={`btn-quick-login-admin-${admin.id_user}`}
                        onClick={() => handleQuickLoginAs(admin, 'admin-dashboard')}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-amber-50 text-left border border-slate-100 hover:border-amber-200 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={admin.foto} 
                            alt={admin.nama} 
                            className="w-7 h-7 rounded-lg object-cover ring-1 ring-amber-500/20" 
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-800 truncate">{admin.nama}</p>
                            <p className="text-[10px] text-amber-700 font-semibold truncate">Administrator Utama</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          Admin Panel &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <button
                  id="btn-enter-portal-admin"
                  onClick={() => {
                    if (currentUser && currentUser.role === 'ADMIN') {
                      onNavigate('admin-dashboard');
                    } else if (adminUsers[0]) {
                      handleQuickLoginAs(adminUsers[0], 'admin-dashboard');
                    } else {
                      onOpenAuthModal();
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs shadow-md shadow-slate-950/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Buka Dashboard Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. BENTO HAK AKSES MATRIX TABLE */}
      <section id="bento-access-matrix" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded">
              Matriks Hak Akses
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Perbandingan Hak Akses &amp; Fitur Portal
          </h2>
          <p className="text-xs text-slate-500">
            Daftar kemampuan dan izin akses berdasarkan jenis pengguna di LMS SMK Negeri 1 Bandar
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-3 px-4 font-bold text-slate-900">Fitur &amp; Kemampuan LMS</th>
                <th className="py-3 px-4 font-bold text-emerald-700 text-center">
                  <span className="px-2 py-1 rounded bg-emerald-100">Siswa</span>
                </th>
                <th className="py-3 px-4 font-bold text-sky-700 text-center">
                  <span className="px-2 py-1 rounded bg-sky-100">Guru Pengajar</span>
                </th>
                <th className="py-3 px-4 font-bold text-slate-900 text-center">
                  <span className="px-2 py-1 rounded bg-slate-200">Administrator</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-medium">Lihat &amp; Unduh Materi Modul Ajar (Drive/PDF)</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Tonton Video Praktikum &amp; Laboratorium YouTube</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Simpan / Bookmark Modul Pembelajaran Favorit</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Unggah Materi &amp; Modul Ajar Baru (Google Drive)</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Publikasi Video Tutorial Praktikum YouTube</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Kirim Portofolio Karya Guru &amp; Best Practice</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Verifikasi, Setujui &amp; Tolak Karya Guru</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Kelola Data Guru, Akun Pengguna &amp; Kelas</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Konfigurasi Google Apps Script, Google Sheets &amp; Backup JSON</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center text-slate-300">&mdash;</td>
                <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. BENTO SCHOOL CONTACT & IT SUPPORT FOOTPRINT */}
      <section id="bento-school-help-banner" className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
              Layanan Bantuan &amp; Helpdesk LMS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Mengalami Kendala Saat Masuk ke Akun?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Jika email Belajar.id atau akun Google Anda belum terdaftar di basis data <strong>{settings.school_name}</strong>, 
            silakan hubungi tim Administrator Lab Komputer &amp; IT Support di <strong>Jl. Sudirman Perdagangan III</strong> atau kirim pesan ke <strong>info@smknegeri1bandar.sch.id</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('panduan')}
            className="bg-white hover:bg-sky-50 text-slate-900 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Panduan Lengkap</span>
          </button>
          <button
            onClick={onOpenAuthModal}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sekarang</span>
          </button>
        </div>
      </section>

    </div>
  );
};
