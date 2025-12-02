import React from 'react';
import { Game } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const { language } = useTranslation();
  return (
    <div 
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#1a102e] border border-white/5 transition-all duration-500 hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-2"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative">
          <img 
            src={game.verticalImageUrl} 
            alt={game.title?.[language]}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
          
          {/* Hover Overlay Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-brand-purple text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-brand-purple/40 flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">play_arrow</span>
                 Play
              </div>
          </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 transform group-hover:-translate-y-1">
        <h3 className="font-bold text-lg text-white truncate drop-shadow-md group-hover:text-brand-light-purple transition-colors">{game.title?.[language]}</h3>
        <div className="flex justify-between items-center mt-1">
             <p className="text-xs text-gray-400 font-medium tracking-wide">{game.category?.[language]}</p>
             {game.price === 0 ? (
                 <span className="text-xs font-bold text-green-400 uppercase tracking-wider bg-green-400/10 px-2 py-0.5 rounded">Free</span>
             ) : (
                 <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">${game.price}</span>
             )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;