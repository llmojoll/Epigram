'use client';
import React from 'react';

import { Epigram } from '@/api/epigram';

type EpigramCardProps = {
  item: Epigram;
};

export default function EpigramCard({ item }: EpigramCardProps) {
  return (
    <div className='flex flex-col h-full'>
      {/* 카드 */}
      <div className='bg-white p-6 rounded-2xl shadow-sm relative flex flex-col overflow-hidden h-full'>
        {/* 줄무늬 노트 배경 */}
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
      <div className='flex justify-end mt-2 gap-2 flex-wrap min-h-[14px] md:min-h-[16px] lg:min-h-[24px]'>
        {item.tags?.map((tag) => (
          <span key={tag.id} className='text-blue-400 text-md md:text-lg lg:text-2xl'>
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
