
import React, { useState, useMemo } from 'react';
import { Game } from '../types';

interface GameManagementProps {
  games: Game[];
  onAddGame: (game: Omit<Game, 'id'>) => void;
  onUpdateGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
}

// FIX: Initialize LocalizedString fields correctly to match the Game type.
const emptyGame: Omit<Game, 'id'> = {
  title: { en: '', tr: '' },
  genre: { en: '', tr: '' },
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
    <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-brand-light-purple mb-2">{label}</label>
        <input {...props} className="form-input w-full bg-[#2f2348] rounded-lg p-2 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white disabled:opacity-50" />
    </div>
);

const FormTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-brand-light-purple mb-2">{label}</label>
        <textarea {...props} className="form-textarea w-full bg-[#2f2348] rounded-lg p-2 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"></textarea>
    </div>
);

const FormToggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; name: string, label: string, description: string }> = ({ checked, onChange, name, label, description }) => (
     <div className="flex items-center justify-between">
        <div>
            <label className="block text-sm font-medium text-brand-light-purple">{label}</label>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
        <label htmlFor={name} className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id={name} name={name} className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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

    // FIX: Handle updates for both plain and LocalizedString fields.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        const localizedFields = ['title', 'genre', 'category', 'description'];

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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8">
                    {/* FIX: Display LocalizedString correctly. */}
                    <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? `Editing: ${formData.title.en}` : 'Add New Game'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2">
                         {/* FIX: Use .en property for LocalizedString value. */}
                         <FormInput label="Title" type="text" name="title" id="title" value={formData.title.en} onChange={handleChange} required />
                        </div>
                        {/* FIX: Use .en property for LocalizedString value. */}
                        <FormInput label="Genre (e.g., Action/RPG)" type="text" name="genre" id="genre" value={formData.genre.en} onChange={handleChange} required />
                        <FormInput label="Platform (e.g., PC, PS5)" type="text" name="platform" id="platform" value={formData.platform || ''} onChange={handleChange} required />
                        {/* FIX: Use .en property for LocalizedString value. */}
                        <FormInput label="Category" type="text" name="category" id="category" value={formData.category.en} onChange={handleChange} required />
                        <FormInput label="Price" type="number" name="price" id="price" value={formData.price} onChange={handleChange} required step="0.01" min="0" />
                        <FormInput label="Release Date" type="date" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
                        <FormInput label="Patch URL (Optional)" type="url" name="patchUrl" id="patchUrl" value={formData.patchUrl || ''} onChange={handleChange} />
                        <div className="md:col-span-2">
                          <FormInput label="Vertical Image URL" type="url" name="verticalImageUrl" id="verticalImageUrl" value={formData.verticalImageUrl} onChange={handleChange} required />
                        </div>
                         <div className="md:col-span-2">
                          <FormInput label="Horizontal Image URL" type="url" name="horizontalImageUrl" id="horizontalImageUrl" value={formData.horizontalImageUrl} onChange={handleChange} required />
                        </div>
                         <div className="md:col-span-2">
                          <FormInput label="Download URL" type="url" name="downloadUrl" id="downloadUrl" value={formData.downloadUrl} onChange={handleChange} required />
                        </div>
                        <div className="md:col-span-2">
                          {/* FIX: Use .en property for LocalizedString value. */}
                          <FormTextarea label="Description" name="description" id="description" value={formData.description.en} onChange={handleChange} required rows={4} />
                        </div>
                         <div className="md:col-span-2">
                            <FormTextarea label="Screenshots (comma-separated URLs)" name="screenshots" id="screenshots" value={(formData.screenshots || []).join(', ')} onChange={handleScreenshotChange} rows={3} />
                        </div>
                         <div className="md:col-span-2 bg-[#2f2348] p-4 rounded-lg border border-gray-700">
                           <FormToggle name="featured" label="Featured Game" description="Display this game in the hero section on the homepage." checked={formData.featured || false} onChange={(checked) => setFormData(prev => ({...prev, featured: checked}))} />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
                        <button type="button" onClick={onClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="bg-primary hover:bg-violet-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">{isEditing ? 'Update Game' : 'Add Game'}</button>
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

    const ITEMS_PER_PAGE = 10;

    const filteredGames = useMemo(() => {
        return games.filter(game =>
            // FIX: Search by a specific language property of the LocalizedString.
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
    <>
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Manage Games</h1>
            <button onClick={handleAddClick} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-violet-600 transition-colors">
                <span className="material-symbols-outlined mr-2 text-base">add</span>
                <span className="truncate">Add New Game</span>
            </button>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#1C162D] rounded-xl border border-gray-800">
            <div className="flex-1">
                <label className="relative flex items-center h-12 w-full">
                    <div className="text-[#a492c9] absolute left-0 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-700 bg-[#2f2348] focus:border-primary/50 h-full placeholder:text-[#a492c9] pl-12 pr-4" placeholder="Search games by title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </label>
            </div>
             <div className="flex gap-3 items-center">
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2f2348] px-4 border border-gray-700 hover:bg-primary/20">
                    <p className="text-white text-sm font-medium">Genre</p>
                    <span className="material-symbols-outlined text-white">expand_more</span>
                </button>
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2f2348] px-4 border border-gray-700 hover:bg-primary/20">
                    <p className="text-white text-sm font-medium">Platform</p>
                    <span className="material-symbols-outlined text-white">expand_more</span>
                </button>
            </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto bg-[#1C162D] rounded-xl border border-gray-800 hidden md:block">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-[#2f2348]">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">Game</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Genre</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Platform</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Release Date</th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedGames.map(game => (
                        <tr key={game.id} className="border-b border-gray-800 hover:bg-primary/10">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center gap-4">
                                {/* FIX: Use a property of LocalizedString for alt text and display. */}
                                <img src={game.verticalImageUrl} alt={game.title.en} className="w-12 h-16 object-cover rounded-lg"/>
                                <span>{game.title.en}</span>
                            </th>
                            {/* FIX: Use a property of LocalizedString for display. */}
                            <td className="px-6 py-4">{game.genre.en}</td>
                            <td className="px-6 py-4">{game.platform || 'N/A'}</td>
                            <td className="px-6 py-4">{new Date(game.releaseDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => handleEditClick(game)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-primary/30"><span className="material-symbols-outlined text-base">edit</span></button>
                                {/* FIX: Pass a string from LocalizedString to the handler. */}
                                <button onClick={() => handleDelete(game.id, game.title.en)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"><span className="material-symbols-outlined text-base">delete</span></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile Card List */}
        <div className="space-y-4 md:hidden">
            {paginatedGames.length > 0 ? paginatedGames.map(game => (
                <div key={game.id} className="bg-[#1C162D] rounded-xl border border-gray-800 p-4 space-y-3">
                    <div className="flex items-start gap-4">
                        <img src={game.verticalImageUrl} alt={game.title.en} className="w-16 h-20 object-cover rounded-lg flex-shrink-0"/>
                        <div className="flex-1">
                            {/* FIX: Use a property of LocalizedString for display. */}
                            <h3 className="font-bold text-white mb-1">{game.title.en}</h3>
                            {/* FIX: Use a property of LocalizedString for display. */}
                            <p className="text-xs text-gray-400"><strong className="font-medium text-gray-300">Genre:</strong> {game.genre.en}</p>
                            <p className="text-xs text-gray-400"><strong className="font-medium text-gray-300">Platform:</strong> {game.platform || 'N/A'}</p>
                            <p className="text-xs text-gray-400"><strong className="font-medium text-gray-300">Released:</strong> {new Date(game.releaseDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-700/50">
                        <button onClick={() => handleEditClick(game)} className="text-gray-300 hover:text-white text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-primary/30">
                            <span className="material-symbols-outlined text-base">edit</span> Edit
                        </button>
                        {/* FIX: Pass a string from LocalizedString to the handler. */}
                        <button onClick={() => handleDelete(game.id, game.title.en)} className="text-gray-300 hover:text-red-400 text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-red-500/10">
                            <span className="material-symbols-outlined text-base">delete</span> Delete
                        </button>
                    </div>
                </div>
            )) : (
                <p className="text-center text-gray-500 py-8">No games found for "{searchQuery}".</p>
            )}
        </div>

         {totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-2 gap-4">
                <span className="text-sm text-gray-400">
                    Showing <span className="font-semibold text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredGames.length)}</span> of <span className="font-semibold text-white">{filteredGames.length}</span> Entries
                </span>
                <div className="inline-flex -space-x-px rounded-md text-sm">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 text-gray-400 bg-[#2f2348] border border-gray-700 rounded-l-lg hover:bg-primary/30 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`flex items-center justify-center px-3 h-8 border ${currentPage === i + 1 ? 'text-white bg-primary border-primary' : 'text-gray-400 bg-[#2f2348] border-gray-700 hover:bg-primary/30 hover:text-white'}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 text-gray-400 bg-[#2f2348] border border-gray-700 rounded-r-lg hover:bg-primary/30 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
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
    </>
  );
};

export default GameManagement;
