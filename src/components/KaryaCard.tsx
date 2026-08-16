import React from 'react';
import { 
  Award, Sparkles, ExternalLink, Eye, Share2, 
  Bookmark, CheckCircle2, Clock, HardDrive, User as UserIcon 
} from 'lucide-react';
import { KaryaGuru } from '../types';

interface KaryaCardProps {
  karya: KaryaGuru;
  onPreview: (karya: KaryaGuru) => void;
  onShare: (karya: KaryaGuru) => void;
  onToggleBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  onTeacherClick?: (teacherId: string) => void;
}

export const KaryaCard: React.FC<KaryaCardProps> = ({
  karya,
  onPreview,
  onShare,
  onToggleBookmark,
  isBookmarked = false,
  onTeacherClick,
}) => {
  return (
    <div 
      id={`karya-card-${karya.id_karya}`}
      className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden relative ${
        karya.featured 
          ? 'border-amber-300 shadow-sm shadow-amber-500/10 hover:shadow-md hover:border-amber-400' 
          : 'border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300'
      }`}
    >
      {/* Featured Banner Ribbon if active */}
      {karya.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-500 text-white shadow-xs">
          <Sparkles className="w-3 h-3 fill-current" />
          KARYA UNGGULAN
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={karya.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500'}
          alt={karya.judul_karya}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Category Badge top right if not featured, or placed accordingly */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleBookmark && (
            <button
              id={`btn-bookmark-karya-${karya.id_karya}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(karya.id_karya);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isBookmarked 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Karya'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <button
            id={`btn-share-karya-${karya.id_karya}`}
            onClick={(e) => {
              e.stopPropagation();
              onShare(karya);
            }}
            className="p-2 rounded-xl bg-black/40 text-white/80 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all"
            title="Bagikan Karya"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom category tag */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sky-600/90 text-white backdrop-blur-xs">
            {karya.kategori}
          </span>
          <span className="text-[10px] text-slate-300 font-medium">
            T.A {karya.tahun}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 truncate">
              {karya.mata_pelajaran} &bull; Kelas {karya.kelas}
            </span>
            {karya.status === 'MENUNGGU VERIFIKASI' && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                Verifikasi Pending
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-sky-600 transition-colors leading-snug mb-2">
            {karya.judul_karya}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
            {karya.deskripsi}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              id={`btn-author-karya-${karya.id_karya}`}
              onClick={() => onTeacherClick && onTeacherClick(karya.id_guru)}
              className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-sky-600 truncate text-left"
            >
              <UserIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{karya.nama_guru}</span>
            </button>

            <span className="flex items-center gap-1 shrink-0 text-slate-400 font-medium">
              <Eye className="w-3.5 h-3.5" />
              {karya.jumlah_view || 0}
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-preview-karya-${karya.id_karya}`}
              onClick={() => onPreview(karya)}
              className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              Lihat Karya
            </button>

            <a
              id={`btn-drive-karya-${karya.id_karya}`}
              href={karya.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
              Buka File
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
