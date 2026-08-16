import React, { useState } from 'react';
import { 
  X, ShieldCheck, GraduationCap, Check, ArrowRight, 
  LogIn, UserCheck, Sparkles, Mail, User as UserIcon, School, Users
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
  const [filterRole, setFilterRole] = useState<'ALL' | 'GURU' | 'SISWA' | 'ADMIN'>('ALL');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<'ADMIN' | 'GURU' | 'SISWA'>('GURU');
  const [customMapel, setCustomMapel] = useState('Informatika / Umum');
  const [customNip, setCustomNip] = useState('19850101 201001 1 001');

  if (!isOpen) return null;

  const filteredUsers = filterRole === 'ALL' 
    ? INITIAL_USERS 
    : INITIAL_USERS.filter(u => u.role === filterRole);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    let defaultPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
    if (customRole === 'ADMIN') {
      defaultPhoto = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200';
    } else if (customRole === 'SISWA') {
      defaultPhoto = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200';
    }

    const newUser: User = {
      id_user: `USR-${Date.now().toString().slice(-6)}`,
      email: customEmail.trim(),
      nama: customName.trim(),
      nip: customNip.trim() || '-',
      role: customRole,
      mata_pelajaran: customMapel,
      sekolah: 'SMK Negeri 1 Bandar',
      foto: defaultPhoto,
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
        <div className="bg-[#0F172A] p-6 text-white relative border-b border-slate-800">
          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center border border-sky-400/30 text-white shadow-md shadow-sky-600/30">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 uppercase tracking-wider mb-1 border border-sky-500/30">
                Single Sign-On &bull; SMK Negeri 1 Bandar
              </span>
              <h2 className="text-xl font-bold">Masuk ke Digital LMS</h2>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Pilih akun simulasi Google Workspace (@belajar.id) atau masukkan identitas Anda untuk mengakses fitur Guru, Siswa, atau Administrator.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            id="tab-btn-quick-login"
            onClick={() => setTab('quick')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              tab === 'quick'
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
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
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-sky-600" />
            Input Akun Google Saya
          </button>
        </div>

        {/* Tab 1: Quick Accounts */}
        {tab === 'quick' ? (
          <div className="p-6 space-y-3 max-h-[420px] overflow-y-auto">
            {/* Filter pills: ALL / GURU / SISWA / ADMIN */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setFilterRole('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterRole === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setFilterRole('GURU')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterRole === 'GURU' ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                }`}
              >
                Guru Pengajar
              </button>
              <button
                type="button"
                onClick={() => setFilterRole('SISWA')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterRole === 'SISWA' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Siswa
              </button>
              <button
                type="button"
                onClick={() => setFilterRole('ADMIN')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterRole === 'ADMIN' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="space-y-2">
              {filteredUsers.map((user) => {
                const isAdmin = user.role === 'ADMIN';
                const isSiswa = user.role === 'SISWA';
                return (
                  <button
                    key={user.id_user}
                    id={`btn-select-user-${user.id_user}`}
                    onClick={() => {
                      onSelectUser(user);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-all text-left group bg-white shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.foto}
                        alt={user.nama}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-sky-400 transition-all shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-700 truncate">
                            {user.nama}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${
                            isAdmin 
                              ? 'bg-amber-100 text-amber-800' 
                              : isSiswa 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-sky-100 text-sky-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-600 font-medium truncate flex items-center gap-1">
                            <School className="w-3 h-3 text-slate-400 shrink-0" />
                            {user.mata_pelajaran}
                          </span>
                          <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                            User: {user.username || user.role.toLowerCase()} | Pass: {user.password || user.role.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors shrink-0 ml-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
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
                  placeholder="nama@smknegeri1bandar.sch.id / @belajar.id"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham / Alya Amanda"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Peran (Role) *
                </label>
                <select
                  value={customRole}
                  onChange={(e) => {
                    const r = e.target.value as 'ADMIN' | 'GURU' | 'SISWA';
                    setCustomRole(r);
                    if (r === 'SISWA') {
                      setCustomMapel('Kelas XI RPL 1');
                      setCustomNip('NISN: 0081234567');
                    } else if (r === 'GURU') {
                      setCustomMapel('Informatika / Pemrograman');
                      setCustomNip('19850101 201001 1 001');
                    } else {
                      setCustomMapel('Teknologi Informasi & Komunikasi');
                      setCustomNip('19740512 199903 1 004');
                    }
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                >
                  <option value="GURU">Guru Pengajar</option>
                  <option value="SISWA">Siswa / Peserta Didik</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {customRole === 'SISWA' ? 'NISN / NIS' : 'NIP / NUPTK'}
                </label>
                <input
                  type="text"
                  placeholder={customRole === 'SISWA' ? 'NISN: 0081234567' : '19850101 201001 1 001'}
                  value={customNip}
                  onChange={(e) => setCustomNip(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {customRole === 'SISWA' ? 'Kelas / Jurusan' : 'Mata Pelajaran yang Diampu'}
              </label>
              <input
                type="text"
                placeholder={customRole === 'SISWA' ? 'Contoh: Kelas XI RPL 1' : 'Contoh: Informatika / Teknik Jaringan'}
                value={customMapel}
                onChange={(e) => setCustomMapel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              id="btn-submit-custom-login"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <LogIn className="w-4 h-4" />
              Masuk dengan Akun Ini
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          SMK Negeri 1 Bandar &bull; Jl. Sudirman Perdagangan III &bull; info@smknegeri1bandar.sch.id
        </div>
      </div>
    </div>
  );
};
