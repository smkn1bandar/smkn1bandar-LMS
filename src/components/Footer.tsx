import React from 'react';
import { 
  GraduationCap, MapPin, Phone, Mail, Globe, Code2, 
  Database, HardDrive, Youtube, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { AppSettings, AppView } from '../types';

interface FooterProps {
  settings: AppSettings;
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: About & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">{settings.app_name}</h3>
                <p className="text-xs text-sky-400 font-semibold">{settings.school_name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.app_desc}
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 text-sky-300 border border-slate-700/80">
                <Code2 className="w-3 h-3 text-sky-400" />
                Google Apps Script
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 text-emerald-300 border border-slate-700/80">
                <Database className="w-3 h-3 text-emerald-400" />
                Google Sheets DB
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Jelajahi Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-link-materi"
                  onClick={() => onNavigate('materi')}
                  className="hover:text-white text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">&rsaquo;</span>
                  Katalog Materi Pembelajaran
                </button>
              </li>
              <li>
                <button
                  id="footer-link-video"
                  onClick={() => onNavigate('video')}
                  className="hover:text-white text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">&rsaquo;</span>
                  Video Pembelajaran YouTube
                </button>
              </li>
              <li>
                <button
                  id="footer-link-karya"
                  onClick={() => onNavigate('karya')}
                  className="hover:text-white text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">&rsaquo;</span>
                  Galeri Karya Guru &amp; Inovasi
                </button>
              </li>
              <li>
                <button
                  id="footer-link-guru"
                  onClick={() => onNavigate('guru')}
                  className="hover:text-white text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">&rsaquo;</span>
                  Direktori Guru &amp; Pengajar
                </button>
              </li>
              <li>
                <button
                  id="footer-link-panduan"
                  onClick={() => onNavigate('panduan')}
                  className="hover:text-white text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">&rsaquo;</span>
                  Panduan Penggunaan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrasi Ekosistem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Ekosistem Google
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-2xs">
                <HardDrive className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Google Drive Storage</div>
                  <div className="text-[11px] text-slate-400">Penyimpanan aman modul PDF, Doc, PPT, dan Modul Ajar.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-2xs">
                <Youtube className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">YouTube Learning Hub</div>
                  <div className="text-[11px] text-slate-400">Streaming video praktikum tanpa beban kuota server.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-2xs">
                <Globe className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Blogger / Web Embed</div>
                  <div className="text-[11px] text-slate-400">Dapat dipasang ke blog guru dan website resmi sekolah.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Kontak & Administrator */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Kontak Sekolah
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px]">{settings.school_address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-[11px]">{settings.school_contact}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-[11px] truncate">{settings.admin_email}</span>
              </div>

              <div className="pt-2.5 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Tautan Blogger Guru:</div>
                <a
                  href={settings.blogger_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium text-xs mt-1"
                >
                  <Globe className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">{settings.blogger_url.replace('https://', '')}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{settings.footer_text}</div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Role-Based Access Control
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              Made for Indonesian Teachers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
