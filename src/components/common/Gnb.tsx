'use client';

import Logo from '@/components/common/Logo';

export default function Gnb() {
  return (
    // <nav className='flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white'>
    //   <Logo />
    // </nav>
    <nav className='flex items-center h-16 px-6 border-b border-gray-200 bg-white'>
      {/* 왼쪽 그룹 */}
      <div className='flex items-center gap-4'>
        <Logo />
        <button className='px-3 py-2 rounded-lg text-sm font-medium'>Feed</button>
        <button className='px-3 py-2 rounded-lg text-sm font-medium'>검색</button>
      </div>

      {/* 오른쪽 그룹 */}
      <div className='flex items-center ml-auto'>
        <button className='px-3 py-2 rounded-lg text-sm font-medium text-gray-300'>김코드</button>
      </div>
    </nav>
  );
}
