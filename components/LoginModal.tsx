

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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">{t('modals.welcomeBack')}</h2>
          <p className="text-brand-gray text-center mb-6">{t('modals.loginToContinue')}</p>
          
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder={t('modals.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
            <div>
              <input
                type="password"
                placeholder={t('modals.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
              />
               <div className="text-right mt-2">
                  <button type="button" onClick={onForgotPassword} className="text-sm font-medium text-brand-light-purple hover:underline focus:outline-none">
                      {t('modals.forgotPassword')}
                  </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
            <button type="button" onClick={handleClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">{t('modals.cancel')}</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('modals.login')}</button>
          </div>
        </form>
         <div className="bg-brand-dark-2/50 text-center p-4 border-t border-gray-800 rounded-b-xl">
            <p className="text-sm text-brand-gray">
                {t('modals.noAccount')}{' '}
                <button onClick={onSwitchToSignup} className="font-semibold text-brand-light-purple hover:underline">
                    {t('modals.signup')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;