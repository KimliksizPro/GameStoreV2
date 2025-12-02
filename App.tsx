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
import ForgotPasswordModal from './components/ForgotPasswordModal';
import ResetPasswordModal from './components/ResetPasswordModal';
import { useGames } from './hooks/useGames';
import { useSiteSettings, SiteSettings } from './hooks/useSiteSettings';
import { useForum } from './hooks/useForum';
import { useAuth } from './hooks/useAuth';
import { useRequestedGames } from './hooks/useRequestedGames';
import { ToastProvider, useToast } from './hooks/useToast';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';
import ToastContainer from './components/ToastContainer';
import { Game, ForumTopic, ForumComment, User, RequestedGame } from './types';


type View = {
  page: 'home' | 'game' | 'admin' | 'request' | 'forum' | 'topic';
  id?: string | null;
}

const themeColorMap = {
    purple: {
      '--color-brand-purple': '124 58 237', // Updated to match new vibrant purple
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

const EmailVerificationBanner: React.FC<{ user: User, onResend: (user: User) => void }> = ({ user, onResend }) => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500/90 backdrop-blur-sm text-white p-2 text-center text-xs sm:text-sm shadow-lg">
        Your email is not verified. Please check your inbox.
        <button onClick={() => onResend(user)} className="font-bold underline ml-2 hover:text-black transition-colors">
            Resend
        </button>
    </div>
);


const AppContent: React.FC = () => {
  const { games, loading: gamesLoading, addGame, updateGame, deleteGame, getGameById } = useGames();
  const { settings, loading: settingsLoading, updateSettings } = useSiteSettings();
  const { topics, loading: forumLoading, getTopicById, addTopic, updateTopic, addComment, deleteTopic } = useForum();
  const { currentUser, users, login, signup, logout, loadingAuth, updateUser, deleteUser, addUserByAdmin, verifyUser, findUserByEmail, resetPassword } = useAuth();
  const { requestedGames, loading: requestedGamesLoading, addRequestedGame, deleteRequestedGame } = useRequestedGames();
  const [view, setView] = useState<View>({ page: 'home', id: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllGames, setShowAllGames] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [userToResetPassword, setUserToResetPassword] = useState<User | null>(null);


  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<ForumTopic | null>(null);
  const { showToast } = useToast();
  const { t, language } = useTranslation();
  
  const loading = gamesLoading || settingsLoading || forumLoading || loadingAuth || requestedGamesLoading;

  useEffect(() => {
    // This is for the main site theme
    const rootStyle = document.documentElement.style;
    const colors = themeColorMap[settings.themeColor] || themeColorMap.purple;
    const body = document.querySelector('body');
    if (body) {
       // Allow CSS gradients in index.html to take precedence for background
       // But update CSS variables for primary colors
       rootStyle.setProperty('--color-brand-purple', colors['--color-brand-purple']);
       rootStyle.setProperty('--color-brand-light-purple', colors['--color-brand-light-purple']);
       
       if (view.page === 'admin') {
           body.classList.remove('bg-brand-dark'); // Let admin panel handle its own bg
       } else {
           body.classList.add('bg-brand-dark');
       }
    }
  }, [settings.themeColor, view.page]);

  useEffect(() => {
    // SEO and Metadata Management
    const updateMetaTags = () => {
      const siteName = settings.siteName[language];
      const baseUrl = window.location.origin + window.location.pathname;
      const defaultDescription = t('footer.copyright', { siteName });
      const defaultTitle = `${siteName} - ${settings.siteSlogan[language]}`;
      const defaultImage = 'https://images.weserv.nl/?url=https://wallpapercave.com/wp/NjGW245.jpg';

      let title = defaultTitle;
      let description = defaultDescription;
      let imageUrl = defaultImage;
      let canonicalUrl = baseUrl;

      if (view.page === 'game' && view.id) {
        const game = getGameById(view.id);
        if (game) {
          title = `${game.title?.[language]} | ${siteName}`;
          description = game.description?.[language]?.substring(0, 160) || '';
          imageUrl = game.horizontalImageUrl;
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
      setView({ page: 'admin' });
    } else if (!currentUser) {
      showToast(t('toasts.loginRequired'), 'error');
      setIsLoginModalOpen(true);
    } else {
      showToast(t('toasts.permissionDenied'), 'error');
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
        showToast(t('toasts.welcomeBack', { username: user.username }), 'success');
        return true;
    }
    return false;
  };

  const handleSendVerification = (user: User) => {
    const message = `Verification email sent to ${user.email}. Click to verify. (DEMO)`;
    showToast(message, 'info', {
      onClick: async () => {
        const success = await verifyUser(user.id);
        if (success) {
          showToast('Email verified successfully!', 'success');
        } else {
          showToast('Failed to verify email.', 'error');
        }
      },
    });
  };

  const handleUserSignup = async (username: string, email: string, password: string, avatarUrl: string) => {
    const result = await signup(username, email, password, avatarUrl);
    if (result.success && result.user) {
      showToast(result.message, 'success');
      handleSendVerification(result.user);
    } else {
      showToast(result.message, 'error');
    }
    return result;
  };

  const handleUserLogout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    logout();
    if (wasAdmin && view.page === 'admin') {
      navigateToHome();
    }
    showToast(t('toasts.loggedOut'), 'info');
  };
  
  const handleRequestPasswordReset = (email: string) => {
    const user = findUserByEmail(email);
    if (user) {
      const userForReset = user;
      const message = `Password reset for ${email}. Click to reset. (DEMO)`;
      showToast(message, 'info', {
        onClick: () => {
          setIsForgotPasswordModalOpen(false);
          setUserToResetPassword(userForReset);
          setIsResetPasswordModalOpen(true);
        },
      });
    } else {
      showToast('If an account with that email exists, a reset link has been sent.', 'success');
    }
  };

  const handlePasswordReset = async (userId: string, newPassword: string) => {
    const result = await resetPassword(userId, newPassword);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      setIsResetPasswordModalOpen(false);
      setUserToResetPassword(null);
    }
    return result;
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
        setIsLoginModalOpen(true);
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
      setIsLoginModalOpen(true);
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
        setIsLoginModalOpen(true);
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
      showToast(t('toasts.loginToRequest'), 'error');
      setIsLoginModalOpen(true);
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


  const handleAddUser = async (newUserData: Omit<User, 'id'>) => {
    const result = await addUserByAdmin(newUserData);
    showToast(result.message, result.success ? 'success' : 'error');
    return result;
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
  
  const allGamesSorted = useMemo(() => [...games].sort((a, b) => a.title?.[language]?.localeCompare(b.title?.[language] || '') || 0), [games, language]);
  
  const savaşOyunları = useMemo(() => games.filter(g => g.category?.en === 'War Games'), [games]);
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
        if (game) return <div className="mt-32 container mx-auto px-4"><GameDetail game={game} onBack={navigateToHome} currentUser={currentUser} onRequestLogin={() => setIsLoginModalOpen(true)} /></div>;
        navigateToHome();
        return null;
       case 'forum':
        return <div className="mt-32 container mx-auto px-4"><ForumPage 
                  topics={topics} 
                  onTopicClick={navigateToTopic} 
                  onOpenCreateTopic={() => { setTopicToEdit(null); setIsTopicModalOpen(true); }}
                  currentUser={currentUser}
                  onRequestLogin={() => setIsLoginModalOpen(true)}
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
                            onRequestLogin={() => setIsLoginModalOpen(true)}
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
                  onRequestLogin={() => setIsLoginModalOpen(true)}
                /></div>;
      case 'home':
      default:
        return (
          <>
            {settings.showFeaturedSection && <Hero games={featuredGames} onViewGame={navigateToGame} currentUser={currentUser} onRequestLogin={() => setIsLoginModalOpen(true)} />}
            {/* Added proper margin-top to separate Featured and Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10 pb-12">
               {renderHomePageContent()}
            </div>
          </>
        );
    }
  };

  if (settings.maintenanceMode && currentUser?.role !== 'admin') {
    return (
        <div className="bg-brand-dark text-white min-h-screen font-sans flex flex-col items-center justify-center text-center p-8">
             <div className="p-8 rounded-2xl bg-[#1a102e] border border-white/10 shadow-2xl max-w-lg">
                <span className="material-symbols-outlined text-6xl text-brand-purple mb-6 animate-bounce">construction</span>
                <h1 className="text-4xl font-bold mb-4">{settings.siteName[language]} is Under Maintenance</h1>
                <p className="text-xl text-brand-gray">We are upgrading our systems to provide you with a better experience.</p>
                <div className="mt-8 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple animate-shimmer w-1/2"></div>
                </div>
            </div>
        </div>
    );
  }

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
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
          onLogout={handleUserLogout}
        />
        {currentUser && !currentUser.isVerified && <EmailVerificationBanner user={currentUser} onResend={handleSendVerification} />}
      
      <main className="flex-grow">
        <div key={view.page + (view.id || '')} className="page-transition">
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
        onForgotPassword={() => {
            setIsLoginModalOpen(false);
            setIsForgotPasswordModalOpen(true);
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
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        onRequestReset={handleRequestPasswordReset}
        onSwitchToLogin={() => {
            setIsForgotPasswordModalOpen(false);
            setIsLoginModalOpen(true);
        }}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => {
            setIsResetPasswordModalOpen(false);
            setUserToResetPassword(null);
        }}
        onReset={handlePasswordReset}
        userToReset={userToResetPassword}
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