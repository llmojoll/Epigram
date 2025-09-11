'use client';

import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { postComment } from '@/api/comment';
import { Epigram } from '@/api/epigram';
import Likeicon from '@/assets/likeicon.svg';
import Linkbtn from '@/assets/linkbtn.svg';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type CommentFormValues = {
  content: string;
};
interface Props {
  initialData: Epigram;
}

export default function EpigramDetailClient({ initialData }: Props) {
  const [epigram] = useState(initialData);
  const [likes, setLikes] = useState(0);

  const { register, handleSubmit, reset } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  });

  const handleLike = () => setLikes((prev) => prev + 1);

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    try {
      await postComment({
        epigramId: Number(epigram.id),
        content: data.content,
        isPrivate: false,
      });
      reset(); // 제출 후 입력 초기화
      alert('댓글등록');
    } catch (error) {
      console.error(error);
      alert('댓글 등록 실패');
    }
  };

  return (
    <main className=''>
      <div className='w-full bg-[repeating-linear-gradient(white,white_25px,#ABB8CE_26px)] h-[calc(100%-0px)]'>
        <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
          {epigram.tags?.map((tag) => (
            <span key={tag.id} className='text-blue-400 text-md md:text-lg lg:text-xl mr-2'>
              #{tag.name}
            </span>
          ))}
          <p className='font-iropke text-black-700 text-2xl lg:text-3xl font-regular mt-4 md:mt-6 lg:mt-8'>
            {epigram.content}
          </p>
          <p className='text-blue-400 font-regular font-iropke text-right text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 lg:mt-8'>
            - {epigram.author} -
          </p>
          <div className='flex gap-2 lg:gap-4 justify-center mt-8 lg:mt-9 pb-4 md:pb-8 lg:pb-10'>
            <Button
              variant='black600'
              size='sm'
              onClick={handleLike}
              className='flex items-center rounded-full gap-0'
            >
              <Likeicon className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px] m-1 lg:m-2' />
              <p>{likes}</p>
            </Button>

            <Button
              variant='line100'
              className='w-[130px] lg:w-[181px] h-9 lg:h-12 text-md lg:text-xl font-medium rounded-full'
            >
              왕도로 가는길
              <Linkbtn className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px]' />
            </Button>
          </div>
        </div>
      </div>
      <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
        <p>댓글</p>
        <div className='flex items-center'>
          <div>프로필이미지</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder='100자 이내로 입력해주세요.'
              variant='outlined'
              {...register('content', { required: true, maxLength: 100 })}
            />
            <Button type='submit' className='self-end'>
              댓글 작성
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
