import { BottomNav } from '@/components/BottomNav';
import './globals.css';

export const metadata = {
  title: 'Goal24MM - Football News',
  description: 'Latest football news, scores, and updates from around the world',
  keywords: 'football, news, soccer, sports',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Goal24MM - Football News',
    description: 'Latest football news, scores, and updates',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1F2937" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-secondary text-white">
        <main className="pb-24">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
