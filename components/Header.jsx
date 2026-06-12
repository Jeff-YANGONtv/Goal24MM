import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white border-b border-gray-800">
      <Link href="/" className="text-2xl font-bold text-red-600">Goal24MM</Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="/articles">Articles</Link>
        <Link href="/live">Live Score</Link>
        <Link href="/odds">Odds</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <div className="md:hidden">Search</div>
    </header>
  );
}
