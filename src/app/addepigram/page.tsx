'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { epigramValidators } from '@/lib/validators';

type FormValues = {
  content: string;
  author: string;
  url: string;
  tag: string;
  authorRadio: 'custom' | 'unknown' | 'user';
};

export default function AddEpigram() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = (data: FormValues) => {
    console.log('에피그램 작성 : ', data);
    ///////////api 연결하기//////////////
  };

  const selectedAuthor = watch('authorRadio');

  return (
    <div className='bg-white min-h-screen'>
      <div className='flex justify-center items-start flex-col m-auto w-[312px] md:w-[384px] lg:w-[640px] pt-[24px] md:pt-[32px] lg:pt-[56px] pb-[30px]'>
        <h3 className='text-lg md:text-xl lg:text-2xl font-semibold'>에피그램 만들기</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-[312px] md:w-[384px] lg:w-[640px] mt-6 md:mt-8 lg:mt-10'
        >
          {/* 내용 */}
          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold'>
            내용 <span className='text-red-500 ml-1'>*</span>
          </p>
          <Textarea
            placeholder='500자 이내로 입력해주세요.'
            className='w-full mt-2 lg:mt-6 h-[132px] lg:h-[148px]'
            {...register('content', {
              required: '내용을 입력해주세요.',
              pattern: {
                value: epigramValidators.content.pattern,
                message: epigramValidators.content.message,
              },
            })}
          />
          {errors.content && <p className='text-red-500 mt-1'>{errors.content.message}</p>}

          {/* 저자 */}
          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            저자 <span className='text-red-500 ml-1'>*</span>
          </p>
          {/* 저자 라디오 버튼 */}
          <div className='mt-2 lg:mt-6 flex gap-4 lg:gap-6 text-lg lg:text-xl font-medium'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                value='custom'
                {...register('authorRadio')}
                className='w-5 lg:w-6 h-5 lg:h-6 rounded-full '
              />
              <span>직접 입력</span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                value='famous'
                {...register('authorRadio')}
                className='w-5 lg:w-6 h-5 lg:h-6 rounded-full '
              />
              <span>알 수 없음</span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                value='unknown'
                {...register('authorRadio')}
                defaultChecked
                className='w-5 lg:w-6 h-5 lg:h-6 rounded-full'
              />
              <span>본인</span>
            </label>
          </div>
          {/* 직접 입력 고를시 */}
          {selectedAuthor === 'custom' && (
            <Input
              placeholder='저자 이름 입력'
              className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
              {...register('author', {
                required: '저자 이름을 입력해주세요.',
                pattern: {
                  value: epigramValidators.author.pattern,
                  message: epigramValidators.author.message,
                },
              })}
            />
          )}
          {errors.author && <p className='text-red-500 mt-1'>{errors.author.message}</p>}

          {/* 출처 */}
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
            {...register('url', {
              pattern: {
                value: epigramValidators.url.pattern,
                message: epigramValidators.url.message,
              },
            })}
          />
          {errors.url && <p className='text-red-500 mt-1'>{errors.url.message}</p>}

          {/* 태그 */}
          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            태그
          </p>
          <Input
            placeholder='입력하여 태그 작성 (최대 10자)'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
            {...register('tag', {
              pattern: {
                value: epigramValidators.tag.pattern,
                message: epigramValidators.tag.message,
              },
            })}
          />
          {errors.tag && <p className='text-red-500 mt-1'>{errors.tag.message}</p>}

          {/* 버튼 */}
          <Button
            type='submit'
            variant='black500'
            className='mt-6 lg:mt-10 text-lg lg:text-xl font-semibold'
          >
            작성 완료
          </Button>
        </form>
      </div>
    </div>
  );
}
