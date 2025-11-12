import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { User } from '../types';
import { useTranslation, Language } from '../hooks/useTranslation';

const Logo = ({ onClick, siteName, siteSlogan }: { onClick: () => void, siteName: string, siteSlogan: string }) => (
    <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H12V12H4V4Z" fill="currentColor" className="text-brand-light-purple"/>
            <path d="M12 12H20V20H12V12Z" fill="currentColor" className="text-brand-purple"/>
        </svg>
        <div>
          <span className="font-bold text-xl">{siteName}</span>
          {siteSlogan && <p className="text-xs text-brand-gray -mt-1 hidden sm:block">{siteSlogan}</p>}
        </div>
    </div>
);


interface HeaderProps {
    siteName: string;
    siteSlogan: string;
    onNavigateHome: () => void;
    onNavigateAdmin: () => void;
    onShowAllGames: () => void;
    onNavigateRequestGame: () => void;
    onNavigateForum: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentUser: User | null;
    onLoginClick: () => void;
    onSignupClick: () => void;
    onLogout: () => void;
}

const NavButton: React.FC<{onClick: () => void, children: React.ReactNode, variant?: 'primary' | 'secondary'}> = ({ onClick, children, variant = 'secondary' }) => (
    <button 
        onClick={onClick} 
        className={`font-semibold px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-px w-full text-left md:w-auto md:text-center ${
          variant === 'primary' 
            ? 'bg-brand-purple text-white hover:bg-violet-500 hover:drop-shadow-[0_4px_12px_rgba(var(--color-brand-purple),0.6)]' 
            : 'bg-[#2f2348] text-white hover:bg-brand-purple'
        }`}
    >
        {children}
    </button>
);

const IconButton: React.FC<{onClick: () => void, children: React.ReactNode, 'aria-label': string}> = ({ onClick, children, 'aria-label': ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-light-gray/10 text-brand-gray hover:text-white hover:bg-brand-light-gray/20 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-brand-dark-2 transition-all duration-300"
    >
        {children}
    </button>
);

const UserMenu: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-brand-light-gray/10 overflow-hidden ring-2 ring-transparent hover:ring-brand-purple transition-all"
            >
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2f2348] rounded-lg shadow-lg border border-gray-700 py-1 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsOpen(false); }} className="block px-4 py-2 text-sm text-brand-gray hover:bg-brand-purple hover:text-white transition-colors w-full text-left">
                        {t('header.logout')}
                    </a>
                </div>
            )}
        </div>
    );
};

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <IconButton onClick={() => setIsOpen(!isOpen)} aria-label="Change language">
                <span className="material-symbols-outlined">language</span>
            </IconButton>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#2f2348] rounded-lg shadow-lg border border-gray-700 py-1 animate-fadeIn">
                    {languages.map(lang => (
                        <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-brand-purple transition-colors ${language === lang.code ? 'text-white font-semibold' : 'text-brand-gray'}`}>
                           <span>{lang.flag}</span> <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

interface MobileMenuProps extends Omit<HeaderProps, 'siteName' | 'siteSlogan' | 'searchQuery' | 'setSearchQuery' | 'onNavigateHome'> {
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
    onShowAllGames, 
    onNavigateRequestGame, 
    onNavigateForum, 
    onClose,
    currentUser,
    onLoginClick,
    onSignupClick,
    onLogout
}) => {
    const { t } = useTranslation();
    const handleNavigation = (navFunc: () => void) => {
        navFunc();
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-brand-dark-2 z-40 p-6 pt-24 animate-fadeIn md:hidden">
            <nav className="flex flex-col gap-4">
                <NavButton onClick={() => handleNavigation(onShowAllGames)}>{t('header.allGames')}</NavButton>
                <NavButton onClick={() => handleNavigation(onNavigateRequestGame)}>{t('header.requestGame')}</NavButton>
                <NavButton onClick={() => handleNavigation(onNavigateForum)}>{t('header.forum')}</NavButton>
                 <div className="w-full h-px bg-gray-700 my-2"></div>
                {currentUser ? (
                     <NavButton onClick={() => handleNavigation(onLogout)}>{t('header.logout')}</NavButton>
                ) : (
                    <>
                        <NavButton onClick={() => handleNavigation(onLoginClick)} variant="secondary">{t('header.login')}</NavButton>
                        <NavButton onClick={() => handleNavigation(onSignupClick)} variant="primary">{t('header.signup')}</NavButton>
                    </>
                )}
            </nav>
        </div>
    );
};

const Header = forwardRef<HTMLElement, HeaderProps>(({ siteName, siteSlogan, onNavigateHome, onNavigateAdmin, onShowAllGames, onNavigateRequestGame, onNavigateForum, searchQuery, setSearchQuery, currentUser, onLoginClick, onSignupClick, onLogout }, ref) => {
    const { t } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

     useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header ref={ref} className="sticky top-0 z-30 backdrop-blur-sm bg-brand-dark-2/80 border-b border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap gap-4 py-4">
                        <div className="flex items-center gap-6">
                            <Logo onClick={onNavigateHome} siteName={siteName} siteSlogan={siteSlogan} />
                            <nav className="hidden md:flex items-center gap-2">
                               <NavButton onClick={onShowAllGames}>{t('header.allGames')}</NavButton>
                               <NavButton onClick={onNavigateRequestGame}>{t('header.requestGame')}</NavButton>
                               <NavButton onClick={onNavigateForum}>{t('header.forum')}</NavButton>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                             <div className="hidden sm:flex items-center gap-2 transition-all duration-300">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={t('header.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                                    className={`bg-brand-light-gray/20 rounded-full py-2 outline-none text-white placeholder-brand-gray border-2 border-transparent focus:border-brand-purple transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 pl-4 pr-2 opacity-100' : 'w-0 p-0 opacity-0 pointer-events-none'}`}
                                />
                                <IconButton onClick={() => setIsSearchOpen(prev => !prev)} aria-label={t('header.toggleSearch')}>
                                    <span className="material-symbols-outlined">search</span>
                                </IconButton>
                            </div>
                            <LanguageSwitcher />
                            <IconButton onClick={onNavigateAdmin} aria-label={t('header.adminPanel')}>
                               <span className="material-symbols-outlined">admin_panel_settings</span>
                            </IconButton>
                            <div className="hidden sm:block w-px h-6 bg-gray-700 mx-1"></div>
                            {currentUser ? (
                                <UserMenu user={currentUser} onLogout={onLogout} />
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <NavButton onClick={onLoginClick} variant="secondary">{t('header.login')}</NavButton>
                                    <NavButton onClick={onSignupClick} variant="primary">{t('header.signup')}</NavButton>
                                </div>
                            )}
                             <div className="md:hidden relative z-50">
                                <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={t('header.toggleMenu')}>
                                    <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isMobileMenuOpen && (
                <MobileMenu {...{ onShowAllGames, onNavigateRequestGame, onNavigateForum, onNavigateAdmin, currentUser, onLoginClick, onSignupClick, onLogout }} onClose={() => setIsMobileMenuOpen(false)} />
            )}
        </>
    );
});

Header.displayName = 'Header';

export default Header;