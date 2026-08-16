import { 
  User, Guru, Kelas, Materi, YoutubeVideo, KaryaGuru, 
  AktivitasLog, AppSettings, StatusKonten, KategoriKarya, JenisMateri 
} from '../types';

export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

export function getDrivePreviewUrl(fileIdOrUrl: string): string {
  const id = extractDriveFileId(fileIdOrUrl);
  if (id) {
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  return fileIdOrUrl;
}

export const INITIAL_SETTINGS: AppSettings = {
  school_name: 'SMK Negeri 1 Bandar',
  app_name: 'DIGITAL LMS GURU',
  tagline: 'Berbagi Pengetahuan, Berkarya, dan Menginspirasi Pembelajaran',
  logo_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
  favicon_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=32&auto=format&fit=crop&q=80',
  primary_color: '#2563eb', // Indigo / Royal Blue
  academic_year: '2025/2026',
  blogger_url: 'https://digital-lms-guru.blogspot.com',
  drive_master_folder: '1A2b3C4d5E6f_DigitalLMS_Master',
  admin_email: 'info@smknegeri1bandar.sch.id',
  app_desc: 'Pusat pembelajaran digital dan repositori karya guru SMK Negeri 1 Bandar berbasis Google Workspace, Google Drive, YouTube, dan Google Apps Script.',
  school_contact: '+62 812-3456-7890 | info@smknegeri1bandar.sch.id',
  school_address: 'Jl. Sudirman Perdagangan III',
  footer_text: '© 2026 SMK Negeri 1 Bandar - Digital LMS Guru. Dikembangkan dengan Google Apps Script & Google Sheets.',
  allow_public_view: true,
};

export const INITIAL_USERS: User[] = [
  {
    id_user: 'USR-001',
    email: 'rudi.harto63@admin.smk.belajar.id',
    nama: 'Drs. Rudi Hartono, M.T.',
    nip: '19740512 199903 1 004',
    role: 'ADMIN',
    mata_pelajaran: 'Teknologi Informasi & Komunikasi',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-10',
    last_login: '2026-08-16 08:30',
  },
  {
    id_user: 'USR-002',
    email: 'budi.santoso@guru.smk.belajar.id',
    nama: 'Budi Santoso, S.Kom., M.Pd.',
    nip: '19830214 200801 1 012',
    role: 'GURU',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-12',
    last_login: '2026-08-16 07:15',
  },
  {
    id_user: 'USR-003',
    email: 'siti.rahmawati@guru.sma.belajar.id',
    nama: 'Siti Rahmawati, S.Pd., M.Si.',
    nip: '19870921 201101 2 008',
    role: 'GURU',
    mata_pelajaran: 'Matematika Terapan',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-15',
    last_login: '2026-08-15 14:20',
  },
  {
    id_user: 'USR-004',
    email: 'ahmad.fauzi@guru.smk.belajar.id',
    nama: 'Ahmad Fauzi, M.Kom.',
    nip: '19900305 201503 1 007',
    role: 'GURU',
    mata_pelajaran: 'Teknik Komputer & Jaringan',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-20',
    last_login: '2026-08-15 16:45',
  },
  {
    id_user: 'USR-005',
    email: 'dewi.lestari@guru.sma.belajar.id',
    nama: 'Dewi Lestari, S.Si., M.Pd.',
    nip: '19851110 200902 2 005',
    role: 'GURU',
    mata_pelajaran: 'Fisika Terapan & IPAS',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-08-01',
    last_login: '2026-08-14 11:10',
  },
  {
    id_user: 'USR-006',
    email: 'hendra.kusuma@guru.smk.belajar.id',
    nama: 'Hendra Kusuma, S.Pd.',
    nip: '19920418 201903 1 009',
    role: 'GURU',
    mata_pelajaran: 'Bahasa Indonesia & Literasi Digital',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-08-05',
    last_login: '2026-08-13 09:30',
  },
  {
    id_user: 'USR-007',
    email: 'rian.pratama@siswa.smk.belajar.id',
    nama: 'Rian Pratama',
    nip: 'NISN: 0078129384',
    role: 'SISWA',
    mata_pelajaran: 'Kelas XI RPL 1 (Rekayasa Perangkat Lunak)',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-18',
    last_login: '2026-08-16 09:10',
  },
  {
    id_user: 'USR-008',
    email: 'alya.amanda@siswa.smk.belajar.id',
    nama: 'Alya Amanda',
    nip: 'NISN: 0089234120',
    role: 'SISWA',
    mata_pelajaran: 'Kelas XII TKJ 1 (Teknik Komputer & Jaringan)',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-18',
    last_login: '2026-08-15 15:40',
  },
  {
    id_user: 'USR-009',
    email: 'dimas.arya@siswa.smk.belajar.id',
    nama: 'Dimas Arya',
    nip: 'NISN: 0091124567',
    role: 'SISWA',
    mata_pelajaran: 'Kelas X RPL 1 (Dasar Pemrograman)',
    sekolah: 'SMK Negeri 1 Bandar',
    foto: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
    status: 'AKTIF',
    tanggal_daftar: '2025-07-20',
    last_login: '2026-08-14 13:25',
  }
];

export const INITIAL_GURU: Guru[] = [
  {
    id_guru: 'GURU-001',
    email: 'budi.santoso@guru.smk.belajar.id',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    nip: '19830214 200801 1 012',
    gelar: 'S.Kom., M.Pd.',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    jurusan: 'Rekayasa Perangkat Lunak (RPL)',
    kelas: 'X, XI, XII RPL',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    biografi: 'Guru Penggerak Angkatan 7, aktif mengembangkan platform media pembelajaran interaktif berbasis web, algoritma pemrograman, dan kecerdasan buatan untuk SMK.',
    keahlian: ['Full-Stack Web', 'Python', 'Algoritma & Struktur Data', 'Kurikulum Merdeka', 'Google Apps Script'],
    kontak: '0812-9876-5432',
    status: 'AKTIF'
  },
  {
    id_guru: 'GURU-002',
    email: 'siti.rahmawati@guru.sma.belajar.id',
    nama_guru: 'Siti Rahmawati, S.Pd., M.Si.',
    nip: '19870921 201101 2 008',
    gelar: 'S.Pd., M.Si.',
    mata_pelajaran: 'Matematika Terapan',
    jurusan: 'Semua Jurusan (Teknologi & Bisnis)',
    kelas: 'X, XI SMA/SMK',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    biografi: 'Spesialis pengajaran Matematika berbasis pemecahan masalah kontekstual, statistika terapan, dan visualisasi GeoGebra interaktif.',
    keahlian: ['GeoGebra', 'Statistika Terapan', 'Kalkulus Dasar', 'Game-based Learning (Quizizz/Kahoot)'],
    kontak: '0813-1122-3344',
    status: 'AKTIF'
  },
  {
    id_guru: 'GURU-003',
    email: 'ahmad.fauzi@guru.smk.belajar.id',
    nama_guru: 'Ahmad Fauzi, M.Kom.',
    nip: '19900305 201503 1 007',
    gelar: 'M.Kom.',
    mata_pelajaran: 'Teknik Komputer & Jaringan',
    jurusan: 'Teknik Komputer dan Jaringan (TKJ)',
    kelas: 'X, XI, XII TKJ',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    biografi: 'Instruktur Cisco Networking Academy, ahli infrastruktur cloud, virtualisasi MikroTik, dan keamanan siber sekolah.',
    keahlian: ['MikroTik MTCNA', 'Cisco CCNA', 'Linux Server', 'Cybersecurity Basics', 'Cloud Infrastructure'],
    kontak: '0815-5566-7788',
    status: 'AKTIF'
  },
  {
    id_guru: 'GURU-004',
    email: 'dewi.lestari@guru.sma.belajar.id',
    nama_guru: 'Dewi Lestari, S.Si., M.Pd.',
    nip: '19851110 200902 2 005',
    gelar: 'S.Si., M.Pd.',
    mata_pelajaran: 'Fisika Terapan & IPAS',
    jurusan: 'Teknik & Rekayasa',
    kelas: 'X, XI SMK',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    biografi: 'Pemenang Lomba Inovasi Media Pembelajaran Sains 2024 tingkat Provinsi. Mengembangkan simulasi PhET Interactive Physics untuk laboratorium virtual.',
    keahlian: ['PhET Interactive Simulation', 'Fisika Terapan', 'Lab Virtual', 'STEM Project Based Learning'],
    kontak: '0817-4433-2211',
    status: 'AKTIF'
  },
  {
    id_guru: 'GURU-005',
    email: 'hendra.kusuma@guru.smk.belajar.id',
    nama_guru: 'Hendra Kusuma, S.Pd.',
    nip: '19920418 201903 1 009',
    gelar: 'S.Pd.',
    mata_pelajaran: 'Bahasa Indonesia & Literasi Digital',
    jurusan: 'Semua Jurusan',
    kelas: 'X, XI, XII',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    biografi: 'Penulis buku antologi cerita edukatif guru, pembina ekstrakurikuler jurnalistik dan siniar (podcast) literasi sekolah.',
    keahlian: ['Penulisan Kreatif', 'Public Speaking', 'Podcast Edukasi', 'Karya Tulis Ilmiah (KTI)'],
    kontak: '0819-8877-6655',
    status: 'AKTIF'
  }
];

export const INITIAL_KELAS: Kelas[] = [
  {
    id_kelas: 'KLS-001',
    nama_kelas: 'X RPL 1 (Rekayasa Perangkat Lunak)',
    tingkat: 'X',
    jurusan: 'Rekayasa Perangkat Lunak',
    tahun_ajaran: '2025/2026',
    wali_kelas: 'Budi Santoso, S.Kom., M.Pd.',
    status: 'AKTIF'
  },
  {
    id_kelas: 'KLS-002',
    nama_kelas: 'X TKJ 1 (Teknik Komputer & Jaringan)',
    tingkat: 'X',
    jurusan: 'Teknik Komputer dan Jaringan',
    tahun_ajaran: '2025/2026',
    wali_kelas: 'Ahmad Fauzi, M.Kom.',
    status: 'AKTIF'
  },
  {
    id_kelas: 'KLS-003',
    nama_kelas: 'XI RPL 1 (Web & Mobile Dev)',
    tingkat: 'XI',
    jurusan: 'Rekayasa Perangkat Lunak',
    tahun_ajaran: '2025/2026',
    wali_kelas: 'Siti Rahmawati, S.Pd., M.Si.',
    status: 'AKTIF'
  },
  {
    id_kelas: 'KLS-004',
    nama_kelas: 'XI TKJ 2 (Network Administration)',
    tingkat: 'XI',
    jurusan: 'Teknik Komputer dan Jaringan',
    tahun_ajaran: '2025/2026',
    wali_kelas: 'Dewi Lestari, S.Si., M.Pd.',
    status: 'AKTIF'
  },
  {
    id_kelas: 'KLS-005',
    nama_kelas: 'XII SIJA (Sistem Informatika Jaringan)',
    tingkat: 'XII',
    jurusan: 'Sistem Informatika, Jaringan & Aplikasi',
    tahun_ajaran: '2025/2026',
    wali_kelas: 'Hendra Kusuma, S.Pd.',
    status: 'AKTIF'
  }
];

export const INITIAL_MATERI: Materi[] = [
  {
    id_materi: 'MAT-001',
    id_guru: 'GURU-001',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    judul: 'Dasar Pemrograman Web Modern dengan HTML5, CSS3, & Tailwind CSS',
    deskripsi: 'Modul komprehensif mengenai struktur semantik HTML5, teknik layouting Flexbox dan Grid CSS, serta implementasi framework Tailwind CSS untuk siswa SMK.',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    kelas: 'X RPL 1',
    tingkat: 'X',
    topik: 'Web Frontend Fundamental',
    jenis_materi: 'MODUL',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    file_id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-01',
    status: 'DISETUJUI',
    jumlah_view: 284
  },
  {
    id_materi: 'MAT-002',
    id_guru: 'GURU-002',
    nama_guru: 'Siti Rahmawati, S.Pd., M.Si.',
    judul: 'Matematika Terapan: Aljabar Linier & Matriks untuk Pemrograman Komputer',
    deskripsi: 'Bahan ajar operasi matriks, transformasi geometri 2D/3D, dan aplikasinya dalam grafika komputer serta game development sederhana.',
    mata_pelajaran: 'Matematika Terapan',
    kelas: 'XI RPL 1',
    tingkat: 'XI',
    topik: 'Aljabar Matriks & Vektor',
    jenis_materi: 'PDF',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1Z_u2mB4bZ9s7d9k3j8f6e2a1b0c9d8e7/view',
    file_id: '1Z_u2mB4bZ9s7d9k3j8f6e2a1b0c9d8e7',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-03',
    status: 'DISETUJUI',
    jumlah_view: 195
  },
  {
    id_materi: 'MAT-003',
    id_guru: 'GURU-003',
    nama_guru: 'Ahmad Fauzi, M.Kom.',
    judul: 'Panduan Praktikum Routing Statis & Dinamis MikroTik RouterOS',
    deskripsi: 'Petunjuk langkah demi langkah konfigurasi routing RIP, OSPF, VLAN, dan Firewall NAT menggunakan simulator GNS3 dan RouterBoard fisik.',
    mata_pelajaran: 'Teknik Komputer & Jaringan',
    kelas: 'XI TKJ 2',
    tingkat: 'XI',
    topik: 'Jaringan Komputer Lanjut',
    jenis_materi: 'EBOOK',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1C_w3nC5cZ0t8e0l4k9g7f3b2c1d0e9f8/view',
    file_id: '1C_w3nC5cZ0t8e0l4k9g7f3b2c1d0e9f8',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-05',
    status: 'DISETUJUI',
    jumlah_view: 320
  },
  {
    id_materi: 'MAT-004',
    id_guru: 'GURU-004',
    nama_guru: 'Dewi Lestari, S.Si., M.Pd.',
    judul: 'Slide Presentasi: Hukum Termodinamika & Efisiensi Mesin Kalor',
    deskripsi: 'Slide materi interaktif dengan animasi siklus Carnot, perpindahan kalor, dan studi kasus efisiensi mesin pembangkit energi.',
    mata_pelajaran: 'Fisika Terapan & IPAS',
    kelas: 'X TKJ 1',
    tingkat: 'X',
    topik: 'Termodinamika & Energi',
    jenis_materi: 'PPT/PPTX',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1D_x4oD6da1u9f1m5l0h8g4c3d2e1f0g9/view',
    file_id: '1D_x4oD6da1u9f1m5l0h8g4c3d2e1f0g9',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-08',
    status: 'DISETUJUI',
    jumlah_view: 142
  },
  {
    id_materi: 'MAT-005',
    id_guru: 'GURU-005',
    nama_guru: 'Hendra Kusuma, S.Pd.',
    judul: 'Kumpulan Lembar Kerja Siswa: Menulis Teks Laporan Hasil Observasi (LHO)',
    deskripsi: 'LKPD terstruktur berbasis proyek investigasi lingkungan sekolah dan analisis data faktual untuk melatih penalaran kritis siswa.',
    mata_pelajaran: 'Bahasa Indonesia & Literasi Digital',
    kelas: 'X RPL 1',
    tingkat: 'X',
    topik: 'Teks LHO & Penalaran Kritis',
    jenis_materi: 'DOC/DOCX',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1E_y5pE7eb2v0g2n6m1i9h5d4e3f2g1h0/view',
    file_id: '1E_y5pE7eb2v0g2n6m1i9h5d4e3f2g1h0',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-10',
    status: 'DISETUJUI',
    jumlah_view: 167
  },
  {
    id_materi: 'MAT-006',
    id_guru: 'GURU-001',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    judul: 'Database Design & SQL Mastery: Normalisasi 1NF sampai 3NF',
    deskripsi: 'Bahan ajar pemodelan basis data ERD, pembuatan relasi tabel MySQL, dan optimasi query dengan indexing.',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    kelas: 'XI RPL 1',
    tingkat: 'XI',
    topik: 'Basis Data Relasional',
    jenis_materi: 'PDF',
    sumber: 'GOOGLE DRIVE',
    url: 'https://drive.google.com/file/d/1F_z6qF8fc3w1h3o7n2j0i6e5f4g3h2i1/view',
    file_id: '1F_z6qF8fc3w1h3o7n2j0i6e5f4g3h2i1',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-12',
    status: 'DISETUJUI',
    jumlah_view: 210
  }
];

export const INITIAL_YOUTUBE: YoutubeVideo[] = [
  {
    id_video: 'VID-001',
    id_guru: 'GURU-001',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    judul: 'Tutorial Membangun Web Apps dengan Google Apps Script & Tailwind CSS',
    deskripsi: 'Video pembelajaran komprehensif pembuatan aplikasi CRUD interaktif menggunakan Google Apps Script, Google Sheets sebagai database, dan integrasi UI responsif.',
    url_youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_id: 'dQw4w9WgXcQ',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    kelas: 'XI RPL 1',
    topik: 'Google Apps Script Fullstack',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    tanggal: '2026-08-02',
    status: 'DISETUJUI',
    view: 450
  },
  {
    id_video: 'VID-002',
    id_guru: 'GURU-003',
    nama_guru: 'Ahmad Fauzi, M.Kom.',
    judul: 'Konfigurasi Dasar MikroTik RouterOS dari Nol: DHCP, NAT & Bandwidth Queue',
    deskripsi: 'Panduan video praktis setting internet gateway kantor/lab sekolah dengan manajemen kecepatan per user secara adil menggunakan Simple Queue.',
    url_youtube: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    video_id: 'L_LUpnjgPso',
    mata_pelajaran: 'Teknik Komputer & Jaringan',
    kelas: 'X TKJ 1',
    topik: 'MikroTik Basics',
    thumbnail: 'https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg',
    tanggal: '2026-08-04',
    status: 'DISETUJUI',
    view: 388
  },
  {
    id_video: 'VID-003',
    id_guru: 'GURU-004',
    nama_guru: 'Dewi Lestari, S.Si., M.Pd.',
    judul: 'Eksperimen Rangkaian Listrik Seri & Paralel Menggunakan Simulasi PhET',
    deskripsi: 'Simulasi virtual hukum Ohm, hambatan pengganti, dan pengukuran arus listrik dengan multimeter virtual yang aman dan mudah dipahami siswa.',
    url_youtube: 'https://www.youtube.com/watch?v=klnvtd34e_k',
    video_id: 'klnvtd34e_k',
    mata_pelajaran: 'Fisika Terapan & IPAS',
    kelas: 'X TKJ 1',
    topik: 'Listrik Dinamis',
    thumbnail: 'https://img.youtube.com/vi/klnvtd34e_k/hqdefault.jpg',
    tanggal: '2026-08-06',
    status: 'DISETUJUI',
    view: 275
  },
  {
    id_video: 'VID-004',
    id_guru: 'GURU-002',
    nama_guru: 'Siti Rahmawati, S.Pd., M.Si.',
    judul: 'Trik Cepat Memahami Limit Fungsi Trigonometri & Teorema Apit',
    deskripsi: 'Penjelasan konsep limit fungsi trigonometri dengan pendekatan grafik visual GeoGebra sehingga siswa tidak hanya menghafal rumus.',
    url_youtube: 'https://www.youtube.com/watch?v=09R8_2nJtjg',
    video_id: '09R8_2nJtjg',
    mata_pelajaran: 'Matematika Terapan',
    kelas: 'XI RPL 1',
    topik: 'Kalkulus & Trigonometri',
    thumbnail: 'https://img.youtube.com/vi/09R8_2nJtjg/hqdefault.jpg',
    tanggal: '2026-08-09',
    status: 'DISETUJUI',
    view: 310
  },
  {
    id_video: 'VID-005',
    id_guru: 'GURU-005',
    nama_guru: 'Hendra Kusuma, S.Pd.',
    judul: 'Teknik Public Speaking & Debat Argumentatif yang Berbobot',
    deskripsi: 'Tips menyusun argumen logis berbasis data, intonasi vokal yang persuasif, dan etika debat formal dalam pembelajaran Bahasa Indonesia.',
    url_youtube: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    video_id: 'fJ9rUzIMcZQ',
    mata_pelajaran: 'Bahasa Indonesia & Literasi Digital',
    kelas: 'XII SIJA',
    topik: 'Public Speaking & Retorika',
    thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
    tanggal: '2026-08-11',
    status: 'DISETUJUI',
    view: 190
  }
];

export const INITIAL_KARYA: KaryaGuru[] = [
  {
    id_karya: 'KRY-001',
    id_guru: 'GURU-001',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    judul_karya: 'Modul Ajar Kurikulum Merdeka: Pengembangan Web Berbasis Komponen React & API Google Sheets',
    deskripsi: 'Perangkat ajar lengkap 1 semester yang memuat Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), Modul Ajar (MA), Rubrik Asesmen Diagnostik & Formatif, serta Proyek Penguatan Profil Pelajar Pancasila (P5).',
    kategori: 'Modul Ajar',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1G_0123456789abcdefghijklmn/view',
    file_id: '1G_0123456789abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-01',
    status: 'DISETUJUI',
    featured: true,
    jumlah_view: 540
  },
  {
    id_karya: 'KRY-002',
    id_guru: 'GURU-002',
    nama_guru: 'Siti Rahmawati, S.Pd., M.Si.',
    judul_karya: 'E-Modul Interaktif Matematika Kontekstual Berbantuan Aplikasi GeoGebra Discovery',
    deskripsi: 'Karya inovasi pembelajaran matematika berbasis gamifikasi dan lembar interaktif yang meningkatkan pemahaman konsep geometri transformasi sebesar 42%.',
    kategori: 'E-Modul',
    mata_pelajaran: 'Matematika Terapan',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1H_1234567890abcdefghijklmn/view',
    file_id: '1H_1234567890abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-03',
    status: 'DISETUJUI',
    featured: true,
    jumlah_view: 412
  },
  {
    id_karya: 'KRY-003',
    id_guru: 'GURU-003',
    nama_guru: 'Ahmad Fauzi, M.Kom.',
    judul_karya: 'Best Practice: Implementasi Serverless Cloud Lab untuk Praktik Jaringan Komputer SMK',
    deskripsi: 'Laporan praktik baik (Best Practice) integrasi laboratorium jaringan virtual berbasis Proxmox VE dan Cloud Tunneling yang memungkinkan siswa praktik dari rumah 24/7.',
    kategori: 'Best Practice',
    mata_pelajaran: 'Teknik Komputer & Jaringan',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1I_2345678901abcdefghijklmn/view',
    file_id: '1I_2345678901abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-05',
    status: 'DISETUJUI',
    featured: true,
    jumlah_view: 380
  },
  {
    id_karya: 'KRY-004',
    id_guru: 'GURU-004',
    nama_guru: 'Dewi Lestari, S.Si., M.Pd.',
    judul_karya: 'Inovasi Pembelajaran STEM: Pembuatan Alat Peraga Pembangkit Listrik Tenaga Mikrohidro Sederhana',
    deskripsi: 'Projek kolaborasi IPAS dan Teknik Mesin menghasilkan prototipe generator mini ramah lingkungan dari bahan daur ulang untuk asesmen sumatif siswa.',
    kategori: 'Inovasi Pembelajaran',
    mata_pelajaran: 'Fisika Terapan & IPAS',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1J_3456789012abcdefghijklmn/view',
    file_id: '1J_3456789012abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-07',
    status: 'DISETUJUI',
    featured: false,
    jumlah_view: 290
  },
  {
    id_karya: 'KRY-005',
    id_guru: 'GURU-005',
    nama_guru: 'Hendra Kusuma, S.Pd.',
    judul_karya: 'Media Interaktif: Podcast Siniar Literasi Siswa "Suara Merdeka Edukasi"',
    deskripsi: 'Program rekaman podcast audio-visual siswa mengulas buku, novel sastra Indonesia, dan esai reflektif yang disiarkan di Spotify & YouTube Channel Sekolah.',
    kategori: 'Media Pembelajaran',
    mata_pelajaran: 'Bahasa Indonesia & Literasi Digital',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1K_4567890123abcdefghijklmn/view',
    file_id: '1K_4567890123abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-09',
    status: 'DISETUJUI',
    featured: false,
    jumlah_view: 235
  },
  {
    id_karya: 'KRY-006',
    id_guru: 'GURU-001',
    nama_guru: 'Budi Santoso, S.Kom., M.Pd.',
    judul_karya: 'LKPD Digital Pemrograman Berorientasi Objek (OOP) Java & Spring Boot',
    deskripsi: 'Lembar kerja digital interaktif dengan integrasi otomatis compiler online untuk latihan pembuatan class, inheritance, polymorphism, dan enkapsulasi.',
    kategori: 'LKPD',
    mata_pelajaran: 'Informatika & Rekayasa Perangkat Lunak',
    tahun: '2025/2026',
    url: 'https://drive.google.com/file/d/1L_5678901234abcdefghijklmn/view',
    file_id: '1L_5678901234abcdefghijklmn',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
    tanggal_upload: '2026-08-14',
    status: 'MENUNGGU VERIFIKASI',
    featured: false,
    jumlah_view: 45
  }
];

export const INITIAL_AKTIVITAS: AktivitasLog[] = [
  {
    id_aktivitas: 'ACT-001',
    email: 'rudi.harto63@admin.smk.belajar.id',
    nama: 'Drs. Rudi Hartono, M.T.',
    role: 'ADMIN',
    aktivitas: 'Inisialisasi Database',
    detail: 'Database Google Sheets 8 tabel dan folder Google Drive berhasil dibuat.',
    waktu: '2026-08-16 08:30',
    ip: '180.252.12.88'
  },
  {
    id_aktivitas: 'ACT-002',
    email: 'budi.santoso@guru.smk.belajar.id',
    nama: 'Budi Santoso, S.Kom., M.Pd.',
    role: 'GURU',
    aktivitas: 'Unggah Karya Baru',
    detail: 'Mengunggah LKPD Digital Pemrograman Berorientasi Objek (Status: Menunggu Verifikasi).',
    waktu: '2026-08-14 10:15',
    ip: '182.1.204.55'
  },
  {
    id_aktivitas: 'ACT-003',
    email: 'rudi.harto63@admin.smk.belajar.id',
    nama: 'Drs. Rudi Hartono, M.T.',
    role: 'ADMIN',
    aktivitas: 'Verifikasi Karya',
    detail: 'Menyetujui karya "Modul Ajar Kurikulum Merdeka React & GAS" oleh Budi Santoso.',
    waktu: '2026-08-13 14:00',
    ip: '180.252.12.88'
  },
  {
    id_aktivitas: 'ACT-004',
    email: 'ahmad.fauzi@guru.smk.belajar.id',
    nama: 'Ahmad Fauzi, M.Kom.',
    role: 'GURU',
    aktivitas: 'Tambah Video YouTube',
    detail: 'Menambahkan video pembelajaran MikroTik RouterOS Basics.',
    waktu: '2026-08-12 11:20',
    ip: '114.124.23.19'
  }
];

class DatabaseService {
  private usersKey = 'digital_lms_users';
  private guruKey = 'digital_lms_guru';
  private kelasKey = 'digital_lms_kelas';
  private materiKey = 'digital_lms_materi';
  private youtubeKey = 'digital_lms_youtube';
  private karyaKey = 'digital_lms_karya';
  private aktivitasKey = 'digital_lms_aktivitas';
  private settingsKey = 'digital_lms_settings';
  private bookmarksKey = 'digital_lms_bookmarks';

  constructor() {
    this.initDatabase();
  }

  public initDatabase(forceReset = false): void {
    const existingSettings = localStorage.getItem(this.settingsKey);
    const shouldReset = forceReset || !existingSettings || existingSettings.includes('SMK Negeri 1 Digital Edukasi');

    if (shouldReset) {
      localStorage.setItem(this.settingsKey, JSON.stringify(INITIAL_SETTINGS));
      localStorage.setItem(this.usersKey, JSON.stringify(INITIAL_USERS));
      localStorage.setItem(this.guruKey, JSON.stringify(INITIAL_GURU));
      localStorage.setItem(this.kelasKey, JSON.stringify(INITIAL_KELAS));
      localStorage.setItem(this.materiKey, JSON.stringify(INITIAL_MATERI));
      localStorage.setItem(this.youtubeKey, JSON.stringify(INITIAL_YOUTUBE));
      localStorage.setItem(this.karyaKey, JSON.stringify(INITIAL_KARYA));
      localStorage.setItem(this.aktivitasKey, JSON.stringify(INITIAL_AKTIVITAS));
      if (forceReset) {
        localStorage.removeItem(this.bookmarksKey);
      }
    }
  }

  // SETTINGS
  public getSettings(): AppSettings {
    const raw = localStorage.getItem(this.settingsKey);
    return raw ? JSON.parse(raw) : INITIAL_SETTINGS;
  }

  public saveSettings(settings: AppSettings, userEmail = 'admin@smk.sch.id', userName = 'Administrator'): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    this.logActivity(userEmail, userName, 'ADMIN', 'Update Pengaturan', 'Memperbarui konfigurasi identitas sekolah dan sistem.');
  }

  // USERS
  public getUsers(): User[] {
    const raw = localStorage.getItem(this.usersKey);
    return raw ? JSON.parse(raw) : [];
  }

  public saveUser(user: User, adminEmail = 'admin@smk.sch.id', adminName = 'Administrator'): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id_user === user.id_user);
    if (index >= 0) {
      users[index] = user;
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Update User', `Memperbarui akun user ${user.nama} (${user.email}).`);
    } else {
      users.unshift(user);
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Tambah User', `Menambahkan akun baru ${user.nama} (${user.role}).`);
    }
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  public deleteUser(userId: string, adminEmail = 'admin@smk.sch.id', adminName = 'Administrator'): void {
    const users = this.getUsers();
    const target = users.find(u => u.id_user === userId);
    const filtered = users.filter(u => u.id_user !== userId);
    localStorage.setItem(this.usersKey, JSON.stringify(filtered));
    if (target) {
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Hapus User', `Menghapus akun ${target.nama} (${target.email}).`);
    }
  }

  // GURU
  public getTeachers(): Guru[] {
    const raw = localStorage.getItem(this.guruKey);
    return raw ? JSON.parse(raw) : [];
  }

  public getTeacherByEmail(email: string): Guru | undefined {
    return this.getTeachers().find(g => g.email.toLowerCase() === email.toLowerCase());
  }

  public getTeacherById(id: string): Guru | undefined {
    return this.getTeachers().find(g => g.id_guru === id);
  }

  public saveTeacher(guru: Guru, actorEmail = 'admin@smk.sch.id', actorName = 'Administrator', actorRole = 'ADMIN'): void {
    const teachers = this.getTeachers();
    const index = teachers.findIndex(g => g.id_guru === guru.id_guru);
    if (index >= 0) {
      teachers[index] = guru;
      this.logActivity(actorEmail, actorName, actorRole, 'Update Data Guru', `Memperbarui profil guru ${guru.nama_guru}.`);
    } else {
      teachers.unshift(guru);
      this.logActivity(actorEmail, actorName, actorRole, 'Tambah Guru', `Menambahkan data guru baru: ${guru.nama_guru}.`);
    }
    localStorage.setItem(this.guruKey, JSON.stringify(teachers));
  }

  // KELAS
  public getKelas(): Kelas[] {
    const raw = localStorage.getItem(this.kelasKey);
    return raw ? JSON.parse(raw) : [];
  }

  public saveKelas(kelas: Kelas, actorEmail = 'admin@smk.sch.id', actorName = 'Administrator'): void {
    const list = this.getKelas();
    const index = list.findIndex(k => k.id_kelas === kelas.id_kelas);
    if (index >= 0) {
      list[index] = kelas;
      this.logActivity(actorEmail, actorName, 'ADMIN', 'Update Kelas', `Memperbarui data kelas ${kelas.nama_kelas}.`);
    } else {
      list.push(kelas);
      this.logActivity(actorEmail, actorName, 'ADMIN', 'Tambah Kelas', `Menambahkan kelas baru ${kelas.nama_kelas}.`);
    }
    localStorage.setItem(this.kelasKey, JSON.stringify(list));
  }

  public deleteKelas(kelasId: string, actorEmail = 'admin@smk.sch.id', actorName = 'Administrator'): void {
    const list = this.getKelas();
    const target = list.find(k => k.id_kelas === kelasId);
    const filtered = list.filter(k => k.id_kelas !== kelasId);
    localStorage.setItem(this.kelasKey, JSON.stringify(filtered));
    if (target) {
      this.logActivity(actorEmail, actorName, 'ADMIN', 'Hapus Kelas', `Menghapus kelas ${target.nama_kelas}.`);
    }
  }

  // MATERI
  public getMateri(): Materi[] {
    const raw = localStorage.getItem(this.materiKey);
    return raw ? JSON.parse(raw) : [];
  }

  public getMateriById(id: string): Materi | undefined {
    return this.getMateri().find(m => m.id_materi === id);
  }

  public saveMateri(materi: Materi, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getMateri();
    const index = list.findIndex(m => m.id_materi === materi.id_materi);
    if (index >= 0) {
      list[index] = materi;
      this.logActivity(actorEmail, actorName, actorRole, 'Update Materi', `Memperbarui materi "${materi.judul}".`);
    } else {
      list.unshift(materi);
      this.logActivity(actorEmail, actorName, actorRole, 'Tambah Materi', `Menambahkan materi baru "${materi.judul}" (${materi.mata_pelajaran}).`);
    }
    localStorage.setItem(this.materiKey, JSON.stringify(list));
  }

  public deleteMateri(id: string, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getMateri();
    const target = list.find(m => m.id_materi === id);
    const filtered = list.filter(m => m.id_materi !== id);
    localStorage.setItem(this.materiKey, JSON.stringify(filtered));
    if (target) {
      this.logActivity(actorEmail, actorName, actorRole, 'Hapus Materi', `Menghapus materi "${target.judul}".`);
    }
  }

  public incrementMateriView(id: string): void {
    const list = this.getMateri();
    const target = list.find(m => m.id_materi === id);
    if (target) {
      target.jumlah_view = (target.jumlah_view || 0) + 1;
      localStorage.setItem(this.materiKey, JSON.stringify(list));
    }
  }

  // YOUTUBE
  public getYoutubeVideos(): YoutubeVideo[] {
    const raw = localStorage.getItem(this.youtubeKey);
    return raw ? JSON.parse(raw) : [];
  }

  public saveYoutubeVideo(video: YoutubeVideo, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getYoutubeVideos();
    const index = list.findIndex(v => v.id_video === video.id_video);
    if (index >= 0) {
      list[index] = video;
      this.logActivity(actorEmail, actorName, actorRole, 'Update Video YouTube', `Memperbarui video "${video.judul}".`);
    } else {
      list.unshift(video);
      this.logActivity(actorEmail, actorName, actorRole, 'Tambah Video YouTube', `Menambahkan video pembelajaran "${video.judul}".`);
    }
    localStorage.setItem(this.youtubeKey, JSON.stringify(list));
  }

  public deleteYoutubeVideo(id: string, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getYoutubeVideos();
    const target = list.find(v => v.id_video === id);
    const filtered = list.filter(v => v.id_video !== id);
    localStorage.setItem(this.youtubeKey, JSON.stringify(filtered));
    if (target) {
      this.logActivity(actorEmail, actorName, actorRole, 'Hapus Video YouTube', `Menghapus video "${target.judul}".`);
    }
  }

  public incrementVideoView(id: string): void {
    const list = this.getYoutubeVideos();
    const target = list.find(v => v.id_video === id);
    if (target) {
      target.view = (target.view || 0) + 1;
      localStorage.setItem(this.youtubeKey, JSON.stringify(list));
    }
  }

  // KARYA GURU
  public getKaryaGuru(): KaryaGuru[] {
    const raw = localStorage.getItem(this.karyaKey);
    return raw ? JSON.parse(raw) : [];
  }

  public saveKaryaGuru(karya: KaryaGuru, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getKaryaGuru();
    const index = list.findIndex(k => k.id_karya === karya.id_karya);
    if (index >= 0) {
      list[index] = karya;
      this.logActivity(actorEmail, actorName, actorRole, 'Update Karya Guru', `Memperbarui karya "${karya.judul_karya}".`);
    } else {
      list.unshift(karya);
      this.logActivity(actorEmail, actorName, actorRole, 'Kirim Karya Guru', `Mengirim karya baru "${karya.judul_karya}" (Status: ${karya.status}).`);
    }
    localStorage.setItem(this.karyaKey, JSON.stringify(list));
  }

  public deleteKaryaGuru(id: string, actorEmail = 'system', actorName = 'User', actorRole = 'GURU'): void {
    const list = this.getKaryaGuru();
    const target = list.find(k => k.id_karya === id);
    const filtered = list.filter(k => k.id_karya !== id);
    localStorage.setItem(this.karyaKey, JSON.stringify(filtered));
    if (target) {
      this.logActivity(actorEmail, actorName, actorRole, 'Hapus Karya Guru', `Menghapus karya "${target.judul_karya}".`);
    }
  }

  public approveKarya(id: string, adminEmail = 'admin@smk.sch.id', adminName = 'Administrator', isFeatured = false): void {
    const list = this.getKaryaGuru();
    const target = list.find(k => k.id_karya === id);
    if (target) {
      target.status = 'DISETUJUI';
      target.featured = isFeatured;
      delete target.alasan_penolakan;
      localStorage.setItem(this.karyaKey, JSON.stringify(list));
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Verifikasi Karya - Disetujui', `Menyetujui karya "${target.judul_karya}" oleh ${target.nama_guru}.`);
    }
  }

  public rejectKarya(id: string, alasan: string, adminEmail = 'admin@smk.sch.id', adminName = 'Administrator'): void {
    const list = this.getKaryaGuru();
    const target = list.find(k => k.id_karya === id);
    if (target) {
      target.status = 'DITOLAK';
      target.alasan_penolakan = alasan;
      localStorage.setItem(this.karyaKey, JSON.stringify(list));
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Verifikasi Karya - Ditolak', `Menolak karya "${target.judul_karya}" dengan alasan: ${alasan}.`);
    }
  }

  public toggleFeaturedKarya(id: string, adminEmail = 'admin@smk.sch.id', adminName = 'Administrator'): void {
    const list = this.getKaryaGuru();
    const target = list.find(k => k.id_karya === id);
    if (target) {
      target.featured = !target.featured;
      localStorage.setItem(this.karyaKey, JSON.stringify(list));
      this.logActivity(adminEmail, adminName, 'ADMIN', 'Update Status Featured', `Mengubah status featured karya "${target.judul_karya}" menjadi ${target.featured ? 'Unggulan' : 'Standar'}.`);
    }
  }

  public incrementKaryaView(id: string): void {
    const list = this.getKaryaGuru();
    const target = list.find(k => k.id_karya === id);
    if (target) {
      target.jumlah_view = (target.jumlah_view || 0) + 1;
      localStorage.setItem(this.karyaKey, JSON.stringify(list));
    }
  }

  // BOOKMARKS
  public getBookmarks(): string[] {
    const raw = localStorage.getItem(this.bookmarksKey);
    return raw ? JSON.parse(raw) : [];
  }

  public toggleBookmark(id: string): boolean {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(id);
    let isBookmarked = false;
    if (index >= 0) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(id);
      isBookmarked = true;
    }
    localStorage.setItem(this.bookmarksKey, JSON.stringify(bookmarks));
    return isBookmarked;
  }

  // AKTIVITAS
  public getAktivitas(): AktivitasLog[] {
    const raw = localStorage.getItem(this.aktivitasKey);
    return raw ? JSON.parse(raw) : [];
  }

  public logActivity(email: string, nama: string, role: string, aktivitas: string, detail: string): void {
    const list = this.getAktivitas();
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog: AktivitasLog = {
      id_aktivitas: `ACT-${Date.now().toString().slice(-6)}`,
      email,
      nama,
      role,
      aktivitas,
      detail,
      waktu: formatted,
      ip: '180.252.12.88'
    };
    list.unshift(newLog);
    if (list.length > 100) list.pop();
    localStorage.setItem(this.aktivitasKey, JSON.stringify(list));
  }

  // STATISTIK & METRICS
  public getGlobalStats() {
    const teachers = this.getTeachers();
    const materi = this.getMateri();
    const youtube = this.getYoutubeVideos();
    const karya = this.getKaryaGuru();
    const users = this.getUsers();
    const kelas = this.getKelas();

    const totalViewsMateri = materi.reduce((acc, m) => acc + (m.jumlah_view || 0), 0);
    const totalViewsVideo = youtube.reduce((acc, v) => acc + (v.view || 0), 0);
    const totalViewsKarya = karya.reduce((acc, k) => acc + (k.jumlah_view || 0), 0);
    const totalViews = totalViewsMateri + totalViewsVideo + totalViewsKarya;

    const pendingKarya = karya.filter(k => k.status === 'MENUNGGU VERIFIKASI').length;
    const approvedKarya = karya.filter(k => k.status === 'DISETUJUI').length;
    const featuredKarya = karya.filter(k => k.featured).length;

    // Materi by mapel
    const mapelCount: Record<string, number> = {};
    materi.forEach(m => {
      mapelCount[m.mata_pelajaran] = (mapelCount[m.mata_pelajaran] || 0) + 1;
    });

    // Karya by kategori
    const kategoriCount: Record<string, number> = {};
    karya.forEach(k => {
      kategoriCount[k.kategori] = (kategoriCount[k.kategori] || 0) + 1;
    });

    // Jenis materi count
    const jenisMateriCount: Record<string, number> = {};
    materi.forEach(m => {
      jenisMateriCount[m.jenis_materi] = (jenisMateriCount[m.jenis_materi] || 0) + 1;
    });

    return {
      totalTeachers: teachers.length,
      totalUsers: users.length,
      totalKelas: kelas.length,
      totalMateri: materi.length,
      totalYoutube: youtube.length,
      totalKarya: karya.length,
      totalViews,
      pendingKarya,
      approvedKarya,
      featuredKarya,
      mapelCount,
      kategoriCount,
      jenisMateriCount
    };
  }

  public getTeacherStats(teacherId: string, teacherEmail: string) {
    const allMateri = this.getMateri().filter(m => m.id_guru === teacherId || m.nama_guru.includes(teacherId));
    const allYoutube = this.getYoutubeVideos().filter(v => v.id_guru === teacherId || v.nama_guru.includes(teacherId));
    const allKarya = this.getKaryaGuru().filter(k => k.id_guru === teacherId || k.nama_guru.includes(teacherId));

    const totalViews = 
      allMateri.reduce((sum, m) => sum + (m.jumlah_view || 0), 0) +
      allYoutube.reduce((sum, v) => sum + (v.view || 0), 0) +
      allKarya.reduce((sum, k) => sum + (k.jumlah_view || 0), 0);

    const pendingKarya = allKarya.filter(k => k.status === 'MENUNGGU VERIFIKASI').length;
    const approvedKarya = allKarya.filter(k => k.status === 'DISETUJUI').length;

    return {
      totalMateri: allMateri.length,
      totalYoutube: allYoutube.length,
      totalKarya: allKarya.length,
      totalViews,
      pendingKarya,
      approvedKarya,
      materiList: allMateri,
      youtubeList: allYoutube,
      karyaList: allKarya
    };
  }

  // EXPORT / IMPORT / RESET
  public exportFullDatabaseJSON(): string {
    const payload = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      settings: this.getSettings(),
      users: this.getUsers(),
      guru: this.getTeachers(),
      kelas: this.getKelas(),
      materi: this.getMateri(),
      youtube: this.getYoutubeVideos(),
      karya: this.getKaryaGuru(),
      aktivitas: this.getAktivitas()
    };
    return JSON.stringify(payload, null, 2);
  }

  public importDatabaseJSON(jsonStr: string, adminEmail: string, adminName: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.settings) localStorage.setItem(this.settingsKey, JSON.stringify(data.settings));
      if (data.users) localStorage.setItem(this.usersKey, JSON.stringify(data.users));
      if (data.guru) localStorage.setItem(this.guruKey, JSON.stringify(data.guru));
      if (data.kelas) localStorage.setItem(this.kelasKey, JSON.stringify(data.kelas));
      if (data.materi) localStorage.setItem(this.materiKey, JSON.stringify(data.materi));
      if (data.youtube) localStorage.setItem(this.youtubeKey, JSON.stringify(data.youtube));
      if (data.karya) localStorage.setItem(this.karyaKey, JSON.stringify(data.karya));
      if (data.aktivitas) localStorage.setItem(this.aktivitasKey, JSON.stringify(data.aktivitas));

      this.logActivity(adminEmail, adminName, 'ADMIN', 'Restore Database', 'Berhasil memulihkan database dari file cadangan.');
      return true;
    } catch (e) {
      console.error('Failed to import DB', e);
      return false;
    }
  }

  // ALIASES & COMPATIBILITY HELPERS
  public getCurrentUser(): User | null {
    const raw = localStorage.getItem('digital_lms_active_user');
    return raw ? JSON.parse(raw) : null;
  }

  public login(user: User): void {
    localStorage.setItem('digital_lms_active_user', JSON.stringify(user));
    this.logActivity(user.email, user.nama, user.role, 'Login Pengguna', `Pengguna ${user.nama} berhasil masuk sistem.`);
  }

  public logout(): void {
    const active = this.getCurrentUser();
    if (active) {
      this.logActivity(active.email, active.nama, active.role, 'Logout Pengguna', `Pengguna ${active.nama} keluar dari sistem.`);
    }
    localStorage.removeItem('digital_lms_active_user');
  }

  public getGuruList(): Guru[] {
    return this.getTeachers();
  }

  public getKelasList(): Kelas[] {
    return this.getKelas();
  }

  public getActivityLogs(): AktivitasLog[] {
    return this.getAktivitas();
  }

  public addGuru(guru: Guru): void {
    const admin = this.getCurrentUser();
    this.saveTeacher(guru, admin?.email || 'admin@smk.sch.id', admin?.nama || 'Administrator', 'ADMIN');
  }

  public addKelas(kelas: Kelas): void {
    const admin = this.getCurrentUser();
    this.saveKelas(kelas, admin?.email || 'admin@smk.sch.id', admin?.nama || 'Administrator');
  }

  public updateKaryaStatus(id: string, status: StatusKonten, alasan?: string): void {
    const admin = this.getCurrentUser();
    if (status === 'DISETUJUI') {
      this.approveKarya(id, admin?.email || 'admin@smk.sch.id', admin?.nama || 'Administrator');
    } else if (status === 'DITOLAK') {
      this.rejectKarya(id, alasan || 'Karya belum memenuhi standar kurikulum', admin?.email || 'admin@smk.sch.id', admin?.nama || 'Administrator');
    }
  }

  public seedInitialData(): void {
    this.initDatabase(true);
  }

  public exportAllDataJson(): string {
    return this.exportFullDatabaseJSON();
  }
}

export const db = new DatabaseService();

