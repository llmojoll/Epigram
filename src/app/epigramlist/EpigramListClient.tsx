'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getEpigrams, EpigramsResponse, Epigram } from '@/api/epigram';
import EpigramCard from '@/components/card/EpigramCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

type Props = {
  initialData: {
    pages: EpigramsResponse[];
    pageParams: (string | undefined)[];
  };
};

export default function EpigramListClient({ initialData }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<EpigramsResponse, Error>({
      queryKey: ['epigrams'],
      queryFn: ({ pageParam }) =>
        getEpigrams({ cursor: pageParam as string | undefined, limit: 6 }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData, // 서버에서 받아온 첫 페이지 데이터를 React Query에 주입
      refetchOnWindowFocus: false,

      initialPageParam: undefined,
    });

  if (isLoading) return <div className='mt-20 text-gray-500'>불러오는 중...</div>;
  if (isError) return <div className='mt-20 text-red-500'>에피그램을 불러오지 못했습니다.</div>;

  const allEpigrams: Epigram[] = data?.pages.flatMap((page) => page.list) ?? [];

  const handleAddEpigram = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
      return;
    }
    router.push('/addepigram');
  };

  return (
    <div className='flex flex-col items-center min-w-[312px] md:w-[600px] lg:w-[1200px] mt-[32px] lg:mt-[120px] mb-[56px] mx-6 md:mx-auto'>
      <header className='flex justify-start w-full'>
        <p className='text-lg lg:text-2xl font-semibold'>피드</p>
      </header>

      <section className='grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-6 lg:mt-[30px] w-full items-stretch'>
        {allEpigrams.map((item) => (
          <EpigramCard key={item.id} item={item} />
        ))}
      </section>

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className='mt-6'>
          <Button
            variant='line200'
            className='w-[153px] lg:w-[238px] h-[48px] lg:h-[56px] bg-transparent border-2 border-blue-200 rounded-full text-md lg:text-xl font-medium'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '+ 에피그램 더보기'}
          </Button>
        </div>
      )}

      <footer>
        <div className='fixed flex items-end flex-col bottom-10 right-10 z-30'>
          <Button variant='blue900' size='md' onClick={handleAddEpigram}>
            + 에피그램 만들기
          </Button>
          <Button
            variant='blue900'
            className='w-[48px] lg:w-[64px] h-[48px] lg:h-[64px] rounded-full text-white mt-2'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Image src='/pageupbtn.svg' width={20} height={20} alt='페이지 최상단으로 가는 버튼' />
          </Button>
        </div>
      </footer>
    </div>
  );
}
