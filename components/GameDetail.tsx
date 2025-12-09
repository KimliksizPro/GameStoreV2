
import React, { useState } from 'react';
import { Game, User } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
  currentUser: User | null;
  onRequestLogin: () => void;
}

type Tab = 'description' | 'requirements' | 'reviews';

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack, currentUser, onRequestLogin }) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('description');
  
  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
        e.preventDefault();
        onRequestLogin();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requirements':
        return (
           <div className="animate-fadeIn space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-lg text-brand-light-purple mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">memory</span>
                        {t('gameDetail.minimum')}
                    </h4>
                    <pre className="text-sm whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">{game.systemRequirements?.minimum?.[language]}</pre>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">speed</span>
                        {t('gameDetail.recommended')}
                    </h4>
                    <pre className="text-sm whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">{game.systemRequirements?.recommended?.[language]}</pre>
                </div>
             </div>
           </div>
        );
      case 'reviews':
        return (
          <div className="animate-fadeIn bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
            <span className="material-symbols-outlined text-5xl text-brand-gray mb-4">rate_review</span>
            <h3 className="text-2xl font-bold text-white mb-2">{t('gameDetail.userReviews')}</h3>
            <p className="text-gray-400">Reviews feature is currently under development.</p>
          </div>
        )
      case 'description':
      default:
        return (
          <div className="animate-fadeIn space-y-8">
            <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed">{game.description?.[language]}</p>
            </div>
             {game.screenshots && game.screenshots.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-purple">imagesmode</span>
                        {t('gameDetail.screenshots')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {game.screenshots.map((src, index) => (
                           <a 
                            key={index} 
                            href={src} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg"
                           >
                               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                               <img src={src} alt="Screenshot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">zoom_in</span>
                               </div>
                           </a>
                       ))}
                    </div>
                </div>
            )}
          </div>
        );
    }
  }
  
  const TabButton: React.FC<{tab: Tab, label: string, icon: string}> = ({ tab, label, icon }) => (
       <button 
        onClick={() => setActiveTab(tab)} 
        className={`
            flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-medium text-sm
            ${activeTab === tab 
                ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20 translate-y-[-2px]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
        `}
      >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
          {label}
      </button>
  );

  return (
    <div className="relative min-h-screen pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#0f0720]/90 z-10"></div>
          <img src={game.horizontalImageUrl} className="w-full h-full object-cover blur-3xl opacity-30 animate-pulse-slow" alt="Background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation */}
        <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
        >
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
            <span className="text-sm font-bold">{t('gameDetail.backToStore')}</span>
        </button>

        {/* Header Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-10 group">
             <div className="aspect-[21/9] md:aspect-[3/1] relative">
                 <img src={game.horizontalImageUrl} alt={game.title?.[language]} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-black/40 to-transparent"></div>
                 
                 <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex flex-col md:flex-row justify-between items-end gap-6">
                     <div className="max-w-2xl">
                         <div className="flex items-center gap-3 mb-3">
                             <span className="px-3 py-1 bg-brand-purple/80 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                                {game.category?.[language]}
                             </span>
                             <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-bold text-gray-300 border border-white/10 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                {new Date(game.releaseDate).getFullYear()}
                             </span>
                         </div>
                         <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight drop-shadow-xl">
                            {game.title?.[language]}
                         </h1>
                     </div>
                     
                     <a href={game.trailerUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all group/play cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/play:scale-110 transition-transform">
                            <span className="material-symbols-outlined">play_arrow</span>
                        </div>
                        <span className="font-bold text-white">Watch Trailer</span>
                     </a>
                 </div>
             </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-3 pb-4 border-b border-white/10">
                    <TabButton tab="description" label={t('gameDetail.descriptionTab')} icon="description" />
                    {game.systemRequirements && <TabButton tab="requirements" label={t('gameDetail.requirementsTab')} icon="memory" />}
                    <TabButton tab="reviews" label={t('gameDetail.reviewsTab')} icon="star" />
                </div>
                
                {/* Dynamic Content */}
                <div className="min-h-[400px]">
                    {renderTabContent()}
                </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-28 space-y-6">
                    {/* Game Card / CTA */}
                    <div className="bg-[#1a102e]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-purple/30 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 flex gap-5 mb-6">
                            <img src={game.verticalImageUrl} alt="Cover" className="w-24 h-32 object-cover rounded-xl shadow-lg border border-white/5" />
                            <div className="flex flex-col justify-center">
                                <p className="text-brand-gray text-xs uppercase tracking-wider font-bold mb-1">{t('gameDetail.price')}</p>
                                <div className="text-3xl font-black text-white">
                                    {game.price === 0 ? <span className="text-green-400">FREE</span> : `$${game.price}`}
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400 mt-2">
                                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                                    <span className="material-symbols-outlined text-sm fill-current">star_half</span>
                                    <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative group/dl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-pink-600 rounded-xl blur opacity-70 group-hover/dl:opacity-100 transition duration-300"></div>
                            <a 
                              href={currentUser ? game.downloadUrl : '#'}
                              onClick={handleDownloadClick}
                              target={currentUser ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="relative flex items-center justify-center gap-3 w-full bg-[#120b1f] hover:bg-[#1C162D] text-white py-4 rounded-xl font-bold transition-all border border-white/10"
                            >
                                <span className="material-symbols-outlined">download</span>
                                {t('hero.download')}
                            </a>
                        </div>
                        
                        {!currentUser && (
                            <p className="text-center text-xs text-brand-gray mt-3">
                                Create a profile to download games.
                            </p>
                        )}
                    </div>

                    {/* Game Info */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-brand-gray">info</span>
                            Game Info
                        </h3>
                        <div className="space-y-4 text-sm">
                            <InfoRow label={t('gameDetail.developer')} value={game.developer?.[language]} />
                            <InfoRow label={t('gameDetail.publisher')} value={game.publisher?.[language]} />
                            <InfoRow label={t('gameDetail.releaseDate')} value={new Date(game.releaseDate).toLocaleDateString()} />
                            <InfoRow label={t('gameDetail.genre')} value={game.genre?.[language]} />
                            <InfoRow label={t('gameDetail.platforms')} value={game.platform} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{label: string, value?: string}> = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
        <span className="text-brand-gray">{label}</span>
        <span className="text-white font-medium text-right max-w-[60%] truncate">{value || '-'}</span>
    </div>
);

export default GameDetail;
