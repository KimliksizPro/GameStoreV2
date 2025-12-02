import React, { useState } from 'react';
import { availableAvatars } from '../data/avatars';
import { useTranslation } from '../hooks/useTranslation';
import { User } from '../types';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (username: string, email: string, password: string, avatarUrl: string) => Promise<{ success: boolean; message: string; user: User | null; }>;
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-lg shadow-2xl relative overflow-hidden group max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/20 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-purple/30 transition-colors duration-500"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="material-symbols-outlined text-3xl text-brand-purple">person_add</span>
             </div>
             <h2 className="text-3xl font-black text-white tracking-tight mb-2">{t('modals.createAccount')}</h2>
             <p className="text-brand-gray text-sm">{t('modals.joinCommunity')}</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
               <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="relative">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                    placeholder={t('modals.username')}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">person</span>
            </div>
            
             <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                    placeholder={t('modals.email')}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
            </div>

            <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                    placeholder={t('modals.password')}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">lock</span>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider text-center">{t('modals.chooseAvatar')}</label>
            <div className="grid grid-cols-5 gap-3 p-3 bg-[#0f0720] rounded-2xl border border-white/5">
              {availableAvatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200 transform hover:scale-110 focus:outline-none ${selectedAvatar === avatar ? 'ring-2 ring-brand-purple ring-offset-2 ring-offset-[#0f0720] opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-purple to-violet-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-brand-purple/25 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    {t('modals.creating')}
                </div>
            ) : t('modals.signup')}
          </button>
        </form>

         <div className="bg-[#150d24] text-center p-6 border-t border-white/5">
            <p className="text-sm text-brand-gray">
                {t('modals.haveAccount')}{' '}
                <button onClick={onSwitchToLogin} className="font-bold text-white hover:text-brand-purple transition-colors ml-1">
                    {t('modals.login')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;