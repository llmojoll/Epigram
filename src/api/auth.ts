import { apiClient } from '@/lib/apiClient';
import { setCookie } from '@/lib/cookie';

export type SignupParams = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};
export async function signup(params: SignupParams) {
  const response = await apiClient.post('/auth/signUp', params);
  return response.data;
}

export type LoginParams = {
  email: string;
  password: string;
};
export async function login(params: LoginParams) {
  const response = await apiClient.post('/auth/signIn', params);
  const { accessToken, refreshToken } = response.data;

  //로그인 성공시 브라우저에 쿠키 저장
  if (accessToken) {
    setCookie('accessToken', accessToken, 1);
  }
  if (refreshToken) {
    setCookie('refreshToken', refreshToken, 14); // 2주 보관
  }
  return response.data;
}

export type RefreshTokenResponse = {
  accessToken: string;
};
export async function refreshToken(refreshToken: string) {
  const response = await apiClient.post('/auth/refresh-token', { refreshToken });
  const { accessToken } = response.data;

  if (accessToken) {
    setCookie('accessToken', accessToken, 7); // 브라우저 쿠키 갱신
  }

  return accessToken;
}
