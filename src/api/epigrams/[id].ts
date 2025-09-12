import { apiClient } from '@/lib/apiClient';

// api/epigram.ts
export interface Epigram {
  id: number;
  content: string;
  author: string;
  referenceUrl?: string;
  referenceTitle?: string;
}

export const getEpigramById = async (id: number): Promise<Epigram> => {
  const res = await apiClient.get(`/epigrams/${id}`);
  return res.data;
};
