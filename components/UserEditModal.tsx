

import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { availableAvatars } from '../data/avatars';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User | Omit<User, 'id'>) => void;
  user: User | Omit<User, 'id'>;
  currentUser: User | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, onSave, user, currentUser }) => {
    const [formData, setFormData] = useState<User | Omit<User, 'id'>>(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);
    
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const isEditing = 'id' in formData && !!(formData as User).id;
    const isEditingSelf = isEditing && (formData as User).id === currentUser?.id;


    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">
                      {isEditing ? `Edit User: ${(user as User).username}` : 'Add New User'}
                    </h2>
                    <div className="space-y-4">
                        {isEditing && (
                            <div>
                                <label className="block text-sm font-medium text-brand-light-purple mb-2">User ID</label>
                                <input type="text" value={(formData as User).id} readOnly className="form-input w-full bg-[#161022] rounded-lg p-3 border border-gray-700 text-gray-400 cursor-not-allowed" />
                            </div>
                        )}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-brand-light-purple mb-2">Username</label>
                            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required className="form-input w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-light-purple mb-2">Email</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="form-input w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-brand-light-purple mb-2">Password</label>
                            <input id="password" name="password" type="text" placeholder={isEditing ? 'Unchanged' : 'Enter password'} value={formData.password} onChange={handleChange} required={!isEditing} className="form-input w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white" />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-brand-light-purple mb-2">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={isEditingSelf}
                                className="form-select w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {isEditingSelf && <p className="text-xs text-yellow-400 mt-2">You cannot change your own role.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-light-purple mb-2">Avatar</label>
                            <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                              {availableAvatars.map((avatar, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setFormData(prev => ({...prev, avatarUrl: avatar}))}
                                  className={`relative w-full aspect-square rounded-full overflow-hidden transition-all duration-200 transform hover:scale-110 focus:outline-none ${formData.avatarUrl === avatar ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#1C162D]' : 'ring-2 ring-transparent'}`}
                                >
                                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
                        <button type="button" onClick={onClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="bg-primary hover:bg-violet-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            {isEditing ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;