
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameSection from './components/GameSection';
import Footer from './components/Footer';
import GameDetail from './components/GameDetail';
import AdminPanel from './components/AdminPanel';
import RequestGame from './components/RequestGame';
import BackToTopButton from './components/BackToTopButton';
import GameCardSkeleton from './components/GameCardSkeleton';
import ForumPage from './components/ForumPage';
import TopicDetail from './components/TopicDetail';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import TopicModal from './components/TopicModal';
import { useGames } from './hooks/useGames';
import { useSiteSettings, SiteSettings } from './hooks/useSiteSettings';
import { useForum } from './hooks/useForum';
import { useAuth } from './hooks/useAuth';
import { ToastProvider, useToast } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { Game, ForumTopic, ForumComment, User } from './types';


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
  const { currentUser, users, login, signup, logout, loadingAuth, updateUser, deleteUser } = useAuth();
  const [view, setView] = useState<View>({ page: 'home', id: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllGames, setShowAllGames] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<ForumTopic | null>(null);
  const { showToast } = useToast();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const loading = gamesLoading || settingsLoading || forumLoading || loadingAuth;

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
  const navigateToAdmin = () => {
    if (currentUser?.role === 'admin') {
      setView({ page: 'admin' });
    } else if (!currentUser) {
      showToast('You must be logged in as an admin to access this page.', 'error');
      setIsLoginModalOpen(true);
    } else {
      showToast('You do not have permission to access the admin panel.', 'error');
    }
  };
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

  const handleUserLogin = (username: string, password: string):boolean => {
    const user = login(username, password);
    if(user) {
        showToast(`Welcome back, ${user.username}!`, 'success');
        return true;
    }
    return false; // Error message is shown in modal
  };

  const handleUserSignup = async (username: string, password: string, avatarUrl: string) => {
    const result = await signup(username, password, avatarUrl);
    showToast(result.message, result.success ? 'success' : 'error');
    return result;
  };

  const handleUserLogout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    logout();
    if (wasAdmin && view.page === 'admin') {
      navigateToHome();
    }
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
  
  const handleOpenEditTopicModal = (topic: ForumTopic) => {
     if (!currentUser) {
        setIsLoginModalOpen(true);
        return;
    }
    if (topic.authorId !== currentUser.id && currentUser.role !== 'admin') {
        showToast("You can only edit your own topics.", "error");
        return;
    }
    setTopicToEdit(topic);
    setIsTopicModalOpen(true);
  };

  const handleAddTopic = (data: { title: string; content: string }) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    const newTopicId = addTopic({
      ...data,
      authorId: currentUser.id,
      authorName: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
    });
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
    if (!currentUser) {
        showToast('You must be logged in to delete topics.', 'error');
        setIsLoginModalOpen(true);
        return;
    }
    // Authorization check
    if (topic.authorId !== currentUser.id && currentUser.role !== 'admin') {
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

  const handleUpdateUser = (updatedUser: User) => {
    updateUser(updatedUser).then(success => {
      if (success) {
        showToast(`User "${updatedUser.username}" updated successfully.`, 'success');
      } else {
        showToast('Failed to update user.', 'error');
      }
    });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId).then(success => {
      if (success) {
        showToast('User deleted successfully.', 'success');
      } else {
        showToast('Failed to delete user.', 'error');
      }
    });
  };

  const featuredGames = useMemo(() => games.filter(g => g.featured), [games]);
  
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
     if (currentUser?.role !== 'admin') {
       // This should be handled by navigateToAdmin, but as a fallback:
       showToast('Access denied.', 'error');
       navigateToHome();
       return null;
     }
      return <AdminPanel 
        games={games} 
        onAddGame={handleAddGame} 
        onUpdateGame={handleUpdateGame} 
        onDeleteGame={handleDeleteGame} 
        onLogout={handleUserLogout}
        siteSettings={settings}
        onSaveSettings={handleSaveSettings}
        onNavigateHome={navigateToHome}
        users={users}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
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
                  currentUser={currentUser}
                  onRequestLogin={() => setIsLoginModalOpen(true)}
                  onDeleteTopic={handleDeleteTopic}
                  onEditTopic={handleOpenEditTopicModal}
                />;
      case 'topic':
        const topic = getTopicById(view.id || '');
        if (topic) return <TopicDetail 
                            topic={topic} 
                            onAddComment={handleAddComment} 
                            onBack={navigateToForum}
                            currentUser={currentUser}
                            onRequestLogin={() => setIsLoginModalOpen(true)}
                            onDeleteTopic={handleDeleteTopic}
                            onEditTopic={handleOpenEditTopicModal}
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

  if (settings.maintenanceMode && currentUser?.role !== 'admin') {
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
          currentUser={currentUser}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
          onLogout={handleUserLogout}
        />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: `${headerHeight}px` }}>
        <div key={view.page + (view.id || '')} className="page-transition py-12">
          {renderMainContent()}
        </div>
      </main>
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleUserLogin}
        onSwitchToSignup={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(true);
        }}
      />
       <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignup={handleUserSignup}
        onSwitchToLogin={() => {
            setIsSignupModalOpen(false);
            setIsLoginModalOpen(true);
        }}
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
                if(currentUser){
                  handleAddTopic(data);
                } else {
                  showToast('You must be logged in to create a topic.', 'error');
                  setIsLoginModalOpen(true);
                }
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