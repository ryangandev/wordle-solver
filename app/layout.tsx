import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import '@/app/globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wordle Solver',
  description: 'Find potential Wordle solutions based on your game feedback.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(openSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster position="top-center" richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
