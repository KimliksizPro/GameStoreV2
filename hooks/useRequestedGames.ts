
import { useState, useEffect, useCallback } from 'react';
import { RequestedGame, User } from '../types';

const REQUESTS_STORAGE_KEY = 'game_store_requests_data';

export const useRequestedGames = () => {
  const [requestedGames, setRequestedGames] = useState<RequestedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedRequests = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (storedRequests) {
        setRequestedGames(JSON.parse(storedRequests));
      } else {
        setRequestedGames([]);
      }
    } catch (e) {
      console.error('Failed to load requested games from storage:', e);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveToStorage = (games: RequestedGame[]) => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(games));
      return true;
    } catch (e) {
      console.error('Failed to save requested games to storage:', e);
      return false;
    }
  };

  const addRequestedGame = async (gameData: { gameTitle: string; reason: string }, user: User): Promise<{ success: boolean }> => {
    const newRequest: RequestedGame = {
      id: Date.now().toString(),
      gameTitle: gameData.gameTitle,
      reason: gameData.reason,
      userId: user.id,
      requestedBy: user.username,
      avatarUrl: user.avatarUrl,
      createdAt: new Date().toISOString(),
    };

    const updatedGames = [newRequest, ...requestedGames];
    setRequestedGames(updatedGames);
    const success = saveToStorage(updatedGames);

    return { success };
  };

  const deleteRequestedGame = async (requestId: string): Promise<{ success: boolean }> => {
    const updatedGames = requestedGames.filter(req => req.id !== requestId);
    setRequestedGames(updatedGames);
    const success = saveToStorage(updatedGames);
    return { success };
  };

  return { requestedGames, loading, error, addRequestedGame, deleteRequestedGame };
};
