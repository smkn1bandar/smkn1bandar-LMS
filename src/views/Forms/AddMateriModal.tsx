import React, { useState, useEffect } from 'react';
import { X, HardDrive, Link as LinkIcon, Upload, Check, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { Materi, JenisMateri, User, Kelas } from '../../types';
import { extractDriveFileId } from '../../services/database';

interface AddMateriModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materi: Materi) => void;
  currentUser: User | null;
  editingMateri?: Materi | null;
  kelasList: Kelas[];
}

export const AddMateriModal: React.FC<AddMateriModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentUser,
  editingMateri,
  kelasList,
}) => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [tingkat, setTingkat] = useState('X');
  const [kelas, setKelas] = useState('X RPL 1');
  const [topik, setTopik] = useState('');
  const [jenisMateri, setJenisMateri] = useState<JenisMateri>('PDF');
  const [sumber, setSumber] = useState<'GOOGLE DRIVE' | 'LINK' | 'UPLOAD FILE'>('GOOGLE DRIVE');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editingMateri) {
      setJudul(editingMateri.judul);
      setDeskripsi(editingMateri.deskripsi);
      setMataPelajaran(editingMateri.mata_pelajaran);
      setTingkat(editingMateri.tingkat || 'X');
      setKelas(editingMateri.kelas);
      setTopik(editingMateri.topik);
      setJenisMateri(editingMateri.jenis_materi);
      setSumber(editingMateri.sumber === 'YOUTUBE' ? 'LINK' : editingMateri.sumber);
      setUrl(editingMateri.url);
      setThumbnail(editingMateri.thumbnail || '');
    } else {
      setJudul('');
      setDeskripsi('');
      setMataPelajaran(currentUser?.mata_pelajaran || 'Informatika & RPL');
      setTingkat('X');
      setKelas(kelasList[0]?.nama_kelas || 'X RPL 1');
      setTopik('');
      setJenisMateri('PDF');
      setSumber('GOOGLE DRIVE');
      setUrl('');
      setThumbnail('');
      setUploadFileName('');
    }
  }, [editingMateri, currentUser, kelasList, isOpen]);

  if (!isOpen) return null;

  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadFileName(file.name);
      // Simulate Google Drive upload
      setTimeout(() => {
        const fakeDriveId = `1DriveUpload_${Date.now().toString().slice(-8)}`;
        setUrl(`https://drive.google.com/file/d/${fakeDriveId}/view`);
        setIsUploading(false);
      }, 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !url.trim()) return;

    const fileId = extractDriveFileId(url) || undefined;
    const defaultThumb = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500';

    const payload: Materi = {
      id_materi: editingMateri ? editingMateri.id_materi : `MAT-${Date.now().toString().slice(-6)}`,
      id_guru: editingMateri ? editingMateri.id_guru : (currentUser?.id_user || 'GURU-001'),
      nama_guru: editingMateri ? editingMateri.nama_guru : (currentUser?.nama || 'Guru Pengajar'),
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      mata_pelajaran: mataPelajaran.trim(),
      kelas: kelas.trim(),
      tingkat,
      topik: topik.trim() || 'Pembelajaran Reguler',
      jenis_materi: jenisMateri,
      sumber,
      url: url.trim(),
      file_id: fileId,
      thumbnail: thumbnail.trim() || defaultThumb,
      tanggal_upload: editingMateri ? editingMateri.tanggal_upload : new Date().toISOString().slice(0, 10),
      status: editingMateri ? editingMateri.status : 'DISETUJUI',
      jumlah_view: editingMateri ? editingMateri.jumlah_view : 0,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div id="add-materi-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="add-materi-modal-container" 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {editingMateri ? 'Edit Materi Pembelajaran' : 'Tambah Materi Pembelajaran Baru'}
              </h2>
              <p className="text-xs text-blue-100">
                Penyimpanan otomatis ke Google Drive & Database Google Sheets
              </p>
            </div>
          </div>
          <button
            id="btn-close-add-materi"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Materi Pembelajaran *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Modul Pemrograman Web Modern dengan Tailwind CSS"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mata Pelajaran *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Informatika / RPL"
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topik / Bab Pokok Bahasan
              </label>
              <input
                type="text"
                placeholder="Contoh: Frontend & Layouting"
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat
              </label>
              <select
                value={tingkat}
                onChange={(e) => setTingkat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Kelas
              </label>
              <input
                type="text"
                placeholder="X RPL 1"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Format Materi *
              </label>
              <select
                value={jenisMateri}
                onChange={(e) => setJenisMateri(e.target.value as JenisMateri)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="PDF">PDF Dokumen</option>
                <option value="MODUL">Modul Ajar</option>
                <option value="DOC/DOCX">DOC/DOCX Word</option>
                <option value="PPT/PPTX">PPT/PPTX Slide</option>
                <option value="XLS/XLSX">XLS/XLSX Excel</option>
                <option value="EBOOK">E-Book Digital</option>
                <option value="GOOGLE DRIVE">Google Drive Folder</option>
                <option value="LINK">Tautan Web / Portal</option>
                <option value="LAINNYA">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Sumber Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pilihan Sumber Materi *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="btn-source-drive"
                onClick={() => setSumber('GOOGLE DRIVE')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  sumber === 'GOOGLE DRIVE'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
                Google Drive
              </button>

              <button
                type="button"
                id="btn-source-upload"
                onClick={() => setSumber('UPLOAD FILE')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  sumber === 'UPLOAD FILE'
                    ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                Upload ke Drive
              </button>

              <button
                type="button"
                id="btn-source-link"
                onClick={() => setSumber('LINK')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  sumber === 'LINK'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-800 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5 text-indigo-600" />
                Tautan / URL
              </button>
            </div>
          </div>

          {/* Dynamic source input */}
          {sumber === 'UPLOAD FILE' ? (
            <div className="p-4 rounded-2xl border border-dashed border-blue-300 bg-blue-50/40 text-center">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800 mb-1">
                Pilih File Dokumen Pembelajaran
              </p>
              <p className="text-[11px] text-slate-500 mb-3">
                PDF, DOCX, PPTX, XLSX (Otomatis disimpan ke Master Folder Google Drive)
              </p>
              <input
                type="file"
                id="file-upload-input"
                onChange={handleFakeFileUpload}
                className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              {isUploading && (
                <div className="mt-2 text-xs font-semibold text-blue-700 animate-pulse">
                  Mengunggah ke Google Drive...
                </div>
              )}
              {uploadFileName && !isUploading && (
                <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" /> File siap: {uploadFileName}
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tautan / Link Google Drive atau Web *
              </label>
              <div className="relative">
                <HardDrive className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/1BxiMVs0.../view"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat / Catatan Guru
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan ringkasan materi, petunjuk pengerjaan, atau tujuan pembelajaran materi ini..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Thumbnail Kustom (Opsional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... (Kosongkan untuk thumbnail otomatis)"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-cancel-add-materi"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-add-materi"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {editingMateri ? 'Perbarui Materi' : 'Simpan Materi ke Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
