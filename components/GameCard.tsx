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
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg shadow-black/30 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-purple/40 hover:-translate-y-2"
      onClick={onClick}
    >
      <img 
        src={game.verticalImageUrl} 
        alt={game.title[language]}
        className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* Price Badge */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
        ${game.price.toFixed(2)}
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg truncate">{game.title[language]}</h3>
        <p className="text-sm text-brand-gray">{game.category[language]}</p>
      </div>
    </div>
  );
};

export default GameCard;