import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-success" size={24} />,
    error: <XCircle className="text-warning" size={24} />,
    info: <Info className="text-primary" size={24} />,
    warning: <AlertTriangle className="text-achievement" size={24} />,
  };

  const bgColors = {
    success: 'bg-green-50 border-success',
    error: 'bg-red-50 border-warning',
    info: 'bg-blue-50 border-primary',
    warning: 'bg-amber-50 border-achievement',
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg ${bgColors[type]} animate-slide-in`}
    >
      {icons[type]}
      <p className="flex-1 text-gray-900 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
