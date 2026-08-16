import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageSquare, Globe, Code } from 'lucide-react';
import { Materi, YoutubeVideo, KaryaGuru } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Materi | YoutubeVideo | KaryaGuru | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen || !item) return null;

  const title = (item as any).judul || (item as any).judul_karya || 'Materi Belajar';
  const author = (item as any).nama_guru || 'Guru Pengajar';
  const url = (item as any).url || (item as any).url_youtube || window.location.href;

  const shareText = `*${title}*\nOleh: ${author}\n\nAkses materi pembelajaran di Digital LMS Guru:\n${url}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const embedCode = `<iframe src="${url}" width="100%" height="600" style="border:none; border-radius:12px;" allowfullscreen></iframe>`;

  const copyToClipboard = (text: string, isEmbed = false) => {
    navigator.clipboard.writeText(text);
    if (isEmbed) {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div id="share-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="share-modal-container"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Bagikan Konten Pembelajaran</h3>
          </div>
          <button
            id="btn-close-share-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <h4 className="text-xs font-bold text-blue-900 truncate mb-1">{title}</h4>
            <p className="text-[11px] text-blue-700">Guru: {author}</p>
          </div>

          {/* WhatsApp Share Button */}
          <a
            id="btn-share-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Bagikan ke Grup WhatsApp Kelas
          </a>

          {/* Copy Direct Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Salin Tautan Langsung
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 truncate focus:outline-none"
              />
              <button
                id="btn-copy-direct-link"
                onClick={() => copyToClipboard(url, false)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Tersalin' : 'Salin'}
              </button>
            </div>
          </div>

          {/* Blogger Embed snippet */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kode Iframe untuk Artikel Blogger
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={embedCode}
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 truncate focus:outline-none"
              />
              <button
                id="btn-copy-embed-code"
                onClick={() => copyToClipboard(embedCode, true)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                {copiedEmbed ? 'Tersalin' : 'Embed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
