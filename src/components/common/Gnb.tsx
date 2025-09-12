'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import GnbMenu from '@/assets/gnb-menu.svg';
import UserIcon from '@/assets/user.svg';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

export default function Gnb() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const handleRightButtonClick = () => {
    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  return (
    // <nav className='flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white'>
    //   <Logo />
    // </nav>
    <nav className='flex items-center h-[52px] md:h-[60px] lg:h-20 px-6 md:px-[72px] lg:px-[120px] border-b border-gray-200 bg-white'>
      {/* 왼쪽 그룹 */}
      <div className='flex items-center'>
        <GnbMenu className='w-[24px] h-[24px] mr-[12px]' />

        <Link href='/'>
          <Logo />
        </Link>

        <Link
          href='/epigramlist'
          className='ml-[24px] lg:ml-[36px] mr-[24px] text-md font-semibold'
        >
          피드
        </Link>

        <button className='text-md font-semibold'>검색</button>
      </div>

      {/* 오른쪽 그룹 */}
      <div className='flex items-center ml-auto'>
        <button className='flex items-center' onClick={handleRightButtonClick}>
          <UserIcon className='w-4 lg:w-6 h-4 lg:h-6 mr-[6px] text-gray-300' />
          <p className='text-sm lg:text-md font-medium text-gray-300'>
            {isLoggedIn && user ? user.nickname : '김코드'}
          </p>
        </button>
      </div>
    </nav>
  );
}
