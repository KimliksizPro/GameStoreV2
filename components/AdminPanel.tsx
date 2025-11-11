
import React, { useState } from 'react';
import { Game, User } from '../types';
import GameManagement from './GameManagement';
import AdminDashboard from './AdminDashboard';
import SiteSettingsComponent from './SiteSettings';
import { SiteSettings } from '../hooks/useSiteSettings';
import GameAnalyticsDashboard from './GameAnalyticsDashboard';
import UserManagement from './UserManagement';

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
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

type AdminTab = 'dashboard' | 'games' | 'users' | 'analytics' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

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
                          onUpdateUser={props.onUpdateUser}
                          onDeleteUser={props.onDeleteUser}
                        />;
            case 'analytics':
                 return <GameAnalyticsDashboard />;
            case 'settings':
                return <SiteSettingsComponent 
                          currentSettings={props.siteSettings} 
                          onSave={props.onSaveSettings} 
                        />;
            default:
                return <AdminDashboard games={props.games} onAddNewGame={() => setActiveTab('games')} />;
        }
    };

    return (
        <div className="flex h-screen w-full bg-background-dark font-display">
            <aside className="flex w-64 flex-col bg-[#1C162D] p-4 border-r border-gray-800">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                         <img src={props.currentUser?.avatarUrl} alt="Admin Avatar" className="size-10 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-medium leading-normal">{props.currentUser?.username}</h1>
                            <p className="text-[#a492c9] text-sm font-normal leading-normal capitalize">{props.currentUser?.role}</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2 mt-4">
                        <AdminNavItem icon="dashboard" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                        <AdminNavItem icon="manage_accounts" label="User Management" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                        <AdminNavItem icon="stadia_controller" label="Game Library" isActive={activeTab === 'games'} onClick={() => setActiveTab('games')} />
                        <AdminNavItem icon="settings" label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    </nav>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                    <button onClick={props.onNavigateHome} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-brand-purple/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                        <p className="text-sm font-medium leading-normal">Siteyi Görüntüle</p>
                    </button>
                    <button onClick={props.onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-900/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        <p className="text-sm font-medium leading-normal">Log Out</p>
                    </button>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div key={activeTab} className="p-6 lg:p-8 flex-1 page-transition">
                    {renderContent()}
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
    const baseClasses = "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out text-left";
    const activeClasses = "bg-primary shadow-lg shadow-primary/40";
    const inactiveClasses = "hover:bg-violet-500/30";
    
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <span className={`material-symbols-outlined text-xl ${isActive ? 'text-white' : 'text-gray-400'}`}>{icon}</span>
            <p className={`text-sm leading-normal ${isActive ? 'text-white font-semibold' : 'text-gray-300 font-medium'}`}>{label}</p>
        </button>
    );
};

export default AdminPanel;