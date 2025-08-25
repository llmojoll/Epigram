// app/layout.tsx
import { pretendard, iropke } from './fonts';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${iropke.variable}`}>
      <body className='font-sans'>{children}</body>
    </html>
  );
}
