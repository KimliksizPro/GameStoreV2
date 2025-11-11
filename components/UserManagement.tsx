
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import UserEditModal from './UserEditModal';

interface UserManagementProps {
  users: User[];
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, currentUser, onUpdateUser, onDeleteUser }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

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

    const handleSaveUser = (user: User) => {
        onUpdateUser(user);
        closeModal();
    };

  return (
    <>
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">User Management</h1>
            <div className="text-brand-gray">{users.length} total users</div>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#1C162D] rounded-xl border border-gray-800">
            <div className="flex-1">
                <label className="relative flex items-center h-12 w-full">
                    <div className="text-[#a492c9] absolute left-0 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-700 bg-[#2f2348] focus:border-primary/50 h-full placeholder:text-[#a492c9] pl-12 pr-4" placeholder="Search users by username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </label>
            </div>
        </div>

        <div className="overflow-x-auto bg-[#1C162D] rounded-xl border border-gray-800">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-[#2f2348]">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">User</th>
                        <th scope="col" className="px-6 py-3 font-semibold">User ID</th>
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
                            <td className="px-6 py-4 font-mono text-xs">{user.id}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-primary/20 text-brand-light-purple' : 'bg-gray-700/50 text-gray-300'}`}>
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