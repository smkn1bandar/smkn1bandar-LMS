import React from 'react';
import { Guru } from '../types';
import { GraduationCap, Award, BookOpen, ChevronRight, School, Sparkles } from 'lucide-react';

interface TeacherCardProps {
  guru: Guru;
  onSelect: (guru: Guru) => void;
  materiCount?: number;
  karyaCount?: number;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  guru,
  onSelect,
  materiCount = 0,
  karyaCount = 0,
}) => {
  return (
    <div 
      id={`teacher-card-${guru.id_guru}`}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-300 p-6 flex flex-col justify-between"
    >
      <div>
        {/* Top Avatar & Name */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={guru.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={guru.nama_guru}
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-sky-500/20 group-hover:ring-sky-500/40 transition-all shadow-2xs shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors truncate">
              {guru.nama_guru}
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              NIP: {guru.nip}
            </p>
            <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sky-50 text-sky-700">
              <School className="w-3 h-3" />
              <span className="truncate">{guru.mata_pelajaran}</span>
            </div>
          </div>
        </div>

        {/* Biography */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {guru.biografi || 'Guru aktif berdedikasi dalam pengembangan kurikulum digital dan pembelajaran inovatif di sekolah.'}
        </p>

        {/* Skills Pills */}
        {guru.keahlian && guru.keahlian.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {guru.keahlian.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60"
              >
                {skill}
              </span>
            ))}
            {guru.keahlian.length > 3 && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-500">
                +{guru.keahlian.length - 3} lainnya
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats & Profile Button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            {materiCount} Materi
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {karyaCount} Karya
          </span>
        </div>

        <button
          id={`btn-view-profile-${guru.id_guru}`}
          onClick={() => onSelect(guru)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-slate-700 text-xs font-bold transition-all"
        >
          <span>Profil</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
