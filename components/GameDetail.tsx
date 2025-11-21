

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

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

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
           <section id="requirements" className="space-y-4 text-[#d1c8e7]">
             <h3 className="text-2xl font-bold text-white">{t('gameDetail.requirementsTitle')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-lg text-brand-light-purple mb-2">{t('gameDetail.minimum')}</h4>
                    <pre className="text-sm whitespace-pre-wrap font-sans">{game.systemRequirements?.minimum?.[language]}</pre>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-brand-light-purple mb-2">{t('gameDetail.recommended')}</h4>
                    <pre className="text-sm whitespace-pre-wrap font-sans">{game.systemRequirements?.recommended?.[language]}</pre>
                </div>
             </div>
           </section>
        );
      case 'reviews':
        return (
          <section id="reviews" className="space-y-4 text-[#d1c8e7]">
            <h3 className="text-2xl font-bold text-white">{t('gameDetail.userReviews')}</h3>
            <p>User reviews are coming soon!</p>
          </section>
        )
      case 'description':
      default:
        return (
          <>
            <section className="space-y-4 text-[#d1c8e7]" id="description">
                <h3 className="text-2xl font-bold text-white">{t('gameDetail.about')}</h3>
                <p>{game.description?.[language]}</p>
            </section>
             {game.screenshots && game.screenshots.length > 0 && (
                <section className="space-y-4" id="media">
                    <h3 className="text-2xl font-bold text-white">{t('gameDetail.screenshots')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {game.screenshots.map((src, index) => (
                           <a key={index} href={src} target="_blank" rel="noopener noreferrer" className="aspect-video bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-105" style={{backgroundImage: `url("${src}")`}} title={`${game.title?.[language]} screenshot ${index + 1}`}></a>
                       ))}
                    </div>
                </section>
            )}
          </>
        );
    }
  }
  
  const TabButton: React.FC<{tab: Tab, label: string}> = ({ tab, label }) => (
       <button onClick={() => setActiveTab(tab)} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${activeTab === tab ? 'border-b-brand-purple text-white' : 'border-b-transparent text-brand-gray hover:text-white'}`}>
          <p className="text-sm font-bold leading-normal tracking-[0.015em]">{label}</p>
      </button>
  );

  return (
    <div className="animate-fadeIn">
      {/* Back Button */}
       <button 
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors"
          aria-label={t('gameDetail.backToStore')}
      >
          <span className="material-symbols-outlined">arrow_back</span>
          {t('gameDetail.backToStore')}
      </button>
      
      {/* Hero Section */}
      <section className="mb-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">{game.title?.[language]}</p>
              <p className="text-brand-gray text-base font-normal leading-normal">{game.genre?.[language]}</p>
            </div>
          </div>
          <div 
            className="relative flex items-center justify-center bg-cover bg-center aspect-video rounded-xl overflow-hidden" 
            style={{backgroundImage: `url("${game.horizontalImageUrl}")`}}
          >
            <a href={game.trailerUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/40 text-white backdrop-blur-sm transition-transform hover:scale-110" aria-label="Play trailer">
              <span className="material-symbols-outlined text-4xl">play_arrow</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="pb-3 sticky top-[65px] bg-brand-dark/80 backdrop-blur-sm z-10">
            <div className="flex border-b border-[#443267] gap-8">
                <TabButton tab="description" label={t('gameDetail.descriptionTab')} />
                {game.systemRequirements && <TabButton tab="requirements" label={t('gameDetail.requirementsTab')} />}
                <TabButton tab="reviews" label={t('gameDetail.reviewsTab')} />
            </div>
          </div>
          {/* Tab Content */}
          <div className="py-8 space-y-10">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-[130px] space-y-6">
            <div className="bg-[#211833] p-6 rounded-xl space-y-5 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 bg-cover bg-center rounded-md flex-shrink-0" style={{backgroundImage: `url("${game.verticalImageUrl}")`}}></div>
                <div className="flex flex-col">
                  <p className="text-white font-bold text-xl">{game.title?.[language]}</p>
                  <p className="text-sm text-brand-gray">{game.developer?.[language]}</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-brand-purple rounded-lg blur-md opacity-0 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
                <a 
                  href={currentUser ? game.downloadUrl : '#'}
                  onClick={handleDownloadClick}
                  target={currentUser ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  title={currentUser ? t('hero.download') : t('hero.loginToDownload')}
                  className="relative flex items-center justify-center h-12 px-5 bg-brand-purple hover:bg-violet-500 text-white text-base font-bold leading-normal tracking-[0.015em] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-brand-light-purple/50 hover:border-brand-light-purple"
                >
                  <DownloadIcon />
                  <span className="truncate">{t('hero.download')}</span>
                </a>
              </div>
              <div className="border-t border-[#443267] pt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray">{t('gameDetail.genre')}:</span> <span className="text-white font-medium">{game.genre?.[language]}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray">{t('gameDetail.developer')}:</span> <span className="text-white font-medium">{game.developer?.[language]}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray">{t('gameDetail.publisher')}:</span> <span className="text-white font-medium">{game.publisher?.[language]}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray">{t('gameDetail.releaseDate')}:</span> <span className="text-white font-medium">{new Date(game.releaseDate).toLocaleDateString()}</span></div>
                {game.platform && <div className="flex justify-between items-center"><span className="text-brand-gray">{t('gameDetail.platforms')}:</span> <span className="text-white font-medium">{game.platform}</span></div>}
              </div>
            </div>
            
            <div className="bg-[#211833] p-6 rounded-xl space-y-4 border border-gray-800">
                <h3 className="text-xl font-bold text-white">{t('gameDetail.userReviews')}</h3>
                <div>
                    <p className="text-lg font-bold text-green-400">{t('gameDetail.reviewStatus')}</p>
                    <p className="text-sm text-brand-gray">{t('gameDetail.reviewSummary')}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;