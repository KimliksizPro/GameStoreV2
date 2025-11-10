import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { UserProfile } from '../hooks/useUserProfile';

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
    profile: UserProfile;
    onProfileClick: () => void;
}

const NavButton: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button 
        onClick={onClick} 
        className="font-semibold bg-[#2f2348] text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-brand-purple hover:-translate-y-1 hover:drop-shadow-[0_4px_12px_rgba(var(--color-brand-purple),0.6)]"
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

const Header = forwardRef<HTMLElement, HeaderProps>(({ siteName, siteSlogan, onNavigateHome, onNavigateAdmin, onShowAllGames, onNavigateRequestGame, onNavigateForum, searchQuery, setSearchQuery, profile, onProfileClick }, ref) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    return (
        <header ref={ref} className="sticky top-0 z-50 backdrop-blur-sm bg-brand-dark-2/80 border-b border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap gap-4 py-4">
                    <div className="flex items-center gap-6">
                        <Logo onClick={onNavigateHome} siteName={siteName} siteSlogan={siteSlogan} />
                        <nav className="hidden md:flex items-center gap-2">
                           <NavButton onClick={onShowAllGames}>All Games</NavButton>
                           <NavButton onClick={onNavigateRequestGame}>Request a Game</NavButton>
                           <NavButton onClick={onNavigateForum}>Forum</NavButton>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                         <button 
                            onClick={onProfileClick} 
                            aria-label="User Profile" 
                            className="w-10 h-10 rounded-full bg-brand-light-gray/10 overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-brand-dark-2"
                        >
                            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                        </button>
                         <div className="flex items-center gap-2 transition-all duration-300">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                                className={`bg-brand-light-gray/20 rounded-full py-2 outline-none text-white placeholder-brand-gray border-2 border-transparent focus:border-brand-purple transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 pl-4 pr-2 opacity-100' : 'w-0 p-0 opacity-0 pointer-events-none'}`}
                            />
                            <IconButton onClick={() => setIsSearchOpen(prev => !prev)} aria-label="Toggle search">
                                <span className="material-symbols-outlined">search</span>
                            </IconButton>
                        </div>
                        <IconButton onClick={onNavigateAdmin} aria-label="Admin Panel">
                           <span className="material-symbols-outlined">admin_panel_settings</span>
                        </IconButton>
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;