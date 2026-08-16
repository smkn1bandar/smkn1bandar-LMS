import React, { useState, useEffect } from 'react';
import { X, Award, Check, HardDrive, Upload, Sparkles, FileText } from 'lucide-react';
import { KaryaGuru, KategoriKarya, User } from '../../types';
import { extractDriveFileId } from '../../services/database';

interface AddKaryaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (karya: KaryaGuru) => void;
  currentUser: User | null;
  editingKarya?: KaryaGuru | null;
}

export const AddKaryaModal: React.FC<AddKaryaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentUser,
  editingKarya,
}) => {
  const [judulKarya, setJudulKarya] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kategori, setKategori] = useState<KategoriKarya>('Modul Ajar');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [tahun, setTahun] = useState('2025/2026');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (editingKarya) {
      setJudulKarya(editingKarya.judul_karya);
      setDeskripsi(editingKarya.deskripsi);
      setKategori(editingKarya.kategori);
      setMataPelajaran(editingKarya.mata_pelajaran);
      setTahun(editingKarya.tahun || '2025/2026');
      setUrl(editingKarya.url);
      setThumbnail(editingKarya.thumbnail || '');
      setFeatured(editingKarya.featured || false);
    } else {
      setJudulKarya('');
      setDeskripsi('');
      setKategori('Modul Ajar');
      setMataPelajaran(currentUser?.mata_pelajaran || 'Informatika & RPL');
      setTahun('2025/2026');
      setUrl('');
      setThumbnail('');
      setFeatured(false);
    }
  }, [editingKarya, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulKarya.trim() || !url.trim()) return;

    const fileId = extractDriveFileId(url) || undefined;
    const defaultThumb = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500';

    const isAdmin = currentUser?.role === 'ADMIN';

    const payload: KaryaGuru = {
      id_karya: editingKarya ? editingKarya.id_karya : `KRY-${Date.now().toString().slice(-6)}`,
      id_guru: editingKarya ? editingKarya.id_guru : (currentUser?.id_user || 'GURU-001'),
      nama_guru: editingKarya ? editingKarya.nama_guru : (currentUser?.nama || 'Guru Pengajar'),
      judul_karya: judulKarya.trim(),
      deskripsi: deskripsi.trim(),
      kategori,
      mata_pelajaran: mataPelajaran.trim(),
      tahun,
      url: url.trim(),
      file_id: fileId,
      thumbnail: thumbnail.trim() || defaultThumb,
      tanggal_upload: editingKarya ? editingKarya.tanggal_upload : new Date().toISOString().slice(0, 10),
      status: editingKarya ? editingKarya.status : (isAdmin ? 'DISETUJUI' : 'MENUNGGU VERIFIKASI'),
      featured: isAdmin ? featured : (editingKarya ? editingKarya.featured : false),
      jumlah_view: editingKarya ? editingKarya.jumlah_view : 0,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div id="add-karya-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="add-karya-modal-container"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {editingKarya ? 'Edit Karya Guru' : 'Unggah Karya / Inovasi Guru Baru'}
              </h2>
              <p className="text-xs text-amber-100">
                Publikasikan modul ajar, inovasi pembelajaran, best practice, atau media interaktif
              </p>
            </div>
          </div>
          <button
            id="btn-close-add-karya"
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
              Judul Karya / Inovasi Pembelajaran *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Modul Ajar Kurikulum Merdeka Berbasis Proyek IoT"
              value={judulKarya}
              onChange={(e) => setJudulKarya(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Karya *
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as KategoriKarya)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="Modul Ajar">Modul Ajar (Perangkat Ajar)</option>
                <option value="Bahan Ajar">Bahan Ajar / Diktat</option>
                <option value="Media Pembelajaran">Media Pembelajaran Interaktif</option>
                <option value="Video Pembelajaran">Video Pembelajaran</option>
                <option value="LKPD">Lembar Kerja Peserta Didik (LKPD)</option>
                <option value="E-Modul">E-Modul Digital</option>
                <option value="Presentasi">Slide Presentasi Kreatif</option>
                <option value="Infografis">Infografis & Poster Edukasi</option>
                <option value="Artikel">Artikel / Jurnal Ilmiah</option>
                <option value="Inovasi Pembelajaran">Inovasi Pembelajaran</option>
                <option value="Best Practice">Best Practice Guru</option>
                <option value="Projek">Projek Penguatan P5</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mata Pelajaran Terkait *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Informatika / Teknik Komputer"
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahun Ajaran / Pembuatan
              </label>
              <input
                type="text"
                placeholder="2025/2026"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Verifikasi
              </label>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {currentUser?.role === 'ADMIN' ? 'Langsung Disetujui (Admin)' : 'Menunggu Verifikasi Admin'}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Link Berkas Google Drive / URL Portofolio Karya *
            </label>
            <div className="relative">
              <HardDrive className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/1G_01234.../view"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Lengkap / Abstrak Karya
            </label>
            <textarea
              rows={4}
              placeholder="Jelaskan latar belakang, tujuan pembelajaran, metode inovasi, dan dampak karya ini terhadap hasil belajar peserta didik..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Thumbnail Cover Karya (Opsional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... (Kosongkan untuk cover default)"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600"
            />
          </div>

          {currentUser?.role === 'ADMIN' && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-900 block">Jadikan Karya Unggulan (Featured)</span>
                <span className="text-[11px] text-amber-700">Tampil menonjol di beranda depan portal</span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-cancel-add-karya"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-add-karya"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {editingKarya ? 'Perbarui Karya' : 'Kirim Karya ke Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
