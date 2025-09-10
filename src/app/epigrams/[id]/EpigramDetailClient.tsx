'use client';
import { useState } from 'react';

import { Epigram } from '@/api/epigram';

interface Props {
  initialData: Epigram;
}

export default function EpigramDetailClient({ initialData }: Props) {
  const [epigram] = useState(initialData);
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes((prev) => prev + 1);

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold'>에피그램 상세 페이지</h1>
      <p>{epigram.content}</p>
      <p className='mt-2 text-gray-500'>작성자: {epigram.author}</p>

      <div className='mt-4'>
        <button onClick={handleLike} className='bg-blue-500 text-white px-4 py-2 rounded'>
          좋아요 {likes}
        </button>
      </div>
    </main>
  );
}
