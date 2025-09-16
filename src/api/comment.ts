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

export interface Comment {
  id: number;
  epigramId: number;
  content: string;
  isPrivate: boolean;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface CommentsResponse {
  totalCount: number;
  nextCursor?: number;
  list: Comment[];
}
export interface CommentId {
  epigramId: number;
  limit?: number;
  cursor?: number;
}
export const getComments = async ({ epigramId, limit = 10, cursor }: CommentId) => {
  const res = await apiClient.get<CommentsResponse>(`/epigrams/${epigramId}/comments`, {
    params: { epigramId, limit, cursor },
  });
  return res.data;
};

//댓글 수정
export const editComment = async (commentId: number, content: string) => {
  const res = await apiClient.patch(`/comments/${commentId}`, { content });
  return res.data;
};

//댓글삭제
export const deleteComment = async (commentId: number) => {
  const res = await apiClient.delete(`/comments/${commentId}`);
  return res.data;
};
