import React from 'react';
import { Game } from '../types';

interface AdminDashboardProps {
  games: Game[];
  onAddNewGame: () => void;
}

// Sub-components for the dashboard
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
  <div className="bg-[#1C162D] p-5 rounded-xl border border-gray-800 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
    <div className="flex justify-between items-start">
        <div className="flex flex-col">
            <p className="text-sm text-brand-gray font-medium">{title}</p>
            <span className="text-3xl font-bold text-white mt-1">{value}</span>
        </div>
        <span className="material-symbols-outlined text-3xl text-brand-gray">{icon}</span>
    </div>
    <p className="text-sm text-green-400 mt-2">{change}</p>
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
    const actionStyles: { [key in typeof actionType]: string } = {
        'New User': 'text-blue-400',
        'Game Added': 'text-green-400',
        'Password Change': 'text-yellow-400',
        'Game Removed': 'text-red-400',
    };

    const userColors: { [key: string]: string } = {
        'J': 'bg-pink-500',
        'A': 'bg-indigo-500',
    };
    const userInitial = user.charAt(0).toUpperCase();
    const avatarColor = userColors[userInitial] || 'bg-gray-500';

    return (
        <tr className="border-b border-gray-800 last:border-b-0 hover:bg-brand-dark-2/50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-sm font-bold`}>
                        {userInitial}
                    </div>
                    <span className="font-medium text-white">{user}</span>
                </div>
            </td>
            <td className={`px-4 py-3 font-medium ${actionStyles[actionType]}`}>{action}</td>
            <td className="px-4 py-3 text-brand-gray">{details}</td>
            <td className="px-4 py-3 text-brand-gray text-sm text-right">{date}</td>
        </tr>
    );
};


const DownloadChart = () => {
    return (
      <div className="relative h-40 md:h-48 w-full mt-8">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5211d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#5211d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path
            d="M0,110 C40,90 70,140 110,120 C150,100 170,40 210,60 C250,80 280,130 320,110 C360,90 380,20 420,50 C460,80 480,90 500,70 L500,150 L0,150 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M0,110 C40,90 70,140 110,120 C150,100 170,40 210,60 C250,80 280,130 320,110 C360,90 380,20 420,50 C460,80 480,90 500,70"
            fill="none"
            stroke="#a492c9"
            strokeWidth="3"
          />
        </svg>
        <div className="absolute -bottom-2 left-0 right-0 flex justify-around text-xs text-brand-gray px-2">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>
    );
  };


const AdminDashboard: React.FC<AdminDashboardProps> = ({ games, onAddNewGame }) => {
    const topGames = [...games].sort((a,b) => b.price - a.price).slice(0, 4); // Fake sort for demo
  return (
    <div className="animate-fadeIn">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-brand-gray mt-1">Welcome back, here is an overview of your site's performance.</p>
            </div>
            <button onClick={onAddNewGame} className="text-brand-light-purple hover:text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add New Game</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Downloads" value="1,234,567" change="+1.2%" icon="download" />
            <StatCard title="Users This Month" value="8,910" change="+5.4%" icon="group" />
            <StatCard title="Total Games" value={games.length.toString()} change="+2" icon="stadia_controller" />
            <StatCard title="Revenue" value="$45,678" change="+3.1%" icon="monetization_on" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#1C162D] p-6 rounded-xl border border-gray-800">
                <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                        <h3 className="text-lg font-bold">Download Trends</h3>
                        <p className="text-sm text-brand-gray">Last 30 Days</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">150,321</p>
                        <p className="text-sm font-semibold text-green-400">+12.5%</p>
                    </div>
                </div>
                <DownloadChart />
            </div>
            <div className="bg-[#1C162D] p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Top Games</h3>
                <div className="space-y-4">
                    {topGames.map((game) => (
                        <div key={game.id} className="flex items-center gap-4">
                            <img src={game.verticalImageUrl} alt={game.title.en} className="w-12 h-16 object-cover rounded-md flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-white">{game.title.en}</h4>
                                <p className="text-sm text-brand-gray">{Math.floor(Math.random() * (100000 - 30000 + 1) + 30000).toLocaleString()} downloads</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
         <div className="mt-8 bg-[#1C162D] rounded-xl border border-gray-800">
             <h3 className="text-xl font-bold p-6">Recent Activity</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700 text-sm text-brand-gray">
                        <tr>
                            <th className="px-4 py-2 font-medium">USER</th>
                            <th className="px-4 py-2 font-medium">ACTION</th>
                            <th className="px-4 py-2 font-medium">DETAILS</th>
                            <th className="px-4 py-2 font-medium text-right">DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ActivityRow user="John Doe" action="New User" details="Registered a new account" date="2 hours ago" actionType="New User" />
                        <ActivityRow user="Admin" action="Game Added" details={'Added "Stellar Odyssey"'} date="5 hours ago" actionType="Game Added" />
                        <ActivityRow user="Jane Smith" action="Password Change" details="Successfully updated password" date="1 day ago" actionType="Password Change" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;