import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    } else {
        setError('');
    }
  };

  return (
    <div className="min-h-screen bg-background-dark font-display text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-gray-800 animate-fadeInUp bg-[#1C162D]">
        
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-brand-dark-2/50 relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a492c9\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
          <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H12V12H4V4Z" fill="currentColor" className="text-brand-light-purple"/>
                      <path d="M12 12H20V20H12V12Z" fill="currentColor" className="text-primary"/>
                  </svg>
                  <span className="font-bold text-2xl">Semih</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight">Admin<br />Kontrol Merkezi</h1>
          </div>
          <div className="relative z-10 text-sm text-brand-gray">
            <p>&copy; {new Date().getFullYear()} Geliştirici: Semih Topak</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-10 flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto">
                 <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H12V12H4V4Z" fill="currentColor" className="text-brand-light-purple"/>
                        <path d="M12 12H20V20H12V12Z" fill="currentColor" className="text-primary"/>
                    </svg>
                    <span className="font-bold text-2xl">Semih</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Tekrar Hoş Geldiniz!</h2>
                <p className="text-brand-gray mb-8">Devam etmek için şifrenizi girin.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <span className="material-symbols-outlined text-gray-500">lock</span>
                            </span>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifre"
                                className="w-full bg-[#2f2348] text-lg rounded-xl p-4 pl-12 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-white placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-3 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-violet-600 text-white font-bold py-4 px-4 text-lg rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;