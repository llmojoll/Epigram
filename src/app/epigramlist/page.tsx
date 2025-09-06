import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function EpigramList() {
  return (
    <div className='flex justify-center items-center flex-col m-auto w-[312px] md:w-[600px] lg:w-[1200px] mt-[32px] lg:mt-[120px] m-auto mb-[56px] '>
      <header className='flex justify-start w-full'>
        <p className='text-lg lg:text-2xl'>피드</p>
      </header>
      <section>
        <div>에피그램 리스트</div>
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
          <Button variant='blue900' size='md'>
            + 에피그램 만들기
          </Button>
          <Button
            variant='blue900'
            className='w-[48px] lg:w-[64px] h-[48px] lg:h-[64px] rounded-full text-white mt-2'
          >
            <Image src='/pageupbtn.svg' width={20} height={20} alt='페이지 최상단으로 가는 버튼' />
          </Button>
        </div>
      </footer>
    </div>
  );
}
