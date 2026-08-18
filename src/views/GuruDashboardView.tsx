import React, { useState } from 'react';
import { 
  User, BookOpen, Video, Award, Plus, Trash2, Edit3, 
  ExternalLink, Eye, HardDrive, Youtube, Sparkles, CheckCircle2, Clock, Camera, Settings
} from 'lucide-react';
import { Materi, YoutubeVideo, KaryaGuru, User as UserType } from '../types';

interface GuruDashboardViewProps {
  currentUser: UserType;
  materiList: Materi[];
  videoList: YoutubeVideo[];
  karyaList: KaryaGuru[];
  onOpenAddMateri: () => void;
  onOpenAddVideo: () => void;
  onOpenAddKarya: () => void;
  onEditMateri: (materi: Materi) => void;
  onDeleteMateri: (id: string) => void;
  onEditVideo: (video: YoutubeVideo) => void;
  onDeleteVideo: (id: string) => void;
  onEditKarya: (karya: KaryaGuru) => void;
  onDeleteKarya: (id: string) => void;
  onPreviewMateri: (materi: Materi) => void;
  onPlayVideo: (video: YoutubeVideo) => void;
  onPreviewKarya: (karya: KaryaGuru) => void;
  onEditProfile?: () => void;
}

export const GuruDashboardView: React.FC<GuruDashboardViewProps> = ({
  currentUser,
  materiList,
  videoList,
  karyaList,
  onOpenAddMateri,
  onOpenAddVideo,
  onOpenAddKarya,
  onEditMateri,
  onDeleteMateri,
  onEditVideo,
  onDeleteVideo,
  onEditKarya,
  onDeleteKarya,
  onPreviewMateri,
  onPlayVideo,
  onPreviewKarya,
  onEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'materi' | 'video' | 'karya'>('materi');

  const myMateri = materiList.filter(m => m.id_guru === currentUser.id_user || m.nama_guru === currentUser.nama);
  const myVideo = videoList.filter(v => v.id_guru === currentUser.id_user || v.nama_guru === currentUser.nama);
  const myKarya = karyaList.filter(k => k.id_guru === currentUser.id_user || k.nama_guru === currentUser.nama);

  const totalViews = 
    myMateri.reduce((acc, m) => acc + (m.jumlah_view || 0), 0) +
    myVideo.reduce((acc, v) => acc + (v.view || 0), 0) +
    myKarya.reduce((acc, k) => acc + (k.jumlah_view || 0), 0);

  return (
    <div id="guru-dashboard-container" className="space-y-8 pb-16">
      
      {/* Welcome Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group shrink-0">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={currentUser.nama}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-sky-500/20 shadow-sm"
            />
            {onEditProfile && (
              <button
                type="button"
                onClick={onEditProfile}
                title="Ganti Foto Profil Guru"
                className="absolute inset-0 bg-black/40 hover:bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-5 h-5" />
                <span className="text-[9px] font-bold mt-0.5">Ganti Foto</span>
              </button>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Portal Guru Pengajar
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang, {currentUser.nama}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Mata Pelajaran: {currentUser.mata_pelajaran || 'Informatika'} &bull; NIP: {currentUser.nip || '-'}
            </p>
            {onEditProfile && (
              <button
                type="button"
                id="btn-edit-guru-profile-banner"
                onClick={onEditProfile}
                className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Ganti / Kelola Foto Profil Guru</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Add Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onEditProfile && (
            <button
              id="btn-dash-edit-profile"
              onClick={onEditProfile}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              Edit Profil &amp; Foto
            </button>
          )}
          <button
            id="btn-dash-add-materi"
            onClick={onOpenAddMateri}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + Materi Ajar
          </button>
          <button
            id="btn-dash-add-video"
            onClick={onOpenAddVideo}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5" />
            + Video YouTube
          </button>
          <button
            id="btn-dash-add-karya"
            onClick={onOpenAddKarya}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            + Karya Inovasi
          </button>
        </div>
      </div>

      {/* Bento Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Materi Saya</span>
            <BookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{myMateri.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Modul &amp; Bahan Ajar</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Video YouTube</span>
            <Video className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{myVideo.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Praktikum Video</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Karya Guru</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{myKarya.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Best Practice &amp; LKPD</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Dilihat</span>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{totalViews}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Akses Pembaca</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'materi'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Materi Ajar ({myMateri.length})
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'video'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Video YouTube ({myVideo.length})
            </button>
            <button
              onClick={() => setActiveTab('karya')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'karya'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Karya &amp; Modul ({myKarya.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Materi Table */}
        {activeTab === 'materi' && (
          <div className="overflow-x-auto">
            {myMateri.length > 0 ? (
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Materi</th>
                    <th className="px-4 py-3">Kelas &amp; Mapel</th>
                    <th className="px-4 py-3">Format</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {myMateri.map((m) => (
                    <tr key={m.id_materi} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-bold text-slate-900 truncate">{m.judul}</div>
                        <div className="text-[11px] text-slate-400 truncate">{m.topik}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                          {m.kelas}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-0.5">{m.mata_pelajaran}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          {m.jenis_materi}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700">
                        {m.jumlah_view || 0}
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <button
                          onClick={() => onPreviewMateri(m)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditMateri(m)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus materi "${m.judul}"?`)) {
                              onDeleteMateri(m.id_materi);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Belum ada materi pembelajaran yang diunggah.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Video Table */}
        {activeTab === 'video' && (
          <div className="overflow-x-auto">
            {myVideo.length > 0 ? (
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Video</th>
                    <th className="px-4 py-3">Kelas &amp; Mapel</th>
                    <th className="px-4 py-3">YouTube ID</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {myVideo.map((v) => (
                    <tr key={v.id_video} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 max-w-xs flex items-center gap-3">
                        <img
                          src={`https://img.youtube.com/vi/${v.video_id}/default.jpg`}
                          alt=""
                          className="w-14 h-9 object-cover rounded-lg shadow-2xs shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate">{v.judul}</div>
                          <div className="text-[11px] text-slate-400 truncate">{v.topik}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold">
                          {v.kelas}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-0.5">{v.mata_pelajaran}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-500">
                        {v.video_id}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700">
                        {v.view || 0}
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <button
                          onClick={() => onPlayVideo(v)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Putar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditVideo(v)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus video "${v.judul}"?`)) {
                              onDeleteVideo(v.id_video);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Video className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Belum ada video YouTube yang ditambahkan.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Karya Table */}
        {activeTab === 'karya' && (
          <div className="overflow-x-auto">
            {myKarya.length > 0 ? (
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Karya Inovasi</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Status Verifikasi</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {myKarya.map((k) => (
                    <tr key={k.id_karya} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-bold text-slate-900 truncate">{k.judul_karya}</div>
                        <div className="text-[11px] text-slate-400">{k.mata_pelajaran} &bull; {k.tahun}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold">
                          {k.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {k.status === 'DISETUJUI' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Disetujui
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                            <Clock className="w-3 h-3" /> Menunggu Verifikasi
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <button
                          onClick={() => onPreviewKarya(k)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditKarya(k)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus karya "${k.judul_karya}"?`)) {
                              onDeleteKarya(k.id_karya);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Award className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Belum ada karya guru yang diunggah.</p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
