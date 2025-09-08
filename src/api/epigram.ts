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

export async function getEpigrams() {
  const res = await apiClient.get('/epigrams', {
    params: { limit: 6 },
  });
  return res.data;
}
