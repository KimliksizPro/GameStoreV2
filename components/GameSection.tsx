import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';

interface GameSectionProps {
  title: string;
  games: Game[];
  onGameClick: (id: string) => void;
}

const GameSection: React.FC<GameSectionProps> = ({ title, games, onGameClick }) => {
  if (games.length === 0) return null;

  return (
    <section className="animate-fadeInUp relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-purple/50 to-transparent"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {games.map((game, index) => (
          <div key={game.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms`}}>
            <GameCard game={game} onClick={() => onGameClick(game.id)} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameSection;