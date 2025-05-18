import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: User['role']) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: User['role']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'user@example.com', role: 'user' },
  { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '3', name: 'Police Officer', email: 'police@example.com', role: 'police' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for saved auth in localStorage
    const savedUser = localStorage.getItem('crimeguard_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('crimeguard_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: User['role']) => {
    // Simulate API call
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (user) {
      // Save to localStorage
      localStorage.setItem('crimeguard_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('crimeguard_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (name: string, email: string, password: string, role: User['role']) => {
    // Simulate API call
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    
    // Save to localStorage
    localStorage.setItem('crimeguard_user', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};