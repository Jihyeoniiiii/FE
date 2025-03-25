import type { Metadata } from 'next'
import './globals.css';

export const metadata: Metadata = {
  title: '채움',
  description: '채움 애플리케이션입니다!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}