import { getEpigramById } from '@/api/epigrams/[id]';

import EpigramDetailClient from './EpigramDetailClient';

export const revalidate = 60; // ISR: 60초마다 페이지 재생성

interface EpigramPageProps {
  params: { id: string };
}

export default async function EpigramPage({ params }: EpigramPageProps) {
  const epigram = await getEpigramById(params.id); // 서버에서 데이터 패칭

  return <EpigramDetailClient initialData={epigram} />;
}
