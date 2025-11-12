
import React, { useState } from 'react';
import { availableAvatars } from '../data/avatars';
import { useTranslation } from '../hooks/useTranslation';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (username: string, email: string, password: string, avatarUrl: string) => Promise<{ success: boolean; message: string; }>;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(availableAvatars[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || !email.trim()) {
        setError("Username, email, and password cannot be empty.");
        return;
    }
    setLoading(true);
    setError('');
    const result = await onSignup(username.trim(), email.trim(), password, selectedAvatar);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
    } else {
      onClose();
    }
  };

  const handleClose = () => {
      setUsername('');
      setEmail('');
      setPassword('');
      setSelectedAvatar(availableAvatars[0]);
      setError('');
      setLoading(false);
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">{t('modals.createAccount')}</h2>
          <p className="text-brand-gray text-center mb-6">{t('modals.joinCommunity')}</p>
          
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder={t('modals.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
             <input
              type="email"
              placeholder={t('modals.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
            <input
              type="password"
              placeholder={t('modals.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-light-purple mb-2">{t('modals.chooseAvatar')}</label>
            <div className="grid grid-cols-6 gap-3">
              {availableAvatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative w-full aspect-square rounded-full overflow-hidden transition-all duration-200 transform hover:scale-110 focus:outline-none ${selectedAvatar === avatar ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#1C162D]' : 'ring-2 ring-transparent'}`}
                >
                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
            <button type="button" onClick={handleClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">{t('modals.cancel')}</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50" disabled={loading}>
              {loading ? t('modals.creating') : t('modals.signup')}
            </button>
          </div>
        </form>
         <div className="bg-brand-dark-2/50 text-center p-4 border-t border-gray-800 rounded-b-xl">
            <p className="text-sm text-brand-gray">
                {t('modals.haveAccount')}{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-brand-light-purple hover:underline">
                    {t('modals.login')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;