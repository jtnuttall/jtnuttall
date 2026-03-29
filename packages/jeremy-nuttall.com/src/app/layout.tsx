import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://jeremy-nuttall.com'),
  title: 'Jeremy Nuttall',
  description: 'Principal Software Engineer & Tech Lead — building healthcare systems that scale.',
  openGraph: {
    title: 'Jeremy Nuttall',
    description: 'Principal Software Engineer & Tech Lead — building healthcare systems that scale.',
    url: 'https://jeremy-nuttall.com',
    siteName: 'Jeremy Nuttall',
    locale: 'en_US',
    type: 'website',
  },
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
