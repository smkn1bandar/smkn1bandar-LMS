import React, { useState } from 'react';
import { 
  GraduationCap, Search, ArrowRight, BookOpen, Video, Award, 
  Users, HardDrive, Youtube, ShieldCheck, Sparkles, ChevronRight, 
  Eye, FileText, CheckCircle2, TrendingUp, Layers, Play, Plus, 
  ExternalLink, Globe, Code, Clock, Check
} from 'lucide-react';
import { Materi, YoutubeVideo, KaryaGuru, Guru, AppSettings, AppView } from '../types';
import { MateriCard } from '../components/MateriCard';
import { VideoCard } from '../components/VideoCard';
import { KaryaCard } from '../components/KaryaCard';
import { TeacherCard } from '../components/TeacherCard';

interface HomeViewProps {
  settings: AppSettings;
  materiList: Materi[];
  videoList: YoutubeVideo[];
  karyaList: KaryaGuru[];
  guruList: Guru[];
  onNavigate: (view: AppView) => void;
  onPreviewMateri: (materi: Materi) => void;
  onPlayVideo: (video: YoutubeVideo) => void;
  onPreviewKarya: (karya: KaryaGuru) => void;
  onShareItem: (item: any) => void;
  onSelectGuru: (guru: Guru) => void;
  onOpenLogin: () => void;
  stats: {
    totalTeachers: number;
    totalMateri: number;
    totalYoutube: number;
    totalKarya: number;
    totalViews: number;
  };
}

export const HomeView: React.FC<HomeViewProps> = ({
  settings,
  materiList,
  videoList,
  karyaList,
  guruList,
  onNavigate,
  onPreviewMateri,
  onPlayVideo,
  onPreviewKarya,
  onShareItem,
  onSelectGuru,
  onOpenLogin,
  stats,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('materi');
    }
  };

  const featuredKarya = karyaList.filter(k => k.status === 'DISETUJUI').slice(0, 3);
  const latestMateri = materiList.filter(m => m.status === 'DISETUJUI').slice(0, 4);
  const popularVideo = videoList[0] || null;

  return (
    <div id="home-view-container" className="space-y-6 pb-16">
      
      {/* 1. BENTO WELCOME & QUICK ACTIONS HEADER */}
      <section id="bento-welcome-header" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Selamat Datang di {settings.school_name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Learning Management System (LMS) Guru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {settings.tagline} &mdash; Kelola modul ajar Google Drive, video praktikum YouTube, dan publikasi portofolio guru terintegrasi.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            id="btn-bento-portal-masuk"
            onClick={() => onNavigate('portal-login')}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Portal Masuk Siswa &amp; Guru</span>
          </button>
          <button
            id="btn-bento-add-materi"
            onClick={() => onNavigate('materi')}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Katalog Materi</span>
          </button>
          <button
            id="btn-bento-upload-karya"
            onClick={() => onNavigate('karya')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-all"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Karya Guru</span>
          </button>
        </div>
      </section>

      {/* QUICK ROLE PORTALS SHORTCUT CARDS */}
      <section id="bento-quick-role-portals" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Guru Portal Quick Card */}
        <div 
          onClick={() => onNavigate('portal-login')}
          className="bg-gradient-to-br from-sky-50 to-white p-4 sm:p-5 rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md hover:border-sky-400 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm shadow-sky-600/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded">
                Portal Guru
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-sky-700 transition-colors">
                Ruang Pendidik &amp; Pengajar
              </h3>
              <p className="text-[11px] text-slate-500">Upload modul Drive, video &amp; LKPD</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Siswa Portal Quick Card */}
        <div 
          onClick={() => onNavigate('portal-login')}
          className="bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                Portal Siswa
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                Ruang Belajar Peserta Didik
              </h3>
              <p className="text-[11px] text-slate-500">Akses modul, video &amp; tugas kelas</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Admin Portal Quick Card */}
        <div 
          onClick={() => onNavigate('portal-login')}
          className="bg-gradient-to-br from-slate-100 to-white p-4 sm:p-5 rounded-2xl border border-slate-300 shadow-2xs hover:shadow-md hover:border-slate-500 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm shadow-slate-900/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                Portal Admin
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-slate-900 transition-colors">
                Control Panel Sekolah
              </h3>
              <p className="text-[11px] text-slate-500">Verifikasi karya, database &amp; GAS</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-700 group-hover:translate-x-1 transition-transform" />
        </div>
      </section>

      {/* 2. BENTO METRICS BAR (4 Columns) */}
      <section id="bento-metrics-section" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Materi */}
        <div 
          onClick={() => onNavigate('materi')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Materi & Modul</span>
            <BookOpen className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalMateri}</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+12</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">PDF, Docs, PPTX &amp; Spreadsheet</p>
        </div>

        {/* Metric 2: Video */}
        <div 
          onClick={() => onNavigate('video')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Video Tutorial</span>
            <Video className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalYoutube}</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+3</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Streaming Praktikum YouTube</p>
        </div>

        {/* Metric 3: Karya */}
        <div 
          onClick={() => onNavigate('karya')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Karya Inovasi</span>
            <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalKarya}</span>
            <span className="text-sky-600 text-xs font-bold bg-sky-50 px-1.5 py-0.5 rounded">Featured</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Best Practice &amp; LKPD Terverifikasi</p>
        </div>

        {/* Metric 4: Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total Dilihat</span>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.totalViews > 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews}
            </span>
            <span className="text-slate-500 text-xs font-bold">Views</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{stats.totalTeachers} Guru Aktif Berbagi</p>
        </div>
      </section>

      {/* 3. BENTO MAIN 12-COLUMN GRID (Span 8 + Span 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Span 8): Search + Materi Terbaru + Panduan */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Search Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <form onSubmit={handleGlobalSearch} className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Cari materi ajar, topik pelajaran, atau karya guru..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-slate-800 outline-none w-full font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Cari</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Bento Card: Materi Terbaru */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Materi Pembelajaran Terbaru</h3>
                <p className="text-xs text-slate-500">Bahan ajar siap pakai yang diunggah oleh guru pengajar</p>
              </div>
              <button 
                onClick={() => onNavigate('materi')}
                className="text-sky-600 hover:text-sky-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {latestMateri.map((materi) => {
                const getFormatBadge = (jenis: string) => {
                  switch (jenis) {
                    case 'PDF':
                      return 'bg-rose-100 text-rose-700';
                    case 'PPT/PPTX':
                      return 'bg-amber-100 text-amber-700';
                    case 'DOC/DOCX':
                      return 'bg-blue-100 text-blue-700';
                    default:
                      return 'bg-slate-100 text-slate-700';
                  }
                };

                return (
                  <div 
                    key={materi.id_materi}
                    onClick={() => onPreviewMateri(materi)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 hover:bg-sky-50/50 rounded-xl border border-slate-100 hover:border-sky-200 transition-all cursor-pointer gap-3"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${getFormatBadge(materi.jenis_materi)}`}>
                        {materi.jenis_materi.substring(0, 3)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate hover:text-sky-600">
                          {materi.judul}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {materi.mata_pelajaran} &bull; Kelas {materi.kelas} &bull; {materi.nama_guru}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                        Published
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium pl-1">
                        <Eye className="w-3.5 h-3.5" />
                        {materi.jumlah_view || 0}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bento Help / Content Creation Guide */}
          <div className="bg-[#0F172A] text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                  Google Workspace &amp; Apps Script
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Butuh bantuan dalam integrasi materi &amp; Google Drive?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Pelajari cara memasang kode Google Apps Script, menghubungkan Google Sheets, dan menyematkan portal ke Blogger.
              </p>
            </div>
            <button
              onClick={() => onNavigate('panduan')}
              className="bg-white text-slate-900 hover:bg-sky-50 font-bold px-5 py-2.5 rounded-xl text-xs shrink-0 transition-colors shadow-xs"
            >
              Buka Panduan
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN (Span 4): Video Spotlight + Live Activity + Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Bento Spotlight Video & Activity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">Video Terpopuler</h3>
              <span className="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                YouTube
              </span>
            </div>

            {popularVideo ? (
              <div 
                onClick={() => onPlayVideo(popularVideo)}
                className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden group cursor-pointer border border-slate-200"
              >
                <img
                  src={popularVideo.thumbnail || `https://img.youtube.com/vi/${popularVideo.video_id}/hqdefault.jpg`}
                  alt={popularVideo.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-bold line-clamp-1">{popularVideo.judul}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    {popularVideo.mata_pelajaran} &bull; {popularVideo.view || 0} Views
                  </p>
                </div>
              </div>
            ) : null}

            {/* Aktivitas Terbaru Live Feed */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Aktivitas Terbaru
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Admin</span> menyetujui Modul Ajar Biologi
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">10 menit yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Sistem</span> Sinkronisasi Google Sheets database aktif
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">1 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-slate-900">Guru</span> mengunggah video praktikum baru
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">3 jam yang lalu</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('video')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors text-center"
            >
              Buka Semua Video
            </button>
          </div>

          {/* Bento Card: Guru Pengajar Teratas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">Guru Teraktif</h3>
              <button
                onClick={() => onNavigate('guru')}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                Direktori
              </button>
            </div>

            <div className="space-y-3">
              {guruList.slice(0, 3).map((guru) => (
                <div 
                  key={guru.id_guru}
                  onClick={() => onSelectGuru(guru)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={guru.foto}
                      alt={guru.nama_guru}
                      className="w-9 h-9 rounded-lg object-cover ring-2 ring-sky-500/20"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                        {guru.nama_guru}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {guru.mata_pelajaran}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. BENTO SECTION: KARYA GURU & BEST PRACTICE */}
      {featuredKarya.length > 0 && (
        <section id="bento-karya-showcase" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">
                  Inovasi &amp; Portofolio
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Karya Inovasi Guru Terpilih
              </h2>
            </div>
            <button
              onClick={() => onNavigate('karya')}
              className="text-sky-600 hover:text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline"
            >
              <span>Lihat Semua Karya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredKarya.map((karya) => (
              <KaryaCard
                key={karya.id_karya}
                karya={karya}
                onPreview={onPreviewKarya}
                onShare={onShareItem}
                onTeacherClick={(tId) => {
                  const target = guruList.find(g => g.id_guru === tId || g.nama_guru === karya.nama_guru);
                  if (target) onSelectGuru(target);
                }}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
