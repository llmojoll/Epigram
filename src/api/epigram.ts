import { apiClient } from '@/lib/apiClient';

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

export type Epigram = {
  id: number;
  content: string;
  author: string;
  tags?: { id: string; name: string }[];
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
