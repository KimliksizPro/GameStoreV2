
import React, { useState, useEffect } from 'react';
import { availableAvatars } from '../data/avatars';
import { UserProfile } from '../hooks/useUserProfile';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatarUrl: string) => void;
  currentProfile?: UserProfile | null;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, onSave, currentProfile }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(availableAvatars[0]);

  useEffect(() => {
    if (isOpen) {
        setName(currentProfile?.name || '');
        if (currentProfile?.avatarUrl) {
            setSelectedAvatar(currentProfile.avatarUrl);
        }
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedAvatar) {
      onSave(name.trim(), selectedAvatar);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden group" onClick={e => e.stopPropagation()}>
         {/* Decorative Glow */}
         <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/20 blur-3xl rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="material-symbols-outlined text-3xl text-brand-purple">face</span>
             </div>
             <h2 className="text-2xl font-black text-white tracking-tight mb-2">Create Profile</h2>
             <p className="text-brand-gray text-sm">Enter a name to join the community.</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">Nickname</label>
            <div className="relative">
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={20}
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600"
                    placeholder="e.g. PlayerOne"
                />
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">edit</span>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider text-center">Choose Avatar</label>
            <div className="grid grid-cols-4 gap-3 p-3 bg-[#0f0720] rounded-2xl border border-white/5 max-h-48 overflow-y-auto custom-scrollbar">
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
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-4 rounded-xl transition-colors">Cancel</button>
            <button 
                type="submit" 
                className="flex-[2] bg-gradient-to-r from-brand-purple to-violet-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-50" 
                disabled={!name.trim() || !selectedAvatar}
            >
              Start Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileModal;
