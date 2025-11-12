
import React, { useState, useEffect, useCallback } from 'react';
import { Game, User } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface HeroProps {
  games: Game[];
  onViewGame: (id: string) => void;
  currentUser: User | null;
  onRequestLogin: () => void;
}

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const Hero: React.FC<HeroProps> = ({ games, onViewGame, currentUser, onRequestLogin }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useTranslation();

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === games.length - 1 ? 0 : prevIndex + 1));
  }, [games.length]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
      if (games.length > 1) {
          const slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
          return () => clearInterval(slideInterval);
      }
  }, [games.length, nextSlide]);

  if (games.length === 0) {
    return (
        <section className="mt-12">
            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] flex items-center justify-center p-8 md:p-16 bg-brand-dark">
                <p className="text-brand-gray">{t('hero.noFeatured')}</p>
            </div>
        </section>
    );
  }
  
  const game = games[currentIndex];
  const description = game.description[language];

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
        e.preventDefault();
        onRequestLogin();
    }
  };

  return (
    <section className="mt-12 relative">
      <div 
        className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] flex items-center p-8 md:p-16 bg-cover bg-center transition-all duration-1000 ease-in-out" 
        style={{ 
          backgroundImage: `url('${game.horizontalImageUrl}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div 
            className="absolute inset-0 bg-brand-purple opacity-0 mix-blend-overlay animate-pulse" 
            style={{ animationDuration: '4s', animationDelay: `${currentIndex * 100}ms`}}
        ></div>
        
        <div key={game.id} className="relative z-10 max-w-xl text-white animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {game.title[language]}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {description.length > 150 ? `${description.substring(0, 150)}...` : description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={currentUser ? game.downloadUrl : '#'}
              onClick={handleDownloadClick}
              target={currentUser ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={currentUser ? t('hero.download') : t('hero.loginToDownload')}
              className="flex items-center justify-center whitespace-nowrap bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-[0_4px_18px_rgba(109,40,217,0.5)]"
            >
              <DownloadIcon />
              <span>{t('hero.download')}</span>
            </a>
            <button onClick={() => onViewGame(game.id)} className="bg-gray-900/50 backdrop-blur-sm border border-white/20 hover:bg-gray-900/75 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out">
              {t('hero.viewGame')}
            </button>
          </div>
        </div>
      </div>

      {games.length > 1 && (
        <>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors" aria-label={t('hero.prevGame')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors" aria-label={t('hero.nextGame')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {games.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-colors`} aria-label={t('hero.goToSlide', { slide: (index + 1).toString() })}></button>
                ))}
            </div>
        </>
      )}
    </section>
  );
};

export default Hero;