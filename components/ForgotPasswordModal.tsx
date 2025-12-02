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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={handleClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
         {/* Decorative Glow */}
         <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="material-symbols-outlined text-3xl text-blue-400">lock_reset</span>
             </div>
             <h2 className="text-2xl font-black text-white tracking-tight mb-2">Reset Password</h2>
             <p className="text-brand-gray text-sm">Enter your email and we'll help you get back in.</p>
          </div>
          
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-4 rounded-xl mb-6 text-center">
              {success}
            </div>
          )}

          <div className="space-y-4">
             <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0f0720] rounded-xl p-4 pl-12 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all placeholder:text-gray-600"
                    placeholder="Email Address"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={handleClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-4 rounded-xl transition-colors">Cancel</button>
            <button 
                type="submit" 
                className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50" 
                disabled={loading || !!success}
            >
              {loading ? 'Sending...' : 'Send Link'}
            </button>
          </div>
        </form>

         <div className="bg-[#150d24] text-center p-6 border-t border-white/5">
            <p className="text-sm text-brand-gray">
                Remembered your password?{' '}
                <button onClick={onSwitchToLogin} className="font-bold text-white hover:text-blue-400 transition-colors ml-1">
                    Log in
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;