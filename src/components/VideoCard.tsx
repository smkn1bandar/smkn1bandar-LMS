import React from 'react';
import { Play, Eye, Share2, Youtube, Clock, Bookmark, User as UserIcon } from 'lucide-react';
import { YoutubeVideo } from '../types';

interface VideoCardProps {
  video: YoutubeVideo;
  onPlay: (video: YoutubeVideo) => void;
  onShare: (video: YoutubeVideo) => void;
  onToggleBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  onTeacherClick?: (teacherId: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  onShare,
  onToggleBookmark,
  isBookmarked = false,
  onTeacherClick,
}) => {
  return (
    <div 
      id={`video-card-${video.id_video}`}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Thumbnail with Play Overlay */}
      <div 
        onClick={() => onPlay(video)}
        className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={video.thumbnail || `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
          alt={video.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent"></div>

        {/* YouTube Red Badge top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-rose-600 text-white shadow-2xs">
            <Youtube className="w-3.5 h-3.5 fill-current" />
            YouTube
          </span>
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
            {video.kelas}
          </span>
        </div>

        {/* Play Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Top Right Share & Bookmark */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleBookmark && (
            <button
              id={`btn-bookmark-video-${video.id_video}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(video.id_video);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isBookmarked 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Video'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <button
            id={`btn-share-video-${video.id_video}`}
            onClick={(e) => {
              e.stopPropagation();
              onShare(video);
            }}
            className="p-2 rounded-xl bg-black/40 text-white/80 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all"
            title="Bagikan Video"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Title snippet */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <p className="text-[11px] font-bold text-rose-300 truncate">
            {video.mata_pelajaran} &bull; {video.topik}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onPlay(video)}
            className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-rose-600 transition-colors leading-snug mb-2 cursor-pointer"
          >
            {video.judul}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {video.deskripsi}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              id={`btn-author-video-${video.id_video}`}
              onClick={() => onTeacherClick && onTeacherClick(video.id_guru)}
              className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-rose-600 truncate text-left"
            >
              <UserIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{video.nama_guru || 'Guru Pengajar'}</span>
            </button>

            <span className="flex items-center gap-1 shrink-0 text-slate-400 font-medium">
              <Eye className="w-3.5 h-3.5" />
              {video.view || 0} views
            </span>
          </div>

          <button
            id={`btn-watch-video-${video.id_video}`}
            onClick={() => onPlay(video)}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <Play className="w-4 h-4 fill-current" />
            Putar Video Pembelajaran
          </button>
        </div>
      </div>
    </div>
  );
};
