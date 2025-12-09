
import React, { useState } from 'react';
import { User, RequestedGame } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '../hooks/useTranslation';
import { enUS, tr } from 'date-fns/locale';

interface RequestGameProps {
  onBack: () => void;
  currentUser: User | null;
  onRequestSubmit: (data: { gameTitle: string, reason: string }) => void;
  requestedGames: RequestedGame[];
  loading: boolean;
  onRequestLogin: () => void;
}

const RequestCard: React.FC<{ request: RequestedGame }> = ({ request }) => {
    const { language, t } = useTranslation();
    const locale = language === 'tr' ? tr : enUS;

    return (
        <div className="group relative bg-[#1a102e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:-translate-y-1">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    <img src={request.avatarUrl} alt={request.requestedBy} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-purple border-2 border-[#1a102e] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-white">gamepad</span>
                    </div>
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                        <h4 className="font-bold text-white text-lg truncate pr-2 group-hover:text-brand-light-purple transition-colors">{request.gameTitle}</h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap bg-white/5 px-2 py-1 rounded-full border border-white/5">
                            {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true, locale })}
                        </span>
                    </div>
                    
                    {request.reason ? (
                        <div className="relative pl-3 border-l-2 border-brand-purple/30 mb-3">
                            <p className="text-gray-300 text-sm italic line-clamp-2">"{request.reason}"</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-xs italic mb-3">No reason provided.</p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{t('requestGame.requestedBy')}</span>
                        <span className="font-bold text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md">
                            {request.requestedBy}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RequestCardSkeleton: React.FC = () => (
    <div className="bg-[#1a102e]/40 border border-white/5 p-6 rounded-2xl flex items-start gap-4 animate-shimmer">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0"></div>
        <div className="flex-grow">
            <div className="h-6 w-1/2 bg-white/5 rounded-md mb-3"></div>
            <div className="h-4 w-full bg-white/5 rounded-md mb-2"></div>
            <div className="h-4 w-2/3 bg-white/5 rounded-md"></div>
        </div>
    </div>
);

const RequestGame: React.FC<RequestGameProps> = ({ onBack, currentUser, onRequestSubmit, requestedGames, loading, onRequestLogin }) => {
  const [gameTitle, setGameTitle] = useState('');
  const [reason, setReason] = useState('');
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        onRequestLogin();
        return;
    }
    if (gameTitle.trim()) {
      onRequestSubmit({ gameTitle, reason });
      setGameTitle('');
      setReason('');
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
         {/* Ambient Background */}
         <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <section className="relative z-10 pt-8 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
                <button 
                    onClick={onBack}
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span className="text-sm font-bold">{t('gameDetail.backToStore')}</span>
                </button>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#2e1065] to-[#1e1b4b] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{t('requestGame.title')}</h1>
                        <p className="text-brand-light-purple text-lg max-w-xl">{t('requestGame.description')}</p>
                    </div>
                    <div className="hidden md:block relative z-10 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-6xl text-brand-purple drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">rocket_launch</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Form (Sticky) */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                    <div className="bg-[#1a102e]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                         {/* Glow Effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl group-hover:bg-brand-purple/30 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-brand-purple">add_circle</span>
                                {t('requestGame.title')}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="gameTitle" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('requestGame.gameTitleLabel')}</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="gameTitle"
                                            id="gameTitle"
                                            value={gameTitle}
                                            onChange={(e) => setGameTitle(e.target.value)}
                                            placeholder={t('requestGame.gameTitlePlaceholder')}
                                            required
                                            className="w-full bg-[#0f0720] text-white rounded-xl p-4 pl-11 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-600"
                                        />
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">sports_esports</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="reason" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('requestGame.reasonLabel')}</label>
                                    <textarea
                                        name="reason"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        rows={4}
                                        placeholder={t('requestGame.reasonPlaceholder')}
                                        className="w-full bg-[#0f0720] text-white rounded-xl p-4 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-600 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-brand-purple to-violet-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-brand-purple/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    title={!currentUser ? 'Create profile to request' : t('requestGame.sendRequest')}
                                >
                                    <span>{currentUser ? t('requestGame.sendRequest') : 'Create Profile to Request'}</span>
                                    {currentUser && <span className="material-symbols-outlined text-[20px]">send</span>}
                                </button>
                                
                                {!currentUser && (
                                    <p className="text-center text-xs text-brand-gray">
                                        You need to <button onClick={onRequestLogin} className="text-brand-light-purple hover:underline font-bold">create a profile</button> to submit a request.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-white">{t('requestGame.yourRequests')}</h2>
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-bold border border-white/5">
                            {requestedGames.length} Requests
                        </span>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            [...Array(4)].map((_, i) => <RequestCardSkeleton key={i} />)
                        ) : requestedGames.length > 0 ? (
                            requestedGames.map(req => <RequestCard key={req.id} request={req} />)
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-4xl text-brand-gray/50">inbox</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t('requestGame.noRequestsTitle')}</h3>
                                <p className="text-gray-400 max-w-md">{t('requestGame.noRequestsDescription')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default RequestGame;
