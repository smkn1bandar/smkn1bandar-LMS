import React, { useState } from 'react';
import { 
  Globe, Code, Copy, Check, ExternalLink, 
  Smartphone, Monitor, Tablet, Sparkles, CheckCircle2 
} from 'lucide-react';
import { AppSettings } from '../types';

interface BloggerEmbedViewProps {
  settings: AppSettings;
}

export const BloggerEmbedView: React.FC<BloggerEmbedViewProps> = ({ settings }) => {
  const [copied, setCopied] = useState(false);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customHeight, setCustomHeight] = useState('750');

  const appUrl = window.location.origin;

  const responsiveSnippet = `<!-- KODE EMBED LMS GURU DIGITAL KE BLOGGER / WEBSITE -->
<div style="position: relative; width: 100%; height: ${customHeight}px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
  <iframe 
    src="${appUrl}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allow="camera; microphone; geolocation; autoplay; fullscreen" 
    allowfullscreen>
  </iframe>
</div>`;

  const copyCode = () => {
    navigator.clipboard.writeText(responsiveSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="blogger-embed-view-container" className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
            <Globe className="w-4 h-4 text-amber-200" />
            <span>Integrasi Iframe Blogger (Blogspot)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Integrasi &amp; Embed Blogger
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Pasang portal LMS Guru ini pada blog guru atau website sekolah dengan kode HTML iframe responsif tanpa batasan X-Frame-Options.
          </p>
        </div>

        <button
          onClick={copyCode}
          className="px-5 py-3 rounded-2xl bg-white text-amber-800 hover:bg-amber-50 font-bold text-xs sm:text-sm shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Kode Tersalin!' : 'Salin Kode Embed'}
        </button>
      </div>

      {/* 2-Columns: Setup Guide & Code Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Step-by-Step Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Langkah Pemasangan di Blogger:
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <p>Buka dashboard <strong>Blogger (blogger.com)</strong> Anda &gt; Pilih Blog Anda &gt; Klik <strong>Postingan Baru</strong> atau <strong>Halaman Baru</strong>.</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <p>Di kiri atas editor Blogger, klik ikon pensil lalu ganti mode ke <strong>&lt;&gt; Tampilan HTML</strong> (HTML View).</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <p>Tempelkan (Paste) kode iframe dari kotak sebelah kanan ke dalam editor HTML tersebut.</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </div>
              <p>Klik <strong>Publikasikan</strong>. LMS Guru kini aktif di blog Anda dan dapat diakses oleh seluruh siswa &amp; guru lain!</p>
            </div>
          </div>

          {/* Config Controls */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-slate-700">Tinggi Iframe (Height)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="500"
                max="1200"
                step="50"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <span className="text-xs font-bold font-mono text-slate-700 shrink-0">{customHeight}px</span>
            </div>
          </div>
        </div>

        {/* Right: Code snippet */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between space-y-4 shadow-xl border border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-300">HTML Iframe Snippet</span>
              </div>
              <button
                onClick={copyCode}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
              {responsiveSnippet}
            </pre>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400">
            <span className="text-amber-400 font-bold block mb-1">Catatan Keamanan X-Frame:</span>
            Backend Google Apps Script di aplikasi ini telah mengimplementasikan <code>HtmlService.XFrameOptionsMode.ALLOWALL</code> sehingga tidak akan diblokir oleh browser saat di-embed ke domain Blogger.
          </div>
        </div>

      </div>

      {/* Interactive Mockup Simulation Preview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Simulasi Tampilan di Layar Blogger</h3>
            <p className="text-xs text-slate-500">Pratinjau bagaimana aplikasi akan tampil di blog sekolah.</p>
          </div>

          {/* Device toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                devicePreview === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                devicePreview === 'tablet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              Tablet
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                devicePreview === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>
        </div>

        {/* Simulated Browser Frame */}
        <div className={`mx-auto transition-all duration-300 ${
          devicePreview === 'desktop' ? 'w-full' : devicePreview === 'tablet' ? 'w-[720px] max-w-full' : 'w-[375px] max-w-full'
        }`}>
          <div className="rounded-2xl border border-slate-300 shadow-lg overflow-hidden bg-white">
            {/* Blogger header bar mockup */}
            <div className="bg-amber-600 px-4 py-2.5 text-white flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/60"></span>
                <span>Blog Guru Pembelajaran Indonesia</span>
              </div>
              <span className="text-[10px] text-amber-200">https://guruku.blogspot.com</span>
            </div>

            {/* Post area */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h4 className="text-base font-extrabold text-slate-900">Portal LMS Digital Guru Terpadu</h4>
              <p className="text-xs text-slate-500 mt-0.5">Dipublikasikan pada {new Date().toLocaleDateString('id-ID')}</p>
            </div>

            {/* Embedded frame indicator */}
            <div className="p-4 bg-white text-center">
              <div className="p-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 flex flex-col items-center justify-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">Aplikasi LMS Guru Siap Tampil Interaktif &amp; Responsif</span>
                <span className="text-[11px] text-slate-500">Tampilan mobile-first menyesuaikan lebar layar siswa secara otomatis.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
