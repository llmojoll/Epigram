'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: 'onBlur' });

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인 시도:', data);
    // TODO: API 연동
  };

  return (
    <div className='flex justify-center items-center flex-col w-[312px] md:w-[384px] lg:w-[640px] mt-[128px] md:mt-[100px] lg:mt-[213px] m-auto mb-[104px] lg:mb-[220px]'>
      <div>
        <Logo className='w-[172px] lg:w-[172px] h-[48px] lg:h-[48px]' />
      </div>

      <div className='w-full mt-[50px] md:mt-[60px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id='email'
            placeholder='이메일'
            type='email'
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
          <Input
            id='password'
            placeholder='비밀번호'
            type='password'
            className='mt-2.5 lg:mt-4'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '비밀번호는 최소6자이상 띄어쓰기를 포함 할 수 없습니다.',
              },
            })}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
          )}
          <Button
            variant='black500'
            size='lg'
            type='submit'
            className={!isValid ? 'mt-5 lg:mt-6 cursor-not-allowed' : 'mt-5 lg:mt-6'}
            disabled={!isValid}
          >
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
