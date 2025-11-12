
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
        <div className="bg-brand-dark-2 p-4 rounded-lg border border-gray-800 flex items-start gap-4 animate-fadeInUp">
            <img src={request.avatarUrl} alt={request.requestedBy} className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1" />
            <div className="flex-grow">
                <h4 className="font-bold text-white text-lg">{request.gameTitle}</h4>
                {request.reason && <p className="text-brand-light-purple text-sm mt-1">"{request.reason}"</p>}
                <p className="text-xs text-brand-gray mt-2">
                    {t('requestGame.requestedBy')}{' '}
                    <span className="font-semibold text-white">{request.requestedBy}</span> • {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true, locale })}
                </p>
            </div>
        </div>
    );
};

const RequestCardSkeleton: React.FC = () => (
    <div className="bg-brand-dark-2 p-4 rounded-lg border border-gray-800 flex items-start gap-4 animate-shimmer">
        <div className="w-10 h-10 rounded-full bg-brand-dark flex-shrink-0 mt-1"></div>
        <div className="flex-grow">
            <div className="h-5 w-3/4 bg-brand-dark rounded-md mb-2"></div>
            <div className="h-4 w-full bg-brand-dark rounded-md mb-3"></div>
            <div className="h-3 w-1/2 bg-brand-dark rounded-md"></div>
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
    <section className="py-12 md:py-16 animate-fadeInUp">
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors"
        aria-label="Back to store"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {t('gameDetail.backToStore')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
            <div className="bg-brand-dark p-8 rounded-lg shadow-2xl shadow-brand-purple/20 border border-gray-800 lg:sticky top-28">
                <h1 className="text-3xl font-bold text-center mb-2">{t('requestGame.title')}</h1>
                <p className="text-brand-gray text-center mb-6">{t('requestGame.description')}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="gameTitle" className="block text-sm font-medium text-brand-gray mb-2">{t('requestGame.gameTitleLabel')}</label>
                    <input
                    type="text"
                    name="gameTitle"
                    id="gameTitle"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    placeholder={t('requestGame.gameTitlePlaceholder')}
                    required
                    className="w-full bg-brand-light-gray/20 rounded-md p-3 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-brand-gray mb-2">{t('requestGame.reasonLabel')}</label>
                    <textarea
                    name="reason"
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    placeholder={t('requestGame.reasonPlaceholder')}
                    className="w-full bg-brand-light-gray/20 rounded-md p-3 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple transition-colors"
                    ></textarea>
                </div>
                <div className="text-center">
                    <button
                    type="submit"
                    className="w-full sm:w-auto bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-brand-purple/50 focus:outline-none focus:shadow-lg focus:shadow-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!currentUser}
                    title={!currentUser ? t('toasts.loginToRequest') : t('requestGame.sendRequest')}
                    >
                    {currentUser ? t('requestGame.sendRequest') : t('requestGame.loginToRequest')}
                    </button>
                </div>
                </form>
            </div>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-6">{t('requestGame.yourRequests')}</h2>
            <div className="space-y-4">
                {loading ? (
                    [...Array(5)].map((_, i) => <RequestCardSkeleton key={i} />)
                ) : requestedGames.length > 0 ? (
                    requestedGames.map(req => <RequestCard key={req.id} request={req} />)
                ) : (
                    <div className="text-center py-16 bg-brand-dark-2 rounded-lg border border-dashed border-gray-700">
                        <span className="material-symbols-outlined text-5xl text-brand-gray mb-4">videogame_asset_off</span>
                        <h3 className="text-xl font-bold text-white">{t('requestGame.noRequestsTitle')}</h3>
                        <p className="text-brand-gray">{t('requestGame.noRequestsDescription')}</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default RequestGame;