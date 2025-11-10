
import { useState, useEffect } from 'react';

export interface SiteSettings {
  siteName: string;
  siteSlogan: string;
  themeColor: 'purple' | 'blue' | 'green';
  showFeaturedSection: boolean;
  maintenanceMode: boolean;
  contactEmail: string;
}

const SETTINGS_STORAGE_KEY = 'site_settings';
const defaultSettings: SiteSettings = {
  siteName: 'Semih',
  siteSlogan: 'Your Ultimate Game Destination',
  themeColor: 'purple',
  showFeaturedSection: true,
  maintenanceMode: false,
  contactEmail: 'support@semih.games'
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        // Merge stored settings with defaults to handle new settings being added
        const loadedSettings = JSON.parse(storedSettings);
        setSettings({ ...defaultSettings, ...loadedSettings });
      } else {
        setSettings(defaultSettings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      }
    } catch (error)
     {
      console.error("Failed to load site settings from storage", error);
      setSettings(defaultSettings);
    } finally {
        setLoading(false);
    }
  }, []);

  const updateSettings = (updatedSettings: SiteSettings) => {
    setSettings(updatedSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
  };
  
  return { settings, loading, updateSettings };
};