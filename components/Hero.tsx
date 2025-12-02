import React, { useState, useEffect, useCallback } from 'react';
import { Game, User } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface HeroProps {
  games: Game[];
  onViewGame: (id: string) => void;
  currentUser: User | null;
  onRequestLogin: () => void;
}

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
          const slideInterval = setInterval(nextSlide, 8000); 
          return () => clearInterval(slideInterval);
      }
  }, [games.length, nextSlide]);

  if (games.length === 0) {
    return (
        <section className="mt-32 container mx-auto px-4">
            <div className="rounded-3xl h-[400px] flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-brand-gray">{t('hero.noFeatured')}</p>
            </div>
        </section>
    );
  }
  
  const game = games[currentIndex];
  const description = game?.description?.[language] || '';

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
        e.preventDefault();
        onRequestLogin();
    }
  };

  return (
    <section className="mt-28 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          {/* Background Images */}
          {games.map((g, index) => (
              <div 
                key={g.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
              >
                 <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[20s] ease-linear scale-105"
                    style={{ 
                        backgroundImage: `url('${g.horizontalImageUrl}')`,
                        transform: index === currentIndex ? 'scale(1.1)' : 'scale(1.0)'
                    }}
                ></div>
                {/* Modern Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-[#0f0720]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0720]/90 via-[#0f0720]/30 to-transparent"></div>
              </div>
          ))}

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
            <div className="max-w-3xl animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-purple text-white rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                    Featured
                </span>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white rounded-full backdrop-blur-md border border-white/10">
                    {game.category?.[language]}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight text-white drop-shadow-lg">
                {game?.title?.[language]}
              </h1>
              
              <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="relative group/btn">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-fuchsia-600 rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300"></div>
                  <a 
                    href={currentUser ? game.downloadUrl : '#'}
                    onClick={handleDownloadClick}
                    target={currentUser ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 bg-[#120b1f] hover:bg-[#1a102e] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-[22px]">download</span>
                    <span>{t('hero.download')}</span>
                  </a>
                </div>
                
                <button 
                    onClick={() => onViewGame(game.id)} 
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30"
                >
                  <span className="material-symbols-outlined text-[22px]">visibility</span>
                  {t('hero.viewGame')}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 hidden md:flex">
             {/* Slide Indicators */}
             <div className="flex gap-2 mr-4 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/5">
                {games.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentIndex(index)} 
                        className={`h-2 rounded-full transition-all duration-500 ${currentIndex === index ? 'w-8 bg-brand-purple' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                        aria-label={t('hero.goToSlide', { slide: (index + 1).toString() })}
                    />
                ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
                <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-brand-purple backdrop-blur-md border border-white/10 transition-all text-white group-hover:bg-brand-purple">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-brand-purple backdrop-blur-md border border-white/10 transition-all text-white group-hover:bg-brand-purple">
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;