
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">Create New Password</h2>
          <p className="text-brand-gray text-center mb-6">Enter a new password for <span className="font-bold text-white">{userToReset.username}</span>.</p>
          
          {error && <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">{error}</div>}
          {success && <div className="bg-green-500/10 text-green-400 text-sm p-3 rounded-lg mb-4 text-center">{success}</div>}

          <div className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
            <button type="button" onClick={handleClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Close</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50" disabled={loading || !!success}>
              {loading ? 'Saving...' : 'Set New Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
