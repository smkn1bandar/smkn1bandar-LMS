import React, { useState } from 'react';
import { 
  BookOpen, HelpCircle, HardDrive, Youtube, ShieldCheck, 
  Share2, Globe, FileCode, CheckCircle2, ChevronDown, ChevronUp, Sparkles 
} from 'lucide-react';

export const PanduanView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara menambahkan materi dari Google Drive?',
      a: 'Buka file modul ajar Anda di Google Drive > Klik Bagikan (Share) > Ubah akses menjadi "Siapa saja yang memiliki link" (Anyone with the link can view) > Salin link tersebut > Buka menu Tambah Materi di LMS Guru > Tempelkan link Google Drive tersebut. Sistem akan otomatis mendeteksi ID file dan menampilkan pratinjau dokumen langsung.',
    },
    {
      q: 'Bagaimana cara menambahkan video pembelajaran YouTube?',
      a: 'Buka video materi Anda di YouTube > Salin URL di browser (contoh: https://www.youtube.com/watch?v=xxx atau https://youtu.be/xxx) > Buka Tambah Video di LMS Guru > Tempelkan URL tersebut. Sistem akan otomatis mengekstrak thumbnail dan video ID resolusi tinggi untuk streaming tanpa kuota server.',
    },
    {
      q: 'Bagaimana cara memasang (embed) aplikasi LMS ini ke Blogger?',
      a: 'Aplikasi Google Apps Script ini telah dikonfigurasi dengan mode X-Frame-Options: ALLOWALL. Anda cukup menyalin kode iframe dari menu "Embed Blogger", kemudian buat Postingan Baru di Blogger, ganti mode editor ke "Tampilan HTML", dan tempelkan kodenya.',
    },
    {
      q: 'Bagaimana cara memasukkan, mengganti, dan menghapus foto profil guru?',
      a: 'Ada 2 cara mudah: 1) Melalui Aplikasi: Masuk sebagai Guru atau Admin > Klik foto profil atau tombol "Edit Profil & Foto" > Pilih "Upload dari Komputer" untuk memilih foto JPG/PNG baru, atau masukkan Link URL Foto. Untuk menghapus foto profil, klik tombol "Hapus / Reset Foto (Gunakan Inisial)". 2) Melalui Spreadsheet: Buka tab Sheet "Data_Guru" > Cari kolom "foto" > Masukkan/ganti URL gambar foto guru tersebut, atau kosongkan sel jika ingin menghapus foto.',
    },
    {
      q: 'Bagaimana sistem moderasi karya guru bekerja?',
      a: 'Setiap guru dapat mengunggah Modul Ajar, Best Practice, atau Media Interaktif. Karya yang diunggah akan masuk status "Menunggu Verifikasi". Administrator sekolah dapat meninjau, menyetujui, memberi catatan revisi, atau menjadikannya "Karya Unggulan" di halaman Beranda.',
    },
    {
      q: 'Apakah membutuhkan database berbayar seperti MySQL atau Firebase?',
      a: 'Tidak sama sekali! Aplikasi ini 100% dirancang tanpa biaya server. Google Spreadsheet berfungsi sebagai database relasional 8 tabel, Google Drive sebagai media storage dokumen tak terbatas, dan YouTube sebagai CDN video interaktif.',
    },
  ];

  return (
    <div id="panduan-view-container" className="space-y-10 pb-16 max-w-4xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-2">
          <HelpCircle className="w-4 h-4 text-amber-300" />
          <span>Panduan Penggunaan Sistem</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Panduan &amp; Dokumentasi LMS Guru
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
          Petunjuk lengkap pengoperasian Digital LMS Guru bagi Administrator, Guru Pengajar, dan Integrasi Blogger.
        </p>
      </div>

      {/* 4 Steps Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Google Spreadsheet Database</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Data tersimpan aman pada 8 sheet terstruktur (USERS, GURU, KELAS, MATERI, YOUTUBE, KARYA_GURU, AKTIVITAS, SETTING).
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Google Drive Media Storage</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            File PDF, Word, PowerPoint, dan Modul Ajar disimpan di folder Google Drive dengan izin akses publik otomatis.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">YouTube Pembelajaran Streaming</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Video tutorial praktikum dihubungkan melalui URL YouTube dengan pratinjau responsif dan pemutar bebas iklan pihak ketiga.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Blogger Iframe Embedding</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Dapat dipasang di blog guru atau website portal sekolah secara penuh dan responsif di smartphone maupun komputer.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-lg font-black text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h2>
        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-800 hover:text-blue-600 text-sm transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5 pt-2 text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
