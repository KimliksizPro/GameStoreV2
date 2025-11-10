
import React, { useState, useEffect } from 'react';
import { availableAvatars } from '../data/avatars';
import { UserProfile } from '../hooks/useUserProfile';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatarUrl: string) => void;
  currentProfile: UserProfile;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, onSave, currentProfile }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    if (isOpen) {
        setName(currentProfile.name === 'Guest Player' ? '' : currentProfile.name);
        setSelectedAvatar(currentProfile.avatarUrl);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedAvatar) {
      onSave(name.trim(), selectedAvatar);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">Set Your Forum Profile</h2>
          <p className="text-brand-gray text-center mb-6">Choose a name and avatar to join the discussion.</p>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-brand-light-purple mb-2">Display Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={20}
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-light-purple mb-2">Choose Avatar</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
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
            <button type="button" onClick={onClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Cancel</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!name.trim() || !selectedAvatar}>Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileModal;
