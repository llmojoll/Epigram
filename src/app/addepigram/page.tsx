import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AddEpigram() {
  return (
    <div className='bg-white min-h-screen'>
      <div className='flex justify-center items-start flex-col m-auto w-[312px] md:w-[384px] lg:w-[640px] pt-[24px] md:pt-[32px] lg:pt-[56px] pb-[30px]'>
        <h3 className='text-lg md:text-xl lg:text-2xl font-semibold'>에피그램 만들기</h3>
        <div className='w-[312px] md:w-[384px] lg:w-[640px] mt-6 md:mt-8 lg:mt-10'>
          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold'>
            내용 <span className='text-red-500 ml-1'>*</span>
          </p>
          <Textarea
            placeholder='500자 이내로 입력해주세요.'
            className='w-full resize-none mt-2 lg:mt-6 h-[132px] lg:h-[148px]'
          />

          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            저자 <span className='text-red-500 ml-1'>*</span>
          </p>
          <p className='mt-2 lg:mt-6'>라디오버튼</p>
          <Input
            placeholder='저자 이름 입력'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
          />

          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            출처
          </p>
          <Input
            placeholder='출처 제목 입력'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
          />
          <Input
            placeholder='URL (ex. https://www.website.com)'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
          />

          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            태그
          </p>
          <Input
            placeholder='입력하여 태그 작성 (최대 10자)'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
          />

          <Button variant='black500' className='mt-6 lg:mt-10 text-lg lg:text-xl font-semibold'>
            작성 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
