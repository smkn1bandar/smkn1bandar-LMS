import React from 'react';
import { 
  FileText, ExternalLink, Eye, Bookmark, Share2, 
  Download, HardDrive, Calendar, User as UserIcon, CheckCircle2 
} from 'lucide-react';
import { Materi } from '../types';

interface MateriCardProps {
  materi: Materi;
  onPreview: (materi: Materi) => void;
  onShare: (materi: Materi) => void;
  onToggleBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  onTeacherClick?: (teacherId: string) => void;
}

export const MateriCard: React.FC<MateriCardProps> = ({
  materi,
  onPreview,
  onShare,
  onToggleBookmark,
  isBookmarked = false,
  onTeacherClick,
}) => {
  // Badge color based on jenis materi
  const getBadgeStyle = (jenis: string) => {
    switch (jenis) {
      case 'PDF':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'MODUL':
      case 'EBOOK':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'PPT/PPTX':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'DOC/DOCX':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'GOOGLE DRIVE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div 
      id={`materi-card-${materi.id_materi}`}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Thumbnail & Badges Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={materi.thumbnail || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500'}
          alt={materi.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Badges on Thumbnail */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border shadow-2xs ${getBadgeStyle(materi.jenis_materi)}`}>
            {materi.jenis_materi}
          </span>
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs border border-white/20">
            Kelas {materi.kelas}
          </span>
        </div>

        {/* Actions top right (Bookmark, Share) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleBookmark && (
            <button
              id={`btn-bookmark-materi-${materi.id_materi}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(materi.id_materi);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isBookmarked 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Materi'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <button
            id={`btn-share-materi-${materi.id_materi}`}
            onClick={(e) => {
              e.stopPropagation();
              onShare(materi);
            }}
            className="p-2 rounded-xl bg-black/40 text-white/80 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all"
            title="Bagikan Materi"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subject bottom left */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-300 truncate">
            {materi.mata_pelajaran}
          </p>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-sky-600 transition-colors leading-snug mb-2">
            {materi.judul}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {materi.deskripsi}
          </p>
        </div>

        {/* Teacher and Views Footer */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              id={`btn-author-materi-${materi.id_materi}`}
              onClick={() => onTeacherClick && onTeacherClick(materi.id_guru)}
              className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-sky-600 truncate text-left"
            >
              <UserIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{materi.nama_guru}</span>
            </button>

            <span className="flex items-center gap-1 shrink-0 text-slate-400 font-medium">
              <Eye className="w-3.5 h-3.5" />
              {materi.jumlah_view || 0}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-preview-materi-${materi.id_materi}`}
              onClick={() => onPreview(materi)}
              className="w-full py-2 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Buka Materi
            </button>

            <a
              id={`btn-direct-drive-${materi.id_materi}`}
              href={materi.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
              Drive Asli
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
