import React, { useState, useMemo } from 'react';
import { 
  Search, Award, Plus, Sparkles, Filter, 
  CheckCircle2, Clock, Layers, Star 
} from 'lucide-react';
import { KaryaGuru, Guru, User, KategoriKarya } from '../types';
import { KaryaCard } from '../components/KaryaCard';

interface KaryaViewProps {
  karyaList: KaryaGuru[];
  guruList: Guru[];
  currentUser: User | null;
  onPreviewKarya: (karya: KaryaGuru) => void;
  onShareKarya: (karya: KaryaGuru) => void;
  onSelectGuru: (guru: Guru) => void;
  onOpenAddKarya: () => void;
  onToggleBookmark: (id: string) => void;
  bookmarks: string[];
}

export const KaryaView: React.FC<KaryaViewProps> = ({
  karyaList,
  guruList,
  currentUser,
  onPreviewKarya,
  onShareKarya,
  onSelectGuru,
  onOpenAddKarya,
  onToggleBookmark,
  bookmarks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const kategoriOptions: string[] = [
    'Semua',
    'Modul Ajar',
    'Bahan Ajar',
    'Media Pembelajaran',
    'Video Pembelajaran',
    'LKPD',
    'E-Modul',
    'Presentasi',
    'Infografis',
    'Artikel',
    'Inovasi Pembelajaran',
    'Best Practice',
    'Projek',
  ];

  const filteredKarya = useMemo(() => {
    return karyaList.filter(k => {
      if (k.status !== 'DISETUJUI' && currentUser?.role !== 'ADMIN' && k.id_guru !== currentUser?.id_user) {
        return false;
      }
      const matchSearch = 
        k.judul_karya.toLowerCase().includes(search.toLowerCase()) ||
        k.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
        k.nama_guru.toLowerCase().includes(search.toLowerCase()) ||
        k.mata_pelajaran.toLowerCase().includes(search.toLowerCase());

      const matchKategori = selectedKategori === 'Semua' || k.kategori === selectedKategori;
      const matchFeatured = !onlyFeatured || k.featured;

      return matchSearch && matchKategori && matchFeatured;
    });
  }, [karyaList, search, selectedKategori, onlyFeatured, currentUser]);

  return (
    <div id="karya-view-container" className="space-y-8 pb-16">
      
      {/* Header Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Galeri &amp; Repositori Portofolio Guru
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Karya &amp; Inovasi Pembelajaran Guru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Wadah publikasi karya terbaik bapak/ibu guru berupa modul ajar Kurikulum Merdeka, laporan best practice, media interaktif, dan lembar kerja inovatif.
          </p>
        </div>

        {currentUser && (
          <button
            id="btn-add-karya-top"
            onClick={onOpenAddKarya}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Unggah Karya Guru
          </button>
        )}
      </div>

      {/* Filter and Search Panel - Bento Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari judul karya, modul, inovasi, atau nama guru..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                onlyFeatured 
                  ? 'bg-amber-500 border-amber-500 text-white shadow-2xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFeatured ? 'fill-current' : 'text-amber-500'}`} />
              Hanya Karya Unggulan
            </button>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 text-xs">
          {kategoriOptions.map((kat) => (
            <button
              key={kat}
              onClick={() => setSelectedKategori(kat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedKategori === kat
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Karya */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Ditemukan <strong className="text-slate-900">{filteredKarya.length}</strong> karya inovasi guru
          </p>
        </div>

        {filteredKarya.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKarya.map((karya) => (
              <KaryaCard
                key={karya.id_karya}
                karya={karya}
                onPreview={onPreviewKarya}
                onShare={onShareKarya}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={bookmarks.includes(karya.id_karya)}
                onTeacherClick={(tId) => {
                  const target = guruList.find(g => g.id_guru === tId || g.nama_guru === karya.nama_guru);
                  if (target) onSelectGuru(target);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Award className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada karya yang sesuai</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau kategori karya di atas.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
