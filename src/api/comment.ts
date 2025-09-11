import { apiClient } from '@/lib/apiClient';

interface CommentPayload {
  epigramId: number;
  content: string;
  isPrivate: boolean;
}

export const postComment = async (data: CommentPayload) => {
  const res = await apiClient.post(`/comments`, data);
  return res.data;
};
