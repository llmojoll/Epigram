import { apiClient } from '@/lib/apiClient';

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
