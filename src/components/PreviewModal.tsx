import React from 'react';
import { 
  X, ExternalLink, HardDrive, Download, Youtube, 
  Calendar, Eye, User as UserIcon, BookOpen, Award, CheckCircle2 
} from 'lucide-react';
import { Materi, YoutubeVideo, KaryaGuru } from '../types';
import { getDrivePreviewUrl } from '../services/database';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Materi | YoutubeVideo | KaryaGuru | null;
  type: 'materi' | 'video' | 'karya';
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  item,
  type,
}) => {
  if (!isOpen || !item) return null;

  const isVideo = type === 'video' || 'url_youtube' in item;
  const isKarya = type === 'karya' || 'kategori' in item;
  const isMateri = type === 'materi' || 'jenis_materi' in item;

  const title = (item as any).judul || (item as any).judul_karya || 'Preview Konten';
  const author = (item as any).nama_guru || 'Guru Pengajar';
  const subject = (item as any).mata_pelajaran || '-';
  const description = (item as any).deskripsi || '';
  const url = (item as any).url || (item as any).url_youtube || '';

  return (
    <div id="preview-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="preview-modal-container" 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
              isVideo ? 'bg-rose-600' : isKarya ? 'bg-amber-600' : 'bg-blue-600'
            }`}>
              {isVideo ? <Youtube className="w-5 h-5" /> : isKarya ? <Award className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isVideo ? 'Video Pembelajaran YouTube' : isKarya ? 'Karya Inovasi Guru' : 'Materi Pembelajaran'}
              </span>
              <h2 className="text-base font-bold text-slate-900 truncate max-w-[280px] sm:max-w-md">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="btn-modal-open-external"
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka di Tab Baru
            </a>
            <button
              id="btn-close-preview-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Media Player or Document Viewer */}
          {isVideo ? (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
              <iframe
                id="youtube-player-iframe"
                src={`https://www.youtube.com/embed/${(item as YoutubeVideo).video_id}?autoplay=1&rel=0`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="w-full">
              {url.includes('drive.google.com') ? (
                <div className="aspect-4/3 sm:aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative">
                  <iframe
                    id="drive-doc-preview-iframe"
                    src={getDrivePreviewUrl(url)}
                    title={title}
                    className="w-full h-full border-0"
                    allow="autoplay"
                  ></iframe>
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300">
                  <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">Pratinjau Dokumen Online</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                    Dokumen ini dapat dibuka langsung melalui tautan sumber atau Google Drive yang telah disediakan guru.
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <HardDrive className="w-4 h-4" />
                    Buka Dokumen Lengkap di Google Drive
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Metadata details */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span>Oleh: <strong className="text-slate-900">{author}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800">
                  {subject}
                </span>
                {(item as any).kelas && (
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-800">
                    Kelas {(item as any).kelas}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Tersimpan di Google Drive &amp; Spreadsheet Database Sekolah
          </div>
          <button
            id="btn-close-modal-footer"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
