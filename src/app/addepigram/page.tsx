'use client';

import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createEpigram } from '@/api/epigram';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { epigramValidators } from '@/lib/validators';

type FormValues = {
  content: string;
  author: string;
  referenceUrl?: string;
  referenceTitle?: string;
  tags: string[];
};

export default function AddEpigram() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<'custom' | 'unknown' | 'user'>('user');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  useEffect(() => {
    if (selectedAuthor === 'custom') {
      setValue('author', '');
    } else {
      setValue('author', selectedAuthor);
    }
  }, [selectedAuthor, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      console.log('Submitting data:', data);
      return await createEpigram(data);
    },
    onSuccess: (data) => {
      router.push(`/epigrams/${data.id}`);
    },
    onError: (err) => {
      console.error(err);
      alert('에피그램 작성 실패');
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload: FormValues = {
      ...data,
      tags: tags, // 빈 배열도 그대로 보내기
      referenceUrl: data.referenceUrl?.trim() || undefined,
      referenceTitle: data.referenceTitle?.trim() || undefined,
    };
    mutation.mutate(payload);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!newTag) return;
      if (newTag.length > 10) {
        alert('태그는 최대 10자까지 입력할 수 있습니다.');
        return;
      }
      if (tags.length >= 3) {
        alert('태그는 최대 3개까지만 추가할 수 있습니다.');
        return;
      }
      if (tags.includes(newTag)) {
        alert('중복된 태그입니다.');
        return;
      }
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setTagInput('');
      setValue('tags', updatedTags);
    }
  };

  const handleRemoveTag = (removeTag: string) => {
    const updated = tags.filter((t) => t !== removeTag);
    setTags(updated);
    setValue('tags', updated);
  };

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
          <div className='mt-2 lg:mt-6 flex gap-4 lg:gap-6 text-lg lg:text-xl font-medium'>
            {(['custom', 'unknown', 'user'] as const).map((val) => (
              <label key={val} className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  value={val}
                  checked={selectedAuthor === val}
                  onChange={(e) =>
                    setSelectedAuthor(e.target.value as 'custom' | 'unknown' | 'user')
                  }
                  className='w-5 lg:w-6 h-5 lg:h-6 rounded-full'
                />
                <span>
                  {val === 'custom' ? '직접 입력' : val === 'unknown' ? '알 수 없음' : '본인'}
                </span>
              </label>
            ))}
          </div>
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
            {...register('referenceTitle')}
          />
          <Input
            placeholder='URL (ex. https://www.website.com)'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
            {...register('referenceUrl', {
              pattern: {
                value: epigramValidators.url.pattern,
                message: epigramValidators.url.message,
              },
            })}
          />
          {errors.referenceUrl && (
            <p className='text-red-500 mt-1'>{errors.referenceUrl.message}</p>
          )}

          {/* 태그 */}
          <p className='flex items-center text-md md:text-lg lg:text-xl font-semibold mt-10 lg:mt-[54px]'>
            태그
          </p>
          <Input
            placeholder='Enter로 태그 추가 (최대 3개, 10자 제한)'
            className='bg-transparent h-11 lg:h-16 mt-3 lg:mt-4'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <div className='flex gap-2 mt-2 flex-wrap'>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className='bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => handleRemoveTag(tag)}
                  className='text-red-500 text-xs'
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

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
