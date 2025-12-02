import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onSwitchToSignup, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError(t('modals.invalidCredentials'));
    } else {
      onClose();
    }
  };
  
  const handleClose = () => {
      setUsername('');
      setPassword('');
      setError('');
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden group" onClick={e => e.stopPropagation()}>
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-purple/30 transition-colors duration-500"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="material-symbols-outlined text-3xl text-brand-purple">lock_open</span>
             </div>
             <h2 className="text-3xl font-black text-white tracking-tight mb-2">{t('modals.welcomeBack')}</h2>
             <p className="text-brand-gray text-sm">{t('modals.loginToContinue')}</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t('modals.username')}</label>
                 <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                      placeholder="Enter your username"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">person</span>
                 </div>
            </div>

            <div>
                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t('modals.password')}</label>
                 <div className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                        placeholder="••••••••"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">lock</span>
                 </div>
            </div>
            
            <div className="flex justify-end">
                  <button type="button" onClick={onForgotPassword} className="text-sm font-medium text-brand-light-purple hover:text-white transition-colors">
                      {t('modals.forgotPassword')}
                  </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-brand-purple to-violet-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-brand-purple/25 transform hover:scale-[1.02]"
          >
            {t('modals.login')}
          </button>
        </form>

        <div className="bg-[#150d24] text-center p-6 border-t border-white/5">
            <p className="text-sm text-brand-gray">
                {t('modals.noAccount')}{' '}
                <button onClick={onSwitchToSignup} className="font-bold text-white hover:text-brand-purple transition-colors ml-1">
                    {t('modals.signup')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;