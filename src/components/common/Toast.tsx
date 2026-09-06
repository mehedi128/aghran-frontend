import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#639922] flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#D85A30] flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#D85A30] flex-shrink-0" />
  };

  return (
    <div
      id="aghran-toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#FAF6EE] border-2 border-[#D85A30]/30 shadow-2xl rounded-2xl p-4 flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      {icons[toast.type]}
      <div className="flex-1 pr-2">
        <h4 className="text-sm font-bold text-[#3A2A1E] leading-tight">{toast.title}</h4>
        <p className="text-xs text-[#888780] mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={hideToast}
        className="text-[#888780] hover:text-[#3A2A1E] transition-colors p-1 rounded-lg hover:bg-[#FAEEDA]"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
