'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { login as loginApi, refreshToken } from '@/api/auth';
import { apiClient } from '@/lib/apiClient';
import { getCookie, removeCookie } from '@/lib/cookie';

type AuthContextType = {
  isLoggedIn: boolean;
  user: { id: number; nickname: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number; nickname: string } | null>(null);

  // 페이지 로드 시 쿠키 확인
  useEffect(() => {
    const token = getCookie('accessToken');
    const refresh = getCookie('refreshToken');

    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token).then((data) => setUser(data));
    } else if (refresh) {
      refreshToken(refresh)
        .then((newToken) => {
          setIsLoggedIn(true);
          fetchUserInfo(newToken).then((data) => setUser(data));
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await loginApi({ email, password });

    //쿠키에 저장하는건 auth.ts에서 처리함
    setIsLoggedIn(!!accessToken);

    if (accessToken) {
      const data = await fetchUserInfo(accessToken);
      setUser(data);
    }
  };

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

//토큰으로 사용자 정보 가져오는 함수
async function fetchUserInfo(token: string) {
  const res = await apiClient.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res) throw new Error('사용자 정보 가져올 수 없습니다');
  return res.data;
}
