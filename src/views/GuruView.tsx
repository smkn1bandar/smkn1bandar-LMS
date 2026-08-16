import React, { useState, useMemo } from 'react';
import { Search, Users, School, Sparkles, GraduationCap } from 'lucide-react';
import { Guru, Materi, KaryaGuru } from '../types';
import { TeacherCard } from '../components/TeacherCard';

interface GuruViewProps {
  guruList: Guru[];
  materiList: Materi[];
  karyaList: KaryaGuru[];
  onSelectGuru: (guru: Guru) => void;
}

export const GuruView: React.FC<GuruViewProps> = ({
  guruList,
  materiList,
  karyaList,
  onSelectGuru,
}) => {
  const [search, setSearch] = useState('');

  const filteredTeachers = useMemo(() => {
    return guruList.filter(g => {
      const matchSearch = 
        g.nama_guru.toLowerCase().includes(search.toLowerCase()) ||
        g.mata_pelajaran.toLowerCase().includes(search.toLowerCase()) ||
        g.jurusan.toLowerCase().includes(search.toLowerCase()) ||
        g.nip.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [guruList, search]);

  return (
    <div id="guru-view-container" className="space-y-8 pb-16">
      
      {/* Header Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Direktori Guru &amp; Tenaga Pendidik
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Direktori Guru Pengajar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Daftar bapak dan ibu guru pengajar, bidang keahlian, mata pelajaran yang diampu, serta portofolio bahan ajar digital mereka.
          </p>
        </div>
      </div>

      {/* Search - Bento Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari guru berdasarkan nama, NIP, atau mata pelajaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium bg-slate-50/50"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((guru) => {
          const mCount = materiList.filter(m => m.id_guru === guru.id_guru || m.nama_guru === guru.nama_guru).length;
          const kCount = karyaList.filter(k => k.id_guru === guru.id_guru || k.nama_guru === guru.nama_guru).length;
          return (
            <TeacherCard
              key={guru.id_guru}
              guru={guru}
              onSelect={onSelectGuru}
              materiCount={mCount}
              karyaCount={kCount}
            />
          );
        })}
      </div>

    </div>
  );
};
