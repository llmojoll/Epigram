'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { login as loginApi, refreshToken } from '@/api/auth';
import { getCookie, removeCookie } from '@/lib/cookie';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 로드 시 쿠키 확인
  useEffect(() => {
    const token = getCookie('accessToken');
    const refresh = getCookie('refreshToken');

    if (token) setIsLoggedIn(true);
    else if (refresh) {
      refreshToken(refresh)
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await loginApi({ email, password });

    //쿠키에 저장하는건 auth.ts에서 처리함
    setIsLoggedIn(!!accessToken);
  };

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
