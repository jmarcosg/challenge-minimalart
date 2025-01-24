import { Header } from '@/components/shared/header';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pokédex Minimalart',
  description: 'Code challenge for Minimalart',
  authors: {
    name: 'Juan Marcos Gonzalez',
  },
  keywords: ['Code Challenge', 'Next.js', 'Pokédex', 'Minimalart', 'jmarcosg'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // set up the query client for seraialization
  // this helps reducing the time to hydrate the client and provide a better user experience
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-teal-200`}
      >
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            <Header />
            <main className="container mx-auto py-8 px-4 md:pr-16">
              {children}
            </main>
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
}
