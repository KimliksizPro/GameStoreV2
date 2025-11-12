
import { useState, useEffect, useCallback } from 'react';
import { RequestedGame, User } from '../types';

const REQUESTED_GAMES_API = 'https://api.npoint.io/bc06a4a34d18b00f4e5e';

export const useRequestedGames = () => {
  const [requestedGames, setRequestedGames] = useState<RequestedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestedGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(REQUESTED_GAMES_API);
      if (!response.ok) {
        throw new Error('Failed to fetch requested games.');
      }
      const data = await response.json();
      // npoint returns {} for an empty bin, so handle that
      if (Array.isArray(data)) {
        setRequestedGames(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        setRequestedGames([]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      setRequestedGames([]); // Fallback to empty on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequestedGames();
  }, [fetchRequestedGames]);

  const updateRemoteRequestedGames = useCallback(async (updatedGames: RequestedGame[]): Promise<boolean> => {
    try {
      const response = await fetch(REQUESTED_GAMES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGames),
      });
      return response.ok;
    } catch (e) {
      console.error('Failed to update remote requested games:', e);
      return false;
    }
  }, []);

  const addRequestedGame = useCallback(async (gameData: { gameTitle: string; reason: string }, user: User): Promise<{ success: boolean }> => {
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
    
    // Optimistic update
    setRequestedGames(updatedGames);
    const success = await updateRemoteRequestedGames(updatedGames);

    if (!success) {
      // Revert on failure
      setRequestedGames(requestedGames);
      return { success: false };
    }
    return { success: true };
  }, [requestedGames, updateRemoteRequestedGames]);

  const deleteRequestedGame = useCallback(async (requestId: string): Promise<{ success: boolean }> => {
    const originalGames = [...requestedGames];
    const updatedGames = requestedGames.filter(req => req.id !== requestId);
    
    setRequestedGames(updatedGames); // Optimistic update

    const success = await updateRemoteRequestedGames(updatedGames);

    if (!success) {
      // Revert on failure
      setRequestedGames(originalGames);
      return { success: false };
    }

    return { success: true };
  }, [requestedGames, updateRemoteRequestedGames]);


  return { requestedGames, loading, error, addRequestedGame, deleteRequestedGame };
};