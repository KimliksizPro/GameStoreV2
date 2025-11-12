
import React, { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestReset: (email: string) => void;
  onSwitchToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onRequestReset, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onRequestReset(email.trim());
    setLoading(false);
    setSuccess(`If an account exists for ${email}, a password reset link has been sent. (This is a demo, please click the link provided in the toast message).`);
    setEmail('');
  };

  const handleClose = () => {
      setEmail('');
      setSuccess('');
      setLoading(false);
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">Reset Password</h2>
          <p className="text-brand-gray text-center mb-6">Enter your account's email address and we will send you a link to reset your password.</p>
          
          {success && (
            <div className="bg-green-500/10 text-green-400 text-sm p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
            <button type="button" onClick={handleClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Cancel</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50" disabled={loading || !!success}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
         <div className="bg-brand-dark-2/50 text-center p-4 border-t border-gray-800 rounded-b-xl">
            <p className="text-sm text-brand-gray">
                Remembered your password?{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-brand-light-purple hover:underline">
                    Log in
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
