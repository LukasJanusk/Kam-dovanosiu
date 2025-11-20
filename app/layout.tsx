import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Image from 'next/image';
import santaGif from '@/app/assets/santa-animated.gif';
import { Gift } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kam dovanosiu',
  description: 'Padės išrinkti kolektyvo slaptus Kalėdų senelius.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <div className="fixed inset-0 z-10">
          <Image
            src={santaGif}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <header className="flex gap-4 items-center min-h-20 min-w-sm px-2 z-10 relative bg-linear-to-b from-black to-black/80">
          <Gift strokeWidth={2} size={32} className="text-violet-600" />
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold italic text-violet-600 hidden sm:block">
            Kam dovanosiu?
          </h1>
          <Nav />
        </header>
        <main className="relative z-10 max-w-5xl w-full min-h-screen  ml-auto mr-auto bg-black/80  overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
