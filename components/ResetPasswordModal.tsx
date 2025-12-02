import React, { useState } from 'react';
import { User } from '../types';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: (userId: string, newPassword: string) => Promise<{ success: boolean; message: string; }>;
  userToReset: User | null;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, onReset, userToReset }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !userToReset) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    const result = await onReset(userToReset.id, password);
    setLoading(false);

    if (result.success) {
      setSuccess(result.message + " You may now log in.");
      setPassword('');
      setConfirmPassword('');
    } else {
      setError(result.message);
    }
  };

  const handleClose = () => {
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess('');
      setLoading(false);
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="material-symbols-outlined text-3xl text-green-400">key</span>
             </div>
             <h2 className="text-2xl font-black text-white tracking-tight mb-2">New Password</h2>
             <p className="text-brand-gray text-sm">Create a strong password for <span className="text-white font-bold">@{userToReset.username}</span>.</p>
          </div>
          
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 text-center">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-4 rounded-xl mb-6 text-center">{success}</div>}

          <div className="space-y-4">
            <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white transition-all placeholder:text-gray-600"
                    placeholder="New Password"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">lock</span>
            </div>
            <div className="relative">
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white transition-all placeholder:text-gray-600"
                    placeholder="Confirm Password"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">lock_clock</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
             <button type="button" onClick={handleClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-4 rounded-xl transition-colors">Close</button>
             <button 
                type="submit" 
                className="flex-[2] bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-600/20 disabled:opacity-50" 
                disabled={loading || !!success}
            >
              {loading ? 'Saving...' : 'Set Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;