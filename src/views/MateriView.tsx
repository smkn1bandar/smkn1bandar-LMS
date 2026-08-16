import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, BookOpen, Plus, Sparkles, 
  ArrowUpDown, Check, RefreshCw, HardDrive, FileText 
} from 'lucide-react';
import { Materi, Guru, User, AppView } from '../types';
import { MateriCard } from '../components/MateriCard';

interface MateriViewProps {
  materiList: Materi[];
  guruList: Guru[];
  currentUser: User | null;
  onPreviewMateri: (materi: Materi) => void;
  onShareMateri: (materi: Materi) => void;
  onSelectGuru: (guru: Guru) => void;
  onOpenAddMateri: () => void;
  onToggleBookmark: (id: string) => void;
  bookmarks: string[];
}

export const MateriView: React.FC<MateriViewProps> = ({
  materiList,
  guruList,
  currentUser,
  onPreviewMateri,
  onShareMateri,
  onSelectGuru,
  onOpenAddMateri,
  onToggleBookmark,
  bookmarks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('Semua');
  const [selectedTingkat, setSelectedTingkat] = useState('Semua');
  const [selectedJenis, setSelectedJenis] = useState('Semua');
  const [sortBy, setSortBy] = useState<'terbaru' | 'populer' | 'az'>('terbaru');

  // Extract unique mapel list
  const mapelOptions = useMemo(() => {
    const set = new Set<string>();
    materiList.forEach(m => {
      if (m.mata_pelajaran) set.add(m.mata_pelajaran);
    });
    return ['Semua', ...Array.from(set)];
  }, [materiList]);

  // Filter and sort list
  const filteredMateri = useMemo(() => {
    return materiList.filter(m => {
      if (m.status !== 'DISETUJUI' && currentUser?.role !== 'ADMIN' && m.id_guru !== currentUser?.id_user) {
        return false;
      }
      const matchSearch = 
        m.judul.toLowerCase().includes(search.toLowerCase()) ||
        m.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
        m.nama_guru.toLowerCase().includes(search.toLowerCase()) ||
        m.mata_pelajaran.toLowerCase().includes(search.toLowerCase()) ||
        m.topik.toLowerCase().includes(search.toLowerCase());

      const matchMapel = selectedMapel === 'Semua' || m.mata_pelajaran === selectedMapel;
      const matchTingkat = selectedTingkat === 'Semua' || m.tingkat === selectedTingkat || m.kelas.startsWith(selectedTingkat);
      const matchJenis = selectedJenis === 'Semua' || m.jenis_materi === selectedJenis;

      return matchSearch && matchMapel && matchTingkat && matchJenis;
    }).sort((a, b) => {
      if (sortBy === 'populer') {
        return (b.jumlah_view || 0) - (a.jumlah_view || 0);
      }
      if (sortBy === 'az') {
        return a.judul.localeCompare(b.judul);
      }
      return new Date(b.tanggal_upload).getTime() - new Date(a.tanggal_upload).getTime();
    });
  }, [materiList, search, selectedMapel, selectedTingkat, selectedJenis, sortBy, currentUser]);

  return (
    <div id="materi-view-container" className="space-y-8 pb-16">
      
      {/* Header Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Katalog Repositori Materi
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Materi &amp; Perangkat Pembelajaran
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Akses dan unduh modul ajar Google Drive, file presentasi PPT, lembar kerja siswa, dan dokumen pendukung kurikulum yang disusun oleh bapak/ibu guru.
          </p>
        </div>

        {currentUser && (
          <button
            id="btn-add-materi-top"
            onClick={onOpenAddMateri}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Materi Baru
          </button>
        )}
      </div>

      {/* Filter and Search Panel - Bento Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari judul materi, topik, mapel, atau nama guru..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium bg-slate-50/50"
            />
          </div>

          {/* Mata Pelajaran Filter */}
          <div>
            <select
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium bg-white text-slate-700 truncate"
            >
              {mapelOptions.map((mapel) => (
                <option key={mapel} value={mapel}>
                  Mapel: {mapel}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium bg-white text-slate-700"
            >
              <option value="terbaru">Urutan: Terbaru</option>
              <option value="populer">Urutan: Terpopuler (Views)</option>
              <option value="az">Urutan: Judul (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1">Tingkat:</span>
          {['Semua', 'X', 'XI', 'XII'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTingkat(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedTingkat === t
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'Semua' ? 'Semua Tingkat' : `Kelas ${t}`}
            </button>
          ))}

          <span className="text-slate-300 mx-2">|</span>

          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1">Format:</span>
          {['Semua', 'PDF', 'MODUL', 'PPT/PPTX', 'DOC/DOCX', 'EBOOK'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedJenis(fmt)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedJenis === fmt
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Materi List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Menampilkan <strong className="text-slate-900">{filteredMateri.length}</strong> materi pembelajaran
          </p>

          {(search || selectedMapel !== 'Semua' || selectedTingkat !== 'Semua' || selectedJenis !== 'Semua') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedMapel('Semua');
                setSelectedTingkat('Semua');
                setSelectedJenis('Semua');
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Reset Filter
            </button>
          )}
        </div>

        {filteredMateri.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMateri.map((materi) => (
              <MateriCard
                key={materi.id_materi}
                materi={materi}
                onPreview={onPreviewMateri}
                onShare={onShareMateri}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={bookmarks.includes(materi.id_materi)}
                onTeacherClick={(tId) => {
                  const target = guruList.find(g => g.id_guru === tId || g.nama_guru === materi.nama_guru);
                  if (target) onSelectGuru(target);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada materi yang sesuai</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau ganti filter mata pelajaran dan tingkat kelas.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
