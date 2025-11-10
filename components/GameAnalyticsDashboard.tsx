import React from 'react';

const NeutralIcon = () => <span className="w-4 h-4 text-center font-bold text-sm leading-none">—</span>;

const GameAnalyticsDashboard: React.FC = () => {
    return (
        <div className="text-white animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Game Analytics Dashboard</h1>
                    <p className="text-sm text-brand-gray">Last updated: 2 minutes ago</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-[#2f2348] text-white px-4 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-brand-purple">
                        Last 30 Days
                        <span className="material-symbols-outlined text-base">expand_more</span>
                    </button>
                    <button className="bg-[#2f2348] text-white px-4 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-brand-purple">
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
    <div className="bg-[#1C162D] p-5 rounded-xl border border-gray-800">
        <p className="text-sm text-brand-gray">{title}</p>
        <p className="text-4xl font-bold mt-2">{value}</p>
        <div className={`flex items-center text-sm mt-2 font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
             <span className="material-symbols-outlined text-base mr-1">{trend === 'up' ? 'arrow_upward' : 'arrow_downward'}</span>
            <span>{change}</span>
        </div>
    </div>
);

const UserActivityDownloadsChart = () => (
    <div className="bg-[#1C162D] p-6 rounded-xl border border-gray-800 h-full">
        <div className="flex justify-between items-start">
            <div>
                 <h2 className="text-lg font-bold">User Activity & Downloads</h2>
                 <p className="text-sm text-brand-gray">Last 30 Days</p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-bold">1.2M Downloads</p>
                <div className="flex items-center justify-end text-green-400 font-semibold text-sm">
                    <span className="material-symbols-outlined text-base">arrow_upward</span>
                    <span>+2.5%</span>
                </div>
            </div>
        </div>
        <div className="relative h-48 mt-4">
            <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a492c9" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#1C162D" stopOpacity="0.1"/>
                    </linearGradient>
                </defs>
                <path d="M0,130 C40,100 80,140 125,90 S200,20 250,50 S350,130 400,100 S460,80 500,110 V150 H0 Z" fill="url(#activityGradient)" />
                <path d="M0,130 C40,100 80,140 125,90 S200,20 250,50 S350,130 400,100 S460,80 500,110" fill="none" stroke="#a492c9" strokeWidth="3" />
            </svg>
        </div>
        <div className="flex justify-between text-xs text-brand-gray px-4 -mt-4">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
        </div>
    </div>
);

const TopPerformingGamesChart = () => (
    <div className="bg-[#1C162D] p-6 rounded-xl border border-gray-800 h-full">
        <h2 className="text-lg font-bold mb-4">Top Performing Games</h2>
        <div className="relative flex items-center justify-center my-6">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#374151" strokeWidth="12" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#6B7280" strokeWidth="12" strokeDasharray="339.29" strokeDashoffset="0" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#F97316" strokeWidth="12" strokeDasharray="339.29" strokeDashoffset="50.89" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray="339.29" strokeDashoffset="101.78" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#6D28D9" strokeWidth="12" strokeDasharray="339.29" strokeDashoffset="186.6" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">5</span>
                <span className="text-brand-gray">Games</span>
            </div>
        </div>
        <div className="space-y-3">
            <LegendItem color="bg-[#6D28D9]" name="Cyber Odyssey" percentage="45%" />
            <LegendItem color="bg-[#10B981]" name="Galaxy Runners" percentage="25%" />
            <LegendItem color="bg-[#F97316]" name="Pixel Quest" percentage="15%" />
            <LegendItem color="bg-[#6B7280]" name="Others" percentage="15%" />
        </div>
    </div>
);

const LegendItem: React.FC<{ color: string; name: string; percentage: string }> = ({ color, name, percentage }) => (
    <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span className="text-brand-light-purple">{name}</span>
        </div>
        <span className="font-semibold">{percentage}</span>
    </div>
);

const RegionalPerformanceTreemap = () => (
    <div className="bg-[#1C162D] p-6 rounded-xl border border-gray-800 h-full">
        <h2 className="text-lg font-bold mb-4">Regional Performance Treemap</h2>
        <div className="grid grid-cols-2 gap-4">
            <RegionCard region="ASIA-PACIFIC" value="450K" status="Rising" change="+8.2%" statusColor="green" />
            <RegionCard region="N. AMERICA" value="300K" status="Stable" change="+0.5%" statusColor="orange" isNeutral />
            <RegionCard region="EUROPE" value="200K" status="Declining" change="-2.1%" statusColor="red" />
            <RegionCard region="OTHER REGIONS" value="150K" status="Stable" change="+0.1%" statusColor="orange" isNeutral />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-4 text-xs text-brand-gray">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span>Rising Performance</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span>Stable Performance</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Declining Performance</div>
        </div>
    </div>
);

const RegionCard: React.FC<{ region: string; value: string; status: string; change: string; statusColor: 'green' | 'orange' | 'red'; isNeutral?: boolean }> = ({ region, value, status, change, statusColor, isNeutral }) => {
    const statusBg = { green: 'bg-green-500/20', orange: 'bg-orange-500/20', red: 'bg-red-500/20' };
    const statusText = { green: 'text-green-400', orange: 'text-orange-400', red: 'text-red-400' };
    const changeText = { green: 'text-green-400', orange: 'text-gray-400', red: 'text-red-400' };

    return (
        <div className="bg-[#2f2348]/50 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
                <p className="text-xs text-brand-gray">{region}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusBg[statusColor]} ${statusText[statusColor]}`}>{status}</span>
            </div>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <div className={`flex items-center text-sm mt-1 font-semibold ${isNeutral ? changeText['orange'] : changeText[statusColor]}`}>
                {isNeutral ? <NeutralIcon /> : (change.startsWith('+') ? <span className="material-symbols-outlined text-base">arrow_upward</span> : <span className="material-symbols-outlined text-base">arrow_downward</span>)}
                <span className="ml-1">{change}</span>
            </div>
        </div>
    );
};

const UsersByPlatform = () => (
    <div className="bg-[#1C162D] p-6 rounded-xl border border-gray-800 h-full">
        <h2 className="text-lg font-bold mb-6">Users by Platform</h2>
        <div className="space-y-5">
            <PlatformBar platform="Windows" percentage={72} />
            <PlatformBar platform="macOS" percentage={18} />
            <PlatformBar platform="Linux" percentage={10} />
        </div>
    </div>
);

const PlatformBar: React.FC<{ platform: string; percentage: number }> = ({ platform, percentage }) => (
    <div>
        <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-brand-light-purple">{platform}</span>
            <span className="font-semibold">{percentage}%</span>
        </div>
        <div className="w-full bg-[#374151] rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default GameAnalyticsDashboard;
