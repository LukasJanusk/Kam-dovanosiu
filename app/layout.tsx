import type { Metadata } from 'next';
import { stackServerApp } from '@/app/stack';
import { StackProvider, StackTheme } from '@stackframe/stack';
export const metadata: Metadata = {
  title: 'Kam dovanosiu',
  description: 'Padės išrinkti kolektyvo slaptus Kalėdų senelius.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StackProvider app={stackServerApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
