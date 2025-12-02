
import React, { useState, useMemo } from 'react';
import { RequestedGame } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '../hooks/useTranslation';
import { enUS, tr } from 'date-fns/locale';

interface RequestedGamesManagementProps {
  requestedGames: RequestedGame[];
  onDeleteRequestedGame: (id: string) => void;
}

const RequestedGamesManagement: React.FC<RequestedGamesManagementProps> = ({ requestedGames, onDeleteRequestedGame }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { language } = useTranslation();
    const locale = language === 'tr' ? tr : enUS;

    const filteredGames = useMemo(() => {
        return requestedGames.filter(req =>
            req.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [requestedGames, searchQuery]);

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete the request for "${title}"?`)) {
            onDeleteRequestedGame(id);
        }
    };

  return (
    <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Game Requests</h1>
                <p className="text-brand-gray mt-1">Review and manage game requests from the community.</p>
            </div>
             <div className="bg-brand-purple/10 border border-brand-purple/20 px-4 py-2 rounded-xl">
                <span className="text-brand-light-purple font-bold text-lg">{requestedGames.length}</span>
                <span className="text-brand-light-purple/70 text-sm ml-2 font-medium">Pending Requests</span>
            </div>
        </header>

         <div className="bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 p-2">
            <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                <input 
                    className="w-full bg-[#0f0720]/50 rounded-xl py-3 pl-12 pr-4 border border-transparent focus:border-brand-purple focus:ring-0 text-white placeholder:text-gray-600 transition-all" 
                    placeholder="Search requests..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-bold">Game Title</th>
                        <th className="px-6 py-4 font-bold">Requested By</th>
                        <th className="px-6 py-4 font-bold">Reason</th>
                        <th className="px-6 py-4 font-bold">Time</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredGames.map(req => (
                        <tr key={req.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 font-bold text-white">{req.gameTitle}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={req.avatarUrl} alt={req.requestedBy} className="w-8 h-8 rounded-lg object-cover border border-white/10" />
                                    <span className="text-gray-300 font-medium">{req.requestedBy}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-sm truncate text-gray-400 italic" title={req.reason}>
                                "{req.reason || 'No reason provided.'}"
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale })}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => handleDelete(req.id, req.gameTitle)} 
                                  className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 transition-all opacity-60 group-hover:opacity-100"
                                  title="Delete request"
                                >
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile Card List */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredGames.length > 0 ? filteredGames.map(req => (
                <div key={req.id} className="bg-[#1a102e]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 space-y-3">
                    <div className="flex justify-between items-start">
                         <h3 className="font-bold text-white text-lg">{req.gameTitle}</h3>
                         <button 
                            onClick={() => handleDelete(req.id, req.gameTitle)}
                            className="p-2 -mr-2 text-gray-400 hover:text-red-400"
                        >
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <img src={req.avatarUrl} alt={req.requestedBy} className="w-6 h-6 rounded-lg object-cover" />
                        <span className="text-sm font-bold text-gray-300">{req.requestedBy}</span>
                        <span className="text-gray-600 text-xs">•</span>
                        <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale })}</span>
                    </div>
                    
                    {req.reason && (
                         <div className="p-3 bg-[#0f0720]/50 rounded-xl border border-white/5">
                            <p className="text-sm text-gray-400 italic">"{req.reason}"</p>
                        </div>
                    )}
                </div>
            )) : (
                 <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <p className="text-gray-500">No requests found.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default RequestedGamesManagement;
