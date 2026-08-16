import React, { useState, useEffect } from 'react';
import { 
  AppView, User, Guru, Kelas, Materi, YoutubeVideo, KaryaGuru, 
  AktivitasLog, AppSettings, ToastNotification 
} from './types';
import { db } from './services/database';

// Global Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Modals
import { AuthModal } from './components/AuthModal';
import { PreviewModal } from './components/PreviewModal';
import { ShareModal } from './components/ShareModal';
import { AddMateriModal } from './views/Forms/AddMateriModal';
import { AddVideoModal } from './views/Forms/AddVideoModal';
import { AddKaryaModal } from './views/Forms/AddKaryaModal';

// Views
import { HomeView } from './views/HomeView';
import { PortalLoginView } from './views/PortalLoginView';
import { MateriView } from './views/MateriView';
import { VideoView } from './views/VideoView';
import { KaryaView } from './views/KaryaView';
import { GuruView } from './views/GuruView';
import { GuruProfileView } from './views/GuruProfileView';
import { GuruDashboardView } from './views/GuruDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PanduanView } from './views/PanduanView';
import { BloggerEmbedView } from './views/BloggerEmbedView';
import { GasCodeView } from './views/GasCodeView';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Core Data States
  const [settings, setSettings] = useState<AppSettings>(db.getSettings());
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const [videoList, setVideoList] = useState<YoutubeVideo[]>([]);
  const [karyaList, setKaryaList] = useState<KaryaGuru[]>([]);
  const [activityLogs, setActivityLogs] = useState<AktivitasLog[]>([]);

  // Modals & Preview States
  const [previewItem, setPreviewItem] = useState<{
    item: Materi | YoutubeVideo | KaryaGuru | null;
    type: 'materi' | 'video' | 'karya';
  }>({ item: null, type: 'materi' });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [shareItem, setShareItem] = useState<Materi | YoutubeVideo | KaryaGuru | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // CRUD Modals
  const [isAddMateriOpen, setIsAddMateriOpen] = useState(false);
  const [editingMateri, setEditingMateri] = useState<Materi | null>(null);

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YoutubeVideo | null>(null);

  const [isAddKaryaOpen, setIsAddKaryaOpen] = useState(false);
  const [editingKarya, setEditingKarya] = useState<KaryaGuru | null>(null);

  // Toast Notification State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Bookmarks state in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lms_guru_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('lms_guru_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      showToast(exists ? 'Item dihapus dari daftar simpanan' : 'Item disimpan ke favorit', 'info');
      return next;
    });
  };

  // Initial Load from DatabaseService
  const refreshAllData = () => {
    setCurrentUser(db.getCurrentUser());
    setSettings(db.getSettings());
    setGuruList(db.getGuruList());
    setUsersList(db.getUsers());
    setKelasList(db.getKelasList());
    setMateriList(db.getMateri());
    setVideoList(db.getYoutubeVideos());
    setKaryaList(db.getKaryaGuru());
    setActivityLogs(db.getActivityLogs());
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Handlers for Navigation
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGuru = (guru: Guru) => {
    setSelectedGuru(guru);
    setCurrentView('guru-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for Previews and Sharing
  const handlePreviewMateri = (materi: Materi) => {
    db.incrementMateriView(materi.id_materi);
    refreshAllData();
    setPreviewItem({ item: materi, type: 'materi' });
    setIsPreviewOpen(true);
  };

  const handlePlayVideo = (video: YoutubeVideo) => {
    db.incrementVideoView(video.id_video);
    refreshAllData();
    setPreviewItem({ item: video, type: 'video' });
    setIsPreviewOpen(true);
  };

  const handlePreviewKarya = (karya: KaryaGuru) => {
    db.incrementKaryaView(karya.id_karya);
    refreshAllData();
    setPreviewItem({ item: karya, type: 'karya' });
    setIsPreviewOpen(true);
  };

  const handleShareItem = (item: any) => {
    setShareItem(item);
    setIsShareOpen(true);
  };

  // CRUD Operations - Materi
  const handleSaveMateri = (materi: Materi) => {
    const isEdit = Boolean(editingMateri);
    db.saveMateri(materi);
    refreshAllData();
    setEditingMateri(null);
    showToast(isEdit ? 'Materi berhasil diperbarui' : 'Materi baru berhasil ditambahkan');
  };

  const handleDeleteMateri = (id: string) => {
    db.deleteMateri(id);
    refreshAllData();
    showToast('Materi telah dihapus', 'info');
  };

  // CRUD Operations - Video
  const handleSaveVideo = (video: YoutubeVideo) => {
    const isEdit = Boolean(editingVideo);
    db.saveYoutubeVideo(video);
    refreshAllData();
    setEditingVideo(null);
    showToast(isEdit ? 'Video berhasil diperbarui' : 'Video pembelajaran baru berhasil ditambahkan');
  };

  const handleDeleteVideo = (id: string) => {
    db.deleteYoutubeVideo(id);
    refreshAllData();
    showToast('Video pembelajaran telah dihapus', 'info');
  };

  // CRUD Operations - Karya
  const handleSaveKarya = (karya: KaryaGuru) => {
    const isEdit = Boolean(editingKarya);
    db.saveKaryaGuru(karya);
    refreshAllData();
    setEditingKarya(null);
    showToast(
      isEdit 
        ? 'Karya guru diperbarui' 
        : currentUser?.role === 'ADMIN'
          ? 'Karya guru berhasil dipublikasikan'
          : 'Karya guru terkirim, menunggu verifikasi Admin'
    );
  };

  const handleDeleteKarya = (id: string) => {
    db.deleteKaryaGuru(id);
    refreshAllData();
    showToast('Karya guru telah dihapus', 'info');
  };

  // Moderation Actions (Admin)
  const handleApproveKarya = (id: string) => {
    db.updateKaryaStatus(id, 'DISETUJUI');
    refreshAllData();
    showToast('Karya telah disetujui & dipublikasikan ke portal');
  };

  const handleRejectKarya = (id: string, reason?: string) => {
    db.updateKaryaStatus(id, 'DITOLAK');
    refreshAllData();
    showToast('Karya telah ditolak / dikembalikan untuk revisi', 'info');
  };

  const handleToggleFeaturedKarya = (id: string) => {
    db.toggleFeaturedKarya(id);
    refreshAllData();
    showToast('Status karya unggulan diperbarui');
  };

  // Guru & Kelas CRUD (Admin)
  const handleAddGuru = (guru: Guru) => {
    db.addGuru(guru);
    refreshAllData();
    showToast(`Guru ${guru.nama_guru} berhasil ditambahkan`);
  };

  const handleAddKelas = (kelas: Kelas) => {
    db.addKelas(kelas);
    refreshAllData();
    showToast(`Kelas ${kelas.nama_kelas} berhasil ditambahkan`);
  };

  const handleDeleteKelas = (id: string) => {
    db.deleteKelas(id);
    refreshAllData();
    showToast('Kelas telah dihapus', 'info');
  };

  // Settings & Database Tools
  const handleUpdateSettings = (newSettings: AppSettings) => {
    db.saveSettings(newSettings);
    refreshAllData();
    showToast('Pengaturan portal berhasil disimpan');
  };

  const handleSeedData = () => {
    db.seedInitialData();
    refreshAllData();
    showToast('Database berhasil di-reset dengan sample data baru');
  };

  const handleExportBackup = () => {
    const json = db.exportAllDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lms-guru-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Backup database JSON berhasil diunduh');
  };

  // Login / Logout
  const handleLogin = (user: User) => {
    db.login(user);
    refreshAllData();
    showToast(`Selamat datang, ${user.nama}!`);
  };

  const handleLogout = () => {
    db.logout();
    refreshAllData();
    if (currentView === 'guru-dashboard' || currentView === 'admin-dashboard') {
      setCurrentView('home');
    }
    showToast('Anda telah keluar dari akun', 'info');
  };

  // Calculate Global Stats
  const globalStats = {
    totalTeachers: guruList.length,
    totalMateri: materiList.filter(m => m.status === 'DISETUJUI').length,
    totalYoutube: videoList.length,
    totalKarya: karyaList.filter(k => k.status === 'DISETUJUI').length,
    totalViews: 
      materiList.reduce((acc, m) => acc + (m.jumlah_view || 0), 0) +
      videoList.reduce((acc, v) => acc + (v.view || 0), 0) +
      karyaList.reduce((acc, k) => acc + (k.jumlah_view || 0), 0),
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Global Application Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onSwitchUser={handleLogin}
        settings={settings}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {currentView === 'home' && (
          <HomeView
            settings={settings}
            materiList={materiList}
            videoList={videoList}
            karyaList={karyaList}
            guruList={guruList}
            onNavigate={handleNavigate}
            onPreviewMateri={handlePreviewMateri}
            onPlayVideo={handlePlayVideo}
            onPreviewKarya={handlePreviewKarya}
            onShareItem={handleShareItem}
            onSelectGuru={handleSelectGuru}
            onOpenLogin={() => setIsAuthOpen(true)}
            stats={globalStats}
          />
        )}

        {currentView === 'portal-login' && (
          <PortalLoginView
            settings={settings}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onLogin={handleLogin}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'materi' && (
          <MateriView
            materiList={materiList}
            guruList={guruList}
            currentUser={currentUser}
            onPreviewMateri={handlePreviewMateri}
            onShareMateri={handleShareItem}
            onSelectGuru={handleSelectGuru}
            onOpenAddMateri={() => {
              setEditingMateri(null);
              setIsAddMateriOpen(true);
            }}
            onToggleBookmark={toggleBookmark}
            bookmarks={bookmarks}
          />
        )}

        {currentView === 'video' && (
          <VideoView
            videoList={videoList}
            guruList={guruList}
            currentUser={currentUser}
            onPlayVideo={handlePlayVideo}
            onShareVideo={handleShareItem}
            onSelectGuru={handleSelectGuru}
            onOpenAddVideo={() => {
              setEditingVideo(null);
              setIsAddVideoOpen(true);
            }}
            onToggleBookmark={toggleBookmark}
            bookmarks={bookmarks}
          />
        )}

        {currentView === 'karya' && (
          <KaryaView
            karyaList={karyaList}
            guruList={guruList}
            currentUser={currentUser}
            onPreviewKarya={handlePreviewKarya}
            onShareKarya={handleShareItem}
            onSelectGuru={handleSelectGuru}
            onOpenAddKarya={() => {
              setEditingKarya(null);
              setIsAddKaryaOpen(true);
            }}
            onToggleBookmark={toggleBookmark}
            bookmarks={bookmarks}
          />
        )}

        {currentView === 'guru' && (
          <GuruView
            guruList={guruList}
            materiList={materiList}
            karyaList={karyaList}
            onSelectGuru={handleSelectGuru}
          />
        )}

        {currentView === 'guru-profile' && selectedGuru && (
          <GuruProfileView
            guru={selectedGuru}
            materiList={materiList}
            videoList={videoList}
            karyaList={karyaList}
            onBack={() => handleNavigate('guru')}
            onPreviewMateri={handlePreviewMateri}
            onPlayVideo={handlePlayVideo}
            onPreviewKarya={handlePreviewKarya}
            onShareItem={handleShareItem}
          />
        )}

        {currentView === 'guru-dashboard' && currentUser && (
          <GuruDashboardView
            currentUser={currentUser}
            materiList={materiList}
            videoList={videoList}
            karyaList={karyaList}
            onOpenAddMateri={() => {
              setEditingMateri(null);
              setIsAddMateriOpen(true);
            }}
            onOpenAddVideo={() => {
              setEditingVideo(null);
              setIsAddVideoOpen(true);
            }}
            onOpenAddKarya={() => {
              setEditingKarya(null);
              setIsAddKaryaOpen(true);
            }}
            onEditMateri={(m) => {
              setEditingMateri(m);
              setIsAddMateriOpen(true);
            }}
            onDeleteMateri={handleDeleteMateri}
            onEditVideo={(v) => {
              setEditingVideo(v);
              setIsAddVideoOpen(true);
            }}
            onDeleteVideo={handleDeleteVideo}
            onEditKarya={(k) => {
              setEditingKarya(k);
              setIsAddKaryaOpen(true);
            }}
            onDeleteKarya={handleDeleteKarya}
            onPreviewMateri={handlePreviewMateri}
            onPlayVideo={handlePlayVideo}
            onPreviewKarya={handlePreviewKarya}
          />
        )}

        {currentView === 'admin-dashboard' && currentUser?.role === 'ADMIN' && (
          <AdminDashboardView
            currentUser={currentUser}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            guruList={guruList}
            usersList={usersList}
            kelasList={kelasList}
            materiList={materiList}
            videoList={videoList}
            karyaList={karyaList}
            activityLogs={activityLogs}
            onApproveKarya={handleApproveKarya}
            onRejectKarya={handleRejectKarya}
            onToggleFeaturedKarya={handleToggleFeaturedKarya}
            onDeleteMateri={handleDeleteMateri}
            onDeleteVideo={handleDeleteVideo}
            onDeleteKarya={handleDeleteKarya}
            onAddGuru={handleAddGuru}
            onAddKelas={handleAddKelas}
            onDeleteKelas={handleDeleteKelas}
            onPreviewMateri={handlePreviewMateri}
            onPlayVideo={handlePlayVideo}
            onPreviewKarya={handlePreviewKarya}
            onSeedData={handleSeedData}
            onExportBackup={handleExportBackup}
          />
        )}

        {currentView === 'panduan' && (
          <PanduanView />
        )}

        {currentView === 'blogger-embed' && (
          <BloggerEmbedView settings={settings} />
        )}

        {currentView === 'gas-code' && (
          <GasCodeView />
        )}

      </main>

      {/* Global Application Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
      />

      {/* All Modal Overlays */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        item={previewItem.item}
        type={previewItem.type}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        item={shareItem}
      />

      <AddMateriModal
        isOpen={isAddMateriOpen}
        onClose={() => {
          setIsAddMateriOpen(false);
          setEditingMateri(null);
        }}
        onSave={handleSaveMateri}
        currentUser={currentUser}
        editingMateri={editingMateri}
        kelasList={kelasList}
      />

      <AddVideoModal
        isOpen={isAddVideoOpen}
        onClose={() => {
          setIsAddVideoOpen(false);
          setEditingVideo(null);
        }}
        onSave={handleSaveVideo}
        currentUser={currentUser}
        editingVideo={editingVideo}
        kelasList={kelasList}
      />

      <AddKaryaModal
        isOpen={isAddKaryaOpen}
        onClose={() => {
          setIsAddKaryaOpen(false);
          setEditingKarya(null);
        }}
        onSave={handleSaveKarya}
        currentUser={currentUser}
        editingKarya={editingKarya}
      />

    </div>
  );
}
