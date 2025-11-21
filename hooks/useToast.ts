

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  onClick?: () => void;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, options?: { onClick?: () => void }) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // FIX: Moved removeToast before showToast, and wrapped in useCallback for stability.
  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // FIX: Added `removeToast` to the dependency array to avoid stale closures.
  const showToast = useCallback((message: string, type: ToastType, options?: { onClick?: () => void }) => {
    const id = Date.now();
    const newToast: Toast = { id, message, type, onClick: options?.onClick };
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Auto-dismiss only if it's not a clickable toast, or after a longer duration
    const duration = options?.onClick ? 10000 : 5000;

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
  // This resolves multiple parsing errors.
  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, showToast, removeToast } },
    children
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};