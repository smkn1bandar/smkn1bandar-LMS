import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage, ToastNotification } from '../types';

interface ToastItemProps {
  toast: ToastMessage | ToastNotification;
  onDismiss: (id: string) => void;
  duration?: number;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss, duration = 3500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss, duration]);

  let bgColor = 'bg-slate-900 text-white border-slate-700/80 shadow-slate-950/40';
  let Icon = Info;

  if (toast.type === 'success') {
    bgColor = 'bg-emerald-900/95 text-emerald-50 border-emerald-700/80 shadow-emerald-950/40';
    Icon = CheckCircle2;
  } else if (toast.type === 'error') {
    bgColor = 'bg-rose-900/95 text-rose-50 border-rose-700/80 shadow-rose-950/40';
    Icon = AlertCircle;
  } else if (toast.type === 'warning') {
    bgColor = 'bg-amber-900/95 text-amber-50 border-amber-700/80 shadow-amber-950/40';
    Icon = AlertTriangle;
  }

  return (
    <div
      id={`toast-${toast.id}`}
      className={`pointer-events-auto flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${bgColor}`}
      role="alert"
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5 text-current opacity-90" />
      <div className="flex-1 text-xs sm:text-sm font-medium leading-snug break-words">
        {toast.message}
      </div>
      <button
        id={`btn-close-toast-${toast.id}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(toast.id);
        }}
        className="text-white/70 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/10 cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastProps {
  toasts: (ToastMessage | ToastNotification)[];
  onDismiss?: (id: string) => void;
  onClose?: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss, onClose }) => {
  const handleDismiss = onDismiss || onClose || (() => {});

  if (!toasts || toasts.length === 0) return null;

  // Hanya tampilkan maksimal 3 notifikasi terbaru agar tidak menumpuk
  const visibleToasts = toasts.slice(-3);

  return (
    <div 
      id="toast-container" 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] sm:w-full pointer-events-none"
    >
      {visibleToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={handleDismiss}
          duration={3200}
        />
      ))}
    </div>
  );
};

