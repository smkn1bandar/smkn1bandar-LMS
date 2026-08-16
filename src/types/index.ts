export type UserRole = 'ADMIN' | 'GURU' | 'SISWA' | 'PUBLIC';

export type UserStatus = 'AKTIF' | 'NONAKTIF' | 'PENDING';

export interface User {
  id_user: string;
  username?: string;
  password?: string;
  email: string;
  nama: string;
  nip: string;
  role: 'ADMIN' | 'GURU' | 'SISWA';
  mata_pelajaran: string;
  sekolah: string;
  foto: string;
  status: UserStatus;
  tanggal_daftar: string;
  last_login: string;
}

export interface Guru {
  id_guru: string;
  email: string;
  nama_guru: string;
  nip: string;
  gelar: string;
  mata_pelajaran: string;
  jurusan: string;
  kelas: string;
  foto: string;
  biografi: string;
  keahlian: string[];
  kontak: string;
  status: 'AKTIF' | 'NONAKTIF';
}

export interface Kelas {
  id_kelas: string;
  nama_kelas: string;
  tingkat: 'X' | 'XI' | 'XII';
  jurusan: string;
  tahun_ajaran: string;
  wali_kelas: string;
  status: 'AKTIF' | 'NONAKTIF';
}

export type JenisMateri = 
  | 'PDF'
  | 'DOC/DOCX'
  | 'PPT/PPTX'
  | 'XLS/XLSX'
  | 'MODUL'
  | 'EBOOK'
  | 'LINK'
  | 'VIDEO YOUTUBE'
  | 'GOOGLE DRIVE'
  | 'LAINNYA';

export type StatusKonten = 'DISETUJUI' | 'MENUNGGU VERIFIKASI' | 'DRAFT' | 'DITOLAK' | 'DIARSIPKAN';

export interface Materi {
  id_materi: string;
  id_guru: string;
  nama_guru: string;
  judul: string;
  deskripsi: string;
  mata_pelajaran: string;
  kelas: string;
  tingkat: string;
  topik: string;
  jenis_materi: JenisMateri;
  sumber: 'GOOGLE DRIVE' | 'LINK' | 'UPLOAD FILE' | 'YOUTUBE';
  url: string;
  file_id?: string;
  thumbnail?: string;
  tanggal_upload: string;
  status: StatusKonten;
  jumlah_view: number;
  alasan_penolakan?: string;
}

export interface YoutubeVideo {
  id_video: string;
  id_guru: string;
  nama_guru: string;
  judul: string;
  deskripsi: string;
  url_youtube: string;
  video_id: string;
  mata_pelajaran: string;
  kelas: string;
  topik: string;
  thumbnail: string;
  tanggal: string;
  status: StatusKonten;
  view: number;
}

export type KategoriKarya =
  | 'Modul Ajar'
  | 'Bahan Ajar'
  | 'Media Pembelajaran'
  | 'Video Pembelajaran'
  | 'LKPD'
  | 'Presentasi'
  | 'Infografis'
  | 'E-Modul'
  | 'Artikel'
  | 'Inovasi Pembelajaran'
  | 'Best Practice'
  | 'Projek'
  | 'Lainnya';

export interface KaryaGuru {
  id_karya: string;
  id_guru: string;
  nama_guru: string;
  judul_karya: string;
  deskripsi: string;
  kategori: KategoriKarya;
  mata_pelajaran: string;
  tahun: string;
  url: string;
  file_id?: string;
  thumbnail: string;
  tanggal_upload: string;
  status: StatusKonten;
  featured: boolean;
  jumlah_view: number;
  alasan_penolakan?: string;
}

export interface AktivitasLog {
  id_aktivitas: string;
  email: string;
  nama: string;
  role: string;
  aktivitas: string;
  detail: string;
  waktu: string;
  ip?: string;
}

export interface AppSettings {
  school_name: string;
  app_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  primary_color: string;
  academic_year: string;
  blogger_url: string;
  drive_master_folder: string;
  admin_email: string;
  app_desc: string;
  school_contact: string;
  school_address: string;
  footer_text: string;
  allow_public_view: boolean;
  gas_webapp_url?: string;
  spreadsheet_id?: string;
  drive_folder_id?: string;
}

export type AppView = 
  | 'home'
  | 'portal-login'
  | 'materi'
  | 'video'
  | 'karya'
  | 'guru'
  | 'guru-profile'
  | 'guru-dashboard'
  | 'admin-dashboard'
  | 'panduan'
  | 'blogger-embed'
  | 'gas-code';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type ToastMessage = ToastNotification;
