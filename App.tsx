import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameSection from './components/GameSection';
import Footer from './components/Footer';
import GameDetail from './components/GameDetail';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import RequestGame from './components/RequestGame';
import BackToTopButton from './components/BackToTopButton';
import GameCardSkeleton from './components/GameCardSkeleton';
import ForumPage from './components/ForumPage';
import TopicDetail from './components/TopicDetail';
import UserProfileModal from './components/UserProfileModal';
import TopicModal from './components/TopicModal';
import { useGames } from './hooks/useGames';
import { useSiteSettings, SiteSettings } from './hooks/useSiteSettings';
import { useForum } from './hooks/useForum';
import { useUserProfile, UserProfile } from './hooks/useUserProfile';
import { ToastProvider, useToast } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { Game, ForumTopic, ForumComment } from './types';


type View = {
  page: 'home' | 'game' | 'admin' | 'request' | 'forum' | 'topic';
  id?: string | null;
}

const themeColorMap = {
    purple: {
      '--color-brand-purple': '109 40 217',
      '--color-brand-light-purple': '167 139 250',
    },
    blue: {
      '--color-brand-purple': '37 99 235',
      '--color-brand-light-purple': '96 165 250',
    },
    green: {
      '--color-brand-purple': '22 163 74',
      '--color-brand-light-purple': '74 222 128',
    },
};

const AppContent: React.FC = () => {
  const { games, loading: gamesLoading, addGame, updateGame, deleteGame, getGameById } = useGames();
  const { settings, loading: settingsLoading, updateSettings } = useSiteSettings();
  const { topics, loading: forumLoading, getTopicById, addTopic, updateTopic, addComment, deleteTopic } = useForum();
  const { profile, isProfileSet, saveProfile } = useUserProfile();
  const [view, setView] = useState<View>({ page: 'home', id: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<ForumTopic | null>(null);
  const { showToast } = useToast();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const loading = gamesLoading || settingsLoading || forumLoading;

  useEffect(() => {
    if (!headerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(headerRef.current);
    setHeaderHeight(headerRef.current?.offsetHeight ?? 0); // Initial measurement

    return () => resizeObserver.disconnect();
  }, []);


  useEffect(() => {
    // This is for the main site theme, not the new admin panel theme
    const rootStyle = document.documentElement.style;
    const colors = themeColorMap[settings.themeColor] || themeColorMap.purple;
    const oldPurple = `rgb(${colors['--color-brand-purple']})`;
    const body = document.querySelector('body');
    if (body && view.page !== 'admin') {
       body.style.backgroundColor = '#161022'; // Keep default dark for admin
       body.classList.add('font-sans');
       body.classList.remove('font-display');
       rootStyle.setProperty('--color-brand-purple', colors['--color-brand-purple']);
       rootStyle.setProperty('--color-brand-light-purple', colors['--color-brand-light-purple']);
    } else if (body) {
       body.style.backgroundColor = '#161022';
       body.classList.remove('font-sans');
       body.classList.add('font-display');
    }
  }, [settings.themeColor, view.page]);

  const navigateToHome = () => setView({ page: 'home' });
  const navigateToGame = (id: string) => setView({ page: 'game', id });
  const navigateToAdmin = () => setView({ page: 'admin' });
  const navigateToRequestGame = () => setView({ page: 'request' });
  const navigateToForum = () => setView({ page: 'forum' });
  const navigateToTopic = (id: string) => setView({ page: 'topic', id });

  const handleLogoClick = () => {
    setShowAllGames(false);
    setSearchQuery('');
    navigateToHome();
  };
  
  const handleShowAllGames = () => {
    setSearchQuery('');
    setShowAllGames(true);
    navigateToHome();
  };

  const handleLogin = (password: string): boolean => {
    if (password === 'semih1828') {
      setIsAdminAuthenticated(true);
      showToast('Login successful. Welcome!', 'success');
      return true;
    }
    showToast('Incorrect password.', 'error');
    return false;
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    navigateToHome();
    showToast('You have been logged out.', 'info');
  };

  const handleAddGame = (game: Omit<Game, 'id'>) => {
    addGame(game);
    showToast(`Game "${game.title}" added successfully!`, 'success');
  }

  const handleUpdateGame = (game: Game) => {
    updateGame(game);
    showToast(`Game "${game.title}" updated successfully!`, 'success');
  }

  const handleDeleteGame = (gameId: string) => {
    const game = getGameById(gameId);
    if(game) {
      deleteGame(gameId);
      showToast(`Game "${game.title}" has been deleted.`, 'success');
    } else {
      showToast('Error: Could not find game to delete.', 'error');
    }
  }

  const handleSaveSettings = (newSettings: SiteSettings) => {
    updateSettings(newSettings);
    showToast('Site settings updated successfully!', 'success');
  };
  
  const handleSaveProfile = (name: string, avatarUrl: string) => {
    saveProfile(name, avatarUrl);
    setIsProfileModalOpen(false);
    showToast(`Profile saved! Welcome, ${name}.`, 'success');
  };

  const handleOpenEditTopicModal = (topic: ForumTopic) => {
    setTopicToEdit(topic);
    setIsTopicModalOpen(true);
  };

  const handleAddTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>) => {
    const newTopicId = addTopic(topicData);
    showToast('Topic created successfully!', 'success');
    setIsTopicModalOpen(false);
    navigateToTopic(newTopicId);
  };
  
  const handleUpdateTopic = (topicId: string, data: { title: string; content: string }) => {
    updateTopic(topicId, data);
    showToast('Topic updated successfully!', 'success');
    setIsTopicModalOpen(false);
    setTopicToEdit(null);
  };

  const handleAddComment = (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => {
    addComment(topicId, commentData);
    showToast('Reply posted!', 'success');
  };
  
  const handleDeleteTopic = (topicId: string) => {
    const topic = getTopicById(topicId);
    if (!topic) {
        showToast('Error: Topic not found.', 'error');
        return;
    }
    // Authorization check
    if (topic.author !== profile.name && !isAdminAuthenticated) {
        showToast('You can only delete your own topics.', 'error');
        return;
    }

    if (window.confirm(`Are you sure you want to delete this topic: "${topic.title}"?`)) {
        deleteTopic(topicId).then(() => {
            showToast('Topic deleted successfully!', 'success');
            if (view.page === 'topic' && view.id === topicId) {
                navigateToForum();
            }
        }).catch((error) => {
            console.error("Failed to delete topic:", error);
            showToast('An error occurred while deleting the topic.', 'error');
        });
    }
  };

  const featuredGames = useMemo(() => games.filter(g => g.featured), [games]);
  
  const newReleasesGames = useMemo(() => 
    [...games]
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        .slice(0, 10),
    [games]
  );

  const allGamesSorted = useMemo(() => [...games].sort((a, b) => a.title.localeCompare(b.title)), [games]);
  
  const savaşOyunları = useMemo(() => games.filter(g => g.category === 'Savaş Oyunları'), [games]);
  const ikiDOyunlar = useMemo(() => games.filter(g => g.category === '2D Oyunlar'), [games]);
  const arabaOyunları = useMemo(() => games.filter(g => g.category === 'Araba Yarışı'), [games]);
  const simulasyonOyunları = useMemo(() => games.filter(g => g.category === 'Simülasyon'), [games]);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return [];
    
    const lowercasedQuery = searchQuery.toLowerCase();
    return games.filter(game =>
      game.title.toLowerCase().includes(lowercasedQuery) ||
      game.genre.toLowerCase().includes(lowercasedQuery) ||
      game.category.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, games]);
  
  if (view.page === 'admin') {
     if (!isAdminAuthenticated) return <div className="min-h-screen flex items-center justify-center"><AdminLogin onLogin={handleLogin} /></div>;
      return <AdminPanel 
        games={games} 
        onAddGame={handleAddGame} 
        onUpdateGame={handleUpdateGame} 
        onDeleteGame={handleDeleteGame} 
        onLogout={handleLogout}
        siteSettings={settings}
        onSaveSettings={handleSaveSettings}
        onNavigateHome={navigateToHome}
      />;
  }

  const renderHomePageContent = () => {
    const hasSearchResults = searchQuery && filteredGames.length > 0;
    const noSearchResults = searchQuery && filteredGames.length === 0;

    if (showAllGames && !searchQuery) {
        return <div className="my-16"><GameSection title="All Games" games={allGamesSorted} onGameClick={navigateToGame} /></div>;
    }
    if (hasSearchResults) {
        return <div className="my-16"><GameSection title="Search Results" games={filteredGames} onGameClick={navigateToGame} /></div>;
    }
    if (noSearchResults) {
        return <p className="text-center text-brand-gray text-lg py-16 animate-fadeIn">No games found for "{searchQuery}"</p>;
    }
    return (
      <>
        <div className="my-16"><GameSection title="Savaş Oyunları" games={savaşOyunları} onGameClick={navigateToGame} /></div>
        <div className="my-16"><GameSection title="2D Oyunlar" games={ikiDOyunlar} onGameClick={navigateToGame} /></div>
        <div className="my-16"><GameSection title="Araba Yarışı" games={arabaOyunları} onGameClick={navigateToGame} /></div>
        <div className="my-16"><GameSection title="Simülasyon" games={simulasyonOyunları} onGameClick={navigateToGame} /></div>
      </>
    );
  };
  
  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="space-y-16 mt-12">
          {/* Hero Skeleton */}
          <div className="relative rounded-2xl overflow-hidden h-[500px] bg-brand-dark-2 animate-shimmer"></div>
          {/* Game Section Skeletons */}
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div className="h-8 w-64 bg-brand-dark-2 rounded-md mb-8 animate-shimmer"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[...Array(5)].map((_, j) => <GameCardSkeleton key={j} />)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (view.page) {
      case 'game':
        const game = getGameById(view.id || null);
        if (game) return <GameDetail game={game} onBack={navigateToHome} />;
        navigateToHome();
        return null;
       case 'forum':
        return <ForumPage 
                  topics={topics} 
                  onTopicClick={navigateToTopic} 
                  onOpenCreateTopic={() => { setTopicToEdit(null); setIsTopicModalOpen(true); }}
                  profile={profile}
                  isProfileSet={isProfileSet}
                  onRequestProfileSetup={() => setIsProfileModalOpen(true)}
                  onDeleteTopic={handleDeleteTopic}
                  onEditTopic={handleOpenEditTopicModal}
                  isAdmin={isAdminAuthenticated}
                />;
      case 'topic':
        const topic = getTopicById(view.id || '');
        if (topic) return <TopicDetail 
                            topic={topic} 
                            onAddComment={handleAddComment} 
                            onBack={navigateToForum}
                            profile={profile}
                            isProfileSet={isProfileSet}
                            onRequestProfileSetup={() => setIsProfileModalOpen(true)}
                            onDeleteTopic={handleDeleteTopic}
                            onEditTopic={handleOpenEditTopicModal}
                            isAdmin={isAdminAuthenticated}
                          />;
        // If topic not found, navigate back to forum list
        navigateToForum();
        return null;
      case 'request':
        return <RequestGame onBack={navigateToHome} />;
      case 'home':
      default:
        return (
          <>
            {settings.showFeaturedSection && <Hero games={featuredGames} onViewGame={navigateToGame} />}
            {renderHomePageContent()}
          </>
        );
    }
  };

  if (settings.maintenanceMode && !isAdminAuthenticated) {
    return (
        <div className="bg-brand-dark-2 text-white min-h-screen font-sans flex flex-col items-center justify-center text-center p-8">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple mb-6">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM11.002 11.002V7.002C11.002 6.449 11.449 6.002 12 6.002C12.553 6.002 13.002 6.449 13.002 7.002V11.002H17.002C17.555 11.002 18.002 11.449 18.002 12C18.002 12.553 17.555 13.002 17.002 13.002H13.002V17.002C13.002 17.555 12.553 18.002 12 18.002C11.449 18.002 11.002 17.555 11.002 17.002V13.002H7.002C6.449 13.002 6.002 12.553 6.002 12C6.002 11.449 6.449 11.002 7.002 11.002H11.002Z" fill="currentColor"/>
            </svg>
            <h1 className="text-4xl font-bold mb-4">{settings.siteName} is Under Maintenance</h1>
            <p className="text-xl text-brand-gray">We are currently performing scheduled maintenance.</p>
            <p className="text-brand-gray">Please check back later!</p>
        </div>
    );
  }

  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans">
      <Header
          ref={headerRef} 
          siteName={settings.siteName}
          siteSlogan={settings.siteSlogan}
          onNavigateHome={handleLogoClick}
          onNavigateAdmin={navigateToAdmin}
          onShowAllGames={handleShowAllGames}
          onNavigateRequestGame={navigateToRequestGame}
          onNavigateForum={navigateToForum}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          profile={profile}
          onProfileClick={() => setIsProfileModalOpen(true)}
        />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: `${headerHeight}px` }}>
        <div key={view.page + (view.id || '')} className="page-transition py-12">
          {renderMainContent()}
        </div>
      </main>
      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        currentProfile={profile}
      />
      <TopicModal
          isOpen={isTopicModalOpen}
          onClose={() => {
              setIsTopicModalOpen(false);
              setTopicToEdit(null);
          }}
          onSubmit={(data) => {
              if (topicToEdit) {
                  handleUpdateTopic(topicToEdit.id, data);
              } else {
                  handleAddTopic({
                      ...data,
                      author: profile.name,
                      avatarUrl: profile.avatarUrl
                  });
              }
          }}
          initialData={topicToEdit ? { title: topicToEdit.title, content: topicToEdit.content } : undefined}
      />
      <Footer siteName={settings.siteName} contactEmail={settings.contactEmail} />
      <BackToTopButton />
    </div>
  );
};


const App: React.FC = () => (
  <ToastProvider>
    <AppContent />
    <ToastContainer />
  </ToastProvider>
);


export default App;