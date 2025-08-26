import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '/public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900', // Variable Font 범위
  style: 'normal',
  display: 'swap',
});

export const iropke = localFont({
  src: '/public/fonts/IropkeBatang.woff2',
  variable: '--font-iropke',
  weight: '400',
  style: 'normal',
  display: 'swap',
});
