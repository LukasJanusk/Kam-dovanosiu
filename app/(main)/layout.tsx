import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '../components/Nav';
import Image from 'next/image';
import snowGif from '@/app/assets/snow-animated.gif';
import { Gift } from 'lucide-react';
import '../globals.css';
import Countdown from '../components/Countdown';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased  h-screen relative flex flex-col`}
    >
      <div className="fixed inset-0 z-10 ">
        <Image
          src={snowGif}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <header className="flex gap-4 items-center min-h-20 max-h-20 min-w-sm px-2 z-10 relative bg-linear-to-b from-black to-black/50">
        <Gift strokeWidth={2} size={32} className="text-blue-800" />
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold italic text-blue-800 hidden sm:block">
          Kam dovanosiu?
        </h1>
        <Nav />
      </header>
      <main className="relative z-10 max-w-5xl w-full flex-1 ml-auto mr-auto bg-black/50 overflow-auto min-w-[384px] dark:text-white text-black">
        {children}
      </main>
      <div className="absolute right-56 bottom-1 z-50  w-40 h-40 p-2 hidden 2xl:block">
        <Countdown />
      </div>
    </div>
  );
}
