import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-slate-900 text-white border-slate-700';
        let Icon = Info;

        if (toast.type === 'success') {
          bgColor = 'bg-emerald-800/95 text-white border-emerald-600 shadow-emerald-950/40';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bgColor = 'bg-rose-800/95 text-white border-rose-600 shadow-rose-950/40';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-700/95 text-white border-amber-500 shadow-amber-950/40';
          Icon = AlertTriangle;
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur transition-all duration-300 transform translate-y-0 ${bgColor}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>
            <button
              id={`btn-close-toast-${toast.id}`}
              onClick={() => onDismiss(toast.id)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
