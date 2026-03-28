import { Analytics } from '@vercel/analytics/react';
import { Space_Grotesk, Space_Mono } from 'next/font/google';

import './globals.css';

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--next-font-sans',
});
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--next-font-mono',
});

export const metadata = {
  title: 'Jeremy Nuttall',
  description:
    'Principal Software Engineer & Tech Lead — building healthcare systems that scale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${sans.variable} ${mono.variable} font-sans antialiased`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
