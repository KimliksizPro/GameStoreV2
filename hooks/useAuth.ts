


import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';

const USERS_API_ENDPOINT = 'https://api.npoint.io/6041c15afc60289c2bd2';
const CURRENT_USER_SESSION_KEY = 'game_store_current_user';

export const useAuth = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(USERS_API_ENDPOINT);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const fetchedUsers = (Array.isArray(data) && data.length > 0) ? data : [];
                setUsers(fetchedUsers);

                const storedUser = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    // Verify stored user exists in fetched users
                    if (fetchedUsers.some(u => u.id === parsedUser.id)) {
                        setCurrentUser(parsedUser);
                    } else {
                        sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const updateRemoteUsers = useCallback(async (updatedUsers: User[]) => {
        try {
            const response = await fetch(USERS_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUsers),
            });
            if (!response.ok) throw new Error('Failed to update users on the server.');
            return true;
        } catch (error) {
            console.error('Error updating remote users:', error);
            return false;
        }
    }, []);
    
    const login = (username: string, password: string): User | null => {
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        if (user) {
            setCurrentUser(user);
            sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    };
    
    const signup = async (username: string, email: string, password: string, avatarUrl: string): Promise<{ success: boolean; message: string; }> => {
        const lowercasedEmail = email.toLowerCase();
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: 'Username already exists.' };
        }
        if (users.some(u => u.email && u.email.toLowerCase() === lowercasedEmail)) {
            return { success: false, message: 'Email already in use.' };
        }

        const isAdminSignUp = username.toLowerCase() === 'admin' && password === 'semih1828';
        const hasAdmin = users.some(u => u.role === 'admin');
        const role = isAdminSignUp && !hasAdmin ? 'admin' : 'user';

        const newUser: User = {
            id: `user_${Date.now()}`,
            username,
            email: lowercasedEmail,
            password, // Note: Storing plaintext passwords is not secure. This is for demo purposes only.
            avatarUrl,
            role,
        };

        const updatedUsers = [...users, newUser];
        const success = await updateRemoteUsers(updatedUsers);

        if (success) {
            setUsers(updatedUsers);
            setCurrentUser(newUser);
            sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(newUser));
            return { success: true, message: `Signup successful! ${role === 'admin' ? 'Admin account created.' : ''}`.trim() };
        } else {
            return { success: false, message: 'An error occurred on the server. Please try again.' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
    };

    const updateUser = async (updatedUser: User) => {
        const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
        const success = await updateRemoteUsers(updatedUsers);
        if (success) {
            setUsers(updatedUsers);
            // If the updated user is the current user, update session storage
            if (currentUser?.id === updatedUser.id) {
                setCurrentUser(updatedUser);
                sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(updatedUser));
            }
        }
        return success;
    };

    const deleteUser = async (userId: string) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        const success = await updateRemoteUsers(updatedUsers);
        if (success) {
            setUsers(updatedUsers);
            // If the deleted user was the current user, log them out
            if (currentUser?.id === userId) {
                logout();
            }
        }
        return success;
    };

    const addUserByAdmin = async (userData: Omit<User, 'id'>): Promise<{ success: boolean; message: string; }> => {
        const { username, email, password, avatarUrl, role } = userData;
        const lowercasedEmail = email.toLowerCase();
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: 'Username already exists.' };
        }
        if (users.some(u => u.email && u.email.toLowerCase() === lowercasedEmail)) {
            return { success: false, message: 'Email already in use.' };
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            username,
            email: lowercasedEmail,
            password, // Note: Storing plaintext passwords is not secure. This is for demo purposes only.
            avatarUrl,
            role,
        };

        const updatedUsers = [...users, newUser];
        const success = await updateRemoteUsers(updatedUsers);

        if (success) {
            setUsers(updatedUsers);
            return { success: true, message: `User "${username}" created successfully.` };
        } else {
            return { success: false, message: 'An error occurred on the server. Please try again.' };
        }
    };


    return { currentUser, users, login, signup, logout, loadingAuth: loading, updateUser, deleteUser, addUserByAdmin };
};