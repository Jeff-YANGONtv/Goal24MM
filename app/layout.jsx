import '../styles/globals.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export const metadata = {
  title: 'Goal24MM - Myanmar Football News',
  description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
  keywords: 'football, news, Myanmar, sports, live scores, odds, FIFA, World Cup',
  authors: [{ name: 'Goal24MM' }],
  creator: 'Goal24MM',
  publisher: 'Goal24MM',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'Goal24MM - Myanmar Football News',
    description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
    url: 'https://goal24mm.com',
    siteName: 'Goal24MM',
    images: [
      {
        url: 'https://goal24mm.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goal24MM - Myanmar Football News',
    description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
    images: ['https://goal24mm.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <head>
        <link rel="canonical" href="https://goal24mm.com" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="pb-16 md:pb-0 bg-black text-white">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
