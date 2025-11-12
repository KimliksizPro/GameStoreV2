
import React from 'react';
import { Game, User } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
  currentUser: User | null;
  onRequestLogin: () => void;
}

const InfoPill: React.FC<{label: string, value: string}> = ({ label, value }) => (
    <div className="text-sm">
        <span className="font-semibold text-brand-gray mr-2">{label}:</span>
        <span className="font-medium text-white">{value}</span>
    </div>
);

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const PatchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.778 8.222c-4.444 0-8 3.556-8 8 0 .296.022.586.06.874a8 8 0 01-8.712-9.352A8.003 8.003 0 018.222 2.222c4.444 0 8 3.556 8 8 0 .296-.022.586-.06.874.288-.038.578-.06.874-.06.296 0 .586.022.874.06a8 8 0 00-1.492-4.434zM10.222 18.282a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack, currentUser, onRequestLogin }) => {
  const { t, language } = useTranslation();
  
  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
        e.preventDefault();
        onRequestLogin();
    }
  };

  return (
    <section className="py-12 animate-fadeIn">
       <div className="max-w-6xl mx-auto px-4">
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
                <aside className="md:col-span-2">
                    <div className="md:sticky md:top-28">
                        <img 
                            src={game.verticalImageUrl} 
                            alt={game.title[language]}
                            className="w-full h-auto object-cover aspect-[3/4] rounded-2xl shadow-2xl shadow-brand-purple/20"
                        />
                    </div>
                </aside>
                <main className="md:col-span-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tighter">{game.title[language]}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-800 pb-4 mb-6">
                        <InfoPill label={t('gameDetail.genre')} value={game.genre[language]} />
                        <InfoPill label={t('gameDetail.category')} value={game.category[language]} />
                        <InfoPill label={t('gameDetail.release')} value={new Date(game.releaseDate).toLocaleDateString()} />
                    </div>

                    <div className="bg-brand-dark p-4 sm:p-6 rounded-lg border border-gray-800 my-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-3xl font-bold" aria-label={t('gameDetail.price', {price: game.price.toFixed(2)})}>${game.price.toFixed(2)}</p>
                            <div className="flex items-center gap-3">
                                {game.patchUrl && (
                                     <a href={game.patchUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out">
                                        <PatchIcon /> <span>{t('gameDetail.patch')}</span>
                                    </a>
                                )}
                                <a 
                                    href={currentUser ? game.downloadUrl : '#'}
                                    onClick={handleDownloadClick}
                                    target={currentUser ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    title={currentUser ? t('gameDetail.download') : t('hero.loginToDownload')}
                                    className="flex items-center justify-center whitespace-nowrap bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-[0_4px_18px_rgba(109,40,217,0.5)]"
                                >
                                    <DownloadIcon /> <span>{t('gameDetail.download')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand-purple pl-3">{t('gameDetail.about')}</h2>
                        <div className="prose prose-invert prose-p:text-brand-gray text-lg max-w-none">
                            <p>{game.description[language]}</p>
                        </div>
                    </div>
                    
                    {game.screenshots && game.screenshots.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand-purple pl-3">{t('gameDetail.screenshots')}</h2>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {game.screenshots.map((src, index) => (
                                    <a key={index} href={src} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={src} 
                                            alt={`${game.title[language]} screenshot ${index + 1}`}
                                            className="rounded-lg shadow-lg object-cover w-full h-full aspect-video transition-transform duration-300 hover:scale-105"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
       </div>
    </section>
  );
};

export default GameDetail;