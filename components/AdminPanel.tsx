
import React, { useState } from 'react';
import { Game, User, RequestedGame } from '../types';
import GameManagement from './GameManagement';
import AdminDashboard from './AdminDashboard';
import SiteSettingsComponent from './SiteSettings';
import { SiteSettings } from '../hooks/useSiteSettings';
import GameAnalyticsDashboard from './GameAnalyticsDashboard';
import UserManagement from './UserManagement';
import RequestedGamesManagement from './RequestedGamesManagement';

interface AdminPanelProps {
  games: Game[];
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onUpdateGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onLogout: () => void;
  siteSettings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  onNavigateHome: () => void;
  users: User[];
  currentUser: User | null;
  onAddUser: (user: Omit<User, 'id'>) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  requestedGames: RequestedGame[];
  onDeleteRequestedGame: (id: string) => void;
}

type AdminTab = 'dashboard' | 'games' | 'users' | 'analytics' | 'settings' | 'requests';

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard games={props.games} onAddNewGame={() => setActiveTab('games')} />;
            case 'games':
                return <GameManagement 
                          games={props.games} 
                          onAddGame={props.onAddGame}
                          onUpdateGame={props.onUpdateGame}
                          onDeleteGame={props.onDeleteGame}
                        />;
            case 'users':
                return <UserManagement 
                          users={props.users} 
                          currentUser={props.currentUser}
                          onAddUser={props.onAddUser}
                          onUpdateUser={props.onUpdateUser}
                          onDeleteUser={props.onDeleteUser}
                        />;
            case 'analytics':
                 return <GameAnalyticsDashboard />;
            case 'requests':
                return <RequestedGamesManagement 
                          requestedGames={props.requestedGames}
                          onDeleteRequestedGame={props.onDeleteRequestedGame}
                       />;
            case 'settings':
                return <SiteSettingsComponent 
                          currentSettings={props.siteSettings} 
                          onSave={props.onSaveSettings} 
                        />;
            default:
                return <AdminDashboard games={props.games} onAddNewGame={() => setActiveTab('games')} />;
        }
    };
    
    const handleTabClick = (tab: AdminTab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    }

    const SidebarContent = () => (
        <>
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center gap-4 px-2">
                    <div className="relative">
                        <img src={props.currentUser?.avatarUrl} alt="Admin Avatar" className="size-12 rounded-xl object-cover border-2 border-brand-purple shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a102e] rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold tracking-wide">{props.currentUser?.username}</h1>
                        <span className="text-brand-light-purple text-xs font-medium uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded-full border border-brand-purple/20 self-start mt-1">
                            {props.currentUser?.role}
                        </span>
                    </div>
                </div>
            </div>
            
            <nav className="flex flex-col gap-2 flex-1">
                <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Main Menu</p>
                <AdminNavItem icon="dashboard" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => handleTabClick('dashboard')} />
                <AdminNavItem icon="stadia_controller" label="Game Library" isActive={activeTab === 'games'} onClick={() => handleTabClick('games')} />
                <AdminNavItem icon="analytics" label="Analytics" isActive={activeTab === 'analytics'} onClick={() => handleTabClick('analytics')} />
                
                <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-2">Community</p>
                <AdminNavItem icon="manage_accounts" label="Users" isActive={activeTab === 'users'} onClick={() => handleTabClick('users')} />
                <AdminNavItem icon="move_to_inbox" label="Requests" isActive={activeTab === 'requests'} onClick={() => handleTabClick('requests')} />
                
                <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-2">System</p>
                <AdminNavItem icon="settings" label="Settings" isActive={activeTab === 'settings'} onClick={() => handleTabClick('settings')} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
                <button onClick={props.onNavigateHome} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group">
                    <span className="material-symbols-outlined group-hover:text-brand-light-purple transition-colors">home</span>
                    <span className="text-sm font-bold">Back to Site</span>
                </button>
                <button onClick={props.onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                    <span className="material-symbols-outlined group-hover:text-red-400 transition-colors">logout</span>
                    <span className="text-sm font-bold">Log Out</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen w-full bg-[#0f0720] font-display overflow-hidden relative selection:bg-brand-purple selection:text-white">
            {/* Global Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-30"></div>
            </div>

            {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
            
            <aside className={`fixed top-0 left-0 h-full w-72 bg-[#1a102e]/80 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>
            
            <main className="flex-1 flex flex-col overflow-hidden relative z-10 lg:ml-72">
                 <header className="lg:hidden sticky top-0 z-20 bg-[#1a102e]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-lg font-bold text-white capitalize">{activeTab}</h1>
                    </div>
                    <img src={props.currentUser?.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
                </header>
                
                <div key={activeTab} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto pb-10 animate-fadeIn">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

interface NavItemProps {
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const AdminNavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden
                ${isActive 
                    ? 'bg-gradient-to-r from-brand-purple to-violet-600 text-white shadow-lg shadow-brand-purple/25 translate-x-1' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
            `}
        >
            <span className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
            </span>
            <span className="font-bold text-sm tracking-wide">{label}</span>
            {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full"></div>}
        </button>
    );
};

export default AdminPanel;
