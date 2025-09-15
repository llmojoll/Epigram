'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type CommentFormValues = { content: string };

interface Props {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  });

  const submit: SubmitHandler<CommentFormValues> = (data) => {
    if (!data.content.trim()) return;
    onSubmit(data.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='w-full'>
      <Textarea
        placeholder='100자 이내로 입력해주세요.'
        variant='outlined'
        {...register('content')}
        className='h-[66px md:h-[80px] lg:h-[104px]'
      />
      <div className='flex justify-end'>
        <Button type='submit' className='lg:w-[60px] lg:h-[44px] mt-2 lg:mt-4' size='xs'>
          저장
        </Button>
      </div>
    </form>
  );
}
