import type { Metadata, Viewport } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Disco Jump — Match Your Vibe Anywhere',
  description:
    'Disco Jump learns your Vibe DNA and recommends restaurants, nightlife, adventures, cafés, and hidden gems that match your personal vibe anywhere in the world.',
  keywords: ['lifestyle discovery', 'vibe', 'nightlife', 'restaurants', 'hidden gems', 'Disco Jump'],
  authors: [{ name: 'YegorCreative' }],
  openGraph: {
    title: 'Disco Jump — Match Your Vibe Anywhere',
    description: 'Discover places that match your vibe anywhere in the world.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#090909',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
