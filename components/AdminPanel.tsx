import React, { useState } from 'react';
import { Game } from '../types';
import GameManagement from './GameManagement';
import AdminDashboard from './AdminDashboard';
import SiteSettingsComponent from './SiteSettings';
import { SiteSettings } from '../hooks/useSiteSettings';
import GameAnalyticsDashboard from './GameAnalyticsDashboard';

interface AdminPanelProps {
  games: Game[];
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onUpdateGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onLogout: () => void;
  siteSettings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
}

type AdminTab = 'dashboard' | 'games' | 'users' | 'analytics' | 'settings';

const DisabledFeature: React.FC<{title: string}> = ({ title }) => (
    <div className="relative p-8 h-full flex flex-col items-center justify-center text-center bg-brand-dark-2 rounded-lg animate-fadeIn border border-gray-800 overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-brand-light-purple mt-2 mb-6">This feature is a visual mockup and is not yet implemented.</p>
        </div>
    </div>
);

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
                return <DisabledFeature title="User Management" />;
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
                         <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" alt="Admin Avatar" className="size-10 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-medium leading-normal">Semih Topak</h1>
                            <p className="text-[#a492c9] text-sm font-normal leading-normal">Admin</p>
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