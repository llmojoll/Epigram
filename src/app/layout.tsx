import './globals.css';
import Gnb from '@/components/common/Gnb';
import { AuthProvider } from '@/context/AuthContext';
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
          <AuthProvider>
            <Gnb />
            <main className='w-full'>
              <div className='mx-auto'>{children}</div>
            </main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
