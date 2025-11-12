import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { translations } from '../lib/translations';
import type { TranslationKeys } from '../lib/translations';

export type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr'); // Default to Turkish

  useEffect(() => {
    const storedLanguage = localStorage.getItem('game-store-language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'tr')) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('game-store-language', lang);
  };
  
  const t = useCallback((key: TranslationKeys, replacements: Record<string, string> = {}): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            console.warn(`Translation key not found: ${key} for language: ${language}`);
            // Fallback to English if key not found in current language
            let fallbackResult: any = translations['en'];
             for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
             }
             result = fallbackResult || key;
             break;
        }
    }

    let resultString = String(result);

    for (const placeholder in replacements) {
        resultString = resultString.replace(`{${placeholder}}`, replacements[placeholder]);
    }
    
    return resultString;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
