export interface GasFile {
  name: string;
  type: 'server' | 'html' | 'json';
  description: string;
  content: string;
}

export const GAS_FILES: GasFile[] = [
  {
    name: 'Code.gs',
    type: 'server',
    description: 'Entry point Web App Google Apps Script (doGet, routing API, XFrameOptionsMode for Blogger embedding)',
    content: `/**
 * DIGITAL LMS GURU - BACKEND GOOGLE APPS SCRIPT
 * Platform Pembelajaran Digital untuk Guru SMA/MA/SMK
 * @license Apache-2.0
 */

// Global Sheet Names
var SHEETS = {
  USERS: 'USERS',
  GURU: 'GURU',
  KELAS: 'KELAS',
  MATERI: 'MATERI',
  YOUTUBE: 'YOUTUBE',
  KARYA_GURU: 'KARYA_GURU',
  AKTIVITAS: 'AKTIVITAS',
  SETTING: 'SETTING'
};

/**
 * Handle HTTP GET Request
 * Mendukung serve HTML Web App & API JSON endpoint
 */
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : null;
  
  // Jika ada parameter action, layani sebagai API JSON
  if (action) {
    return handleApiRequest(e);
  }
  
  // Layani Frontend Web App
  var template = HtmlService.createTemplateFromFile('Index');
  var user = getCurrentUser();
  template.initialUser = JSON.stringify(user);
  
  return template.evaluate()
    .setTitle('Digital LMS Guru - Satu Platform Pembelajaran')
    .setFaviconUrl('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=32')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // PENTING: Untuk embedding di Blogger & iframe
}

/**
 * Include helper untuk modular HTML files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * API Router untuk request AJAX / REST
 */
function handleApiRequest(e) {
  var action = e.parameter.action;
  var response = { success: false, data: null, error: null };
  
  try {
    switch(action) {
      case 'getDashboardData':
        response.data = getDashboardData();
        response.success = true;
        break;
      case 'getMateri':
        response.data = getMateri(e.parameter);
        response.success = true;
        break;
      case 'getYoutubeVideos':
        response.data = getYoutubeVideos(e.parameter);
        response.success = true;
        break;
      case 'getKaryaGuru':
        response.data = getKaryaGuru(e.parameter);
        response.success = true;
        break;
      case 'getTeachers':
        response.data = getTeachers();
        response.success = true;
        break;
      case 'getSettings':
        response.data = getSettings();
        response.success = true;
        break;
      default:
        response.error = 'Aksi tidak dikenali: ' + action;
    }
  } catch (err) {
    response.error = err.toString();
    Logger.log('API Error: ' + err.toString());
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
`
  },
  {
    name: 'Auth.gs',
    type: 'server',
    description: 'Sistem Autentikasi akun Google (@belajar.id / Gmail) dan Server-side Authorization Role Admin/Guru',
    content: `/**
 * AUTHENTICATION & AUTHORIZATION ENGINE
 */

/**
 * Mendapatkan identitas user aktif dari akun Google login
 */
function getCurrentUser() {
  var email = Session.getActiveUser().getEmail();
  
  // Jika anonymous / iframe tanpa email direct, ambil fallback dari spreadsheet USERS
  if (!email) {
    return {
      email: '',
      nama: 'Tamu / Pengunjung',
      role: 'PUBLIC',
      isLoggedIn: false
    };
  }
  
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.USERS);
  var users = getSheetDataAsObjects(sheet);
  
  var matched = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].EMAIL && users[i].EMAIL.toLowerCase() === email.toLowerCase()) {
      matched = users[i];
      break;
    }
  }
  
  // Cek apakah email adalah Master Admin dari Settings
  var settings = getSettings();
  var isAdmin = (settings.admin_email && settings.admin_email.toLowerCase() === email.toLowerCase()) || 
                (matched && matched.ROLE === 'ADMIN');
                
  if (!matched) {
    // Daftarkan otomatis sebagai guru baru
    var newUser = {
      ID_USER: 'USR-' + Utilities.getUuid().slice(0, 8),
      EMAIL: email,
      NAMA: email.split('@')[0].replace('.', ' ').toUpperCase(),
      NIP: '-',
      ROLE: isAdmin ? 'ADMIN' : 'GURU',
      MATA_PELAJARAN: 'Umum',
      SEKOLAH: settings.school_name || 'SMK/SMA',
      FOTO: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      STATUS: 'AKTIF',
      TANGGAL_DAFTAR: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      LAST_LOGIN: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm')
    };
    appendObjectToSheet(sheet, newUser);
    matched = newUser;
  }
  
  return {
    id_user: matched.ID_USER,
    email: matched.EMAIL,
    nama: matched.NAMA,
    nip: matched.NIP,
    role: isAdmin ? 'ADMIN' : (matched.ROLE || 'GURU'),
    mata_pelajaran: matched.MATA_PELAJARAN,
    sekolah: matched.SEKOLAH,
    foto: matched.FOTO,
    isLoggedIn: true
  };
}

/**
 * Server-side Authorization Checker
 * Mencegah eksploitasi parameter dari frontend
 */
function requireAdmin() {
  var user = getCurrentUser();
  if (user.role !== 'ADMIN') {
    throw new Error('Akses Ditolak! Anda harus memiliki hak akses ADMINISTRATOR.');
  }
  return user;
}

function requireTeacherOrAdmin() {
  var user = getCurrentUser();
  if (user.role !== 'ADMIN' && user.role !== 'GURU') {
    throw new Error('Akses Ditolak! Anda harus login sebagai Guru atau Admin.');
  }
  return user;
}
`
  },
  {
    name: 'Database.gs',
    type: 'server',
    description: 'Manajemen Spreadsheet Database Otomatis, Batch Read/Write, LockService',
    content: `/**
 * DATABASE GOOGLE SHEETS CORE ENGINE
 */

var SPREADSHEET_PROP_KEY = 'DIGITAL_LMS_SPREADSHEET_ID';

/**
 * Mendapatkan referensi Spreadsheet Database aktif
 */
function getSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var ssId = props.getProperty(SPREADSHEET_PROP_KEY);
  
  if (ssId) {
    try {
      return SpreadsheetApp.openById(ssId);
    } catch (e) {
      Logger.log('Spreadsheet ID lama tidak ditemukan, membuat baru...');
    }
  }
  
  // Buat otomatis jika belum tersedia
  return setupApplication();
}

/**
 * Konversi Sheet menjadi Array of Objects (Optimized Batch Reading)
 */
function getSheetDataAsObjects(sheet) {
  if (!sheet) return [];
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  
  if (lastRow < 2 || lastCol < 1) return [];
  
  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];
  var results = [];
  
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var obj = {};
    var hasData = false;
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c].toString().trim();
      if (key) {
        obj[key] = row[c];
        if (row[c] !== '' && row[c] !== null) hasData = true;
      }
    }
    if (hasData) results.push(obj);
  }
  return results;
}

/**
 * Menambahkan 1 baris objek ke Sheet
 */
function appendObjectToSheet(sheet, obj) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = [];
    for (var i = 0; i < headers.length; i++) {
      var key = headers[i].toString().trim();
      row.push(obj[key] !== undefined ? obj[key] : '');
    }
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Update Baris berdasarkan Key ID
 */
function updateObjectInSheet(sheet, idColumnName, idValue, updateObj) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return false;
    
    var headers = data[0];
    var idColIndex = headers.indexOf(idColumnName);
    if (idColIndex === -1) return false;
    
    for (var r = 1; r < data.length; r++) {
      if (data[r][idColIndex] == idValue) {
        for (var c = 0; c < headers.length; c++) {
          var key = headers[c].toString().trim();
          if (updateObj[key] !== undefined) {
            sheet.getRange(r + 1, c + 1).setValue(updateObj[key]);
          }
        }
        return true;
      }
    }
    return false;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Hapus Baris berdasarkan Key ID
 */
function deleteRowInSheet(sheet, idColumnName, idValue) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return false;
    
    var headers = data[0];
    var idColIndex = headers.indexOf(idColumnName);
    if (idColIndex === -1) return false;
    
    for (var r = 1; r < data.length; r++) {
      if (data[r][idColIndex] == idValue) {
        sheet.deleteRow(r + 1);
        return true;
      }
    }
    return false;
  } finally {
    lock.releaseLock();
  }
}
`
  },
  {
    name: 'Drive.gs',
    type: 'server',
    description: 'Integrasi Google Drive, pembuatan Master Folder & Sub-Folder Otomatis, Upload File Handler',
    content: `/**
 * GOOGLE DRIVE STORAGE INTEGRATION
 */

/**
 * Inisialisasi Master Folder dan Sub-folder Digital LMS
 */
function initializeFolders() {
  var masterFolderName = 'Digital LMS - Repositori Guru';
  var folders = DriveApp.getFoldersByName(masterFolderName);
  var masterFolder = null;
  
  if (folders.hasNext()) {
    masterFolder = folders.next();
  } else {
    masterFolder = DriveApp.createFolder(masterFolderName);
  }
  
  var subFolders = ['Materi', 'Video', 'Karya Guru', 'Foto Guru', 'Dokumen'];
  var folderMap = { MASTER_ID: masterFolder.getId() };
  
  subFolders.forEach(function(subName) {
    var subs = masterFolder.getFoldersByName(subName);
    if (subs.hasNext()) {
      folderMap[subName] = subs.next().getId();
    } else {
      var newSub = masterFolder.createFolder(subName);
      folderMap[subName] = newSub.getId();
    }
  });
  
  // Simpan folder ID ke Sheet Settings
  saveSetting('drive_master_folder', masterFolder.getId());
  return folderMap;
}

/**
 * Upload file base64 ke Google Drive
 */
function uploadToDrive(base64Data, fileName, mimeType, subFolderType) {
  requireTeacherOrAdmin();
  
  var folderMap = initializeFolders();
  var targetFolderId = folderMap[subFolderType] || folderMap['Materi'] || folderMap.MASTER_ID;
  var folder = DriveApp.getFolderById(targetFolderId);
  
  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var file = folder.createFile(blob);
  
  // Set permission agar dapat dilihat publik
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  return {
    fileId: file.getId(),
    fileName: file.getName(),
    url: file.getUrl(),
    downloadUrl: file.getDownloadUrl(),
    viewUrl: 'https://drive.google.com/file/d/' + file.getId() + '/view'
  };
}
`
  },
  {
    name: 'Materi.gs',
    type: 'server',
    description: 'CRUD Modul Materi Pembelajaran, Google Drive file link, dan View Counter',
    content: `/**
 * MODUL PENGELOLAAN MATERI PEMBELAJARAN
 */

function getMateri(filters) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.MATERI);
  var list = getSheetDataAsObjects(sheet);
  
  // Filter status aktif/disetujui untuk publik
  var user = getCurrentUser();
  if (user.role === 'PUBLIC') {
    list = list.filter(function(m) { return m.STATUS === 'DISETUJUI'; });
  }
  
  return list;
}

function saveMateri(materiObj) {
  var user = requireTeacherOrAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.MATERI);
  
  var isNew = !materiObj.ID_MATERI;
  var id = materiObj.ID_MATERI || ('MAT-' + Utilities.getUuid().slice(0, 8));
  
  var payload = {
    ID_MATERI: id,
    ID_GURU: materiObj.ID_GURU || user.id_user,
    NAMA_GURU: materiObj.NAMA_GURU || user.nama,
    JUDUL: materiObj.JUDUL,
    DESKRIPSI: materiObj.DESKRIPSI,
    MATA_PELAJARAN: materiObj.MATA_PELAJARAN,
    KELAS: materiObj.KELAS,
    TOPIK: materiObj.TOPIK,
    JENIS_MATERI: materiObj.JENIS_MATERI,
    SUMBER: materiObj.SUMBER,
    URL: materiObj.URL,
    FILE_ID: materiObj.FILE_ID || '',
    THUMBNAIL: materiObj.THUMBNAIL || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500',
    TANGGAL_UPLOAD: materiObj.TANGGAL_UPLOAD || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    STATUS: user.role === 'ADMIN' ? 'DISETUJUI' : (materiObj.STATUS || 'DISETUJUI'),
    JUMLAH_VIEW: Number(materiObj.JUMLAH_VIEW) || 0
  };
  
  if (isNew) {
    appendObjectToSheet(sheet, payload);
    logActivity(user.email, user.nama, user.role, 'Tambah Materi', 'Materi baru: ' + payload.JUDUL);
  } else {
    updateObjectInSheet(sheet, 'ID_MATERI', id, payload);
    logActivity(user.email, user.nama, user.role, 'Update Materi', 'Memperbarui materi: ' + payload.JUDUL);
  }
  
  return payload;
}

function deleteMateri(idMateri) {
  var user = requireTeacherOrAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.MATERI);
  
  deleteRowInSheet(sheet, 'ID_MATERI', idMateri);
  logActivity(user.email, user.nama, user.role, 'Hapus Materi', 'Menghapus ID: ' + idMateri);
  return { success: true };
}
`
  },
  {
    name: 'Youtube.gs',
    type: 'server',
    description: 'Ekstraksi Otomatis YouTube Video ID, Thumbnail generator, dan Player Embedding',
    content: `/**
 * MODUL VIDEO PEMBELAJARAN YOUTUBE
 */

function extractYoutubeId(url) {
  if (!url) return '';
  var regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
  var match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function getYoutubeVideos() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.YOUTUBE);
  return getSheetDataAsObjects(sheet);
}

function saveYoutubeVideo(videoObj) {
  var user = requireTeacherOrAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.YOUTUBE);
  
  var videoId = extractYoutubeId(videoObj.URL_YOUTUBE);
  if (!videoId) throw new Error('URL YouTube tidak valid! Harap masukkan link video yang benar.');
  
  var isNew = !videoObj.ID_VIDEO;
  var id = videoObj.ID_VIDEO || ('VID-' + Utilities.getUuid().slice(0, 8));
  
  var payload = {
    ID_VIDEO: id,
    ID_GURU: videoObj.ID_GURU || user.id_user,
    JUDUL: videoObj.JUDUL,
    DESKRIPSI: videoObj.DESKRIPSI,
    URL_YOUTUBE: videoObj.URL_YOUTUBE,
    VIDEO_ID: videoId,
    MATA_PELAJARAN: videoObj.MATA_PELAJARAN,
    KELAS: videoObj.KELAS,
    TOPIK: videoObj.TOPIK,
    THUMBNAIL: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg',
    TANGGAL: videoObj.TANGGAL || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    STATUS: 'DISETUJUI',
    VIEW: Number(videoObj.VIEW) || 0
  };
  
  if (isNew) {
    appendObjectToSheet(sheet, payload);
    logActivity(user.email, user.nama, user.role, 'Tambah Video YouTube', 'Video baru: ' + payload.JUDUL);
  } else {
    updateObjectInSheet(sheet, 'ID_VIDEO', id, payload);
    logActivity(user.email, user.nama, user.role, 'Update Video YouTube', 'Memperbarui video: ' + payload.JUDUL);
  }
  
  return payload;
}

function deleteYoutubeVideo(idVideo) {
  var user = requireTeacherOrAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.YOUTUBE);
  deleteRowInSheet(sheet, 'ID_VIDEO', idVideo);
  logActivity(user.email, user.nama, user.role, 'Hapus Video YouTube', 'Menghapus video ID: ' + idVideo);
  return { success: true };
}
`
  },
  {
    name: 'KaryaGuru.gs',
    type: 'server',
    description: 'Galeri Karya Guru, Alur Moderasi (Draft/Pending/Disetujui/Ditolak), dan Status Featured',
    content: `/**
 * MODUL GALERI & REPOSITORI KARYA GURU
 */

function getKaryaGuru() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.KARYA_GURU);
  return getSheetDataAsObjects(sheet);
}

function saveKaryaGuru(karyaObj) {
  var user = requireTeacherOrAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.KARYA_GURU);
  
  var isNew = !karyaObj.ID_KARYA;
  var id = karyaObj.ID_KARYA || ('KRY-' + Utilities.getUuid().slice(0, 8));
  var initialStatus = user.role === 'ADMIN' ? 'DISETUJUI' : 'MENUNGGU VERIFIKASI';
  
  var payload = {
    ID_KARYA: id,
    ID_GURU: karyaObj.ID_GURU || user.id_user,
    NAMA_GURU: karyaObj.NAMA_GURU || user.nama,
    JUDUL_KARYA: karyaObj.JUDUL_KARYA,
    DESKRIPSI: karyaObj.DESKRIPSI,
    KATEGORI: karyaObj.KATEGORI,
    MATA_PELAJARAN: karyaObj.MATA_PELAJARAN,
    TAHUN: karyaObj.TAHUN || '2025/2026',
    URL: karyaObj.URL,
    FILE_ID: karyaObj.FILE_ID || '',
    THUMBNAIL: karyaObj.THUMBNAIL || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
    TANGGAL_UPLOAD: karyaObj.TANGGAL_UPLOAD || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    STATUS: karyaObj.STATUS || initialStatus,
    FEATURED: karyaObj.FEATURED ? 'TRUE' : 'FALSE',
    JUMLAH_VIEW: Number(karyaObj.JUMLAH_VIEW) || 0
  };
  
  if (isNew) {
    appendObjectToSheet(sheet, payload);
    logActivity(user.email, user.nama, user.role, 'Unggah Karya Guru', 'Karya baru: ' + payload.JUDUL_KARYA + ' (Status: ' + payload.STATUS + ')');
  } else {
    updateObjectInSheet(sheet, 'ID_KARYA', id, payload);
    logActivity(user.email, user.nama, user.role, 'Update Karya Guru', 'Memperbarui karya: ' + payload.JUDUL_KARYA);
  }
  
  return payload;
}

function approveKarya(idKarya, isFeatured) {
  var admin = requireAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.KARYA_GURU);
  
  updateObjectInSheet(sheet, 'ID_KARYA', idKarya, {
    STATUS: 'DISETUJUI',
    FEATURED: isFeatured ? 'TRUE' : 'FALSE'
  });
  
  logActivity(admin.email, admin.nama, 'ADMIN', 'Moderasi Karya - Disetujui', 'Menyetujui ID: ' + idKarya);
  return { success: true };
}

function rejectKarya(idKarya, alasan) {
  var admin = requireAdmin();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.KARYA_GURU);
  
  updateObjectInSheet(sheet, 'ID_KARYA', idKarya, {
    STATUS: 'DITOLAK',
    ALASAN_PENOLAKAN: alasan
  });
  
  logActivity(admin.email, admin.nama, 'ADMIN', 'Moderasi Karya - Ditolak', 'Menolak ID ' + idKarya + '. Alasan: ' + alasan);
  return { success: true };
}
`
  },
  {
    name: 'Admin.gs',
    type: 'server',
    description: 'Dashboard Analytics, Aktivitas Audit Log, Settings, Setup Otomatis, dan Demo Data Generator',
    content: `/**
 * MODUL ADMINISTRATOR, SETUP OTOMATIS & AUDIT LOG
 */

function setupApplication() {
  var props = PropertiesService.getScriptProperties();
  var ssId = props.getProperty(SPREADSHEET_PROP_KEY);
  var ss;
  
  if (ssId) {
    try {
      ss = SpreadsheetApp.openById(ssId);
    } catch (e) {}
  }
  
  if (!ss) {
    ss = SpreadsheetApp.create('Digital LMS Guru - Database Spreadsheet');
    props.setProperty(SPREADSHEET_PROP_KEY, ss.getId());
  }
  
  // Definisi Skema Tabel Lengkap
  var schemas = {
    USERS: ['ID_USER', 'USERNAME', 'PASSWORD', 'EMAIL', 'NAMA', 'NIP', 'ROLE', 'STATUS', 'MATA_PELAJARAN', 'SEKOLAH', 'FOTO', 'TANGGAL_DAFTAR', 'LAST_LOGIN'],
    GURU: ['ID_GURU', 'EMAIL', 'NAMA_GURU', 'NIP', 'GELAR', 'MATA_PELAJARAN', 'JURUSAN', 'KELAS', 'FOTO', 'BIOGRAFI', 'KEAHLIAN', 'KONTAK', 'STATUS'],
    KELAS: ['ID_KELAS', 'NAMA_KELAS', 'TINGKAT', 'JURUSAN', 'TAHUN_AJARAN', 'WALI_KELAS', 'STATUS'],
    MATERI: ['ID_MATERI', 'ID_GURU', 'NAMA_GURU', 'JUDUL', 'DESKRIPSI', 'MATA_PELAJARAN', 'KELAS', 'TOPIK', 'JENIS_MATERI', 'SUMBER', 'URL', 'FILE_ID', 'THUMBNAIL', 'TANGGAL_UPLOAD', 'STATUS', 'JUMLAH_VIEW'],
    YOUTUBE: ['ID_VIDEO', 'ID_GURU', 'JUDUL', 'DESKRIPSI', 'URL_YOUTUBE', 'VIDEO_ID', 'MATA_PELAJARAN', 'KELAS', 'TOPIK', 'THUMBNAIL', 'TANGGAL', 'STATUS', 'VIEW'],
    KARYA_GURU: ['ID_KARYA', 'ID_GURU', 'NAMA_GURU', 'JUDUL_KARYA', 'DESKRIPSI', 'KATEGORI', 'MATA_PELAJARAN', 'TAHUN', 'URL', 'FILE_ID', 'THUMBNAIL', 'TANGGAL_UPLOAD', 'STATUS', 'FEATURED', 'JUMLAH_VIEW'],
    AKTIVITAS: ['ID_AKTIVITAS', 'EMAIL', 'NAMA', 'ROLE', 'AKTIVITAS', 'DETAIL', 'WAKTU', 'IP'],
    SETTING: ['KEY', 'VALUE']
  };
  
  for (var sheetName in schemas) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    var expectedCols = schemas[sheetName];
    
    // Jika sheet baru atau header belum ada / belum lengkap
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(expectedCols);
      sheet.getRange(1, 1, 1, expectedCols.length)
        .setFontWeight('bold')
        .setBackground('#1877F2')
        .setFontColor('#ffffff');
    } else {
      // Perbarui header baris 1 agar selalu sesuai dengan skema terbaru
      var currentHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), expectedCols.length)).getValues()[0];
      var isHeaderMatching = true;
      for (var c = 0; c < expectedCols.length; c++) {
        if (currentHeaders[c] !== expectedCols[c]) {
          isHeaderMatching = false;
          break;
        }
      }
      
      if (!isHeaderMatching) {
        // Tulis ulang header baris 1 dengan kolom lengkap
        sheet.getRange(1, 1, 1, expectedCols.length).setValues([expectedCols])
          .setFontWeight('bold')
          .setBackground('#1877F2')
          .setFontColor('#ffffff');
      }
    }
  }
  
  // Isi Akun Awal (Admin, Guru, Siswa) jika belum ada data di USERS
  var userSheet = ss.getSheetByName('USERS');
  if (userSheet && userSheet.getLastRow() <= 1) {
    var initialUsers = [
      ['USR-001', 'admin', 'admin', 'rudi.harto63@admin.smk.belajar.id', 'Drs. Rudi Hartono, M.T.', '19740512 199903 1 004', 'ADMIN', 'AKTIF', 'Teknologi Informasi', 'SMK Negeri 1 Bandar', '', '2026-01-01', ''],
      ['USR-002', 'guru', 'guru', 'budi.santoso@guru.smk.belajar.id', 'Budi Santoso, S.Kom., M.Pd.', '19830214 200801 1 012', 'GURU', 'AKTIF', 'Informatika & Rekayasa Perangkat Lunak', 'SMK Negeri 1 Bandar', '', '2026-01-01', ''],
      ['USR-003', 'siswa', 'siswa', 'rian.pratama@siswa.smk.belajar.id', 'Rian Pratama', 'NISN: 0078129384', 'SISWA', 'AKTIF', 'Siswa Kelas XI RPL 1', 'SMK Negeri 1 Bandar', '', '2026-01-01', '']
    ];
    userSheet.getRange(2, 1, initialUsers.length, initialUsers[0].length).setValues(initialUsers);
  }
  
  // Hapus sheet default "Sheet1" jika ada
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }
  
  if (typeof initializeFolders === 'function') {
    try { initializeFolders(); } catch(e) {}
  }
  return ss;
}

function getSettings() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.SETTING);
  var data = getSheetDataAsObjects(sheet);
  var settings = {};
  data.forEach(function(row) {
    if (row.KEY) settings[row.KEY] = row.VALUE;
  });
  return settings;
}

function saveSetting(key, value) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.SETTING);
  var data = sheet.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (data[r][0] == key) {
      sheet.getRange(r + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}

function logActivity(email, nama, role, aktivitas, detail) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEETS.AKTIVITAS);
    var now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    appendObjectToSheet(sheet, {
      ID_AKTIVITAS: 'ACT-' + Utilities.getUuid().slice(0, 6),
      EMAIL: email,
      NAMA: nama,
      ROLE: role,
      AKTIVITAS: aktivitas,
      DETAIL: detail,
      WAKTU: now,
      IP: 'AppsScript-Ingress'
    });
  } catch (e) {
    Logger.log('Gagal log activity: ' + e.toString());
  }
}
`
  },
  {
    name: 'appsscript.json',
    type: 'json',
    description: 'Manifest konfigurasi perizinan Google Apps Script Web App',
    content: `{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "webapp": {
    "access": "ANYONE",
    "executeAs": "USER_DEPLOYING"
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}`
  }
];
