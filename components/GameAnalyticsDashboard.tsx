
import React from 'react';

const NeutralIcon = () => <span className="w-4 h-4 text-center font-bold text-sm leading-none text-gray-500">—</span>;

const GameAnalyticsDashboard: React.FC = () => {
    return (
        <div className="text-white animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Analytics</h1>
                    <p className="text-sm text-brand-gray mt-1">Deep dive into your platform's statistics.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#1a102e]/60 backdrop-blur-md p-1 rounded-xl border border-white/10">
                    <button className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 text-sm font-bold rounded-lg shadow-lg shadow-brand-purple/20 transition-all">
                        Last 30 Days
                        <span className="material-symbols-outlined text-base">expand_more</span>
                    </button>
                    <button className="text-gray-400 hover:text-white px-4 py-2 text-sm font-bold rounded-lg transition-colors hover:bg-white/5">
                        Export Data
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Downloads" value="1.2M" change="+2.5%" trend="up" />
                <StatCard title="Active Users" value="250K" change="+1.8%" trend="up" />
                <StatCard title="Revenue" value="$85K" change="+5.2%" trend="up" />
                <StatCard title="New Sign-ups" value="12K" change="-0.5%" trend="down" />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <UserActivityDownloadsChart />
                </div>
                <div>
                    <TopPerformingGamesChart />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RegionalPerformanceTreemap />
                </div>
                <div>
                    <UsersByPlatform />
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ title: string; value: string; change: string; trend: 'up' | 'down' }> = ({ title, value, change, trend }) => (
    <div className="bg-[#1a102e]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-brand-purple/30 transition-all group">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gray">{title}</p>
            <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                <span className="material-symbols-outlined text-sm mr-1">{trend === 'up' ? 'arrow_upward' : 'arrow_downward'}</span>
                <span>{change}</span>
            </div>
        </div>
        <p className="text-4xl font-black text-white group-hover:text-brand-light-purple transition-colors">{value}</p>
    </div>
);

const UserActivityDownloadsChart = () => (
    <div className="bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold">User Activity</h2>
                    <p className="text-sm text-brand-gray">Downloads vs Active Sessions</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black">1.2M</p>
                    <p className="text-xs text-brand-gray uppercase font-bold tracking-wider">Total Interactions</p>
                </div>
            </div>
            <div className="relative h-64 w-full">
                <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                    <path d="M0,130 C40,100 80,140 125,90 S200,20 250,50 S350,130 400,100 S460,80 500,110 V150 H0 Z" fill="url(#activityGradient)" />
                    <path d="M0,130 C40,100 80,140 125,90 S200,20 250,50 S350,130 400,100 S460,80 500,110" fill="none" stroke="#a78bfa" strokeWidth="3" filter="drop-shadow(0 0 8px rgba(124,58,237,0.5))" />
                </svg>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
            </div>
        </div>
    </div>
);

const TopPerformingGamesChart = () => (
    <div className="bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 h-full flex flex-col items-center justify-center relative">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-30"></div>
        <h2 className="text-lg font-bold mb-8 w-full text-left">Market Share</h2>
        <div className="relative flex items-center justify-center mb-8">
            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle cx="60" cy="60" r="54" fill="none" stroke="#0f0720" strokeWidth="10" />
                
                {/* Segments */}
                <circle cx="60" cy="60" r="54" fill="none" stroke="#6B7280" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset="0" className="opacity-20" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#F97316" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset="50.89" strokeLinecap="round" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset="101.78" strokeLinecap="round" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#7c3aed" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset="186.6" strokeLinecap="round" filter="drop-shadow(0 0 4px rgba(124,58,237,0.5))" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-white">5</span>
                <span className="text-xs text-brand-gray font-bold uppercase tracking-widest mt-1">Leaders</span>
            </div>
        </div>
        <div className="w-full space-y-3">
            <LegendItem color="bg-[#7c3aed]" name="Cyber Odyssey" percentage="45%" highlight />
            <LegendItem color="bg-[#10B981]" name="Galaxy Runners" percentage="25%" />
            <LegendItem color="bg-[#F97316]" name="Pixel Quest" percentage="15%" />
            <LegendItem color="bg-gray-600" name="Others" percentage="15%" />
        </div>
    </div>
);

const LegendItem: React.FC<{ color: string; name: string; percentage: string; highlight?: boolean }> = ({ color, name, percentage, highlight }) => (
    <div className={`flex justify-between items-center text-sm p-2 rounded-lg ${highlight ? 'bg-white/5 border border-white/5' : ''}`}>
        <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${color} shadow-sm`}></span>
            <span className={`font-medium ${highlight ? 'text-white' : 'text-gray-400'}`}>{name}</span>
        </div>
        <span className={`font-bold ${highlight ? 'text-brand-light-purple' : 'text-gray-500'}`}>{percentage}</span>
    </div>
);

const RegionalPerformanceTreemap = () => (
    <div className="bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 h-full">
        <h2 className="text-lg font-bold mb-6">Regional Performance</h2>
        <div className="grid grid-cols-2 gap-4 h-[300px]">
            <RegionCard region="ASIA-PACIFIC" value="450K" status="Rising" change="+8.2%" statusColor="green" height="h-full" />
            <div className="flex flex-col gap-4 h-full">
                <RegionCard region="N. AMERICA" value="300K" status="Stable" change="+0.5%" statusColor="orange" isNeutral height="h-1/2" />
                <div className="flex gap-4 h-1/2">
                    <RegionCard region="EUROPE" value="200K" status="Dip" change="-2%" statusColor="red" height="h-full" compact />
                    <RegionCard region="OTHERS" value="150K" status="Ok" change="0%" statusColor="orange" isNeutral height="h-full" compact />
                </div>
            </div>
        </div>
    </div>
);

const RegionCard: React.FC<{ region: string; value: string; status: string; change: string; statusColor: 'green' | 'orange' | 'red'; isNeutral?: boolean; height?: string; compact?: boolean }> = ({ region, value, status, change, statusColor, isNeutral, height = 'h-auto', compact }) => {
    const statusBg = { green: 'bg-green-500/20', orange: 'bg-orange-500/20', red: 'bg-red-500/20' };
    const statusText = { green: 'text-green-400', orange: 'text-orange-400', red: 'text-red-400' };
    
    return (
        <div className={`bg-[#0f0720]/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors ${height}`}>
            <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-gray-500 tracking-wider">{region}</p>
                {!compact && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusBg[statusColor]} ${statusText[statusColor]}`}>{status}</span>}
            </div>
            <div>
                <p className={`font-black text-white ${compact ? 'text-xl' : 'text-3xl'}`}>{value}</p>
                <div className={`flex items-center text-xs font-bold mt-1 ${isNeutral ? 'text-orange-400' : statusText[statusColor]}`}>
                     {isNeutral ? <NeutralIcon /> : (change.startsWith('+') ? <span className="material-symbols-outlined text-sm">arrow_upward</span> : <span className="material-symbols-outlined text-sm">arrow_downward</span>)}
                    <span className="ml-1">{change}</span>
                </div>
            </div>
        </div>
    );
};

const UsersByPlatform = () => (
    <div className="bg-[#1a102e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 h-full">
        <h2 className="text-lg font-bold mb-6">Platform Distribution</h2>
        <div className="space-y-6">
            <PlatformBar icon="desktop_windows" platform="Windows" percentage={72} color="bg-blue-500" />
            <PlatformBar icon="laptop_mac" platform="macOS" percentage={18} color="bg-gray-400" />
            <PlatformBar icon="terminal" platform="Linux" percentage={10} color="bg-orange-500" />
        </div>
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
            <p className="text-xs text-brand-gray mb-1">Dominant Platform</p>
            <p className="text-xl font-black text-white">Windows (PC)</p>
        </div>
    </div>
);

const PlatformBar: React.FC<{ icon: string; platform: string; percentage: number; color: string }> = ({ icon, platform, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500 text-lg">{icon}</span>
                <span className="text-sm font-bold text-gray-300">{platform}</span>
            </div>
            <span className="text-sm font-bold text-white">{percentage}%</span>
        </div>
        <div className="w-full bg-[#0f0720] rounded-full h-3 border border-white/5">
            <div className={`h-full rounded-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default GameAnalyticsDashboard;
