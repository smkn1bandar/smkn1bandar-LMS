import React, { useState, useEffect } from 'react';
import { X, Youtube, Check, Play, AlertCircle, Sparkles } from 'lucide-react';
import { YoutubeVideo, User, Kelas } from '../../types';
import { extractYoutubeId } from '../../services/database';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (video: YoutubeVideo) => void;
  currentUser: User | null;
  editingVideo?: YoutubeVideo | null;
  kelasList: Kelas[];
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentUser,
  editingVideo,
  kelasList,
}) => {
  const [urlYoutube, setUrlYoutube] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [kelas, setKelas] = useState('X RPL 1');
  const [topik, setTopik] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    if (editingVideo) {
      setUrlYoutube(editingVideo.url_youtube);
      setJudul(editingVideo.judul);
      setDeskripsi(editingVideo.deskripsi);
      setMataPelajaran(editingVideo.mata_pelajaran);
      setKelas(editingVideo.kelas);
      setTopik(editingVideo.topik);
      setVideoId(editingVideo.video_id);
    } else {
      setUrlYoutube('');
      setJudul('');
      setDeskripsi('');
      setMataPelajaran(currentUser?.mata_pelajaran || 'Informatika & RPL');
      setKelas(kelasList[0]?.nama_kelas || 'X RPL 1');
      setTopik('');
      setVideoId('');
    }
  }, [editingVideo, currentUser, kelasList, isOpen]);

  // Realtime extract video ID
  const handleUrlChange = (val: string) => {
    setUrlYoutube(val);
    const id = extractYoutubeId(val);
    if (id) {
      setVideoId(id);
    } else {
      setVideoId('');
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalId = extractYoutubeId(urlYoutube) || videoId;
    if (!finalId || !judul.trim()) return;

    const payload: YoutubeVideo = {
      id_video: editingVideo ? editingVideo.id_video : `VID-${Date.now().toString().slice(-6)}`,
      id_guru: editingVideo ? editingVideo.id_guru : (currentUser?.id_user || 'GURU-001'),
      nama_guru: editingVideo ? editingVideo.nama_guru : (currentUser?.nama || 'Guru Pengajar'),
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      url_youtube: urlYoutube.trim(),
      video_id: finalId,
      mata_pelajaran: mataPelajaran.trim(),
      kelas: kelas.trim(),
      topik: topik.trim() || 'Video Praktikum',
      thumbnail: `https://img.youtube.com/vi/${finalId}/hqdefault.jpg`,
      tanggal: editingVideo ? editingVideo.tanggal : new Date().toISOString().slice(0, 10),
      status: 'DISETUJUI',
      view: editingVideo ? editingVideo.view : 0,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div id="add-video-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="add-video-modal-container"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <Youtube className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {editingVideo ? 'Edit Video Pembelajaran' : 'Tambah Video YouTube Baru'}
              </h2>
              <p className="text-xs text-rose-100">
                Ekstraksi otomatis Video ID & Thumbnail tanpa input manual
              </p>
            </div>
          </div>
          <button
            id="btn-close-add-video"
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
              URL Link YouTube *
            </label>
            <div className="relative">
              <Youtube className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ atau https://youtu.be/..."
                value={urlYoutube}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Realtime Video ID Preview */}
          {videoId ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="Thumbnail Preview"
                className="w-20 h-12 object-cover rounded-lg shadow-xs"
              />
              <div className="text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Video Terdeteksi
                </span>
                <span className="text-slate-500 font-mono">ID: {videoId}</span>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400">
              Mendukung semua format link YouTube (youtube.com, youtu.be, shorts, embed).
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Video Pembelajaran *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Praktikum Konfigurasi VLAN & Routing Dinamis"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                placeholder="Contoh: Teknik Komputer & Jaringan"
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topik / Materi Pokok
              </label>
              <input
                type="text"
                placeholder="Contoh: Routing & Switching"
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target Kelas
            </label>
            <input
              type="text"
              placeholder="XI TKJ 1"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat Video
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan ringkasan materi, durasi, atau instruksi praktikum pada video ini..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-cancel-add-video"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-add-video"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {editingVideo ? 'Perbarui Video' : 'Simpan Video ke Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
