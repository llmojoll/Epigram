import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <div className='flex justify-center items-center flex-col w-[312px] md:w-[384px] lg:w-[640px] mt-[128px] md:mt-[100px] lg:mt-[213px] m-auto mb-[104px] lg:mb-[220px]'>
      <div>
        <Logo className='w-[172px] lg:w-[172px] h-[48px] lg:h-[48px]' />
      </div>

      <div className='w-full mt-[50px] md:mt-[60px]'>
        <form>
          <Input placeholder='이메일' />
          <Input placeholder='비밀번호' className='mt-2.5 lg:mt-4' />
          <Button variant='black500' size='lg' type='submit' className='mt-5 lg:mt-6'>
            로그인
          </Button>
        </form>
      </div>

      <div className='w-full flex justify-end mt-2.5 text-md md:text-lg lg:text-xl font-medium'>
        <p className='mr-2 text-blue-400'>회원이 아니신가요?</p>
        <Link href='/signup' className='underline'>
          가입하기
        </Link>
      </div>

      <div className='w-full flex items-center mt-[50px] md:mt-[60px]'>
        <hr className='flex-1 border-blue-400' />
        <span className='mx-2 text-blue-400 text-xs lg:text-xl font-regular'>
          SNS 계정으로 로그인하기
        </span>
        <hr className='flex-1 border-blue-400' />
      </div>

      <div className='w-full flex justify-center gap-4 mt-6 lg:mt-10'>
        <Button className='p-[11px] lg:p-4' size='icon' variant='white'>
          <Image src='/googlelogo.png' width={60} height={60} alt='구글 로고 이미지' />
        </Button>
        <Button className='p-[11px] lg:p-4' size='icon' variant='white'>
          <Image src='/kakaologo.png' width={60} height={60} alt='카카오 로고 이미지' />
        </Button>
      </div>
    </div>
  );
}
