
import React, { useState, useMemo } from 'react';
import { Game } from '../types';

interface GameManagementProps {
  games: Game[];
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onUpdateGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
}

const emptyGame: Omit<Game, 'id'> = {
  title: { en: '', tr: '' },
  genre: { en: '', tr: '' },
  developer: { en: '', tr: '' },
  publisher: { en: '', tr: '' },
  category: { en: '', tr: '' },
  platform: '',
  verticalImageUrl: '',
  horizontalImageUrl: '',
  downloadUrl: '',
  releaseDate: new Date().toISOString().split('T')[0],
  description: { en: '', tr: '' },
  price: 0,
  featured: false,
  patchUrl: '',
  screenshots: [],
};

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div className="group">
        <label htmlFor={props.id || props.name} className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider ml-1 group-focus-within:text-brand-purple transition-colors">{label}</label>
        <input {...props} className="w-full bg-[#0f0720] rounded-xl p-4 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600 disabled:opacity-50" />
    </div>
);

const FormTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div className="group">
        <label htmlFor={props.id || props.name} className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider ml-1 group-focus-within:text-brand-purple transition-colors">{label}</label>
        <textarea {...props} className="w-full bg-[#0f0720] rounded-xl p-4 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all placeholder:text-gray-600 resize-none"></textarea>
    </div>
);

const FormToggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; name: string, label: string, description: string }> = ({ checked, onChange, name, label, description }) => (
     <div className="flex items-center justify-between p-4 bg-[#0f0720] rounded-xl border border-white/10">
        <div>
            <label className="block text-sm font-bold text-white">{label}</label>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <label htmlFor={name} className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id={name} name={name} className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} />
            <div className="w-12 h-7 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple shadow-inner"></div>
        </label>
    </div>
);


const GameFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (game: Game | Omit<Game, 'id'>) => void;
    game: Game | Omit<Game, 'id'> | null;
}> = ({ isOpen, onClose, onSave, game }) => {
    const [formData, setFormData] = useState<Game | Omit<Game, 'id'>>(game || emptyGame);

    React.useEffect(() => {
        setFormData(game || emptyGame);
    }, [game]);
    
    if (!isOpen) return null;

    const isEditing = 'id' in formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const localizedFields = ['title', 'genre', 'category', 'description', 'developer', 'publisher'];

        if (type === 'checkbox' && 'checked' in e.target) {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (localizedFields.includes(name)) {
             setFormData(prev => ({ ...prev, [name]: { en: value, tr: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
        }
    };

     const handleScreenshotChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      const urls = value.split(',').map(url => url.trim()).filter(url => url);
      setFormData(prev => ({ ...prev, screenshots: urls }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
                 <div className="sticky top-0 z-10 bg-[#1C162D]/90 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-brand-purple text-3xl">{isEditing ? 'edit_square' : 'add_circle'}</span>
                        {isEditing ? `Edit Game` : 'Add New Game'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-gray-400 hover:text-white">close</span>
                    </button>
                 </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2">
                         <FormInput label="Game Title" type="text" name="title" id="title" value={formData.title.en} onChange={handleChange} required placeholder="e.g. Cyberpunk 2077" />
                        </div>
                        <FormInput label="Genre" type="text" name="genre" id="genre" value={formData.genre.en} onChange={handleChange} required placeholder="e.g. RPG / FPS" />
                        <FormInput label="Platform" type="text" name="platform" id="platform" value={formData.platform || ''} onChange={handleChange} required placeholder="PC, PS5, Xbox" />
                        
                        <FormInput label="Developer" type="text" name="developer" id="developer" value={formData.developer.en} onChange={handleChange} required />
                        <FormInput label="Publisher" type="text" name="publisher" id="publisher" value={formData.publisher.en} onChange={handleChange} required />
                        
                        <FormInput label="Category" type="text" name="category" id="category" value={formData.category.en} onChange={handleChange} required placeholder="e.g. Action" />
                        <FormInput label="Price ($)" type="number" name="price" id="price" value={formData.price} onChange={handleChange} required step="0.01" min="0" />
                        <FormInput label="Release Date" type="date" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
                        <FormInput label="Patch URL" type="url" name="patchUrl" id="patchUrl" value={formData.patchUrl || ''} onChange={handleChange} placeholder="https://..." />
                        
                        <div className="md:col-span-2 space-y-4">
                             <FormInput label="Vertical Cover Image URL (Portrait)" type="url" name="verticalImageUrl" id="verticalImageUrl" value={formData.verticalImageUrl} onChange={handleChange} required placeholder="https://..." />
                             <FormInput label="Horizontal Hero Image URL (Landscape)" type="url" name="horizontalImageUrl" id="horizontalImageUrl" value={formData.horizontalImageUrl} onChange={handleChange} required placeholder="https://..." />
                             <FormInput label="Download Link" type="url" name="downloadUrl" id="downloadUrl" value={formData.downloadUrl} onChange={handleChange} required placeholder="https://..." />
                        </div>

                        <div className="md:col-span-2">
                          <FormTextarea label="Description" name="description" id="description" value={formData.description.en} onChange={handleChange} required rows={5} placeholder="Game description..." />
                        </div>
                         <div className="md:col-span-2">
                            <FormTextarea label="Screenshots (Comma separated URLs)" name="screenshots" id="screenshots" value={(formData.screenshots || []).join(', ')} onChange={handleScreenshotChange} rows={3} placeholder="https://image1.jpg, https://image2.jpg" />
                        </div>
                         <div className="md:col-span-2">
                           <FormToggle name="featured" label="Featured Game" description="Show this game in the main hero slider on the homepage." checked={formData.featured || false} onChange={(checked) => setFormData(prev => ({...prev, featured: checked}))} />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/5">
                        <button type="button" onClick={onClose} className="text-gray-400 font-bold py-3 px-6 rounded-xl transition-colors hover:bg-white/5 hover:text-white">Cancel</button>
                        <button type="submit" className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-brand-purple/30 hover:scale-[1.02]">
                            {isEditing ? 'Save Changes' : 'Add Game'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const GameManagement: React.FC<GameManagementProps> = ({ games, onAddGame, onUpdateGame, onDeleteGame }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGame, setEditingGame] = useState<Game | Omit<Game, 'id'> | null>(null);

    const ITEMS_PER_PAGE = 8;

    const filteredGames = useMemo(() => {
        return games.filter(game =>
            game.title.en.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [games, searchQuery]);

    const paginatedGames = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredGames, currentPage]);

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

    const handleAddClick = () => {
        setEditingGame(emptyGame);
        setIsModalOpen(true);
    };

    const handleEditClick = (game: Game) => {
        setEditingGame(game);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            onDeleteGame(id);
        }
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGame(null);
    };

    const handleSaveGame = (game: Game | Omit<Game, 'id'>) => {
        if ('id' in game) {
            onUpdateGame(game as Game);
        } else {
            onAddGame(game);
        }
        closeModal();
    };

  return (
    <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Game Library</h1>
                <p className="text-brand-gray mt-1">Manage, add, or edit games in your store.</p>
            </div>
            <button onClick={handleAddClick} className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-purple/25 flex items-center gap-2 border border-white/10 hover:-translate-y-0.5">
                <span className="material-symbols-outlined">add</span>
                <span>Add Game</span>
            </button>
        </header>

        <div className="bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 p-2 flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                <input 
                    className="w-full bg-[#0f0720]/50 rounded-xl py-3 pl-12 pr-4 border border-transparent focus:border-brand-purple focus:ring-0 text-white placeholder:text-gray-600 transition-all" 
                    placeholder="Search games by title..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-3 bg-[#0f0720]/50 hover:bg-[#0f0720] text-gray-300 rounded-xl transition-colors font-medium border border-transparent hover:border-white/5">
                    <span className="material-symbols-outlined text-xl">filter_list</span>
                    <span>Filter</span>
                </button>
                 <button className="flex items-center gap-2 px-4 py-3 bg-[#0f0720]/50 hover:bg-[#0f0720] text-gray-300 rounded-xl transition-colors font-medium border border-transparent hover:border-white/5">
                    <span className="material-symbols-outlined text-xl">sort</span>
                    <span>Sort</span>
                </button>
            </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-bold">Game Info</th>
                        <th className="px-6 py-4 font-bold">Details</th>
                        <th className="px-6 py-4 font-bold">Release Date</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {paginatedGames.map(game => (
                        <tr key={game.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img src={game.verticalImageUrl} alt={game.title.en} className="w-12 h-16 object-cover rounded-lg shadow-md border border-white/5 group-hover:scale-105 transition-transform duration-300"/>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{game.title.en}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{game.developer.en}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-300">{game.genre.en}</span>
                                    <span className="text-xs text-brand-light-purple bg-brand-purple/10 px-2 py-0.5 rounded-md self-start border border-brand-purple/20">{game.platform || 'N/A'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                {new Date(game.releaseDate).toLocaleDateString()}
                            </td>
                             <td className="px-6 py-4">
                                {game.featured ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                        <span className="material-symbols-outlined text-xs">star</span> Featured
                                    </span>
                                ) : (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-gray-700/30 text-gray-400 border border-gray-600/30">Standard</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditClick(game)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-brand-purple hover:text-white text-gray-400 transition-all" title="Edit">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(game.id, game.title.en)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 transition-all" title="Delete">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile Card List */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedGames.length > 0 ? paginatedGames.map(game => (
                <div key={game.id} className="bg-[#1a102e]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex gap-4 shadow-lg">
                    <img src={game.verticalImageUrl} alt={game.title.en} className="w-20 h-28 object-cover rounded-xl shadow-md flex-shrink-0"/>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                             <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-white text-lg truncate pr-2">{game.title.en}</h3>
                                {game.featured && <span className="material-symbols-outlined text-yellow-400 text-lg">star</span>}
                             </div>
                             <p className="text-xs text-brand-light-purple mb-2">{game.genre.en} • {game.platform}</p>
                             <p className="text-xs text-gray-500">{new Date(game.releaseDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                             <button onClick={() => handleEditClick(game)} className="px-3 py-1.5 bg-white/5 hover:bg-brand-purple text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">edit</span> Edit
                            </button>
                             <button onClick={() => handleDelete(game.id, game.title.en)} className="px-3 py-1.5 bg-white/5 hover:bg-red-500 text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <p className="text-gray-500">No games found matching "{searchQuery}".</p>
                </div>
            )}
        </div>

         {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center bg-[#1a102e]/60 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
                <span className="text-sm text-gray-400 mb-4 sm:mb-0">
                    Showing <span className="font-bold text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-bold text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredGames.length)}</span> of <span className="font-bold text-white">{filteredGames.length}</span>
                </span>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-bold text-white transition-colors">Previous</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-bold text-white transition-colors">Next</button>
                </div>
            </div>
        )}
        
        {editingGame && (
            <GameFormModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveGame}
                game={editingGame}
            />
        )}
    </div>
  );
};

export default GameManagement;
