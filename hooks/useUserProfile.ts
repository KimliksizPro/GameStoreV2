
import { useState, useEffect, useCallback } from 'react';
import { availableAvatars } from '../data/avatars';

export interface UserProfile {
  name: string;
  avatarUrl: string;
}

const PROFILE_STORAGE_KEY = 'game_store_user_profile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
        console.error("Failed to load user profile from storage", error);
    }
  }, []);

  const saveProfile = useCallback((name: string, avatarUrl: string) => {
    const newProfile: UserProfile = { name, avatarUrl };
    setProfile(newProfile);
    try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
    } catch (error) {
        console.error("Failed to save user profile to storage", error);
    }
  }, []);
  
  const defaultProfile: UserProfile = {
      name: 'Guest Player',
      avatarUrl: availableAvatars[0],
  };

  return {
    profile: profile || defaultProfile,
    isProfileSet: !!profile,
    saveProfile,
  };
};
