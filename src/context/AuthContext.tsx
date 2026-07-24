'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (redirectUrl?: string) => void;
  logout: () => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
  profileNickname: string;
  profileRegion: string;
  saveProfile: (nick: string, reg: string) => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [profileNickname, setProfileNickname] = useState<string>('');
  const [profileRegion, setProfileRegion] = useState<string>('부산진구');
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync with localStorage so the state persists on reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isLoggedIn');
      if (stored === 'true') {
        setIsLoggedIn(true);
      }
      const storedNick = localStorage.getItem('profileNickname');
      if (storedNick) {
        setProfileNickname(storedNick);
      }
      const storedRegion = localStorage.getItem('profileRegion');
      if (storedRegion) {
        setProfileRegion(storedRegion);
      }
      setIsInitialized(true);
    }
  }, []);

  const login = (url?: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    // Read from localStorage to ensure immediate reflection
    const storedNick = localStorage.getItem('profileNickname') || '';
    setProfileNickname(storedNick);
    const storedRegion = localStorage.getItem('profileRegion') || '부산진구';
    setProfileRegion(storedRegion);
    if (url) {
      setRedirectUrl(url);
    }
  };

  const saveProfile = (nick: string, reg: string) => {
    setProfileNickname(nick);
    setProfileRegion(reg);
    localStorage.setItem('profileNickname', nick);
    localStorage.setItem('profileRegion', reg);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setProfileNickname('');
    setProfileRegion('부산진구');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('profileNickname');
      localStorage.removeItem('profileRegion');
    }
    setRedirectUrl(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      login, 
      logout, 
      redirectUrl, 
      setRedirectUrl,
      profileNickname,
      profileRegion,
      saveProfile,
      isInitialized
    }}>
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
