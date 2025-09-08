'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getEpigrams } from '@/api/epigram';
import { Button } from '@/components/ui/button';

export default function EpigramList() {
  const router = useRouter();

  const {
    data: epigrams,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['epigrams'],
    queryFn: getEpigrams,
  });

  if (isLoading) {
    return <div className='mt-20 text-gray-500'>불러오는 중...</div>;
  }

  if (isError) {
    return <div className='mt-20 text-red-500'>에피그램을 불러오지 못했습니다.</div>;
  }

  return (
    <div className='flex justify-center items-center flex-col m-auto w-[312px] md:w-[600px] lg:w-[1200px] mt-[32px] lg:mt-[120px] m-auto mb-[56px] '>
      <header className='flex justify-start w-full'>
        <p className='text-lg lg:text-2xl'>피드</p>
      </header>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-6 lg:mt-[30px] w-full mx-6 md:mx-[72px] items-stretch'>
        {Array.isArray(epigrams?.list) &&
          epigrams.list.map((item: any) => (
            <div key={item.id} className='flex flex-col h-full'>
              {/* 카드 */}
              <div className='bg-white p-6 rounded-2xl shadow-sm relative flex flex-col overflow-hidden h-full'>
                {/* 줄무늬 노트 배경*/}
                <div className='absolute top-0 left-0 right-0 h-[calc(100%-0px)] md:h-[calc(100%-50px)] bg-[repeating-linear-gradient(white,white_20px,#dcdcdc_21px)] pointer-events-none'></div>

                {/* 내용 */}
                <p className='relative z-10 text-md md:text-lg lg:text-2xl font-medium leading-7 line-clamp-5 font-iropke'>
                  {item.content}
                </p>

                {/* 저자 */}
                <p className='relative z-10 mt-auto text-blue-400 text-right text-md md:text-lg lg:text-2xl'>
                  - {item.author} -
                </p>
              </div>

              {/* 태그 */}
              <div className='flex justify-end mt-2 gap-2 flex-wrap min-h-[28px]'>
                {item.tags?.map((tag: any) => (
                  <span key={tag.id} className='text-blue-400 text-md md:text-lg lg:text-2xl'>
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </section>
      <footer>
        <div className='mt-[56px] lg:mt[80px]'>
          <Button
            variant='line200'
            className='w-[153px] lg:w-[238px] h-[48px] lg:h-[56px] bg-transparent border-2 border-blue-200 rounded-full text-md lg:text-xl font-medium'
          >
            + 에피그램 더보기
          </Button>
        </div>
        <div className='fixed flex items-end flex-col bottom-10 right-10 '>
          <Button variant='blue900' size='md' onClick={() => router.push('/addepigram')}>
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
