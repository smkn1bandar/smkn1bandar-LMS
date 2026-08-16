import React, { useState } from 'react';
import { 
  FileCode, Copy, Check, Download, ExternalLink, 
  Sparkles, CheckCircle2, ShieldCheck, Database, HardDrive, Terminal 
} from 'lucide-react';
import { GAS_FILES } from '../services/gasCodeGenerator';

export const GasCodeView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(GAS_FILES[0]);
  const [copied, setCopied] = useState(false);

  const copyCurrentCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = selectedFile.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="gas-code-view-container" className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Serverless Backend Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Source Code Google Apps Script (GAS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kode backend lengkap siap pakai untuk di-deploy di <strong>script.google.com</strong>. Terdiri dari modul routing, autentikasi SSO, CRUD Spreadsheet, Drive storage, dan moderasi admin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://script.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buka script.google.com
          </a>
          <button
            onClick={copyCurrentCode}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Kode Tersalin!' : 'Salin File Ini'}
          </button>
        </div>
      </div>

      {/* Deployment Guide Steps */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Langkah Deployment ke Google Apps Script:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block text-xs">1. Buat Project Baru</span>
            <p>Buka <strong>script.google.com</strong> &gt; Buat Proyek Baru. Beri nama &quot;LMS Digital Guru&quot;.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block text-xs">2. Salin Seluruh File .gs</span>
            <p>Buat file-file script sesuai daftar di bawah (Code, Auth, Database, Drive, Materi, Youtube, KaryaGuru, Admin) lalu tempel isinya.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block text-xs">3. Deploy sebagai Web App</span>
            <p>Klik <strong>Deploy &gt; New Deployment &gt; Web App</strong> &gt; Atur <em>Execute as: Me</em> dan <em>Who has access: Anyone</em>.</p>
          </div>
        </div>
      </div>

      {/* Code Viewer Panel with Tabs */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* File Tabs */}
        <div className="bg-slate-900 px-4 pt-3 flex items-center gap-1.5 overflow-x-auto border-b border-slate-800">
          {GAS_FILES.map((file) => (
            <button
              key={file.name}
              onClick={() => setSelectedFile(file)}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                selectedFile.name === file.name
                  ? 'bg-slate-950 text-indigo-400 border-t-2 border-indigo-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {file.name}
            </button>
          ))}
        </div>

        {/* File Details Subheader */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            File: <strong className="text-slate-200 font-mono">{selectedFile.name}</strong> &bull; {selectedFile.description}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh File
            </button>
            <button
              onClick={copyCurrentCode}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto max-h-[550px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed bg-slate-950">
          <pre className="text-indigo-200/90">{selectedFile.content}</pre>
        </div>
      </div>

    </div>
  );
};
