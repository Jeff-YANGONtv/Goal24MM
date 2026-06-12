import '../styles/globals.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export const metadata = {
  title: 'Goal24MM - Myanmar Football News',
  description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <body className="pb-16 md:pb-0">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
