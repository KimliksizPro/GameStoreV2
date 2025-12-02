
import React from 'react';
import { Game } from '../types';

interface AdminDashboardProps {
  games: Game[];
  onAddNewGame: () => void;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <div className="relative overflow-hidden bg-[#1a102e]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5 group transition-all duration-300 hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:-translate-y-1">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <span className="material-symbols-outlined text-8xl text-brand-purple">{icon}</span>
    </div>
    
    <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
            <div className="flex items-center gap-3 mb-2 text-brand-gray">
                 <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-xl text-brand-light-purple">{icon}</span>
                 </div>
                 <span className="text-sm font-bold uppercase tracking-wider">{title}</span>
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
        
        <div className={`flex items-center gap-1 mt-4 text-sm font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'} bg-black/20 self-start px-2 py-1 rounded-lg`}>
             <span className="material-symbols-outlined text-sm">{trend === 'up' ? 'trending_up' : 'trending_down'}</span>
             <span>{change}</span>
             <span className="text-gray-500 font-medium ml-1">vs last month</span>
        </div>
    </div>
  </div>
);


interface ActivityRowProps {
  user: string;
  action: string;
  details: string;
  date: string;
  actionType: 'New User' | 'Game Added' | 'Password Change' | 'Game Removed';
}

const ActivityRow: React.FC<ActivityRowProps> = ({ user, action, details, date, actionType }) => {
    const actionColors: { [key in typeof actionType]: string } = {
        'New User': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
        'Game Added': 'bg-green-500/20 text-green-400 border-green-500/20',
        'Password Change': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
        'Game Removed': 'bg-red-500/20 text-red-400 border-red-500/20',
    };

    return (
        <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-violet-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-bold text-white text-sm">{user}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${actionColors[actionType]} self-start`}>
                        {action}
                    </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{details}</p>
            </div>
            <span className="text-xs font-medium text-brand-gray whitespace-nowrap">{date}</span>
        </div>
    );
};


const DownloadChart = () => {
    return (
      <div className="relative h-56 w-full mt-6 bg-[#120b1f] rounded-2xl border border-white/5 p-4 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <svg
          className="w-full h-full"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M0,110 C40,90 70,140 110,120 C150,100 170,40 210,60 C250,80 280,130 320,110 C360,90 380,20 420,50 C460,80 480,90 500,70 L500,150 L0,150 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M0,110 C40,90 70,140 110,120 C150,100 170,40 210,60 C250,80 280,130 320,110 C360,90 380,20 420,50 C460,80 480,90 500,70"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            filter="url(#glow)"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-4 flex justify-between px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>
    );
  };


const AdminDashboard: React.FC<AdminDashboardProps> = ({ games, onAddNewGame }) => {
    // Fake sort for demo purposes, ensuring some variation
    const topGames = [...games].sort((a,b) => b.price - a.price).slice(0, 5);
    
    const getRankBadge = (index: number) => {
        const baseStyle = "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black z-10 shadow-lg border-2";
        
        switch(index) {
            case 0:
                return (
                    <div className={`${baseStyle} bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 text-white border-yellow-200 shadow-yellow-500/50`}>
                        <span className="material-symbols-outlined text-sm">emoji_events</span>
                    </div>
                );
            case 1:
                return (
                    <div className={`${baseStyle} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white border-gray-200 shadow-gray-500/50`}>
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    </div>
                );
            case 2:
                return (
                    <div className={`${baseStyle} bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 text-white border-orange-200 shadow-orange-500/50`}>
                         <span className="material-symbols-outlined text-sm">military_tech</span>
                    </div>
                );
            default:
                return (
                    <div className={`${baseStyle} bg-[#1a102e] text-brand-gray border-white/10`}>
                        {index + 1}
                    </div>
                );
        }
    };

  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 className="text-4xl font-black text-white tracking-tight">Dashboard</h1>
                <p className="text-brand-gray mt-2 text-lg">Overview of your platform's performance.</p>
            </div>
            <button onClick={onAddNewGame} className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/40 hover:-translate-y-0.5 flex items-center gap-2 border border-white/10">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add New Game</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Downloads" value="1.2M" change="+12.5%" icon="download" trend="up" />
            <StatCard title="Active Users" value="8.9K" change="+5.4%" icon="group" trend="up" />
            <StatCard title="Total Games" value={games.length.toString()} change="+2" icon="stadia_controller" trend="up" />
            <StatCard title="Revenue" value="$45.6K" change="-1.2%" icon="payments" trend="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
                <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Download Trends</h3>
                        <p className="text-sm text-brand-gray">Visual analytics for the last 30 days</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-white">150,321</p>
                        <p className="text-sm font-bold text-green-400 flex items-center justify-end gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +12.5%
                        </p>
                    </div>
                </div>
                <DownloadChart />
            </div>

            <div className="bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none"></div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                    <span className="material-symbols-outlined text-brand-light-purple">leaderboard</span>
                    Top Performing
                </h3>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                    {topGames.map((game, index) => (
                        <div key={game.id} className="flex items-center gap-4 group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                            <div className="relative flex-shrink-0">
                                {getRankBadge(index)}
                                <img src={game.verticalImageUrl} alt={game.title.en} className="w-12 h-16 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm truncate group-hover:text-brand-light-purple transition-colors">{game.title.en}</h4>
                                <div className="flex items-center justify-between mt-2">
                                     <div className="flex flex-col gap-0.5 w-full mr-4">
                                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-brand-purple to-pink-500 rounded-full" style={{ width: `${Math.max(10, 100 - (index * 15))}%` }}></div>
                                        </div>
                                     </div>
                                     <span className="text-xs font-bold text-white">{(10 - index * 0.5).toFixed(1)}k</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

         <div className="bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 p-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <button className="text-sm font-bold text-brand-light-purple hover:text-white transition-colors">View All</button>
             </div>
             <div className="grid gap-3">
                <ActivityRow user="John Doe" action="New User" details="Registered a new account" date="2 hours ago" actionType="New User" />
                <ActivityRow user="Admin" action="Game Added" details={'Added "Stellar Odyssey"'} date="5 hours ago" actionType="Game Added" />
                <ActivityRow user="Jane Smith" action="Password Change" details="Successfully updated password" date="1 day ago" actionType="Password Change" />
                <ActivityRow user="Moderator" action="Game Removed" details={'Removed "Old Beta"'} date="2 days ago" actionType="Game Removed" />
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
