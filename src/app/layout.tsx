import './globals.css';
import Gnb from '@/components/common/Gnb';

import { pretendard, iropke } from './fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${iropke.variable}`}>
      <body>
        <Gnb />
        <main className='mx-auto max-w-[1200px]'>{children}</main>
      </body>
    </html>
  );
}
