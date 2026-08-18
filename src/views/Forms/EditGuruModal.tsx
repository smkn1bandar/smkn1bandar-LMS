import React, { useState, useEffect } from 'react';
import { 
  X, User, Upload, Image, Trash2, Check, Sparkles, 
  Camera, Link as LinkIcon, AlertCircle, Info 
} from 'lucide-react';
import { Guru, User as UserType } from '../../types';

interface EditGuruModalProps {
  isOpen: boolean;
  onClose: () => void;
  guru: Guru | null;
  currentUser: UserType | null;
  onSave: (updatedGuru: Guru) => void;
}

export const EditGuruModal: React.FC<EditGuruModalProps> = ({
  isOpen,
  onClose,
  guru,
  currentUser,
  onSave,
}) => {
  const [namaGuru, setNamaGuru] = useState('');
  const [nip, setNip] = useState('');
  const [gelar, setGelar] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [kontak, setKontak] = useState('');
  const [biografi, setBiografi] = useState('');
  const [foto, setFoto] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [sourceType, setSourceType] = useState<'UPLOAD' | 'URL'>('UPLOAD');

  const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';

  useEffect(() => {
    if (guru) {
      setNamaGuru(guru.nama_guru || '');
      setNip(guru.nip || '');
      setGelar(guru.gelar || '');
      setMataPelajaran(guru.mata_pelajaran || '');
      setJurusan(guru.jurusan || 'Semua Jurusan');
      setKontak(guru.kontak || '');
      setBiografi(guru.biografi || '');
      setFoto(guru.foto || defaultAvatar);
    }
  }, [guru, isOpen]);

  if (!isOpen || !guru) return null;

  // Handle image upload from computer (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar berupa format JPG, PNG, WEBP, atau JPEG.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFoto(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Gagal membaca gambar dari perangkat.');
    };
    reader.readAsDataURL(file);
  };

  // Remove / Reset Photo
  const handleRemovePhoto = () => {
    // Generate an avatar placeholder with initials
    const initialUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(namaGuru || 'Guru')}&background=0284c7&color=fff&size=256&bold=true`;
    setFoto(initialUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaGuru.trim()) return;

    const updated: Guru = {
      ...guru,
      nama_guru: namaGuru.trim(),
      nip: nip.trim(),
      gelar: gelar.trim(),
      mata_pelajaran: mataPelajaran.trim(),
      jurusan: jurusan.trim(),
      kontak: kontak.trim(),
      biografi: biografi.trim(),
      foto: foto.trim() || defaultAvatar,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div id="edit-guru-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="edit-guru-modal-container"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                Pengaturan Foto &amp; Profil Guru
              </h2>
              <p className="text-xs text-sky-100">
                Kelola foto profil guru, informasi mata pelajaran, dan data kontak
              </p>
            </div>
          </div>
          <button
            id="btn-close-edit-guru"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* SECTION: FOTO PROFIL */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Foto Profil Guru
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Mendukung JPG, PNG, WEBP
              </span>
            </div>

            {/* Preview & Action Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group shrink-0">
                <img
                  src={foto || defaultAvatar}
                  alt={namaGuru}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md border border-slate-200"
                />
                {isUploading && (
                  <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                    Memproses...
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSourceType('UPLOAD')}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      sourceType === 'UPLOAD'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    Upload dari Komputer
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceType('URL')}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      sourceType === 'URL'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 inline mr-1" />
                    Link URL Gambar
                  </button>
                </div>

                {sourceType === 'UPLOAD' ? (
                  <div>
                    <label className="block">
                      <span className="sr-only">Pilih foto dari komputer</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageUpload}
                        className="w-full text-xs text-slate-600 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... atau URL foto Google Drive"
                      value={foto}
                      onChange={(e) => setFoto(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus / Reset Foto (Gunakan Inisial)
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-sky-50/60 p-2.5 rounded-xl border border-sky-100 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
              <span>
                <strong>Tips:</strong> Foto yang diunggah dari laptop akan langsung disimpan ke database aplikasi dan tampil di direktori guru serta materi pembelajaran.
              </span>
            </div>
          </div>

          {/* SECTION: DATA GURU */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap &amp; Gelar Guru *
              </label>
              <input
                type="text"
                required
                value={namaGuru}
                onChange={(e) => setNamaGuru(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NIP / Identitas Pegawai
                </label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="19830214 200801 1 012"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mata Pelajaran yang Diampu *
                </label>
                <input
                  type="text"
                  required
                  value={mataPelajaran}
                  onChange={(e) => setMataPelajaran(e.target.value)}
                  placeholder="Informatika &amp; Rekayasa Perangkat Lunak"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jurusan / Program Keahlian
                </label>
                <input
                  type="text"
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  placeholder="Rekayasa Perangkat Lunak (RPL)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kontak WhatsApp / HP
                </label>
                <input
                  type="text"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  placeholder="0812-3456-7890"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Biografi Singkat / Profil Pengajar
              </label>
              <textarea
                rows={3}
                value={biografi}
                onChange={(e) => setBiografi(e.target.value)}
                placeholder="Tuliskan pengalaman mengajar, fokus pembelajaran, atau prestasi guru..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-cancel-edit-guru"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-edit-guru"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
