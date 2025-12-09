
import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { User } from '../types';
import { useTranslation, Language } from '../hooks/useTranslation';

const Logo = ({ onClick, siteName, siteSlogan }: { onClick: () => void, siteName: string, siteSlogan: string }) => (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-violet-900 shadow-lg shadow-brand-purple/20 transition-transform group-hover:scale-105">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M6 6H10V10H6V6Z" fill="currentColor"/>
                <path d="M14 14H18V18H14V14Z" fill="currentColor" fillOpacity="0.5"/>
                <path d="M14 6H18V10H14V6Z" fill="currentColor"/>
                <path d="M6 14H10V18H6V14Z" fill="currentColor"/>
            </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight leading-none group-hover:text-brand-light-purple transition-colors">{siteName}</span>
          {siteSlogan && <p className="text-[10px] text-brand-gray uppercase tracking-widest hidden sm:block">{siteSlogan}</p>}
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
    onProfileClick: () => void;
    onLogout: () => void;
}

const NavLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button 
        onClick={onClick} 
        className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
    >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </button>
);

const IconButton: React.FC<{onClick: () => void, children: React.ReactNode, 'aria-label': string, active?: boolean}> = ({ onClick, children, 'aria-label': ariaLabel, active }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${active ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
    >
        {children}
    </button>
);

const ActionButton: React.FC<{onClick: () => void, children: React.ReactNode, variant?: 'primary' | 'secondary'}> = ({ onClick, children, variant = 'primary' }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
            variant === 'primary' 
            ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/25 hover:bg-violet-500' 
            : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
        }`}
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
                className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-dark-2 to-black p-[2px] overflow-hidden ring-2 ring-transparent hover:ring-brand-purple transition-all"
            >
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover rounded-full" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1a102e] rounded-xl shadow-2xl border border-white/10 py-2 animate-fadeIn origin-top-right backdrop-blur-xl">
                    <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-xs text-brand-gray uppercase tracking-wider">Profile</p>
                        <p className="text-sm font-bold text-white truncate mt-1">{user.username}</p>
                    </div>
                    <button onClick={(e) => { onLogout(); setIsOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-brand-gray hover:bg-white/5 hover:text-white transition-colors text-left">
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Reset Profile
                    </button>
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
                <span className="material-symbols-outlined text-[20px]">translate</span>
            </IconButton>
            {isOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-[#1a102e] rounded-xl shadow-2xl border border-white/10 py-2 animate-fadeIn backdrop-blur-xl">
                    {languages.map(lang => (
                        <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-white/5 transition-colors ${language === lang.code ? 'text-brand-purple font-bold' : 'text-gray-300'}`}>
                           <span className="text-lg">{lang.flag}</span> <span>{lang.name}</span>
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
    onProfileClick,
    onLogout
}) => {
    const { t } = useTranslation();
    const handleNavigation = (navFunc: () => void) => {
        navFunc();
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-center items-center animate-fadeIn md:hidden">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white">
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <nav className="flex flex-col gap-6 w-full max-w-xs text-center">
                <button onClick={() => handleNavigation(onShowAllGames)} className="text-2xl font-bold text-white hover:text-brand-purple transition-colors">{t('header.allGames')}</button>
                <button onClick={() => handleNavigation(onNavigateRequestGame)} className="text-2xl font-bold text-white hover:text-brand-purple transition-colors">{t('header.requestGame')}</button>
                <button onClick={() => handleNavigation(onNavigateForum)} className="text-2xl font-bold text-white hover:text-brand-purple transition-colors">{t('header.forum')}</button>
                <div className="w-full h-px bg-white/10 my-4"></div>
                {currentUser ? (
                     <ActionButton onClick={() => handleNavigation(onLogout)}>Reset Profile</ActionButton>
                ) : (
                    <ActionButton onClick={() => handleNavigation(onProfileClick)} variant="primary">Create Profile</ActionButton>
                )}
            </nav>
        </div>
    );
};

const Header = forwardRef<HTMLElement, HeaderProps>(({ siteName, siteSlogan, onNavigateHome, onNavigateAdmin, onShowAllGames, onNavigateRequestGame, onNavigateForum, searchQuery, setSearchQuery, currentUser, onProfileClick, onLogout }, ref) => {
    const { t } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <header ref={ref} className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'max-w-7xl' : ''}`}>
                    <div className={`
                        flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300
                        ${scrolled ? 'bg-[#1a102e]/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'}
                    `}>
                        <div className="flex items-center gap-8">
                            <Logo onClick={onNavigateHome} siteName={siteName} siteSlogan={siteSlogan} />
                            <nav className="hidden md:flex items-center gap-1">
                               <NavLink onClick={onShowAllGames}>{t('header.allGames')}</NavLink>
                               <NavLink onClick={onNavigateRequestGame}>{t('header.requestGame')}</NavLink>
                               <NavLink onClick={onNavigateForum}>{t('header.forum')}</NavLink>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                             <div className={`hidden sm:flex items-center bg-white/5 rounded-full border border-white/5 transition-all duration-300 ${isSearchOpen ? 'w-64 px-2 bg-white/10' : 'w-10 bg-transparent border-transparent'}`}>
                                <IconButton onClick={() => setIsSearchOpen(prev => !prev)} aria-label={t('header.toggleSearch')}>
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </IconButton>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={t('header.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                                    className={`bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 transition-all duration-300 ${isSearchOpen ? 'w-full px-2 opacity-100' : 'w-0 p-0 opacity-0'}`}
                                />
                            </div>
                            
                            <LanguageSwitcher />
                            
                            <IconButton onClick={onNavigateAdmin} aria-label={t('header.adminPanel')}>
                               <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                            </IconButton>
                            
                            <div className="hidden sm:block w-px h-6 bg-white/10 mx-1"></div>
                            
                            {currentUser ? (
                                <UserMenu user={currentUser} onLogout={onLogout} />
                            ) : (
                                <div className="hidden sm:flex items-center gap-3">
                                    <ActionButton onClick={onProfileClick} variant="primary">Create Profile</ActionButton>
                                </div>
                            )}
                            
                             <div className="md:hidden">
                                <IconButton onClick={() => setIsMobileMenuOpen(true)} aria-label={t('header.toggleMenu')}>
                                    <span className="material-symbols-outlined">menu</span>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isMobileMenuOpen && (
                <MobileMenu {...{ onShowAllGames, onNavigateRequestGame, onNavigateForum, onNavigateAdmin, currentUser, onProfileClick, onLogout }} onClose={() => setIsMobileMenuOpen(false)} />
            )}
        </>
    );
});

Header.displayName = 'Header';

export default Header;
