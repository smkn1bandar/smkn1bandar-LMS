import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, BookOpen, Video, Award, 
  School, Sparkles, User, ExternalLink, Calendar, Camera, Edit3 
} from 'lucide-react';
import { Guru, Materi, YoutubeVideo, KaryaGuru, User as UserType } from '../types';
import { MateriCard } from '../components/MateriCard';
import { VideoCard } from '../components/VideoCard';
import { KaryaCard } from '../components/KaryaCard';

interface GuruProfileViewProps {
  guru: Guru;
  materiList: Materi[];
  videoList: YoutubeVideo[];
  karyaList: KaryaGuru[];
  currentUser?: UserType | null;
  onBack: () => void;
  onPreviewMateri: (materi: Materi) => void;
  onPlayVideo: (video: YoutubeVideo) => void;
  onPreviewKarya: (karya: KaryaGuru) => void;
  onShareItem: (item: any) => void;
  onEditProfile?: (guru: Guru) => void;
}

export const GuruProfileView: React.FC<GuruProfileViewProps> = ({
  guru,
  materiList,
  videoList,
  karyaList,
  currentUser,
  onBack,
  onPreviewMateri,
  onPlayVideo,
  onPreviewKarya,
  onShareItem,
  onEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'materi' | 'video' | 'karya'>('materi');

  const teacherMateri = materiList.filter(m => m.id_guru === guru.id_guru || m.nama_guru === guru.nama_guru);
  const teacherVideo = videoList.filter(v => v.id_guru === guru.id_guru || v.nama_guru === guru.nama_guru);
  const teacherKarya = karyaList.filter(k => k.id_guru === guru.id_guru || k.nama_guru === guru.nama_guru);

  const canEdit = currentUser && (
    currentUser.role === 'ADMIN' || 
    currentUser.email?.toLowerCase() === guru.email?.toLowerCase() ||
    currentUser.nama === guru.nama_guru ||
    currentUser.id_user === guru.id_guru
  );

  return (
    <div id="guru-profile-view-container" className="space-y-8 pb-16">
      
      {/* Top Bar with Back and optional Edit button */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="btn-back-from-profile"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Halaman Sebelumnya
        </button>

        {canEdit && onEditProfile && (
          <button
            id="btn-edit-guru-from-profile"
            onClick={() => onEditProfile(guru)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Camera className="w-4 h-4" />
            Edit Foto &amp; Profil Guru
          </button>
        )}
      </div>

      {/* Profile Card Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative group shrink-0">
          <img
            src={guru.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
            alt={guru.nama_guru}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-blue-50 shadow-md shrink-0"
          />
          {canEdit && onEditProfile && (
            <button
              type="button"
              onClick={() => onEditProfile(guru)}
              title="Ganti Foto Profil Guru"
              className="absolute inset-0 bg-black/40 hover:bg-black/60 rounded-3xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1">Ganti Foto</span>
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              {guru.mata_pelajaran}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              {guru.jurusan}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {guru.nama_guru}
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            NIP: {guru.nip} &bull; Email: {guru.email}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
            {guru.biografi || 'Pendidik aktif yang senantiasa mengintegrasikan teknologi digital dalam kegiatan belajar mengajar.'}
          </p>

          {/* Keahlian */}
          {guru.keahlian && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {guru.keahlian.map((k, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/80"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('materi')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'materi'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Materi Pembelajaran ({teacherMateri.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'video'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Video Praktikum ({teacherVideo.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('karya')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'karya'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Karya Inovasi ({teacherKarya.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'materi' && (
        <div>
          {teacherMateri.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherMateri.map(m => (
                <MateriCard
                  key={m.id_materi}
                  materi={m}
                  onPreview={onPreviewMateri}
                  onShare={onShareItem}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-xs text-slate-500">Belum ada materi pembelajaran yang diunggah oleh guru ini.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'video' && (
        <div>
          {teacherVideo.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherVideo.map(v => (
                <VideoCard
                  key={v.id_video}
                  video={v}
                  onPlay={onPlayVideo}
                  onShare={onShareItem}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-xs text-slate-500">Belum ada video YouTube yang diunggah oleh guru ini.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'karya' && (
        <div>
          {teacherKarya.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherKarya.map(k => (
                <KaryaCard
                  key={k.id_karya}
                  karya={k}
                  onPreview={onPreviewKarya}
                  onShare={onShareItem}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-xs text-slate-500">Belum ada karya inovasi yang dipublikasikan oleh guru ini.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
