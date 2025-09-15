import EpigramDetailClient from './EpigramDetailClient';

export const revalidate = 60; // ISR: 60초마다 페이지 재생성

interface EpigramPageProps {
  params: { id: number };
}

export default async function EpigramPage({ params }: EpigramPageProps) {
  const epigramId = Number(params.id);
  return <EpigramDetailClient epigramId={epigramId} />;
}
