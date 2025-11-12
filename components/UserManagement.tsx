
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
};


const UserManagement: React.FC<UserManagementProps> = ({ users, currentUser, onAddUser, onUpdateUser, onDeleteUser }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | Omit<User, 'id'> | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
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
        if (window.confirm(`Are you sure you want to delete user "${user.username}"? This action is permanent.`)) {
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
    <>
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">User Management</h1>
            <div className="flex items-center gap-4">
                <span className="text-brand-gray text-sm">{users.length} total users</span>
                <button onClick={handleAddNewUserClick} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-violet-600 transition-colors">
                    <span className="material-symbols-outlined mr-2 text-base">person_add</span>
                    <span className="truncate">Add New User</span>
                </button>
            </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#1C162D] rounded-xl border border-gray-800">
            <div className="flex-1">
                <label className="relative flex items-center h-12 w-full">
                    <div className="text-[#a492c9] absolute left-0 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-700 bg-[#2f2348] focus:border-primary/50 h-full placeholder:text-[#a492c9] pl-12 pr-4" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </label>
            </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto bg-[#1C162D] rounded-xl border border-gray-800 hidden md:block">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-[#2f2348]">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">User</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Email</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Role</th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-gray-800 hover:bg-primary/10">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center gap-4">
                                <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 object-cover rounded-full"/>
                                <span>{user.username}</span>
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.role === 'admin' ? 'bg-primary/20 text-brand-light-purple' : 'bg-gray-700/50 text-gray-300'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => handleEditClick(user)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-primary/30"><span className="material-symbols-outlined text-base">edit</span></button>
                                <button 
                                  onClick={() => handleDelete(user)} 
                                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                                  disabled={user.id === currentUser?.id}
                                  title={user.id === currentUser?.id ? "Cannot delete self" : "Delete user"}
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
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                <div key={user.id} className="bg-[#1C162D] rounded-xl border border-gray-800 p-4 space-y-3">
                    <div className="flex items-center gap-4">
                        <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 object-cover rounded-full flex-shrink-0"/>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-white">{user.username}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.role === 'admin' ? 'bg-primary/20 text-brand-light-purple' : 'bg-gray-700/50 text-gray-300'}`}>
                                    {user.role}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-700/50">
                       <button onClick={() => handleEditClick(user)} className="text-gray-300 hover:text-white text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-primary/30">
                            <span className="material-symbols-outlined text-base">edit</span> Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(user)}
                            className="text-gray-300 hover:text-red-400 text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={user.id === currentUser?.id}
                            title={user.id === currentUser?.id ? "Cannot delete self" : "Delete user"}
                        >
                            <span className="material-symbols-outlined text-base">delete</span> Delete
                        </button>
                    </div>
                </div>
            )) : (
                 <p className="text-center text-gray-500 py-8">No users found for "{searchQuery}".</p>
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
    </>
  );
};

export default UserManagement;
