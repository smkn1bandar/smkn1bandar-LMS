import React, { useState } from 'react';
import { 
  X, ExternalLink, HardDrive, Download, Youtube, 
  BookOpen, Award, User as UserIcon, AlertCircle, FileText,
  FileSpreadsheet, Presentation, FileCode, CheckCircle2,
  Info, Eye, Sparkles
} from 'lucide-react';
import { Materi, YoutubeVideo, KaryaGuru } from '../types';
import { getDrivePreviewUrl, extractDriveFileId } from '../services/database';

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
  const [iframeError, setIframeError] = useState(false);

  if (!isOpen || !item) return null;

  const isVideo = type === 'video' || 'url_youtube' in item;
  const isKarya = type === 'karya' || 'kategori' in item;
  const isMateri = type === 'materi' || 'jenis_materi' in item;

  const title = (item as any).judul || (item as any).judul_karya || 'Preview Konten';
  const author = (item as any).nama_guru || 'Guru Pengajar';
  const subject = (item as any).mata_pelajaran || '-';
  const description = (item as any).deskripsi || '';
  const url: string = (item as any).url || (item as any).url_youtube || '';
  const jenisMateri: string = (item as any).jenis_materi || (item as any).kategori || 'DOKUMEN';
  const fileName: string = (item as any).file_name || `${title.replace(/\s+/g, '_')}.${jenisMateri.toLowerCase()}`;
  const fileSize: string = (item as any).file_size || '';
  const fileData: string = (item as any).file_data || url;

  // Determine media type
  const isDataUrl = url.startsWith('data:') || (fileData && fileData.startsWith('data:'));
  const isBlobUrl = url.startsWith('blob:') || (fileData && fileData.startsWith('blob:'));
  const isGoogleDrive = url.includes('drive.google.com') || (item as any).sumber === 'GOOGLE DRIVE';
  const driveFileId = extractDriveFileId(url);

  const isPdf = 
    url.startsWith('data:application/pdf') || 
    url.toLowerCase().endsWith('.pdf') || 
    jenisMateri.toUpperCase().includes('PDF') ||
    fileName.toLowerCase().endsWith('.pdf');

  const isImage = 
    url.startsWith('data:image/') || 
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url) ||
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(fileName);

  const isOfficeDoc = 
    jenisMateri.includes('DOC') || 
    jenisMateri.includes('PPT') || 
    jenisMateri.includes('XLS') ||
    /\.(doc|docx|ppt|pptx|xls|xlsx)$/i.test(fileName);

  // Trigger file download
  const handleDownload = () => {
    if (isDataUrl || isBlobUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = isDataUrl ? fileData : url;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else if (driveFileId) {
      window.open(`https://drive.google.com/uc?export=download&id=${driveFileId}`, '_blank');
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div id="preview-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="preview-modal-container" 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs ${
              isVideo ? 'bg-rose-600' : isKarya ? 'bg-amber-600' : 'bg-blue-600'
            }`}>
              {isVideo ? <Youtube className="w-5 h-5" /> : isKarya ? <Award className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-wider">
                  {isVideo ? 'Video Pembelajaran YouTube' : isKarya ? 'Karya Inovasi Guru' : 'Materi Pembelajaran'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 uppercase">
                  {jenisMateri}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 truncate max-w-sm sm:max-w-xl">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download Button */}
            <button
              type="button"
              id="btn-modal-download-file"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold shadow-2xs transition-colors"
              title="Unduh Berkas Dokumen"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Unduh Berkas</span>
            </button>

            {/* Open in external tab */}
            {url && !url.startsWith('data:') && (
              <a
                id="btn-modal-open-external"
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold shadow-2xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka di Tab Baru
              </a>
            )}

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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* 1. YOUTUBE VIDEO VIEWER */}
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
          ) : isPdf ? (
            /* 2. PDF VIEWER (Uploaded or Link) */
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Dokumen PDF: <strong>{fileName}</strong></span>
                  {fileSize && <span className="text-slate-400">({fileSize})</span>}
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Dokumen Lengkap
                </button>
              </div>

              <div className="w-full h-[62vh] rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-900 relative">
                {isDataUrl || isBlobUrl ? (
                  <iframe
                    id="pdf-data-preview-iframe"
                    src={fileData || url}
                    title={title}
                    className="w-full h-full border-0 bg-white"
                  />
                ) : isGoogleDrive ? (
                  <iframe
                    id="drive-pdf-preview-iframe"
                    src={getDrivePreviewUrl(url)}
                    title={title}
                    className="w-full h-full border-0"
                    allow="autoplay"
                  />
                ) : (
                  <iframe
                    id="doc-viewer-iframe"
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                    title={title}
                    className="w-full h-full border-0 bg-white"
                  />
                )}
              </div>

              {/* PDF Tip Banner */}
              {isGoogleDrive && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Jika pratinjau dokumen Google Drive tidak tampil atau menampilkan ikon dokumen sedih:</strong>
                    <div className="mt-1 text-[11px] text-amber-800">
                      1. Pastikan file di Google Drive dibagikan dengan hak akses: <strong>"Siapa saja yang memiliki link (Pelihat)"</strong>.<br />
                      2. Atau Anda dapat mengunggah file PDF langsung dari komputer saat menambah materi agar tersimpan secara lokal dan langsung tampil.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : isImage ? (
            /* 3. IMAGE VIEWER */
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[40vh] max-h-[65vh] overflow-hidden">
              <img
                src={fileData || url}
                alt={title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-xl"
              />
            </div>
          ) : isOfficeDoc && (isDataUrl || isBlobUrl) ? (
            /* 4. OFFICE DOCUMENT VIEWER (DOCX, PPTX, XLSX) */
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                {jenisMateri.includes('PPT') ? (
                  <Presentation className="w-8 h-8" />
                ) : jenisMateri.includes('XLS') ? (
                  <FileSpreadsheet className="w-8 h-8" />
                ) : (
                  <FileText className="w-8 h-8" />
                )}
              </div>

              <div className="max-w-md mx-auto space-y-1.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 uppercase">
                  {jenisMateri} Dokumen Terunggah
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {fileName}
                </h3>
                <p className="text-xs text-slate-500">
                  Ukuran Berkas: {fileSize || 'Siap Diunduh'} • Diunggah oleh: {author}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 space-y-2 shadow-2xs">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Berkas siap digunakan untuk pembelajaran
                </div>
                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                  Berkas format <strong>{jenisMateri}</strong> dapat langsung diunduh ke komputer atau gawai siswa untuk diedit dan dipelajari dengan aplikasi Office/PowerPoint/Excel.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  id="btn-download-office-file"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  Unduh Berkas {jenisMateri} Sekarang
                </button>
              </div>
            </div>
          ) : isGoogleDrive ? (
            /* 5. GOOGLE DRIVE IFRAME VIEWER */
            <div className="space-y-3">
              <div className="aspect-4/3 sm:aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 relative">
                <iframe
                  id="drive-doc-preview-iframe"
                  src={getDrivePreviewUrl(url)}
                  title={title}
                  className="w-full h-full border-0"
                  allow="autoplay"
                ></iframe>
              </div>

              {/* Troubleshooting Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600">
                    <p className="font-bold text-slate-800">Pratinjau tidak muncul atau file Google Drive tidak ada?</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pastikan link Google Drive telah di-share publik (<span className="font-semibold">"Siapa saja yang memiliki link"</span>) atau klik tombol buka langsung.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    Buka di Google Drive
                  </a>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 6. GENERIC DOCUMENT / LINK VIEWER */
            <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Pratinjau Tautan Sumber Materi</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Materi ini terhubung dengan tautan eksternal atau portal pembelajaran yang disediakan oleh guru.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka Tautan Materi di Tab Baru
                </a>
              </div>
            </div>
          )}

          {/* Metadata details */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span>Oleh Guru: <strong className="text-slate-900">{author}</strong></span>
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

            {description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Terhubung dengan Database Digital LMS &amp; Google Drive Sekolah
          </div>
          <button
            id="btn-close-modal-footer"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};

