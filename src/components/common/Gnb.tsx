'use client';

import Logo from '@/components/common/Logo';

export default function Gnb() {
  return (
    <nav className='flex items-center h-16 px-6 border-b border-gray-200 bg-white'>
      <div className='mr-auto font-bold text-lg'>
        <Logo />
      </div>
    </nav>
  );
}
