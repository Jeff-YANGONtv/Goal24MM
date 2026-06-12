import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around p-3 md:hidden">
      <Link href="/">Home</Link>
      <Link href="/live">Live</Link>
      <Link href="/odds">Odds</Link>
      <Link href="/articles">News</Link>
    </nav>
  );
}
