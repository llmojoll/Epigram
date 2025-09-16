'use client';

import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { deleteEpigram } from '@/api/epigram';
import DeleteDialog from '@/components/modal/DeleteModal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface EpigramDropdownProps {
  epigramId: number;
}

export default function EpigramDropdown({ epigramId }: EpigramDropdownProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  //epigram 피드 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEpigram(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      router.push('/epigramlist');
    },
  });

  return (
    <DropdownMenu>
      {/* 커스텀 이미지 버튼 */}
      <DropdownMenuTrigger>
        <Image src='/dropdownimg.svg' alt='옵션 버튼' width={24} height={24} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='cursor-pointer w-[97px] lg:w-[134px] rounded-xl bg-black-100 border border-blue-300 -translate-x-10 lg:-translate-x-12'>
        {/* 수정하기 */}
        <DropdownMenuItem
          className='flex justify-center font-regular text-black-600 text-md lg:text-xl '
          onClick={() => router.push(`/epigrams/${epigramId}/edit`)}
        >
          수정하기
        </DropdownMenuItem>

        {/* 삭제하기 */}
        <DeleteDialog
          id={epigramId}
          description='게시글을 정말 삭제하시겠어요?'
          description2='삭제 후 복구할 수 없습니다.'
          onDelete={(id) => deleteMutation.mutate(id)}
          triggerElement='삭제하기'
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
