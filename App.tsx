


import React, { useState, useMemo, useEffect } from 'react';
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
import TopicModal from './components/TopicModal';
import UserProfileModal from './components/UserProfileModal'; 
import AdminLoginModal from './components/AdminLoginModal'; // New Import
import { useGames } from './hooks/useGames';
import { useSiteSettings, SiteSettings } from './hooks/useSiteSettings';
import { useForum } from './hooks/useForum';
import { useUserProfile } from './hooks/useUserProfile';
import { useRequestedGames } from './hooks/useRequestedGames';
import { ToastProvider, useToast } from './hooks/useToast';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';
import ToastContainer from './components/ToastContainer';
import { Game, ForumTopic, ForumComment, User } from './types';


type View = {
  page: 'home' | 'game' | 'admin' | 'request' | 'forum' | 'topic';
  id?: string | null;
}

const themeColorMap = {
    purple: {
      '--color-brand-purple': '124 58 237',
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
  
  const { profile, loading: profileLoading, saveProfile, logout } = useUserProfile();
  
  const { requestedGames, loading: requestedGamesLoading, addRequestedGame, deleteRequestedGame } = useRequestedGames();
  const [view, setView] = useState<View>({ page: 'home', id: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllGames, setShowAllGames] = useState(false);
  
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false); // Admin Modal State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Auth State

  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<ForumTopic | null>(null);
  const { showToast } = useToast();
  const { t, language } = useTranslation();
  
  const loading = gamesLoading || settingsLoading || forumLoading || requestedGamesLoading || profileLoading;

  // Check if session storage has admin auth on load (optional persistence)
  useEffect(() => {
      const adminSession = sessionStorage.getItem('admin_auth_session');
      if (adminSession === 'true') {
          setIsAdminAuthenticated(true);
      }
  }, []);

  // Construct a User object from the simple profile
  const currentUser: User | null = useMemo(() => {
    if (!profile) return null;
    
    // Role is only 'admin' if the name matches AND they have passed the password check
    const isNameAdmin = profile.name.toLowerCase() === 'admin' || profile.name.toLowerCase() === 'semih';
    const role = (isNameAdmin && isAdminAuthenticated) ? 'admin' : 'user';

    return {
        id: profile.name.toLowerCase().replace(/\s+/g, '_'),
        username: profile.name,
        email: 'local@user.com', 
        password: '', 
        avatarUrl: profile.avatarUrl,
        role: role,
        isVerified: true
    };
  }, [profile, isAdminAuthenticated]);

  const users: User[] = useMemo(() => {
      return currentUser ? [currentUser] : [];
  }, [currentUser]);

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    const colors = themeColorMap[settings.themeColor] || themeColorMap.purple;
    const body = document.querySelector('body');
    if (body) {
       rootStyle.setProperty('--color-brand-purple', colors['--color-brand-purple']);
       rootStyle.setProperty('--color-brand-light-purple', colors['--color-brand-light-purple']);
       
       if (view.page === 'admin') {
           body.classList.remove('bg-brand-dark');
       } else {
           body.classList.add('bg-brand-dark');
       }
    }
  }, [settings.themeColor, view.page]);

  useEffect(() => {
    const updateMetaTags = () => {
      const siteName = settings.siteName[language];
      const baseUrl = window.location.origin + window.location.pathname;
      const defaultDescription = t('footer.copyright', { siteName });
      const defaultTitle = `${siteName} - ${settings.siteSlogan[language]}`;
      
      let title = defaultTitle;
      let description = defaultDescription;
      let canonicalUrl = baseUrl;

      if (view.page === 'game' && view.id) {
        const game = getGameById(view.id);
        if (game) {
          title = `${game.title?.[language]} | ${siteName}`;
          description = game.description?.[language]?.substring(0, 160) || '';
          canonicalUrl = `${baseUrl}?page=game&id=${game.id}`;
        }
      } else if (view.page === 'forum') {
        title = `${t('forum.title')} | ${siteName}`;
        description = t('forum.description');
        canonicalUrl = `${baseUrl}?page=forum`;
      } else if (view.page === 'request') {
          title = `${t('requestGame.title')} | ${siteName}`;
          description = t('requestGame.description');
          canonicalUrl = `${baseUrl}?page=request`;
      }
      
      document.title = title;
      document.querySelector('#meta-description')?.setAttribute('content', description);
      document.querySelector('#canonical-link')?.setAttribute('href', canonicalUrl);
    };

    updateMetaTags();
  }, [view, settings, language, getGameById, getTopicById, t]);

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);


  const navigateToHome = () => setView({ page: 'home' });
  const navigateToGame = (id: string) => {
    window.scrollTo(0,0);
    setView({ page: 'game', id });
  };
  
  const navigateToAdmin = () => {
    if (currentUser?.role === 'admin') {
      // Already authenticated
      setView({ page: 'admin' });
    } else {
      // Open Login Modal
      setIsAdminLoginModalOpen(true);
    }
  };
  
  const handleAdminLoginSuccess = (username: string) => {
      // 1. Set Auth State
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('admin_auth_session', 'true');

      // 2. Ensure Profile is set to the admin name (if not already)
      // This is crucial because currentUser derives from profile
      saveProfile(username, 'https://cdn-icons-png.flaticon.com/512/9322/9322127.png'); // Admin Avatar

      // 3. Navigate
      showToast(`Welcome back, Commander ${username}.`, 'success');
      setView({ page: 'admin' });
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

  const handleSaveProfile = (name: string, avatarUrl: string) => {
      if (name.toLowerCase() === 'admin' || name.toLowerCase() === 'semih') {
          showToast('These names are reserved. Please use the Admin Panel button to log in.', 'error');
          return;
      }
      saveProfile(name, avatarUrl);
      showToast(`Welcome, ${name}!`, 'success');
  };

  const handleUserLogout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    logout();
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('admin_auth_session');
    
    if (wasAdmin && view.page === 'admin') {
      navigateToHome();
    }
    showToast('Logged out successfully.', 'info');
  };

  const handleAddGame = (game: Omit<Game, 'id'>) => {
    addGame(game);
    showToast(t('toasts.gameAdded', { title: game.title[language] }), 'success');
  }

  const handleUpdateGame = (game: Game) => {
    updateGame(game);
    showToast(t('toasts.gameUpdated', { title: game.title[language] }), 'success');
  }

  const handleDeleteGame = (gameId: string) => {
    const game = getGameById(gameId);
    if(game) {
      deleteGame(gameId);
      showToast(t('toasts.gameDeleted', { title: game.title?.[language] || 'game' }), 'success');
    } else {
      showToast(t('toasts.gameDeleteError'), 'error');
    }
  }

  const handleSaveSettings = (newSettings: SiteSettings) => {
    updateSettings(newSettings);
    showToast(t('toasts.settingsUpdated'), 'success');
  };
  
  const handleOpenEditTopicModal = (topic: ForumTopic) => {
     if (!currentUser) {
        setIsUserProfileModalOpen(true);
        return;
    }
    if (topic.authorId !== currentUser.id && currentUser.role !== 'admin') {
        showToast(t('toasts.editOwnTopics'), "error");
        return;
    }
    setTopicToEdit(topic);
    setIsTopicModalOpen(true);
  };

  const handleAddTopic = (data: { title: string; content: string }) => {
    if (!currentUser) {
      setIsUserProfileModalOpen(true);
      return;
    }
    const newTopicData = {
      title: { en: data.title, tr: data.title },
      content: { en: data.content, tr: data.content },
    };
    const newTopicId = addTopic({
      ...newTopicData,
      authorId: currentUser.id,
      authorName: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
    });
    showToast(t('toasts.topicCreated'), 'success');
    setIsTopicModalOpen(false);
    navigateToTopic(newTopicId);
  };
  
  const handleUpdateTopic = (topicId: string, data: { title: string; content: string }) => {
    const topic = getTopicById(topicId);
    if(!topic) return;

    const updatedTopicData = {
        title: { ...topic.title, [language]: data.title },
        content: { ...topic.content, [language]: data.content }
    };

    updateTopic(topicId, updatedTopicData);
    showToast(t('toasts.topicUpdated'), 'success');
    setIsTopicModalOpen(false);
    setTopicToEdit(null);
  };

  const handleAddComment = (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => {
    addComment(topicId, commentData);
    showToast(t('toasts.replyPosted'), 'success');
  };
  
  const handleDeleteTopic = (topicId: string) => {
    const topic = getTopicById(topicId);
    if (!topic) {
        showToast(t('toasts.topicDeleteError'), 'error');
        return;
    }
    if (!currentUser) {
        showToast(t('toasts.loginToDelete'), 'error');
        setIsUserProfileModalOpen(true);
        return;
    }
    if (topic.authorId !== currentUser.id && currentUser.role !== 'admin') {
        showToast(t('toasts.deleteOwnTopics'), 'error');
        return;
    }

    if (window.confirm(t('toasts.confirmDelete', { title: topic.title?.[language] || 'this topic' }))) {
        deleteTopic(topicId).then(() => {
            showToast(t('toasts.topicDeleted'), 'success');
            if (view.page === 'topic' && view.id === topicId) {
                navigateToForum();
            }
        }).catch((error) => {
            console.error("Failed to delete topic:", error);
            showToast(t('toasts.topicDeleteFailed'), 'error');
        });
    }
  };
  
  const handleRequestGame = async (data: { gameTitle: string; reason: string }) => {
    if (!currentUser) {
      showToast('Please create a profile to request games.', 'error');
      setIsUserProfileModalOpen(true);
      return;
    }
    const result = await addRequestedGame(data, currentUser);
    if (result.success) {
      showToast(t('toasts.requestSubmitted'), 'success');
    } else {
      showToast(t('toasts.requestFailed'), 'error');
    }
  };

  const handleDeleteRequestedGame = async (requestId: string) => {
    const result = await deleteRequestedGame(requestId);
    if (result.success) {
      showToast('Game request deleted successfully.', 'success');
    } else {
      showToast('Failed to delete game request.', 'error');
    }
  };

  // Mock functions for Admin user management (since we are local now)
  const handleAddUser = async (newUserData: Omit<User, 'id'>) => { return { success: true, message: 'Local mode: User simulation.' }; };
  const handleUpdateUser = (updatedUser: User) => { showToast('Local mode: User updated.', 'success'); };
  const handleDeleteUser = (userId: string) => { showToast('Local mode: User deleted.', 'success'); };

  const featuredGames = useMemo(() => games.filter(g => g.featured), [games]);
  
  const allGamesSorted = useMemo(() => [...games].sort((a, b) => a.title?.[language]?.localeCompare(b.title?.[language] || '') || 0), [games, language]);
  
  const savaşOyunları = useMemo(() => games.filter(g => g.category?.en === 'War Games'), [games]);
  const sporOyunları = useMemo(() => games.filter(g => g.category?.en === 'Sports'), [games]);
  const ikiDOyunlar = useMemo(() => games.filter(g => g.category?.en === '2D Games'), [games]);
  const arabaOyunları = useMemo(() => games.filter(g => g.category?.en === 'Car Racing'), [games]);
  const simulasyonOyunları = useMemo(() => games.filter(g => g.category?.en === 'Simulation'), [games]);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return [];
    
    const lowercasedQuery = searchQuery.toLowerCase();
    return games.filter(game =>
      game.title?.[language]?.toLowerCase().includes(lowercasedQuery) ||
      game.genre?.[language]?.toLowerCase().includes(lowercasedQuery) ||
      game.category?.[language]?.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, games, language]);

  const userRequestedGames = useMemo(() => {
    if (!currentUser) return [];
    return requestedGames.filter(req => req.userId === currentUser.id);
  }, [requestedGames, currentUser]);
  
  if (view.page === 'admin') {
     if (currentUser?.role !== 'admin') {
       showToast(t('toasts.accessDenied'), 'error');
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
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        requestedGames={requestedGames}
        onDeleteRequestedGame={handleDeleteRequestedGame}
      />;
  }

  const renderHomePageContent = () => {
    const hasSearchResults = searchQuery && filteredGames.length > 0;
    const noSearchResults = searchQuery && filteredGames.length === 0;

    if (showAllGames && !searchQuery) {
        return <div className="my-12"><GameSection title={t('header.allGames')} games={allGamesSorted} onGameClick={navigateToGame} /></div>;
    }
    if (hasSearchResults) {
        return <div className="my-12"><GameSection title={t('home.searchResults')} games={filteredGames} onGameClick={navigateToGame} /></div>;
    }
    if (noSearchResults) {
        return <p className="text-center text-brand-gray text-lg py-16 animate-fadeIn">{t('home.noResults', { query: searchQuery })}</p>;
    }
    return (
      <div className="space-y-24">
        <GameSection title={t('home.warGames')} games={savaşOyunları} onGameClick={navigateToGame} />
        <GameSection title={t('home.sports')} games={sporOyunları} onGameClick={navigateToGame} />
        <GameSection title={t('home.twoDGames')} games={ikiDOyunlar} onGameClick={navigateToGame} />
        <GameSection title={t('home.carRacing')} games={arabaOyunları} onGameClick={navigateToGame} />
        <GameSection title={t('home.simulation')} games={simulasyonOyunları} onGameClick={navigateToGame} />
      </div>
    );
  };
  
  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="space-y-16 mt-32 container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden h-[500px] bg-brand-dark-2 animate-shimmer"></div>
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
        if (game) return <div className="mt-32 container mx-auto px-4"><GameDetail game={game} onBack={navigateToHome} currentUser={currentUser} onRequestLogin={() => setIsUserProfileModalOpen(true)} /></div>;
        navigateToHome();
        return null;
       case 'forum':
        return <div className="mt-32 container mx-auto px-4"><ForumPage 
                  topics={topics} 
                  onTopicClick={navigateToTopic} 
                  onOpenCreateTopic={() => { setTopicToEdit(null); setIsTopicModalOpen(true); }}
                  currentUser={currentUser}
                  onRequestLogin={() => setIsUserProfileModalOpen(true)}
                  onDeleteTopic={handleDeleteTopic}
                  onEditTopic={handleOpenEditTopicModal}
                /></div>;
      case 'topic':
        const topic = getTopicById(view.id || '');
        if (topic) return <div className="mt-32 container mx-auto px-4"><TopicDetail 
                            topic={topic} 
                            onAddComment={handleAddComment} 
                            onBack={navigateToForum}
                            currentUser={currentUser}
                            onRequestLogin={() => setIsUserProfileModalOpen(true)}
                            onDeleteTopic={handleDeleteTopic}
                            onEditTopic={handleOpenEditTopicModal}
                          /></div>;
        navigateToForum();
        return null;
      case 'request':
        return <div className="mt-32 container mx-auto px-4"><RequestGame 
                  onBack={navigateToHome} 
                  currentUser={currentUser}
                  onRequestSubmit={handleRequestGame}
                  requestedGames={userRequestedGames}
                  loading={requestedGamesLoading}
                  onRequestLogin={() => setIsUserProfileModalOpen(true)}
                /></div>;
      case 'home':
      default:
        return (
          <>
            {settings.showFeaturedSection && <Hero games={featuredGames} onViewGame={navigateToGame} currentUser={currentUser} onRequestLogin={() => setIsUserProfileModalOpen(true)} />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10 pb-12">
               {renderHomePageContent()}
            </div>
          </>
        );
    }
  };

  return (
    <div className="text-white min-h-screen font-sans flex flex-col">
      <Header
          siteName={settings.siteName[language]}
          siteSlogan={settings.siteSlogan[language]}
          onNavigateHome={handleLogoClick}
          onNavigateAdmin={navigateToAdmin}
          onShowAllGames={handleShowAllGames}
          onNavigateRequestGame={navigateToRequestGame}
          onNavigateForum={navigateToForum}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          onProfileClick={() => setIsUserProfileModalOpen(true)}
          onLogout={handleUserLogout}
        />
      
      <main className="flex-grow">
        <div key={view.page + (view.id || '')} className="page-transition">
          {renderMainContent()}
        </div>
      </main>
      
      <UserProfileModal 
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
        onSave={handleSaveProfile}
        currentProfile={profile}
      />
      
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLogin={handleAdminLoginSuccess}
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
                  showToast('You must create a profile to create a topic.', 'error');
                  setIsUserProfileModalOpen(true);
                }
              }
          }}
          initialData={topicToEdit ? { title: topicToEdit.title?.[language] || '', content: topicToEdit.content?.[language] || '' } : undefined}
      />
      <Footer siteName={settings.siteName[language]} contactEmail={settings.contactEmail} />
      <BackToTopButton />
    </div>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <LanguageProvider>
      <AppContent />
      <ToastContainer />
    </LanguageProvider>
  </ToastProvider>
);

export default App;