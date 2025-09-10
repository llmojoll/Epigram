import { apiClient } from '@/lib/apiClient';

// api/epigram.ts
export interface Epigram {
  id: string;
  content: string;
  author: string;
  referenceUrl?: string;
  referenceTitle?: string;
}

export const getEpigramById = async (id: string): Promise<Epigram> => {
  const res = await apiClient.get(`/epigrams/${id}`);
  return res.data;
};
