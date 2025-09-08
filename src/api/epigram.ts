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
