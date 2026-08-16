import React, { useState, useMemo } from 'react';
import { Search, Youtube, Plus, Play, Sparkles, Filter, Video as VideoIcon } from 'lucide-react';
import { YoutubeVideo, Guru, User } from '../types';
import { VideoCard } from '../components/VideoCard';

interface VideoViewProps {
  videoList: YoutubeVideo[];
  guruList: Guru[];
  currentUser: User | null;
  onPlayVideo: (video: YoutubeVideo) => void;
  onShareVideo: (video: YoutubeVideo) => void;
  onSelectGuru: (guru: Guru) => void;
  onOpenAddVideo: () => void;
  onToggleBookmark: (id: string) => void;
  bookmarks: string[];
}

export const VideoView: React.FC<VideoViewProps> = ({
  videoList,
  guruList,
  currentUser,
  onPlayVideo,
  onShareVideo,
  onSelectGuru,
  onOpenAddVideo,
  onToggleBookmark,
  bookmarks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('Semua');

  const mapelOptions = useMemo(() => {
    const set = new Set<string>();
    videoList.forEach(v => {
      if (v.mata_pelajaran) set.add(v.mata_pelajaran);
    });
    return ['Semua', ...Array.from(set)];
  }, [videoList]);

  const filteredVideos = useMemo(() => {
    return videoList.filter(v => {
      const matchSearch = 
        v.judul.toLowerCase().includes(search.toLowerCase()) ||
        v.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
        v.mata_pelajaran.toLowerCase().includes(search.toLowerCase()) ||
        v.topik.toLowerCase().includes(search.toLowerCase());

      const matchMapel = selectedMapel === 'Semua' || v.mata_pelajaran === selectedMapel;
      return matchSearch && matchMapel;
    });
  }, [videoList, search, selectedMapel]);

  return (
    <div id="video-view-container" className="space-y-8 pb-16">
      
      {/* Header Banner - Bento Styled */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Streaming Pembelajaran YouTube
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Video Pembelajaran &amp; Praktikum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Kumpulan video rekaman praktikum laboratorium, tutorial pemrograman, dan penjelasan materi interaktif tanpa beban bandwidth hosting sekolah.
          </p>
        </div>

        {currentUser && (
          <button
            id="btn-add-video-top"
            onClick={onOpenAddVideo}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Video YouTube
          </button>
        )}
      </div>

      {/* Filter and Search - Bento Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari video tutorial, judul, topik, atau mata pelajaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium bg-white text-slate-700"
            >
              {mapelOptions.map((mapel) => (
                <option key={mapel} value={mapel}>
                  Mapel: {mapel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Tersedia <strong className="text-slate-900">{filteredVideos.length}</strong> video pembelajaran
          </p>
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id_video}
                video={video}
                onPlay={onPlayVideo}
                onShare={onShareVideo}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={bookmarks.includes(video.id_video)}
                onTeacherClick={(tId) => {
                  const target = guruList.find(g => g.id_guru === tId || g.nama_guru === video.nama_guru);
                  if (target) onSelectGuru(target);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <VideoIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada video yang ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Silakan masukkan link video pembelajaran YouTube baru melalui tombol di atas.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
