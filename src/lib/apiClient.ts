import axios from 'axios';

import { refreshToken } from '@/api/auth';
import { getCookie, setCookie, removeCookie } from '@/lib/cookie';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = getCookie('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = getCookie('refreshToken');
      if (refresh) {
        try {
          const newToken = await refreshToken(refresh);

          //새로운 토큰 쿠키에 저장
          setCookie('accessToken', newToken, 7);

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch {
          removeCookie('accessToken');
          removeCookie('refreshToken');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  },
);
