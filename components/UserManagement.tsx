
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import UserEditModal from './UserEditModal';
import { availableAvatars } from '../data/avatars';

interface UserManagementProps {
  users: User[];
  currentUser: User | null;
  onAddUser: (user: Omit<User, 'id'>) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const emptyUser: Omit<User, 'id'> = {
  username: '',
  email: '',
  password: '',
  avatarUrl: availableAvatars[0],
  role: 'user',
  isVerified: false,
};


const UserManagement: React.FC<UserManagementProps> = ({ users, currentUser, onAddUser, onUpdateUser, onDeleteUser }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | Omit<User, 'id'> | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [users, searchQuery]);

    const handleAddNewUserClick = () => {
        setEditingUser(emptyUser);
        setIsModalOpen(true);
    };

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        if (user.id === currentUser?.id) {
            alert("You cannot delete your own account.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
            onDeleteUser(user.id);
        }
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSaveUser = (user: User | Omit<User, 'id'>) => {
        if ('id' in user) {
            onUpdateUser(user as User);
        } else {
            onAddUser(user as Omit<User, 'id'>);
        }
        closeModal();
    };

  return (
    <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Users</h1>
                <p className="text-brand-gray mt-1">Manage user accounts and permissions.</p>
            </div>
            <button onClick={handleAddNewUserClick} className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-purple/25 flex items-center gap-2 border border-white/10 hover:-translate-y-0.5">
                <span className="material-symbols-outlined">person_add</span>
                <span>Add User</span>
            </button>
        </header>

         <div className="bg-[#1a102e]/60 backdrop-blur-xl rounded-3xl border border-white/5 p-2 flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                <input 
                    className="w-full bg-[#0f0720]/50 rounded-xl py-3 pl-12 pr-4 border border-transparent focus:border-brand-purple focus:ring-0 text-white placeholder:text-gray-600 transition-all" 
                    placeholder="Search users by name or email..." 
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
                        <th className="px-6 py-4 font-bold">User</th>
                        <th className="px-6 py-4 font-bold">Email</th>
                        <th className="px-6 py-4 font-bold">Role</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                         <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 object-cover rounded-xl border border-white/10"/>
                                         {user.role === 'admin' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-purple rounded-full border border-[#1a102e]"></span>}
                                    </div>
                                    <span className="font-bold text-white">{user.username}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400 font-mono">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase border ${
                                    user.role === 'admin' 
                                    ? 'bg-brand-purple/10 text-brand-light-purple border-brand-purple/20' 
                                    : 'bg-gray-700/30 text-gray-400 border-gray-600/30'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                               {user.isVerified ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-400">
                                        <span className="material-symbols-outlined text-sm">check_circle</span> Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-500">
                                        <span className="material-symbols-outlined text-sm">pending</span> Pending
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditClick(user)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-brand-purple hover:text-white text-gray-400 transition-all" title="Edit">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(user)} 
                                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                      disabled={user.id === currentUser?.id}
                                    >
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
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                <div key={user.id} className="bg-[#1a102e]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 space-y-3">
                    <div className="flex items-center gap-4">
                        <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 object-cover rounded-xl border border-white/5 flex-shrink-0"/>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-white truncate pr-2">{user.username}</h3>
                                {user.role === 'admin' && <span className="text-[10px] font-bold uppercase bg-brand-purple/20 text-brand-light-purple px-1.5 py-0.5 rounded border border-brand-purple/20">Admin</span>}
                            </div>
                             <p className="text-xs text-gray-400 truncate">{user.email}</p>
                             <div className="mt-1">
                                {user.isVerified ? (
                                    <span className="text-[10px] font-bold text-green-400">Verified Account</span>
                                ) : (
                                    <span className="text-[10px] font-bold text-yellow-500">Unverified</span>
                                )}
                             </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 pt-3 border-t border-white/5">
                       <button onClick={() => handleEditClick(user)} className="px-3 py-1.5 bg-white/5 hover:bg-brand-purple text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">edit</span> Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(user)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-red-500 text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                            disabled={user.id === currentUser?.id}
                        >
                            <span className="material-symbols-outlined text-sm">delete</span> Delete
                        </button>
                    </div>
                </div>
            )) : (
                 <p className="text-center text-gray-500 py-8">No users found.</p>
            )}
        </div>
        
        {editingUser && (
            <UserEditModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveUser}
                user={editingUser}
                currentUser={currentUser}
            />
        )}
    </div>
  );
};

export default UserManagement;
