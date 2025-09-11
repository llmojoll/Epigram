import './globals.css';
import Gnb from '@/components/common/Gnb';
import { ReactQueryProvider } from '@/QueryClientProvider';

import { pretendard, iropke } from './fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${iropke.variable}`}>
      <body>
        <ReactQueryProvider>
          <Gnb />
          <main className='w-full'>
            <div className='mx-auto'>{children}</div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
