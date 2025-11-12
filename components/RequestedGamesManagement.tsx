
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
    <>
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Game Requests</h1>
             <div className="flex items-center gap-4">
                <span className="text-brand-gray text-sm">{requestedGames.length} total requests</span>
            </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#1C162D] rounded-xl border border-gray-800">
            <div className="flex-1">
                <label className="relative flex items-center h-12 w-full">
                    <div className="text-[#a492c9] absolute left-0 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-700 bg-[#2f2348] focus:border-primary/50 h-full placeholder:text-[#a492c9] pl-12 pr-4" placeholder="Search requests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </label>
            </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto bg-[#1C162D] rounded-xl border border-gray-800 hidden md:block">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-[#2f2348]">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">Game Title</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Requested By</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Reason</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map(req => (
                        <tr key={req.id} className="border-b border-gray-800 hover:bg-primary/10">
                            <td scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{req.gameTitle}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={req.avatarUrl} alt={req.requestedBy} className="w-8 h-8 rounded-full object-cover" />
                                    <span>{req.requestedBy}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-sm truncate" title={req.reason}>{req.reason || 'N/A'}</td>
                            <td className="px-6 py-4">{formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale })}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => handleDelete(req.id, req.gameTitle)} 
                                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                                  title="Delete request"
                                >
                                    <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile Card List */}
        <div className="space-y-4 md:hidden">
            {filteredGames.length > 0 ? filteredGames.map(req => (
                <div key={req.id} className="bg-[#1C162D] rounded-xl border border-gray-800 p-4 space-y-3">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                             <h3 className="font-bold text-white mb-1">{req.gameTitle}</h3>
                             <div className="flex items-center gap-2 mb-2">
                                <img src={req.avatarUrl} alt={req.requestedBy} className="w-6 h-6 rounded-full object-cover" />
                                <span className="text-sm text-gray-300">{req.requestedBy}</span>
                             </div>
                            <p className="text-sm text-gray-400 italic">"{req.reason || 'No reason provided.'}"</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                        <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale })}</span>
                        <button 
                            onClick={() => handleDelete(req.id, req.gameTitle)}
                            className="text-gray-300 hover:text-red-400 text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-red-500/10"
                            title="Delete request"
                        >
                            <span className="material-symbols-outlined text-base">delete</span> Delete
                        </button>
                    </div>
                </div>
            )) : (
                 <p className="text-center text-gray-500 py-8">No game requests found for "{searchQuery}".</p>
            )}
        </div>
    </>
  );
};

export default RequestedGamesManagement;
