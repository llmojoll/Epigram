import { getEpigrams } from '@/api/epigram';

import EpigramListClient from './EpigramListClient';

export const revalidate = 60; // ISR: 60초마다 페이지 재생성

export default async function EpigramsPage() {
  // 서버에서 첫 페이지 불러오기 (SEO + 초기 렌더용)
  const firstPage = await getEpigrams({ cursor: undefined, limit: 6 });

  // React Query의 initialData 형태와 유사하게 구성
  const initialData = {
    pages: [firstPage],
    pageParams: [undefined],
  };

  return <EpigramListClient initialData={initialData} />;
}
