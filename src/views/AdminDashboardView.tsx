import React, { useState } from 'react';
import { 
  ShieldCheck, Users, BookOpen, Video, Award, CheckCircle2, 
  XCircle, Clock, Star, Trash2, Edit3, Plus, Settings, 
  Activity, Database, Download, Upload, RefreshCw, Sparkles, HardDrive, Eye
} from 'lucide-react';
import { 
  User, Guru, Kelas, Materi, YoutubeVideo, KaryaGuru, 
  AktivitasLog, AppSettings 
} from '../types';

interface AdminDashboardViewProps {
  currentUser: User;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  guruList: Guru[];
  usersList: User[];
  kelasList: Kelas[];
  materiList: Materi[];
  videoList: YoutubeVideo[];
  karyaList: KaryaGuru[];
  activityLogs: AktivitasLog[];
  onApproveKarya: (id: string) => void;
  onRejectKarya: (id: string, reason?: string) => void;
  onToggleFeaturedKarya: (id: string) => void;
  onDeleteMateri: (id: string) => void;
  onDeleteVideo: (id: string) => void;
  onDeleteKarya: (id: string) => void;
  onAddGuru: (guru: Guru) => void;
  onEditGuru?: (guru: Guru) => void;
  onDeleteGuru?: (id: string) => void;
  onAddKelas: (kelas: Kelas) => void;
  onDeleteKelas: (id: string) => void;
  onPreviewMateri: (materi: Materi) => void;
  onPlayVideo: (video: YoutubeVideo) => void;
  onPreviewKarya: (karya: KaryaGuru) => void;
  onSeedData: () => void;
  onExportBackup: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  settings,
  onUpdateSettings,
  guruList,
  usersList,
  kelasList,
  materiList,
  videoList,
  karyaList,
  activityLogs,
  onApproveKarya,
  onRejectKarya,
  onToggleFeaturedKarya,
  onDeleteMateri,
  onDeleteVideo,
  onDeleteKarya,
  onAddGuru,
  onEditGuru,
  onDeleteGuru,
  onAddKelas,
  onDeleteKelas,
  onPreviewMateri,
  onPlayVideo,
  onPreviewKarya,
  onSeedData,
  onExportBackup,
}) => {
  const [activeTab, setActiveTab] = useState<'moderasi' | 'guru' | 'kelas' | 'konten' | 'logs' | 'pengaturan'>('moderasi');

  // Form states
  const [tempSettings, setTempSettings] = useState<AppSettings>({ ...settings });
  const [showAddGuruModal, setShowAddGuruModal] = useState(false);
  const [showAddKelasModal, setShowAddKelasModal] = useState(false);

  // New Guru state
  const [newGuruNama, setNewGuruNama] = useState('');
  const [newGuruNip, setNewGuruNip] = useState('');
  const [newGuruEmail, setNewGuruEmail] = useState('');
  const [newGuruMapel, setNewGuruMapel] = useState('');
  const [newGuruJurusan, setNewGuruJurusan] = useState('Semua Jurusan');

  // New Kelas state
  const [newKelasNama, setNewKelasNama] = useState('');
  const [newKelasTingkat, setNewKelasTingkat] = useState('X');
  const [newKelasJurusan, setNewKelasJurusan] = useState('RPL');
  const [newKelasWali, setNewKelasWali] = useState('');

  const pendingKarya = karyaList.filter(k => k.status === 'MENUNGGU VERIFIKASI');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
  };

  const handleCreateGuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuruNama.trim() || !newGuruEmail.trim()) return;

    const newG: Guru = {
      id_guru: `GURU-${Date.now().toString().slice(-4)}`,
      nip: newGuruNip.trim() || '198501012010011000',
      nama_guru: newGuruNama.trim(),
      email: newGuruEmail.trim(),
      gelar: 'S.Pd.',
      mata_pelajaran: newGuruMapel.trim() || 'Informatika',
      jurusan: newGuruJurusan,
      kelas: 'X, XI, XII',
      kontak: newGuruEmail.trim(),
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      biografi: 'Guru berdedikasi dalam implementasi kurikulum digital dan teknologi pembelajaran.',
      keahlian: ['Kurikulum Merdeka', 'Digital Learning', newGuruMapel],
      status: 'AKTIF',
    };

    onAddGuru(newG);
    setShowAddGuruModal(false);
    setNewGuruNama('');
    setNewGuruNip('');
    setNewGuruEmail('');
    setNewGuruMapel('');
  };

  const handleCreateKelas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKelasNama.trim()) return;

    const newK: Kelas = {
      id_kelas: `KLS-${Date.now().toString().slice(-4)}`,
      nama_kelas: newKelasNama.trim(),
      tingkat: newKelasTingkat,
      jurusan: newKelasJurusan,
      wali_kelas: newKelasWali.trim() || 'Guru Pengajar',
      tahun_ajaran: '2025/2026',
      status: 'AKTIF',
    };

    onAddKelas(newK);
    setShowAddKelasModal(false);
    setNewKelasNama('');
    setNewKelasWali('');
  };

  return (
    <div id="admin-dashboard-container" className="space-y-8 pb-16">
      
      {/* Header Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Control Panel Administrator
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Pusat Kendali LMS Digital Sekolah
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Administrator: {currentUser.nama} &bull; Database: Google Spreadsheet &amp; Google Apps Script
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-export-backup"
            onClick={onExportBackup}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Backup JSON
          </button>
          <button
            id="btn-seed-data"
            onClick={() => {
              if (window.confirm('Reset database ke data sample awal?')) {
                onSeedData();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Data Demo
          </button>
        </div>
      </div>

      {/* Global Statistics Bento Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guru</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{guruList.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kelas</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{kelasList.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Materi</div>
          <div className="text-xl font-extrabold text-sky-600 mt-1">{materiList.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">YouTube</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{videoList.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Karya</div>
          <div className="text-xl font-extrabold text-amber-500 mt-1">{karyaList.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-amber-300 bg-amber-50/40 shadow-xs">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Pending Verif</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{pendingKarya.length}</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('moderasi')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'moderasi'
              ? 'bg-amber-500 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Moderasi Karya ({pendingKarya.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('guru')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'guru'
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola Data Guru ({guruList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('kelas')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'kelas'
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kelola Kelas ({kelasList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('konten')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'konten'
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Semua Konten</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'logs'
              ? 'bg-slate-800 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Log Aktivitas</span>
        </button>

        <button
          onClick={() => setActiveTab('pengaturan')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pengaturan'
              ? 'bg-slate-800 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan LMS &amp; GAS</span>
        </button>
      </div>

      {/* TAB 1: MODERASI KARYA GURU */}
      {activeTab === 'moderasi' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Verifikasi Karya &amp; Modul Ajar</h2>
              <p className="text-xs text-slate-500">Tinjau karya yang diunggah oleh guru sebelum dipublikasikan ke portal publik.</p>
            </div>
          </div>

          {pendingKarya.length > 0 ? (
            <div className="space-y-4">
              {pendingKarya.map((k) => (
                <div 
                  key={k.id_karya}
                  className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={k.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200'}
                      alt=""
                      className="w-20 h-14 rounded-xl object-cover shadow-2xs shrink-0"
                    />
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200 text-amber-900">
                        {k.kategori}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{k.judul_karya}</h3>
                      <p className="text-xs text-slate-600 line-clamp-1">{k.deskripsi}</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Oleh: <strong>{k.nama_guru}</strong> &bull; Mapel: {k.mata_pelajaran} &bull; T.A: {k.tahun}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onPreviewKarya(k)}
                      className="px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Pratinjau
                    </button>
                    <button
                      onClick={() => onApproveKarya(k.id_karya)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Setujui &amp; Terbitkan
                    </button>
                    <button
                      onClick={() => {
                        const reason = window.prompt('Alasan penolakan / catatan revisi untuk guru:');
                        if (reason !== null) {
                          onRejectKarya(k.id_karya, reason);
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-slate-700 text-sm">Semua Karya Telah Dimoderasi</h3>
              <p className="text-xs text-slate-500">Tidak ada pengajuan karya baru yang menunggu verifikasi saat ini.</p>
            </div>
          )}

          {/* List All Approved Karya with Featured Toggle */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Daftar Karya Guru yang Telah Disetujui</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Karya</th>
                    <th className="px-4 py-2.5">Guru</th>
                    <th className="px-4 py-2.5">Kategori</th>
                    <th className="px-4 py-2.5">Unggulan</th>
                    <th className="px-4 py-2.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {karyaList.filter(k => k.status === 'DISETUJUI').map((k) => (
                    <tr key={k.id_karya} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-bold text-slate-900 max-w-xs truncate">{k.judul_karya}</td>
                      <td className="px-4 py-2.5">{k.nama_guru}</td>
                      <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold">{k.kategori}</span></td>
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => onToggleFeaturedKarya(k.id_karya)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 ${
                            k.featured 
                              ? 'bg-amber-500 text-white shadow-2xs' 
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          <Star className="w-3 h-3" />
                          {k.featured ? 'Unggulan' : 'Jadikan Unggulan'}
                        </button>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus karya "${k.judul_karya}"?`)) {
                              onDeleteKarya(k.id_karya);
                            }
                          }}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA GURU */}
      {activeTab === 'guru' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Manajemen Guru &amp; Tenaga Pendidik</h2>
              <p className="text-xs text-slate-500">Kelola akun pengajar, mata pelajaran, dan hak akses.</p>
            </div>
            <button
              onClick={() => setShowAddGuruModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Guru Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Nama Guru</th>
                  <th className="px-4 py-3">NIP</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mata Pelajaran</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi &amp; Foto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {guruList.map((g) => (
                  <tr key={g.id_guru} className="hover:bg-slate-50">
                    <td className="px-4 py-3 flex items-center gap-2.5">
                      <img src={g.foto} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                      <span className="font-bold text-slate-900">{g.nama_guru}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">{g.nip}</td>
                    <td className="px-4 py-3">{g.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold">
                        {g.mata_pelajaran}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {g.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onEditGuru && (
                          <button
                            type="button"
                            onClick={() => onEditGuru(g)}
                            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 transition-colors"
                            title="Edit profil & ganti foto guru"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Foto/Profil</span>
                          </button>
                        )}
                        {onDeleteGuru && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Hapus guru ${g.nama_guru} dari sistem?`)) {
                                onDeleteGuru(g.id_guru);
                              }
                            }}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus data guru"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA KELAS */}
      {activeTab === 'kelas' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Manajemen Rombongan Belajar / Kelas</h2>
              <p className="text-xs text-slate-500">Kelola daftar kelas dan wali kelas.</p>
            </div>
            <button
              onClick={() => setShowAddKelasModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Kelas Baru
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kelasList.map((k) => (
              <div key={k.id_kelas} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                      Kelas {k.tingkat} &bull; {k.jurusan}
                    </span>
                    <button
                      onClick={() => onDeleteKelas(k.id_kelas)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{k.nama_kelas}</h3>
                  <p className="text-xs text-slate-500 mt-1">Wali Kelas: {k.wali_kelas}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{k.jumlah_siswa} Siswa</span>
                  <span>T.A {k.tahun_ajaran}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEMUA KONTEN */}
      {activeTab === 'konten' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Seluruh Konten Pembelajaran</h2>
              <p className="text-xs text-slate-500">Semua materi dan video YouTube yang terdaftar di sistem.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">Materi Pembelajaran ({materiList.length})</h3>
              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="px-3 py-2">Judul</th>
                      <th className="px-3 py-2">Guru</th>
                      <th className="px-3 py-2">Mapel</th>
                      <th className="px-3 py-2">Views</th>
                      <th className="px-3 py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materiList.map((m) => (
                      <tr key={m.id_materi} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-semibold text-slate-900 max-w-xs truncate">{m.judul}</td>
                        <td className="px-3 py-2">{m.nama_guru}</td>
                        <td className="px-3 py-2">{m.mata_pelajaran}</td>
                        <td className="px-3 py-2">{m.jumlah_view}</td>
                        <td className="px-3 py-2 text-right space-x-1">
                          <button onClick={() => onPreviewMateri(m)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => onDeleteMateri(m.id_materi)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">Video YouTube ({videoList.length})</h3>
              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="px-3 py-2">Judul Video</th>
                      <th className="px-3 py-2">Guru</th>
                      <th className="px-3 py-2">YouTube ID</th>
                      <th className="px-3 py-2">Views</th>
                      <th className="px-3 py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {videoList.map((v) => (
                      <tr key={v.id_video} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-semibold text-slate-900 max-w-xs truncate">{v.judul}</td>
                        <td className="px-3 py-2">{v.nama_guru}</td>
                        <td className="px-3 py-2 font-mono">{v.video_id}</td>
                        <td className="px-3 py-2">{v.view}</td>
                        <td className="px-3 py-2 text-right space-x-1">
                          <button onClick={() => onPlayVideo(v)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => onDeleteVideo(v.id_video)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LOG AKTIVITAS */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Audit Trail &amp; Log Aktivitas</h2>
              <p className="text-xs text-slate-500">Catatan setiap tindakan sistem secara real-time.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Waktu</th>
                  <th className="px-4 py-2.5">Pengguna</th>
                  <th className="px-4 py-2.5">Aksi</th>
                  <th className="px-4 py-2.5">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {activityLogs.map((log) => (
                  <tr key={log.id_log} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-800">{log.user}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">{log.aksi}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600 font-sans">{log.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: PENGATURAN LMS */}
      {activeTab === 'pengaturan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs max-w-3xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Portal &amp; Integrasi Google Apps Script</h2>
            <p className="text-xs text-slate-500">Hubungkan Web App Google Apps Script dan Google Spreadsheet Database ke LMS ini.</p>
          </div>

          {/* Quick Guide Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 text-xs text-slate-700 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sky-950">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Panduan Menghubungkan Google Apps Script ke Spreadsheet</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed text-[11.5px]">
              <li>
                <strong>Di Editor Google Apps Script:</strong> Pilih fungsi <code className="bg-white px-1.5 py-0.5 rounded text-sky-800 font-mono font-bold border border-sky-200">setupApplication</code> (seperti pada dropdown di toolbar atas) lalu klik tombol <strong>▶ Jalankan (Run)</strong>. Ini akan otomatis membuat Google Spreadsheet baru beserta seluruh sheet (*USERS, GURU, KELAS, MATERI, YOUTUBE, KARYA_GURU*).
              </li>
              <li>
                <strong>Atau Secara Manual:</strong> Di Google Apps Script &gt; klik ikon <strong>⚙ Project Settings</strong> (Roda Gigi di menu kiri) &gt; bagian <em>Script Properties</em> &gt; Tambah properti <code className="bg-white px-1.5 py-0.5 rounded text-sky-800 font-mono font-bold border border-sky-200">DIGITAL_LMS_SPREADSHEET_ID</code> dan isi nilainya dengan ID Google Spreadsheet Anda.
              </li>
              <li>
                <strong>Di Form Bawah Ini:</strong> Masukkan URL Web App hasil deploy Anda agar aplikasi frontend dapat berinteraksi secara real-time.
              </li>
            </ol>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* GAS Web App URL */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  URL Google Apps Script Web App (Deploy Executable) *
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Aktif &amp; Terhubung
                </span>
              </div>
              <input
                type="url"
                value={tempSettings.gas_webapp_url || ''}
                onChange={(e) => setTempSettings({ ...tempSettings, gas_webapp_url: e.target.value })}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">
                URL eksekusi Web App dari dialog <em>Deploy &gt; Manage Deployments &gt; Web app URL</em>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Aplikasi LMS *</label>
              <input
                type="text"
                value={tempSettings.app_name}
                onChange={(e) => setTempSettings({ ...tempSettings, app_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Sekolah / Instansi *</label>
              <input
                type="text"
                value={tempSettings.school_name}
                onChange={(e) => setTempSettings({ ...tempSettings, school_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Slogan</label>
              <input
                type="text"
                value={tempSettings.tagline}
                onChange={(e) => setTempSettings({ ...tempSettings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Spreadsheet Database ID / URL</label>
                <input
                  type="text"
                  value={tempSettings.spreadsheet_id || ''}
                  onChange={(e) => setTempSettings({ ...tempSettings, spreadsheet_id: e.target.value })}
                  placeholder="1abcXYZ_SpreadsheetId..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Drive Master Folder ID</label>
                <input
                  type="text"
                  value={tempSettings.drive_folder_id || ''}
                  onChange={(e) => setTempSettings({ ...tempSettings, drive_folder_id: e.target.value })}
                  placeholder="1DriveFolderId_Master..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Add Guru */}
      {showAddGuruModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Tambah Guru Pengajar Baru</h3>
            <form onSubmit={handleCreateGuru} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap &amp; Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Drs. Bambang Sudirman, M.Pd"
                  value={newGuruNama}
                  onChange={(e) => setNewGuruNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">NIP / NUPTK</label>
                <input
                  type="text"
                  placeholder="198001012005011002"
                  value={newGuruNip}
                  onChange={(e) => setNewGuruNip(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Akun Belajar / Google *</label>
                <input
                  type="email"
                  required
                  placeholder="bambang@guru.sma.belajar.id"
                  value={newGuruEmail}
                  onChange={(e) => setNewGuruEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran yang Diampu *</label>
                <input
                  type="text"
                  required
                  placeholder="Informatika / RPL"
                  value={newGuruMapel}
                  onChange={(e) => setNewGuruMapel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGuruModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Simpan Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Kelas */}
      {showAddKelasModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Tambah Kelas Baru</h3>
            <form onSubmit={handleCreateKelas} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Rombel / Kelas *</label>
                <input
                  type="text"
                  required
                  placeholder="X RPL 3 atau XI MIPA 1"
                  value={newKelasNama}
                  onChange={(e) => setNewKelasNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat</label>
                  <select
                    value={newKelasTingkat}
                    onChange={(e) => setNewKelasTingkat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="X">Kelas X</option>
                    <option value="XI">Kelas XI</option>
                    <option value="XII">Kelas XII</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jurusan</label>
                  <input
                    type="text"
                    value={newKelasJurusan}
                    onChange={(e) => setNewKelasJurusan(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Wali Kelas</label>
                <input
                  type="text"
                  placeholder="Nama Wali Kelas"
                  value={newKelasWali}
                  onChange={(e) => setNewKelasWali(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddKelasModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Simpan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
