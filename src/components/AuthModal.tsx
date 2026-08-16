import React, { useState } from 'react';
import { 
  X, ShieldCheck, GraduationCap, Check, ArrowRight, 
  LogIn, UserCheck, Sparkles, Mail, User as UserIcon, School
} from 'lucide-react';
import { User } from '../types';
import { INITIAL_USERS } from '../services/database';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
  onRegisterCustom: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  onRegisterCustom,
}) => {
  const [tab, setTab] = useState<'quick' | 'custom'>('quick');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<'ADMIN' | 'GURU'>('GURU');
  const [customMapel, setCustomMapel] = useState('Informatika / Umum');
  const [customNip, setCustomNip] = useState('19850101 201001 1 001');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    const newUser: User = {
      id_user: `USR-${Date.now().toString().slice(-6)}`,
      email: customEmail.trim(),
      nama: customName.trim(),
      nip: customNip.trim() || '-',
      role: customRole,
      mata_pelajaran: customMapel,
      sekolah: 'SMK Negeri 1 Digital Edukasi',
      foto: customRole === 'ADMIN' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      status: 'AKTIF',
      tanggal_daftar: new Date().toISOString().slice(0, 10),
      last_login: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    onRegisterCustom(newUser);
    onClose();
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="auth-modal-container" 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 uppercase tracking-wider mb-1">
                Google SSO Authentication
              </span>
              <h2 className="text-xl font-bold">Masuk ke Digital LMS Guru</h2>
            </div>
          </div>
          <p className="mt-2 text-xs text-blue-100 leading-relaxed">
            Pilih akun simulasi Google Workspace (@belajar.id) atau masukkan identitas akun Anda untuk mengakses fitur guru & administrator.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            id="tab-btn-quick-login"
            onClick={() => setTab('quick')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              tab === 'quick'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Akun Siap Pakai (Demo)
          </button>
          <button
            id="tab-btn-custom-login"
            onClick={() => setTab('custom')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              tab === 'custom'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-blue-600" />
            Input Akun Google Saya
          </button>
        </div>

        {/* Tab 1: Quick Accounts */}
        {tab === 'quick' ? (
          <div className="p-6 space-y-3 max-h-[420px] overflow-y-auto">
            <p className="text-xs text-slate-500 font-medium mb-1">
              Klik salah satu akun di bawah untuk langsung masuk dan menguji hak akses:
            </p>

            {INITIAL_USERS.map((user) => {
              const isAdmin = user.role === 'ADMIN';
              return (
                <button
                  key={user.id_user}
                  id={`btn-select-user-${user.id_user}`}
                  onClick={() => {
                    onSelectUser(user);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group bg-white shadow-2xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={user.foto}
                      alt={user.nama}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-blue-700">
                          {user.nama}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          isAdmin 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                        <School className="w-3 h-3 text-slate-400" />
                        {user.mata_pelajaran}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Tab 2: Custom Login */
          <form onSubmit={handleCustomSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Google / Akun Belajar.id *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="nama.guru@admin.smk.belajar.id"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap & Gelar *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham, M.Pd."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Role *
                </label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value as 'ADMIN' | 'GURU')}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="GURU">Guru Pengajar</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NIP / NUPTK
                </label>
                <input
                  type="text"
                  placeholder="19850101 201001 1 001"
                  value={customNip}
                  onChange={(e) => setCustomNip(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mata Pelajaran yang Diampu
              </label>
              <input
                type="text"
                placeholder="Contoh: Informatika / Pemrograman Web"
                value={customMapel}
                onChange={(e) => setCustomMapel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              id="btn-submit-custom-login"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <LogIn className="w-4 h-4" />
              Masuk dengan Akun Ini
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Di Google Apps Script langsung, login menggunakan sesi akun Google aktif (Single Sign-On).
        </div>
      </div>
    </div>
  );
};
