
import { useState, useEffect } from 'react';
import { Game } from '../types';
import { initialGames } from '../data/games';

const GAMES_STORAGE_KEY = 'games_data';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedGames = localStorage.getItem(GAMES_STORAGE_KEY);
      if (storedGames) {
        setGames(JSON.parse(storedGames));
      } else {
        setGames(initialGames);
        localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(initialGames));
      }
    } catch (error) {
      console.error("Failed to load games from storage", error);
      setGames(initialGames);
    } finally {
        setLoading(false);
    }
  }, []);

  const updateStorage = (updatedGames: Game[]) => {
    setGames(updatedGames);
    localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(updatedGames));
  };

  const addGame = (game: Omit<Game, 'id'>) => {
    const newGame: Game = { ...game, id: Date.now().toString() };
    updateStorage([newGame, ...games]);
  };

  const updateGame = (updatedGame: Game) => {
    const updatedGames = games.map(game =>
      game.id === updatedGame.id ? updatedGame : game
    );
    updateStorage(updatedGames);
  };

  const deleteGame = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    updateStorage(updatedGames);
  };

  const getGameById = (gameId: string | null): Game | undefined => {
      if (!gameId) return undefined;
      return games.find(game => game.id === gameId);
  }

  return { games, loading, addGame, updateGame, deleteGame, getGameById };
};
