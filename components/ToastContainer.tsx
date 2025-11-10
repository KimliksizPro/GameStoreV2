
import React from 'react';
import { useToast } from '../hooks/useToast';

const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onDismiss: () => void }> = ({ message, type, onDismiss }) => {
  const baseClasses = 'relative w-full max-w-sm p-4 rounded-lg shadow-lg text-white flex items-center gap-3 transition-all duration-300 transform';
  const typeClasses = {
    success: 'bg-green-500/90 backdrop-blur-sm border border-green-400/50',
    error: 'bg-red-500/90 backdrop-blur-sm border border-red-400/50',
    info: 'bg-blue-500/90 backdrop-blur-sm border border-blue-400/50',
  };

  const Icon = () => {
    switch (type) {
      case 'success': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'error': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'info': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return null;
    }
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]} animate-fadeInUp`}>
      <Icon />
      <span className="flex-grow">{message}</span>
      <button onClick={onDismiss} className="text-white/70 hover:text-white">&times;</button>
    </div>
  );
};


const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
