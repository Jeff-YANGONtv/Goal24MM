import '@/styles/globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';

export const metadata = {
  title: {
    default: 'Goal24MM - Latest Football News & Live Scores',
    template: '%s | Goal24MM',
  },
  description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
  keywords: ['football news', 'live scores', 'football odds', 'predictions', 'Goal24MM', 'Myanmar football'],
  authors: [{ name: 'Goal24MM Team' }],
  creator: 'Goal24MM',
  publisher: 'Goal24MM',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Goal24MM - Latest Football News & Live Scores',
    description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
    url: siteUrl,
    siteName: 'Goal24MM',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goal24MM - Latest Football News & Live Scores',
    description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#EAB308" />
      </head>
      <body className="antialiased bg-black text-white">
        <Header />
        <div className="pb-20 md:pb-0 min-h-screen">
          {children}
        </div>
        <BottomNav />
        <footer className="hidden md:block bg-gray-900 border-t border-gray-800 py-10 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Goal24MM. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
