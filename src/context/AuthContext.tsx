'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (redirectUrl?: string) => void;
  logout: () => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Sync with localStorage so the state persists on reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isLoggedIn');
      if (stored === 'true') {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (url?: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    if (url) {
      setRedirectUrl(url);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setRedirectUrl(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, redirectUrl, setRedirectUrl }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
