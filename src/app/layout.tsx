import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import TQProvider from '@/providers/TQProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Todo List',
  description: '간편하게 할 일을 관리할 수 있는 Todo List 앱입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TQProvider>{children}</TQProvider>
      </body>
    </html>
  );
}
