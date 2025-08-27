import './globals.css';

import { pretendard, iropke } from './fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${iropke.variable}`}>
      <body>{children}</body>
    </html>
  );
}
