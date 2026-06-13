import Link from 'next/link';

export default function Header() {
  const navLinks = [
    { name: 'News', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Live Score', href: '/live' },
    { name: 'Odds', href: '/odds' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="text-black font-black text-xl">G</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">
              Goal<span className="text-yellow-500">24</span>MM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-yellow-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Search Placeholder */}
          <div className="md:hidden">
            <button className="text-gray-400 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
