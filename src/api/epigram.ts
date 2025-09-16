import { apiClient } from '@/lib/apiClient';

//에피그램 등록
type EpigramPayload = {
  content: string;
  author: string;
  referenceUrl?: string;
  referenceTitle?: string;
  tags?: string[];
};
export const createEpigram = async (data: EpigramPayload) => {
  const res = await apiClient.post('/epigrams', data);
  return res.data;
};

//epigram목록,데이터
export type Epigram = {
  id: number;
  content: string;
  author: string;
  tags?: { id: string; name: string }[];
  writerId: number;

  referenceUrl: string;
  referenceTitle: string;

  likeCount: number;
  isLiked: boolean;
};
export type EpigramsResponse = {
  list: Epigram[];
  nextCursor?: string;
};
export async function getEpigrams(params?: { cursor?: string; limit?: number }) {
  const res = await apiClient.get('/epigrams', {
    params: {
      limit: params?.limit ?? 6,
      cursor: params?.cursor,
    },
  });
  return res.data as EpigramsResponse;
}

//epigram 삭제
export const deleteEpigram = async (id: number) => {
  const res = await apiClient.delete(`/epigrams/${id}`);
  return res.data;
};
//epigram 수정
export const editEpigram = async (id: number, data: EpigramPayload) => {
  const res = await apiClient.patch(`/epigrams/${id}`, data);
  return res.data;
};

//epigrams 상세조회 데이터
export const getEpigramById = async (id: number): Promise<Epigram> => {
  const res = await apiClient.get(`/epigrams/${id}`);
  return res.data;
};

//좋아요
export const likeEpigram = async (id: number): Promise<Epigram> => {
  const res = await apiClient.post(`/epigrams/${id}/like`);
  return res.data;
};
//좋아요취소
export const unlikeEpigram = async (id: number): Promise<Epigram> => {
  const res = await apiClient.delete(`/epigrams/${id}/like`);
  return res.data;
};
